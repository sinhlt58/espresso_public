
package com.uet.crawling.social.elasticsearch.persistence;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.tuple.Tuple;
import org.elasticsearch.action.DocWriteRequest;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkProcessor;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.rest.RestStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.elasticsearch.ElasticSearchConnection;
import com.uet.crawling.social.persistence.AbstractStatusUpdaterBolt;
import com.uet.crawling.social.persistence.Status;
import com.uet.crawling.social.util.ConfUtils;
import com.uet.crawling.social.util.Builders;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.RemovalListener;
import com.google.common.cache.RemovalNotification;

/**
 * Simple bolt which stores the status of Nodes into ElasticSearch. Takes the
 * tuples coming from the 'status' stream. To be used in combination with a
 * Spout to read from the index.
 **/
@SuppressWarnings("serial")
public class StatusUpdaterBolt extends AbstractStatusUpdaterBolt implements
        RemovalListener<String, List<Tuple>>, BulkProcessor.Listener {

    private static final Logger LOG = LoggerFactory
            .getLogger(StatusUpdaterBolt.class);

    private static final String ESBoltType = "status";
    private static final String ESStatusIndexNameParamName = "es.status.index.name";
    private static final String ESStatusDocTypeParamName = "es.status.doc.type";
    private static final String ESStatusRoutingParamName = "es.status.routing";
    private static final String ESStatusRoutingFieldParamName = "es.status.routing.fieldname";

    private boolean routingFieldNameInMetadata = false;
    private String indexName;
    private String docType;

    /**
     * whether to apply the same partitioning logic used for politeness for
     * routing, e.g node
     **/
    private boolean doRouting;

    /** Store the key used for routing explicitly as a field in metadata **/
    private String fieldNameForRoutingKey = null;
    // conganh add
    private String partitionField;
    // end conganh

    private ElasticSearchConnection connection;

    private Cache<String, List<Tuple>> waitAck;

    @Override
    public void prepare(Map stormConf, TopologyContext context,
            OutputCollector collector) {

        super.prepare(stormConf, context, collector);

        indexName = ConfUtils.getString(stormConf,
                StatusUpdaterBolt.ESStatusIndexNameParamName, "status");
        docType = ConfUtils.getString(stormConf,
                StatusUpdaterBolt.ESStatusDocTypeParamName, "status");

        doRouting = ConfUtils.getBoolean(stormConf,
                StatusUpdaterBolt.ESStatusRoutingParamName, false);

        if (doRouting) {
            fieldNameForRoutingKey = ConfUtils.getString(stormConf,
                    StatusUpdaterBolt.ESStatusRoutingFieldParamName);
            if (StringUtils.isNotBlank(fieldNameForRoutingKey)) {
                if (fieldNameForRoutingKey.startsWith("metadata.")) {
                    routingFieldNameInMetadata = true;
                    fieldNameForRoutingKey = fieldNameForRoutingKey
                            .substring("metadata.".length());
                }
                // conganh add
                // save fieldNameForRoutingKey because replaced after
                partitionField = fieldNameForRoutingKey;
                // end conganh
                // periods are not allowed in ES2 - replace with %2E
                fieldNameForRoutingKey = fieldNameForRoutingKey.replaceAll(
                        "\\.", "%2E");
            }
        }

        waitAck = CacheBuilder.newBuilder()
                .expireAfterWrite(60, TimeUnit.SECONDS).removalListener(this)
                .build();

        try {
            connection = ElasticSearchConnection.getConnection(stormConf,
                    ESBoltType, this);
        } catch (Exception e1) {
            LOG.error("Can't connect to ElasticSearch", e1);
            throw new RuntimeException(e1);
        }

    }

    @Override
    public void cleanup() {
        if (connection != null)
            connection.close();
        AggregationBrandSpout aggregationBrandSpout = new AggregationBrandSpout();
        aggregationBrandSpout.close();
    }

    @Override
    public void store(String node, Status status, Metadata metadata,
            Date nextFetch) throws Exception {

        String sha256hex = Builders.buildId(node);

        // need to synchronize: otherwise it might get added to the cache
        // without having been sent to ES
        synchronized (waitAck) {
            // check that the same Node is not being sent to ES
            List<Tuple> alreadySent = waitAck.getIfPresent(sha256hex);
            if (alreadySent != null) {
                // if this object is discovered - adding another version of it
                // won't make any difference
                LOG.debug(
                        "Already being sent to ES {} with status {} and ID {}",
                        node, status, sha256hex);
                if (status.equals(Status.DISCOVERED)) {
                    // done to prevent concurrency issues
                    // the ack method could have been called
                    // after the entries from waitack were
                    // purged which can lead to entries being added straight to
                    // waitack even if nothing was sent to ES
                    metadata.setValue("es.status.skipped.sending", "true");
                    return;
                }
            }
        }

        String partitionKey = null;

        if (doRouting) {
            // conganh add
            partitionKey = metadata.getFirstValue(partitionField);
            if(partitionKey == null){
                partitionKey = node;
                // LOG.warn("Your custom partition has error, use default partition by node");
            }
            // LOG.info("Routing by key for node: {} - {}", partitionKey, node);
            // end conganh
        }

        XContentBuilder builder = jsonBuilder().startObject();
        builder.field("node", node);
        builder.field("status", status);

        // check that we don't overwrite an existing entry
        // When create is used, the index operation will fail if a document
        // by that id already exists in the index.
        boolean create = status.equals(Status.DISCOVERED);

        builder.startObject("metadata");
        Iterator<String> mdKeys = metadata.keySet().iterator();
        while (mdKeys.hasNext()) {
            String mdKey = mdKeys.next();
            String[] values = metadata.getValues(mdKey);
            // periods are not allowed in ES2 - replace with %2E
            mdKey = mdKey.replaceAll("\\.", "%2E");
            builder.array(mdKey, values);
        }

        // store routing key in metadata?
        if (StringUtils.isNotBlank(partitionKey)
                && StringUtils.isNotBlank(fieldNameForRoutingKey)
                && routingFieldNameInMetadata
                // conganh add
                && !partitionField.equals("type")) {
                // end conganh
            builder.field(fieldNameForRoutingKey, partitionKey);
        }

        builder.endObject();

        // store routing key outside metadata?
        if (StringUtils.isNotBlank(partitionKey)
                && StringUtils.isNotBlank(fieldNameForRoutingKey)
                && !routingFieldNameInMetadata
                // conganh add
                && !partitionField.equals("node")) {
                // end conganh
            builder.field(fieldNameForRoutingKey, partitionKey);
        }

        builder.field("nextFetchDate", nextFetch);

        builder.endObject();

        IndexRequest request = new IndexRequest(getIndexName(metadata))
                .type(docType);
        request.source(builder).id(sha256hex).create(create);

        if (StringUtils.isNotBlank(partitionKey)) {
            request.routing(partitionKey);
        }

        connection.getProcessor().add(request);

        LOG.debug("Sent to ES buffer {} with ID {}", node, sha256hex);
    }

    /**
     * Do not ack the tuple straight away! wait to get the confirmation that it
     * worked
     **/
    public void ack(Tuple t, String node) {
        synchronized (waitAck) {

            String sha256hex = Builders.buildId(node);
            List<Tuple> tt = waitAck.getIfPresent(sha256hex);
            if (tt == null) {
                // check that there has been no removal of the entry since
                Metadata metadata = (Metadata) t.getValueByField("metadata");
                if (metadata.getFirstValue("es.status.skipped.sending") != null) {
                    LOG.debug(
                            "Indexing skipped for {} with ID {} but key removed since",
                            node, sha256hex);
                    // ack straight away!
                    super.ack(t, node);
                    return;
                }
                tt = new LinkedList<>();
            }
            tt.add(t);
            waitAck.put(sha256hex, tt);
            LOG.debug("Added to waitAck {} with ID {} total {}", node,
                    sha256hex, tt.size());
        }
    }

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
    public void afterBulk(long executionId, BulkRequest request,
            BulkResponse response) {
        LOG.debug("afterBulk [{}] with {} responses", executionId,
                request.numberOfActions());
        long msec = response.getTook().getMillis();
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
                if (f != null && !f.getStatus().equals(RestStatus.CONFLICT)) {
                    LOG.error("update ID {}, failure: {}", id, f);
                    failed = true;
                }
                List<Tuple> xx = waitAck.getIfPresent(id);
                if (xx != null) {
                    LOG.debug("Acked {} tuple(s) for ID {}", xx.size(), id);
                    for (Tuple x : xx) {
                        if (!failed) {
                            acked++;
                            // ack and put in cache
                            super.ack(x, x.getStringByField("node"));
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
    public void afterBulk(long executionId, BulkRequest request,
            Throwable throwable) {
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

    @Override
    public void beforeBulk(long executionId, BulkRequest request) {
        LOG.debug("beforeBulk {} with {} actions", executionId,
                request.numberOfActions());
    }

    /**
     * Must be overridden for implementing custom index names based on some
     * metadata information By Default, indexName coming from config is used
     */
    protected String getIndexName(Metadata m) {
        return indexName;
    }
}
