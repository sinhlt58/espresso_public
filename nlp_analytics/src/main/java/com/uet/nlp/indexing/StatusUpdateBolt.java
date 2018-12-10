/**
 * Licensed to DigitalPebble Ltd under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * DigitalPebble licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.uet.nlp.indexing;

import java.util.LinkedList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Tuple;
import org.elasticsearch.action.DocWriteRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkProcessor;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.digitalpebble.stormcrawler.elasticsearch.ElasticSearchConnection;
import com.digitalpebble.stormcrawler.util.ConfUtils;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.RemovalListener;
import com.google.common.cache.RemovalNotification;

@SuppressWarnings("serial")
public class StatusUpdateBolt extends BaseRichBolt implements
                        RemovalListener<String, List<Tuple>>, BulkProcessor.Listener{

    private static final Logger LOG = LoggerFactory
            .getLogger(StatusUpdateBolt.class);

    private static final String ESBoltType = "status";

    static final String ESStatusNameParamName = "es.status.index.name";
    static final String ESStatusDocTypeParamName = "es.status.doc.type";

    private String ESAnalysisStatusFieldParamName = "es.analysis.status.field";
    private String ESAnalysisStatusDoneParamName = "es.analysis.done";

    private String analysisStatusField = "";
    private String analysisStatusDone = "";

    private String indexName;
    private String docType;
    
    private OutputCollector _collector;
    private ElasticSearchConnection connection;

    private Cache<String, List<Tuple>> waitAck;

    public StatusUpdateBolt() {
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Override
    public void prepare(Map conf, TopologyContext context,
            OutputCollector collector) {

        _collector = collector;

        indexName = ConfUtils.getString(conf, ESStatusNameParamName,
                    "index");

        docType = ConfUtils.getString(conf, ESStatusDocTypeParamName,
                    "_doc");

        analysisStatusField = ConfUtils.getString(conf, ESAnalysisStatusFieldParamName,
                    "analysis_status");

        analysisStatusDone = ConfUtils.getString(conf, ESAnalysisStatusDoneParamName,
                    "DONE");

        waitAck = CacheBuilder.newBuilder()
                    .expireAfterWrite(60, TimeUnit.SECONDS).removalListener(this)
                    .build();

        try {
            connection = ElasticSearchConnection
                    .getConnection(conf, ESBoltType, this);
        } catch (Exception e1) {
            LOG.error("Can't connect to ElasticSearch", e1);
            throw new RuntimeException(e1);
        }
    }

    @Override
    public void cleanup() {
        if (connection != null)
            connection.close();
    }

    @Override
    public void execute(Tuple tuple) {

        try {
            String docId = (String) tuple.getValueByField("docId");
            LOG.info("docId: {}", docId);
            
            XContentBuilder builder = jsonBuilder().startObject();
            builder.field(analysisStatusField, analysisStatusDone);
            builder.endObject();

            UpdateRequest updateRequest = new UpdateRequest(indexName, docType, docId)
                                .doc(builder);

            connection.getProcessor().add(updateRequest);
            ack(tuple, docId);

        } catch (Exception e) {
            LOG.error("Error sending log tuple to ES", e);
            // do not send to status stream so that it gets replayed
            _collector.fail(tuple);
        }
    }

    public void ack(Tuple tuple, String id) {
        synchronized(waitAck) {
            List<Tuple> tt = waitAck.getIfPresent(id);
            if (tt == null) {
                tt = new LinkedList<>();
            }
            tt.add(tuple);
            waitAck.put(id, tt);
            LOG.debug("Added to waitAck with ID {} total {}", id, tt.size());
        }
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {

    }

    @Override
    public void onRemoval(RemovalNotification<String, List<Tuple>> removal) {
        if (!removal.wasEvicted())
            return;
        LOG.error("Purged from waitAck {} with {} values", removal.getKey(),
                removal.getValue().size());
        for (Tuple t : removal.getValue()) {
            _collector.fail(t);
        }
    }

    @Override
    public void beforeBulk(long executionId, BulkRequest request) {
        LOG.debug("beforeBulk {} with {} actions", executionId,
                request.numberOfActions());
    }

    @Override
    public void afterBulk(long executionId, BulkRequest request, BulkResponse response) {
        long msec = response.getTook().getMillis();
        LOG.debug("afterBulk [{}] with {} responses, took {}ms", executionId,
                request.numberOfActions(), msec);
        Iterator<BulkItemResponse> bulkitemiterator = response.iterator();
        int itemcount = 0;
        int acked = 0;
        int failurecount = 0;

        synchronized (waitAck) {
            while (bulkitemiterator.hasNext()) {
                BulkItemResponse bir = bulkitemiterator.next();
                itemcount++;
                String id = bir.getId();
                BulkItemResponse.Failure f = bir.getFailure();
                boolean failed = false;
                if (f != null) {
                    failed = true;
                }
                List<Tuple> xx = waitAck.getIfPresent(id);
                if (xx != null) {
                    LOG.debug("Acked {} tuple(s) for ID {}", xx.size(), id);
                    for (Tuple x : xx) {
                        if (!failed) {
                            acked++;
                            _collector.ack(x);
                        } else {
                            failurecount++;
                            _collector.fail(x);
                        }
                    }
                    waitAck.invalidate(id);
                } else {
                    LOG.warn("Could not find unacked tuple for {}", id);
                }
            }

            LOG.info(
                    "Bulk response [{}] : items {}, waitAck {}, acked {}, failed {}",
                    executionId, itemcount, waitAck.size(), acked, failurecount);
            if (waitAck.size() > 0 && LOG.isDebugEnabled()) {
                for (String kinaw : waitAck.asMap().keySet()) {
                    LOG.debug(
                            "Still in wait ack after bulk response [{}] => {}",
                            executionId, kinaw);
                }
            }
        }
    }

    @Override
	public void afterBulk(long executionId, BulkRequest request, Throwable throwable) {
        LOG.error("Exception with bulk {} - failing the whole lot ",
                executionId, throwable);
        synchronized (waitAck) {
            // WHOLE BULK FAILED
            // mark all the docs as fail
            Iterator<DocWriteRequest> itreq = request.requests().iterator();
            while (itreq.hasNext()) {
                DocWriteRequest bir = itreq.next();
                String id = bir.id();
                List<Tuple> xx = waitAck.getIfPresent(id);
                if (xx != null) {
                    LOG.debug("Failed {} tuple(s) for ID {}", xx.size(), id);
                    for (Tuple x : xx) {
                        // fail it
                        _collector.fail(x);
                    }
                    waitAck.invalidate(id);
                } else {
                    LOG.warn("Could not find unacked tuple for {}", id);
                }
            }
        }
	}

}
