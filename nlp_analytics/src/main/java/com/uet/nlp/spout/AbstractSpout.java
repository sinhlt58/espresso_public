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

package com.uet.nlp.spout;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.digitalpebble.stormcrawler.Metadata;
import com.digitalpebble.stormcrawler.elasticsearch.ElasticSearchConnection;
// sinh.luutruong added
// import com.uet.nlp.spout.AbstractQueryingSpout;
// sinh.luutruong end
import com.digitalpebble.stormcrawler.util.ConfUtils;

public abstract class AbstractSpout extends AbstractQueryingSpout {

    private static final Logger LOG = LoggerFactory
            .getLogger(AbstractSpout.class);

    protected static final String ESBoltType = "analysis";
    protected static final String ESAnalysisIndexNameParamName = "es.analysis.index.name";
    protected static final String ESAnalysisDocTypeParamName = "es.analysis.doc.type";

    protected String indexName;
    protected String docType;

    protected static RestHighLevelClient client;

    /** Used to distinguish between instances in the logs **/
    protected String logIdprefix = "";

    protected Date lastDate;

    @Override
    public void open(Map stormConf, TopologyContext context,
            SpoutOutputCollector collector) {

        super.open(stormConf, context, collector);

        indexName = ConfUtils.getString(stormConf, ESAnalysisIndexNameParamName,
                "index");
        docType = ConfUtils.getString(stormConf, ESAnalysisDocTypeParamName,
                "_doc");

        // one ES client per JVM
        synchronized (AbstractSpout.class) {
            try {
                if (client == null) {
                    client = ElasticSearchConnection.getClient(stormConf,
                            ESBoltType);
                }
            } catch (Exception e1) {
                LOG.error("Can't connect to ElasticSearch", e1);
                throw new RuntimeException(e1);
            }
        }
    }

    /** Builds a query and use it retrieve the results from ES **/
    protected abstract void populateBuffer();

    protected final Metadata fromKeyValues(Map<String, Object> keyValues) {
        Map<String, List<String>> mdAsMap = (Map<String, List<String>>) keyValues
                .get("metadata");
        Metadata metadata = new Metadata();
        if (mdAsMap != null) {
            Iterator<Entry<String, List<String>>> mdIter = mdAsMap.entrySet()
                    .iterator();
            while (mdIter.hasNext()) {
                Entry<String, List<String>> mdEntry = mdIter.next();
                String key = mdEntry.getKey();
                // periods are not allowed in ES2 - replace with %2E
                key = key.replaceAll("%2E", "\\.");
                Object mdValObj = mdEntry.getValue();
                // single value
                if (mdValObj instanceof String) {
                    metadata.addValue(key, (String) mdValObj);
                }
                // multi valued
                else {
                    metadata.addValues(key, (List<String>) mdValObj);
                }
            }
        }
        return metadata;
    }

    @Override
    public void ack(Object msgId) {
        LOG.debug("{}  Ack for {}", logIdprefix, msgId);
        super.ack(msgId);
    }

    @Override
    public void fail(Object msgId) {
        LOG.info("{}  Fail for {}", logIdprefix, msgId);
        super.fail(msgId);
    }

    @Override
    public void close() {
        if (client != null)
            try {
                client.close();
            } catch (IOException e) {
            }
    }

}
