
package com.uet.crawling.social.elasticsearch.persistence;

import java.io.IOException;
import java.util.Map;

import com.uet.crawling.social.persistence.AbstractQueryingSpout;
import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.elasticsearch.ElasticSearchConnection;
import com.uet.crawling.social.util.ConfUtils;

public abstract class AbstractBrandSpout extends AbstractQueryingSpout {

    private static final Logger LOG = LoggerFactory
            .getLogger(AbstractBrandSpout.class);

    protected static final String ESBoltType = "brand";
    protected static final String ESBrandIndexNameParamName = "es.brand.index.name";
    protected static final String ESBrandDocTypeParamName = "es.brand.doc.type";

    /** Field name to use for aggregating **/
    protected static final String ESBrandBucketFieldParamName = "es.brand.bucket.fields";
    protected static final String ESBrandMaxBucketParamName = "es.brand.max.buckets";

    protected String indexName = "v2_analysis";

    protected String docType = "_doc";

    protected static RestHighLevelClient client;

    /**
     * when using multiple instances - each one is in charge of a specific shard
     * useful when sharding based node type
     */
    protected int shardID = -1;

    /** Used to distinguish between instances in the logs **/
    protected String logIdprefix = "";

    /** Field name used for field collapsing e.g. metadata.hostname **/
    protected String partitionFields = "brand.keyword,author.keyword";

    protected int maxBucketNum = 200;

    @Override
    public void open(Map stormConf, TopologyContext context,
            SpoutOutputCollector collector) {

        super.open(stormConf, context, collector);

        indexName = ConfUtils.getString(stormConf, ESBrandIndexNameParamName,
                indexName);
        docType = ConfUtils.getString(stormConf, ESBrandDocTypeParamName,
                docType);

        // one ES client per JVM
        synchronized (AbstractBrandSpout.class) {
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

        // if more than one instance is used we expect their number to be the
        // same as the number of shards
        int totalTasks = context
                .getComponentTasks(context.getThisComponentId()).size();
        if (totalTasks > 1) {
            logIdprefix = "[" + context.getThisComponentId() + " #"
                    + context.getThisTaskIndex() + "] ";

            // determine the number of shards so that we can restrict the
            // search

            // TODO use the admin API when it gets available
            // TODO or the low level one with
            // https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-shards-stores.html
            // TODO identify local shards and use those if possible

            // ClusterSearchShardsRequest request = new
            // ClusterSearchShardsRequest(
            // indexName);
            // ClusterSearchShardsResponse shardresponse = client.admin()
            // .cluster().searchShards(request).actionGet();
            // ClusterSearchShardsGroup[] shardgroups =
            // shardresponse.getGroups();
            // if (totalTasks != shardgroups.length) {
            // throw new RuntimeException(
            // "Number of ES spout instances should be the same as number of
            // shards ("
            // + shardgroups.length + ") but is " + totalTasks);
            // }
            // shardID = shardgroups[context.getThisTaskIndex()].getShardId()
            // .getId();

            // TEMPORARY simply use the task index as shard index
            shardID = context.getThisTaskIndex();
            LOG.info("{} assigned shard ID {}", logIdprefix, shardID);
        }

        partitionFields = ConfUtils.getString(stormConf,
                ESBrandBucketFieldParamName, partitionFields);

        maxBucketNum = ConfUtils.getInt(stormConf, ESBrandMaxBucketParamName,
                maxBucketNum);

    }

    /** Builds a query and use it retrieve the results from ES **/
    protected abstract void populateBuffer();

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