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

import java.util.ArrayList;
import java.util.Map;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.elasticsearch.action.DocWriteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.common.xcontent.XContentType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.digitalpebble.stormcrawler.elasticsearch.ElasticSearchConnection;
import com.digitalpebble.stormcrawler.util.ConfUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Item;


@SuppressWarnings("serial")
public class IndexerBolt extends BaseRichBolt {

    private static final Logger LOG = LoggerFactory
            .getLogger(IndexerBolt.class);

    private static final String ESBoltType = "indexer";

    static final String ESIndexNameParamName = "es.indexer.index.name";
    static final String ESDocTypeParamName = "es.indexer.doc.type";

    private OutputCollector _collector;

    private String indexName;
    private String docType;

    private ElasticSearchConnection connection;

    public IndexerBolt() {
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Override
    public void prepare(Map conf, TopologyContext context,
            OutputCollector collector) {

        _collector = collector;

        indexName = ConfUtils.getString(conf, ESIndexNameParamName,
                    "analysis");

        docType = ConfUtils.getString(conf, ESDocTypeParamName,
                    "_doc");

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

        try {
            String docId = (String) tuple.getValueByField("docId");
            Document doc = (Document) tuple.getValueByField("doc");
            ArrayList<Item> items = (ArrayList<Item>) tuple.getValueByField("items");

            for (Item item : items) {
                JsonNode jsonNode = Document.mapper.convertValue(item, JsonNode.class);
                
                IndexRequest indexRequest = new IndexRequest(
                            indexName, docType, item.id).source(jsonNode.toString(), XContentType.JSON);

                DocWriteRequest.OpType optype = DocWriteRequest.OpType.INDEX;
                
                indexRequest.opType(optype);

                connection.getProcessor().add(indexRequest);
            }
            
            _collector.emit(tuple, new Values(docId, doc, items));
            _collector.ack(tuple);

        } catch (Exception e) {
            LOG.error("Error sending log tuple to ES", e);
            // do not send to status stream so that it gets replayed
            _collector.fail(tuple);
        }
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("docId", "doc", "items"));
	}

}
