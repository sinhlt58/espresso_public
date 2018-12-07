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

import static org.elasticsearch.index.query.QueryBuilders.boolQuery;

import java.util.Date;
import java.util.Map;

import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.tuple.Values;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.joda.time.format.ISODateTimeFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.digitalpebble.stormcrawler.util.ConfUtils;
import com.uet.nlp.common.Document;

@SuppressWarnings("serial")
public class AggregationSpout extends AbstractSpout implements
        ActionListener<SearchResponse> {

    private static final Logger LOG = LoggerFactory
            .getLogger(AggregationSpout.class);

    private String ESAnalysisStatusFieldParamName = "es.analysis.status.field";
    private String ESAnalysisStatusDoneParamName = "es.analysis.done";
    private String ESAnalysisMaxHitParamName = "es.analysis.max.hit";

    private String analysisStatusField = "";
    private String analysisStatusDone = "";
    private int analysisMaxHit = 30;

    @Override
    public void open(Map stormConf, TopologyContext context,
            SpoutOutputCollector collector) {
        super.open(stormConf, context, collector);
        
        analysisStatusField = ConfUtils.getString(stormConf, ESAnalysisStatusFieldParamName,
                                "analysis_status");

        analysisStatusDone = ConfUtils.getString(stormConf, ESAnalysisStatusDoneParamName,
                                "DONE");

        analysisMaxHit = ConfUtils.getInt(stormConf, ESAnalysisMaxHitParamName,
                                analysisMaxHit);
    }

    @Override
    protected void populateBuffer() {

        if (lastDate == null) {
            lastDate = new Date();
        }

        String formattedLastDate = ISODateTimeFormat.dateTimeNoMillis().print(
                lastDate.getTime());

        LOG.info("{}: Populating buffer with non-analyzed document", formattedLastDate);

        QueryBuilder queryBuilder = QueryBuilders.boolQuery()
                                        .should(QueryBuilders.boolQuery()
                                                    .must(QueryBuilders.existsQuery(analysisStatusField))
                                                    .must(QueryBuilders.matchQuery(analysisStatusField, analysisStatusDone)))
                                        .should(QueryBuilders.boolQuery()
                                                    .mustNot(QueryBuilders
                                                                .existsQuery(analysisStatusField)));

        LOG.info("indexName: {}", indexName);
        SearchRequest request = new SearchRequest(indexName).types(docType)
                .searchType(SearchType.QUERY_THEN_FETCH);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(queryBuilder);
        sourceBuilder.from(0);
        sourceBuilder.size(analysisMaxHit);
        sourceBuilder.explain(false);
        sourceBuilder.trackTotalHits(true);

        request.source(sourceBuilder);

        isInQuery.set(true);
        client.searchAsync(request, RequestOptions.DEFAULT, this);
    }

    @Override
    public void onFailure(Exception arg0) {
        LOG.error("Exception with ES query", arg0);
        isInQuery.set(false);
    }

    @Override
    public void onResponse(SearchResponse response) {
        long timeTaken = System.currentTimeMillis() - timeLastQuery;

        int numhits = 0;
        int alreadyprocessed = 0;

        synchronized (buffer) {
            for (SearchHit hit : response.getHits()) {
                numhits++;
                String docId = hit.getId();
                
                // is already being processed - skip it!
                if (beingProcessed.containsKey(docId)) {
                    alreadyprocessed++;
                    continue;
                }

                Map<String, Object> keyValues = hit.getSourceAsMap();
                Document document = new Document(keyValues);
                buffer.add(new Values(docId, document));
            }
        }

        LOG.info(
                "{} ES query returned {} hits in {} msec with {} already being processed",
                logIdprefix, numhits, timeTaken, alreadyprocessed);

        // remove lock
        isInQuery.set(false);
    }

}
