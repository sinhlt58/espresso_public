
package com.uet.crawling.social.elasticsearch.persistence;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.uet.crawling.social.persistence.AbstractQueryingSpout;
import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.elasticsearch.ElasticSearchConnection;
import com.uet.crawling.social.util.ConfUtils;

public abstract class AbstractSpout extends AbstractQueryingSpout {

    private static final Logger LOG = LoggerFactory
            .getLogger(AbstractSpout.class);

    protected static final String ESBoltType = "status";
    protected static final String ESStatusIndexNameParamName = "es.status.index.name";
    protected static final String ESStatusDocTypeParamName = "es.status.doc.type";

    /** Field name to use for aggregating **/
    protected static final String ESStatusBucketFieldParamName = "es.status.bucket.field";
    protected static final String ESStatusMaxBucketParamName = "es.status.max.buckets";
    protected static final String ESStatusMaxNodesParamName = "es.status.max.nodes.per.bucket";

    /**
     * Field name to use for sorting the Nodes within a bucket, not used if empty
     * or null.
     **/
    protected static final String ESStatusBucketSortFieldParamName = "es.status.bucket.sort.field";

    /**
     * Field name to use for sorting the buckets, not used if empty or null.
     **/
    protected static final String ESStatusGlobalSortFieldParamName = "es.status.global.sort.field";

    protected static final String ESStatusFilterParamName = "es.status.filterQuery";

    protected String filterQuery = null;

    protected String indexName;

    protected String docType;

    protected static RestHighLevelClient client;

    /**
     * when using multiple instances - each one is in charge of a specific shard
     * useful when sharding based node type
     */
    protected int shardID = -1;

    /** Used to distinguish between instances in the logs **/
    protected String logIdprefix = "";

    /** Field name used for field collapsing e.g. metadata.hostname **/
    protected String partitionField;

    protected int maxNodesPerBucket = 10;

    protected int maxBucketNum = 10;

    protected String bucketSortField = "";

    protected String totalSortField = "";

    protected Date lastDate;

    @Override
    public void open(Map stormConf, TopologyContext context,
            SpoutOutputCollector collector) {

        super.open(stormConf, context, collector);

        indexName = ConfUtils.getString(stormConf, ESStatusIndexNameParamName,
                "fb_status");
        docType = ConfUtils.getString(stormConf, ESStatusDocTypeParamName,
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

        partitionField = ConfUtils.getString(stormConf,
                ESStatusBucketFieldParamName, "metadata.type");

        bucketSortField = ConfUtils.getString(stormConf,
                ESStatusBucketSortFieldParamName, bucketSortField);

        totalSortField = ConfUtils.getString(stormConf,
                ESStatusGlobalSortFieldParamName);

        maxNodesPerBucket = ConfUtils.getInt(stormConf,
                ESStatusMaxNodesParamName, 1);
        maxBucketNum = ConfUtils.getInt(stormConf, ESStatusMaxBucketParamName,
                10);

        filterQuery = ConfUtils.getString(stormConf, ESStatusFilterParamName);
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