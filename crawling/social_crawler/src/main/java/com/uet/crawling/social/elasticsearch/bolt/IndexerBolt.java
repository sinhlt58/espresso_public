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

package com.uet.crawling.social.elasticsearch.bolt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.elasticsearch.action.DocWriteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.common.xcontent.XContentBuilder;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Constants;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.elasticsearch.ElasticSearchConnection;
import com.uet.crawling.social.indexing.AbstractIndexerBolt;
import com.uet.crawling.social.persistence.Status;
import com.uet.crawling.social.util.ConfUtils;
import com.uet.crawling.social.util.Builders;

/**
 * Sends documents to ElasticSearch. Indexes all the fields from the tuples or a
 * Map &lt;String,Object&gt; from a named field.
 */
@SuppressWarnings("serial")
public class IndexerBolt extends AbstractIndexerBolt {

    private static final Logger LOG = LoggerFactory
            .getLogger(IndexerBolt.class);

    private static final String ESBoltType = "indexer";

    static final String ESIndexNameParamName = "es.indexer.index.name";
    static final String ESDocTypeParamName = "es.indexer.doc.type";
    private static final String ESCreateParamName = "es.indexer.create";
    private static final String ESIndexPipelineParamName = "es.indexer.pipeline";

    private OutputCollector _collector;

    private String indexName;
    private String docType;

    private String pipeline;

    // whether the document will be created only if it does not exist or
    // overwritten
    private boolean create = false;

    private ElasticSearchConnection connection;

    public IndexerBolt() {
    }

    /** Sets the index name instead of taking it from the configuration. **/
    public IndexerBolt(String indexName) {
        this.indexName = indexName;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Override
    public void prepare(Map conf, TopologyContext context,
            OutputCollector collector) {
        super.prepare(conf, context, collector);
        _collector = collector;
        if (indexName == null) {
            indexName = ConfUtils.getString(conf,
                    IndexerBolt.ESIndexNameParamName, "fetcher");
        }
        
        docType = ConfUtils.getString(conf, IndexerBolt.ESDocTypeParamName,
                "doc");

        create = ConfUtils.getBoolean(conf, IndexerBolt.ESCreateParamName,
                false);

        pipeline = ConfUtils.getString(conf,
                IndexerBolt.ESIndexPipelineParamName);

        try {
            connection = ElasticSearchConnection
                    .getConnection(conf, ESBoltType);
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

        String node = tuple.getStringByField("node");

        Metadata metadata = (Metadata) tuple.getValueByField("metadata");

        ArrayList<Metadata> listMdResult = (ArrayList<Metadata>) tuple.getValueByField("listMdResult");

        // boolean keep = filterDocument(metadata);
        // if (!keep) {
        //     // treat it as successfully processed even if
        //     // we do not index it
        //     _collector.emit(StatusStreamName, tuple, new Values(node, metadata,
        //             Status.FETCHED));
        //     _collector.ack(tuple);
        //     return;
        // }

        try {
            for(Metadata md: listMdResult){
                XContentBuilder builder = jsonBuilder().startObject();

                String nodeChild = Builders.buildNode(md.getFirstValue("node"), md.getFirstValue("type"));
                
                // send node as field?
                if (fieldNameForNode() != null) {
                    builder.field(fieldNameForNode(), nodeChild);
                }

                md.remove("node");
                md.remove("typesToStatus");

                // // which metadata to display?
                // Map<String, String[]> keyVals = filterMetadata(metadata);

                // Iterator<String> iterator = keyVals.keySet().iterator();
                // while (iterator.hasNext()) {
                //     String fieldName = iterator.next();
                //     String[] values = keyVals.get(fieldName);
                //     if (values.length == 1) {
                //         builder.field(fieldName, values[0]);
                //     } else if (values.length > 1) {
                //         builder.array(fieldName, values);
                //     }
                // }

                Iterator<String> iterator = md.keySet().iterator();
                while (iterator.hasNext()) {
                    String fieldName = iterator.next();
                    String[] values = md.getValues(fieldName);
                    if (values.length == 1) {
                        builder.field(fieldName, values[0]);
                    } else if (values.length > 1) {
                        builder.array(fieldName, values);
                    }
                }

                builder.endObject();

                String sha256hex = Builders.buildId(nodeChild);

                IndexRequest indexRequest = new IndexRequest(
                        getIndexName(md), docType, sha256hex).source(builder);

                DocWriteRequest.OpType optype = DocWriteRequest.OpType.INDEX;

                if (create) {
                    optype = DocWriteRequest.OpType.CREATE;
                }

                indexRequest.opType(optype);

                if (pipeline != null) {
                    indexRequest.setPipeline(pipeline);
                }

                connection.getProcessor().add(indexRequest);

            
            }

            // xoa di neu co phan filtermetadata
            metadata.remove("shouldIndex");
            metadata.remove("shouldStatus");

            _collector.emit(Constants.StatusStreamName, tuple, new Values(node, metadata,
                    Status.FETCHED));

            _collector.ack(tuple);

        } catch (IOException e) {
            LOG.error("Error sending log tuple to ES", e);
            // do not send to status stream so that it gets replayed
            _collector.fail(tuple);
        } 
    }

    /**
     * Must be overridden for implementing custom index names based on some
     * metadata information By Default, indexName coming from config is used
     */
    protected String getIndexName(Metadata m) {
        return indexName;
    }

}
