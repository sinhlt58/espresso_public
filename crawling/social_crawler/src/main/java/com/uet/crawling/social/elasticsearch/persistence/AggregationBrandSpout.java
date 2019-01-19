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

package com.uet.crawling.social.elasticsearch.persistence;

import static org.elasticsearch.index.query.QueryBuilders.boolQuery;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.TimeUnit;

import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Values;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.SingleBucketAggregation;
import org.elasticsearch.search.aggregations.bucket.sampler.DiversifiedAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.Serializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.persistence.Status;
import com.uet.crawling.social.util.ConfUtils;

/**
 * Spout which pulls Node from an ES index. Use a single instance unless you use
 * 'es.status.routing' with the StatusUpdaterBolt, in which case you need to
 * have exactly the same number of spout instances as ES shards. Guarantees a
 * good mix of Nodes by aggregating them by an arbitrary field e.g.
 * metadata.type.
 **/
@SuppressWarnings("serial")
public class AggregationBrandSpout extends AbstractBrandSpout implements
        ActionListener<SearchResponse> {

    private static final Logger LOG = LoggerFactory
            .getLogger(AggregationBrandSpout.class);

    private static final String ESBrandSampleParamName = "es.brand.sample";
    private boolean sample = false;

    /**
     * Time in seconds for which acked or failed Nodes will be considered for
     * fetching again, default 30 secs.
     **/
    private static final String BrandTTLPurgatory = "spout.brand.ttl.purgatory";
    /**
     * Min time to allow between 2 successive queries to the backend. Value in
     * msecs, default 2000.
     **/
    private static final String BrandMinDelayParamName = "spout.brand.min.delay.queries";
    
    private static final String DBMakerFileParamName = "spout.brand.DBMaker.file.name";
    private String DBMakerFile = "timeLastGetBrand.db";

    private static final String TimeLastGetBrandDefaultParamName = "spout.brand.time.last.get.default";
    private long timeLastGetBrandDefault = 915148800*1000; 

    private static final String NextTimeParamName = "spout.brand.next.time";
    private int nextTime = 3600000;

    private static final String FieldTimeParamName = "spout.brand.field.time";
    private String nameFieldTime = "time";

    private static final String FieldRangeParamName = "spout.brand.field.range";
    private String nameFieldRange = "createdTime";

    private static final String FieldTermParamName = "spout.brand.field.term";
    private String nameFieldTerm = "itemType";
    
    private static final String ValueFieldTermParamName = "spout.brand.value.file.term";
    private String valueFieldTerm = "product";

    private static final String ValueIgnoreParamName = "spout.brand.value.ignore";
    private String valueIgnore = "no brand, 0";
    private List<String> listIgnore;
    
    private DB DBMap = null;
    private ConcurrentMap<String,Long> mapDB = null;
    
    private Long fromDate = null;
    private Long toDate  = null;
    
    private final String nameTerm = "by_brand";
    private String[] partitionFieldsArray;

    @Override
    public void open(Map stormConf, TopologyContext context,
            SpoutOutputCollector collector) {

        super.open(stormConf, context, collector);

        sample = ConfUtils.getBoolean(stormConf, ESBrandSampleParamName,
                sample);

        int ttlPurgatory = ConfUtils.getInt(stormConf, BrandTTLPurgatory, 30);

        minDelayBetweenQueries = ConfUtils.getLong(stormConf,
                BrandMinDelayParamName, 2000);

        beingProcessed = new InProcessMap<>(ttlPurgatory, TimeUnit.SECONDS);

        partitionFieldsArray = partitionFields.split(",");

        DBMakerFile = ConfUtils.getString(stormConf, DBMakerFileParamName, DBMakerFile);

        timeLastGetBrandDefault = ConfUtils.getLong(stormConf,
                TimeLastGetBrandDefaultParamName, timeLastGetBrandDefault);

        nextTime = ConfUtils.getInt(stormConf,
                NextTimeParamName, nextTime);

        nameFieldTime = ConfUtils.getString(stormConf,
                FieldTimeParamName, nameFieldTime);

        nameFieldRange = ConfUtils.getString(stormConf,
                FieldRangeParamName, nameFieldRange);

        nameFieldTerm = ConfUtils.getString(stormConf,
                FieldTermParamName, nameFieldTerm);

        valueFieldTerm = ConfUtils.getString(stormConf,
                ValueFieldTermParamName, valueFieldTerm);

        valueIgnore = ConfUtils.getString(stormConf,
                ValueIgnoreParamName, valueIgnore);

        listIgnore = Arrays.asList(valueIgnore.split(","));

        DBMap = DBMaker.fileDB(DBMakerFile).fileMmapEnable().make();
        mapDB = DBMap
            .hashMap("map", Serializer.STRING, Serializer.LONG)
            .createOrOpen();
        
    }

    private int getRandomNumberInRange(int min, int max) {
		return (int)(Math.random() * ((max - min) + 1)) + min;
	}

    @Override
    protected void populateBuffer() {

        int index = getRandomNumberInRange(0, partitionFieldsArray.length-1);
        String partitionField = partitionFieldsArray[index];

        fromDate = mapDB.getOrDefault(nameFieldTime, timeLastGetBrandDefault);
        toDate = Long.sum(fromDate, nextTime);

        LOG.info("{} Populating buffer with {} from {} to {}", logIdprefix,
            nameFieldRange, new Date(fromDate), new Date(toDate));
        
        QueryBuilder queryTimeBuilder = QueryBuilders.rangeQuery(nameFieldRange)
                .gte(fromDate).lt(toDate);
        
        QueryBuilder queryTypeBuilder = QueryBuilders
                .termQuery(nameFieldTerm, valueFieldTerm);

        QueryBuilder queryBuilder = boolQuery().must(queryTypeBuilder)
                .must(queryTimeBuilder);

        SearchRequest request = new SearchRequest(indexName).types(docType)
                .searchType(SearchType.QUERY_THEN_FETCH);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(queryBuilder);
        sourceBuilder.from(0);
        sourceBuilder.size(0);
        sourceBuilder.explain(false);
        sourceBuilder.trackTotalHits(false);

        TermsAggregationBuilder aggregations = AggregationBuilders
                .terms(nameTerm).field(partitionField).size(maxBucketNum);

        if (sample) {
            DiversifiedAggregationBuilder sab = new DiversifiedAggregationBuilder(
                    "sample");
            sab.field(partitionField);
            sab.shardSize(maxBucketNum);
            sab.subAggregation(aggregations);
            sourceBuilder.aggregation(sab);
        } else {
            sourceBuilder.aggregation(aggregations);
        }

        request.source(sourceBuilder);

        // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-preference.html
        // _shards:2,3
        if (shardID != -1) {
            request.preference("_shards:" + shardID);
        }

        // dump query to log
        LOG.debug("{} ES query {}", logIdprefix, request.toString());

        isInQuery.set(true);
        client.searchAsync(request, this);
    }

    @Override
    public void close() {
        super.close();
        if (DBMap != null)
            try {
                DBMap.close();
            } catch (Exception e) {}
    }

    @Override
    public void onFailure(Exception arg0) {
        LOG.error("Exception with ES query", arg0);
        isInQuery.set(false);
    }

    @Override
    public void onResponse(SearchResponse response) {

        mapDB.put(nameFieldTime, toDate);

        long timeTaken = System.currentTimeMillis() - timeLastQuery;

        Aggregations aggregs = response.getAggregations();

        if (aggregs == null) {
            isInQuery.set(false);
            return;
        }

        SingleBucketAggregation sample = aggregs.get("sample");
        if (sample != null) {
            aggregs = sample.getAggregations();
        }

        Terms agg = aggregs.get(nameTerm);

        int numBuckets = 0;
        int alreadyprocessed = 0;

        synchronized (buffer) {
            // For each entry
            Iterator<Terms.Bucket> iterator = (Iterator<Bucket>) agg.getBuckets().iterator();
            while (iterator.hasNext()) {
                Terms.Bucket entry = iterator.next();
                String key = (String) entry.getKey();

                if(key == null){
                    continue;
                }

                key = key.replaceAll("%2E", "\\.").toLowerCase();

                if(listIgnore.contains(key) || key.length() <= 1){
                    continue;
                }

                long docCount = entry.getDocCount();

                String type = "search_pages";
                String node = key + "_" + type;

                if (beingProcessed.containsKey(node)) {
                    alreadyprocessed++;
                    continue;
                }

                Metadata metadata = new Metadata();
                metadata.setValue("type", type);
                metadata.setValue("node_id", key);

                Status status = Status.DISCOVERED;
                buffer.add(new Values(node, metadata, status));

                numBuckets++;

                LOG.debug("{} key [{}], doc_count [{}]", logIdprefix,
                        key, docCount);
            }

            // Shuffle the Nodes so that we don't get blocks of Nodes from the
            // same type
            Collections.shuffle((List) buffer);
        }

        LOG.info(
            "{} ES query returned {} buckets in {} msec with {} already being processed",
            logIdprefix, numBuckets, timeTaken, alreadyprocessed);

        // remove lock
        isInQuery.set(false);
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("node", "metadata", "status"));
    }

}
