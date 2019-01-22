
package com.uet.crawling.social.bolt;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.lang.StringUtils;
import org.apache.storm.Config;
import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.LoggerFactory;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.uet.crawling.social.Constants;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.facebook.FBClient;
import com.uet.crawling.social.persistence.Status;
import com.uet.crawling.social.util.ConfUtils;

/**
 * A multithreaded, queue-based fetcher adapted from Apache Nutch. Enforces the
 * politeness and handles the fetching threads itself.
 */
@SuppressWarnings("serial")
public class FetcherBolt extends StatusEmitterBolt{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(FetcherBolt.class);

    private FBClient fbClient = null;

    private Cache<String, Boolean> cacheRateLimit;

    private final AtomicInteger activeThreads = new AtomicInteger(0);
    private final AtomicInteger spinWaiting = new AtomicInteger(0);

    private FetchItemQueues fetchQueues;

    private int taskID = -1;

    private File debugfiletrigger;

    /** blocks the processing of new Nodes if this value is reached **/
    private int maxNumberNodeInQueues = -1;

    private String[] beingFetched;

    /**
     * This class described the item to be fetched.
     */
    private static class FetchItem {

        String queueID;
        String node;
        Tuple t;

        public FetchItem(String node, Tuple t, String queueID) {
            this.node = node;
            this.queueID = queueID;
            this.t = t;
        }

        /**
         * Create an item. Queue id will be created based on type
         */

        public static FetchItem create(String node, Tuple t) {
            String queueID = null;
            // conganh add
            if(t.contains("metadata")){
                Metadata metadata = (Metadata) t.getValueByField("metadata");
                queueID = metadata.getFirstValue("type");
            }
            else {
                queueID = t.getStringByField("node");
            }
            // end conganh
            return new FetchItem(node, t, queueID);
        }

    }

    /**
     * This class handles FetchItems which come from the same host ID
     * It also keeps track of requests in
     * progress and elapsed time between requests.
     */
    private static class FetchItemQueue {
        final BlockingDeque<FetchItem> queue;

        private final AtomicInteger inProgress = new AtomicInteger();

        private final int maxThreads;

        public FetchItemQueue(int maxThreads, int maxQueueSize) {
            this.maxThreads = maxThreads;
            this.queue = new LinkedBlockingDeque<>(maxQueueSize);
        }

        public int getQueueSize() {
            return queue.size();
        }

        public int getInProgressSize() {
            return inProgress.get();
        }

        public void finishFetchItem(FetchItem it) {
            if (it != null) {
                inProgress.decrementAndGet();
            }
        }

        public boolean addFetchItem(FetchItem it) {
            return queue.offer(it);
        }

        public FetchItem getFetchItem() {
            if (inProgress.get() >= maxThreads)
                return null;
            FetchItem it = queue.pollFirst();
            if (it != null) {
                inProgress.incrementAndGet();
            }
            return it;
        }

    }

    /**
     * Convenience class - a collection of queues that keeps track of the total
     * number of items, and provides items eligible for fetching from any queue.
     */
    private static class FetchItemQueues {
        Map<String, FetchItemQueue> queues = Collections
                .synchronizedMap(new LinkedHashMap<String, FetchItemQueue>());

        AtomicInteger inQueues = new AtomicInteger(0);

        final int defaultMaxThread;

        int maxQueueSize;

        final Config conf;

        public FetchItemQueues(Config conf) {
            this.conf = conf;
            this.defaultMaxThread = ConfUtils.getInt(conf,
                    "fetcher.threads.per.queue", 1);

            this.maxQueueSize = ConfUtils.getInt(conf,
                    "fetcher.max.queue.size", -1);
            if (this.maxQueueSize == -1) {
                this.maxQueueSize = Integer.MAX_VALUE;
            }
        }

        /** @return true if the Node has been added, false otherwise **/
        public synchronized boolean addFetchItem(String node, Tuple input) {
            FetchItem it = FetchItem.create(node, input);
            FetchItemQueue fiq = getFetchItemQueue(it.queueID);
            boolean added = fiq.addFetchItem(it);
            if (added) {
                inQueues.incrementAndGet();
            }
            return added;
        }

        public synchronized void finishFetchItem(FetchItem it) {
            FetchItemQueue fiq = queues.get(it.queueID);
            if (fiq == null) {
                LOG.warn("Attempting to finish item from unknown queue: {}",
                        it.queueID);
                return;
            }
            fiq.finishFetchItem(it);
        }

        public synchronized FetchItemQueue getFetchItemQueue(String id) {
            FetchItemQueue fiq = queues.get(id);
            if (fiq == null) {
                // custom maxThread value: "fetcher.maxThreads." + id (type)
                final int customThreadVal = ConfUtils.getInt(conf,
                        "fetcher.maxThreads." + id, defaultMaxThread);
                // initialize queue
                fiq = new FetchItemQueue(customThreadVal, maxQueueSize);
                queues.put(id, fiq);
            }
            return fiq;
        }

        public synchronized FetchItem getFetchItem() {
            if (queues.isEmpty()) {
                return null;
            }

            FetchItemQueue start = null;

            do {
                Iterator<Entry<String, FetchItemQueue>> i = queues.entrySet()
                        .iterator();

                if (!i.hasNext()) {
                    return null;
                }

                Map.Entry<String, FetchItemQueue> nextEntry = i.next();

                if (nextEntry == null) {
                    return null;
                }

                FetchItemQueue fiq = nextEntry.getValue();

                // We remove the entry and put it at the end of the map
                i.remove();

                // reap empty queues
                if (fiq.getQueueSize() == 0 && fiq.getInProgressSize() == 0) {
                    continue;
                }

                // Put the entry at the end no matter the result
                queues.put(nextEntry.getKey(), nextEntry.getValue());

                // In case of we are looping
                if (start == null) {
                    start = fiq;
                } else if (fiq == start) {
                    return null;
                }

                FetchItem fit = fiq.getFetchItem();

                if (fit != null) {
                    inQueues.decrementAndGet();
                    return fit;
                }

            } while (!queues.isEmpty());

            return null;
        }
    }

    /**
     * This class picks items from queues and fetches the grap api.
     */
    private class FetcherThread extends Thread {

        private int threadNum;

        public FetcherThread(int num) {
            this.setDaemon(true); // don't hang JVM on exit
            this.setName("FetcherThread #" + num); // use an informative name
            this.threadNum = num;
        }

        @Override
        public void run() {
            while (true) {
                FetchItem fit = fetchQueues.getFetchItem();
                if (fit == null) {
                    LOG.debug("{} spin-waiting ...", getName());
                    // spin-wait.
                    spinWaiting.incrementAndGet();
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        LOG.error("{} caught interrupted exception", getName());
                        Thread.currentThread().interrupt();
                    }
                    spinWaiting.decrementAndGet();
                    continue;
                }

                activeThreads.incrementAndGet(); // count threads

                beingFetched[threadNum] = fit.node;

                LOG.debug(
                        "[Fetcher #{}] {}  => activeThreads={}, spinWaiting={}, queueID={}",
                        taskID, getName(), activeThreads, spinWaiting,
                        fit.queueID);

                LOG.debug("[Fetcher #{}] {} : Fetching {}", taskID, getName(),
                        fit.node);

                Metadata metadata = null;

                if (fit.t.contains("metadata")) {
                    metadata = (Metadata) fit.t.getValueByField("metadata");
                } else {
                    // require metadata.type inorder to send grap api
                    metadata = Metadata.empty;
                    collector.emit(
                        Constants.StatusStreamName,
                        fit.t,
                        new Values(fit.node, metadata, Status.ERROR));
                    collector.ack(fit.t);
                    continue;
                }

                try {
                    LOG.info("[Fetcher #{}] Starting fetch Node: {}", taskID, fit.node);
                    
                    // check rate limit and continue;
                    if(cacheRateLimit.getIfPresent("rateLimit")!=null){
                        LOG.warn("Rate: {}", cacheRateLimit.asMap().toString());
                        LOG.warn("[Fetcher #{}] Node: {} is skipped because rate limit", taskID, fit.node);
                        fetchQueues.finishFetchItem(fit);
                        activeThreads.decrementAndGet(); // count threads
                        beingFetched[threadNum] = "";
                        continue;
                    }

                    long start = System.currentTimeMillis();
                    ArrayList<Metadata> listMdResult = new ArrayList<>();

                    resultServices.getResult(
                        fbClient.getClient(), metadata, listMdResult);

                    long timeFetching = System.currentTimeMillis() - start;

                    Integer errorCode = null;
                    String checkError = metadata.getFirstValue("error");
                    if(checkError != null){
                        errorCode = Integer.parseInt(checkError);
                        metadata.remove("error");
                    }
                    
                    if(errorCode != null){
                        LOG.info(
                            "[Fetcher #{}] Fetched {} with error code {} in msec {}",
                            taskID, fit.node, errorCode,
                            timeFetching);
                    } else {
                        LOG.info(
                            "[Fetcher #{}] Fetched {} in msec {}",
                            taskID, fit.node,
                            timeFetching);
                    }

                    // determine the status based on the status code
                    final Status status = Status.fromApiResponseCode(errorCode);

                    // check rate limit req to fb
                    if(status.equals(Status.RATE_LIMIT)){
                        cacheRateLimit.put("rateLimit", true);
                    }

                    // final Values tupleToSend = new Values(fit.node, metadata,
                    //         status);

                    // if the status is OK emit on default stream
                    if (status.equals(Status.FETCHED)) {
                        collector.emit(fit.t, new Values(fit.node, metadata, listMdResult));
                    } else {
                        collector.emit(Constants.StatusStreamName, fit.t, 
                            new Values(fit.node, metadata, status));
                    }

                } catch (Exception exece) {
                    String message = exece.getMessage();
                    if (message == null)
                        message = "";

                    // common exceptions for which we log only a short message
                    if (exece.getCause() instanceof java.util.concurrent.TimeoutException
                            || message.contains(" timed out")) {
                        LOG.error("Socket timeout fetching {}", fit.node);
                        // message = "Socket timeout fetching";
                    } else if (exece.getCause() instanceof java.net.UnknownHostException
                            || exece instanceof java.net.UnknownHostException) {
                        LOG.error("Unknown Node {}", fit.node);
                        // message = "Unknown Node";
                    } else {
                        LOG.error("Exception while fetching {}", fit.node, exece);
                        // message = exece.getClass().getName();
                    }

                    if (metadata.size() == 0) {
                        metadata = new Metadata();
                    }
                    
                    // add the reason of the failure in the metadata
                    // metadata.setValue("fetch.exception", message);

                    // send to status stream
                    collector.emit(Constants.StatusStreamName, fit.t,
                            new Values(fit.node, metadata, Status.FETCH_ERROR));

                } finally {
                    fetchQueues.finishFetchItem(fit);
                    activeThreads.decrementAndGet(); // count threads
                    // ack it whatever happens
                    collector.ack(fit.t);
                    beingFetched[threadNum] = "";
                }
            }
        }
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public void prepare(Map stormConf, TopologyContext context,
            OutputCollector collector) {

        super.prepare(stormConf, context, collector);

        Config conf = new Config();
        conf.putAll(stormConf);

        // need static or not ???
        // conganh add
        String access_token = ConfUtils.getString(conf,
            Constants.FB_ACCESS_TOKEN_ParamName, Constants.FB_ACCESS_TOKEN);
        fbClient = new FBClient(access_token);
        String spec = ConfUtils.getString(stormConf, 
            Constants.cacheRateLimitConfigParamName, "maximumSize=8,expireAfterAccess=1h");
        cacheRateLimit = CacheBuilder.from(spec).build();
        // end conganh

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss",
                Locale.ENGLISH);
        long start = System.currentTimeMillis();
        LOG.info("[Fetcher #{}] : starting at {}", taskID, sdf.format(start));

        this.fetchQueues = new FetchItemQueues(conf);

        this.taskID = context.getThisTaskId();

        int threadCount = ConfUtils.getInt(conf, "fetcher.threads.number", 10);
        for (int i = 0; i < threadCount; i++) { // spawn threads
            new FetcherThread(i).start();
        }

        // keep track of the Nodes in fetching
        beingFetched = new String[threadCount];
        Arrays.fill(beingFetched, "");

        maxNumberNodeInQueues = ConfUtils.getInt(conf,
                "fetcher.max.nodes.in.queues", -1);

        /**
         * If set to a valid path e.g. /tmp/fetcher-dump-{port} on a worker
         * node, the content of the queues will be dumped to the logs for
         * debugging. The port number needs to match the one used by the
         * FetcherBolt instance.
         **/
        String debugfiletriggerpattern = ConfUtils.getString(conf,
                "fetcherbolt.queue.debug.filepath");

        if (StringUtils.isNotBlank(debugfiletriggerpattern)) {
            debugfiletrigger = new File(
                    debugfiletriggerpattern.replaceAll("\\{port\\}",
                            Integer.toString(context.getThisWorkerPort())));
        }
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        super.declareOutputFields(declarer);
        declarer.declare(new Fields("node", "metadata", "listMdResult"));
    }

    @Override
    public void execute(Tuple input) {
        boolean tooManyNodeInQueues = false;
        do {
            if (this.maxNumberNodeInQueues != -1
                    && (this.activeThreads.get() + this.fetchQueues.inQueues
                            .get()) >= maxNumberNodeInQueues) {
                tooManyNodeInQueues = true;
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    LOG.error("Interrupted exception caught in execute method");
                    Thread.currentThread().interrupt();
                }
            }
            LOG.info("[Fetcher #{}] Threads : {}\tqueues : {}\tin_queues : {}",
                    taskID, this.activeThreads.get(),
                    this.fetchQueues.queues.size(),
                    this.fetchQueues.inQueues.get());
        } while (tooManyNodeInQueues);
        
        // detect whether there is a file indicating that we should
        // dump the content of the queues to the log
        if (debugfiletrigger != null && debugfiletrigger.exists()) {
            LOG.info("Found trigger file {}", debugfiletrigger);
            logQueuesContent();
            debugfiletrigger.delete();
        }

        String node = input.getStringByField("node");

        if (StringUtils.isBlank(node)) {
            LOG.info("[Fetcher #{}] Missing value for field node in tuple {}",
                    taskID, input);
            // ignore silently
            collector.ack(input);
            return;
        }

        boolean added = fetchQueues.addFetchItem(node, input);
        if (!added) {
            collector.fail(input);
        }
    }

    private void logQueuesContent() {
        StringBuilder sb = new StringBuilder();
        synchronized (fetchQueues.queues) {
            sb.append("\nNum queues : ").append(fetchQueues.queues.size());
            Iterator<Entry<String, FetchItemQueue>> iterator = fetchQueues.queues
                    .entrySet().iterator();
            while (iterator.hasNext()) {
                Entry<String, FetchItemQueue> entry = iterator.next();
                sb.append("\nQueue ID : ").append(entry.getKey());
                FetchItemQueue fiq = entry.getValue();
                sb.append("\t size : ").append(fiq.getQueueSize());
                sb.append("\t in progress : ").append(fiq.getInProgressSize());
                Iterator<FetchItem> nodesIter = fiq.queue.iterator();
                while (nodesIter.hasNext()) {
                    sb.append("\n\t").append(nodesIter.next().node);
                }
            }
            LOG.info("Dumping queue content {}", sb.toString());

            StringBuilder sb2 = new StringBuilder("\n");
            // dump the list of Nodes being fetched
            for (int i = 0; i < beingFetched.length; i++) {
                if (beingFetched[i].length() > 0) {
                    sb2.append("\n\tThread #").append(i).append(": ")
                            .append(beingFetched[i]);
                }
            }
            LOG.info("Nodes being fetched {}", sb2.toString());
        }
    }

}
