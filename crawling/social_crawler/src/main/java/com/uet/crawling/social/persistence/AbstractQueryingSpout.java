
package com.uet.crawling.social.persistence;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichSpout;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Values;
import org.apache.storm.utils.Utils;

import com.uet.crawling.social.util.ConfUtils;
import com.google.common.base.Optional;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * Common features of spouts which query a backend to generate tuples. Tracks
 * the Nodes being processes, with an optional delay before they are removed from
 * the cache. Throttles the rate a which queries are emitted and provides a
 * buffer to store the Nodes waiting to be sent.
 * 
 * @since 1.11
 **/

public abstract class AbstractQueryingSpout extends BaseRichSpout {

    /**
     * Time in seconds for which acked or failed Nodes will be considered for
     * fetching again, default 30 secs.
     **/
    protected static final String StatusTTLPurgatory = "spout.ttl.purgatory";
    /**
     * Min time to allow between 2 successive queries to the backend. Value in
     * msecs, default 2000.
     **/
    protected static final String StatusMinDelayParamName = "spout.min.delay.queries";
    protected long minDelayBetweenQueries = 2000;

    /**
     * Delay in seconds after which the nextFetchDate filter is set to the
     * current time, default 120. Is used to prevent the search to be limited to
     * a handful of sources.
     **/
    protected static final String resetFetchDateParamName = "spout.reset.fetchdate.after";
    protected int resetFetchDateAfterNSecs = 120;

    protected long timeLastQuery = 0;

    protected Queue<Values> buffer = new LinkedList<>();
    private SpoutOutputCollector _collector;

    /** Required for implementations doing asynchronous calls **/
    protected AtomicBoolean isInQuery = new AtomicBoolean(false);

    @Override
    public void open(Map stormConf, TopologyContext context,
            SpoutOutputCollector collector) {

        int ttlPurgatory = ConfUtils.getInt(stormConf, StatusTTLPurgatory, 30);

        minDelayBetweenQueries = ConfUtils.getLong(stormConf,
                StatusMinDelayParamName, 2000);

        beingProcessed = new InProcessMap<>(ttlPurgatory, TimeUnit.SECONDS);

        resetFetchDateAfterNSecs = ConfUtils.getInt(stormConf,
                resetFetchDateParamName, resetFetchDateAfterNSecs);

        _collector = collector;
    }

    /** Method where specific implementations query the storage **/
    protected abstract void populateBuffer();

    /**
     * Map to keep in-process Nodes, ev. with additional information for Node /
     * politeness bucket (type etc.). The entries are kept in a
     * cache for a configurable amount of time to avoid that some items are
     * fetched a second time if new items are queried shortly after they have
     * been acked.
     */
    protected InProcessMap<String, String> beingProcessed;
    private boolean active;

    /** Map which holds elements some additional time after the removal. */
    public class InProcessMap<K, V> extends HashMap<K, V> {

        private Cache<K, Optional<V>> deletionCache;

        public InProcessMap(long maxDuration, TimeUnit timeUnit) {
            deletionCache = CacheBuilder.newBuilder()
                    .expireAfterWrite(maxDuration, timeUnit).build();
        }

        @Override
        public boolean containsKey(Object key) {
            boolean incache = super.containsKey(key);
            if (!incache) {
                incache = (deletionCache.getIfPresent(key) != null);
            }
            return incache;
        }

        @Override
        public V remove(Object key) {
            deletionCache.put((K) key, Optional.absent());
            return super.remove(key);
        }

        public long inCache() {
            return deletionCache.size();
        }
    }

    @Override
    public void nextTuple() {
        if (!active)
            return;

        // synchronize access to buffer needed in case of asynchronous
        // queries to the backend
        synchronized (buffer) {
            if (!buffer.isEmpty()) {
                List<Object> fields = buffer.remove();
                String node = fields.get(0).toString();
                this._collector.emit(fields, node);
                beingProcessed.put(node, null);
                return;
            }
        }

        if (isInQuery.get() || throttleQueries() > 0) {
            // sleep for a bit but not too much in order to give ack/fail a
            // chance
            Utils.sleep(10);
            return;
        }

        // re-populate the buffer
        populateBuffer();

        timeLastQuery = System.currentTimeMillis();
    }

    /**
     * Returns the amount of time to wait if the backend was queried too
     * recently and needs throttling or -1 if the backend can be queried
     * straight away.
     **/
    private long throttleQueries() {
        Date now = new Date();
        if (timeLastQuery != 0) {
            // check that we allowed some time between queries
            long difference = now.getTime() - timeLastQuery;
            if (difference < minDelayBetweenQueries) {
                return minDelayBetweenQueries - difference;
            }
        }
        return -1;
    }

    @Override
    public void activate() {
        active = true;
    }

    @Override
    public void deactivate() {
        active = false;
    }

    @Override
    public void ack(Object msgId) {
        beingProcessed.remove(msgId);
    }

    @Override
    public void fail(Object msgId) {
        beingProcessed.remove(msgId);
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("node", "metadata"));
    }

}