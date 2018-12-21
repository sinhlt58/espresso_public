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

package com.uet.crawling.social.bolt;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import com.uet.crawling.social.facebook.models.Result;
import com.uet.crawling.social.facebook.services.GetComments;
import com.uet.crawling.social.facebook.services.GetPosts;
import com.uet.crawling.social.facebook.services.SearchPages;
import org.apache.commons.lang.StringUtils;
import org.apache.storm.Config;
import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.LoggerFactory;

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

    // conganh add
    private FBClient fbClient = null;
    // end conganh

    private final AtomicInteger activeThreads = new AtomicInteger(0);
    private final AtomicInteger spinWaiting = new AtomicInteger(0);

    private FetchItemQueues fetchQueues;

    private int taskID = -1;

    private File debugfiletrigger;

    /** blocks the processing of new URLs if this value is reached **/
    private int maxNumberNodeInQueues = -1;

    private String[] beingFetched;

    /**
     * This class described the item to be fetched.
     */
    private static class FetchItem {

        String queueID;
        String node;
        Tuple t;
        // long creationTime;

        public FetchItem(String node, Tuple t, String queueID) {
            this.node = node;
            this.queueID = queueID;
            this.t = t;
            // this.creationTime = System.currentTimeMillis();
        }

        /**
         * Create an item. Queue id will be created based on
         * <code>queueMode</code> argument, either as a protocol + hostname
         * pair, protocol + IP address pair or protocol+domain pair.
         */

        public static FetchItem create(String node, Tuple t/*, String queueMode*/) {
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
     * This class handles FetchItems which come from the same host ID (be it a
     * proto/hostname or proto/IP pair). It also keeps track of requests in
     * progress and elapsed time between requests.
     */
    private static class FetchItemQueue {
        final BlockingDeque<FetchItem> queue;

        private final AtomicInteger inProgress = new AtomicInteger();
        private final AtomicLong nextFetchTime = new AtomicLong();

        private final long minCrawlDelay;
        private final int maxThreads;

        long crawlDelay;

        public FetchItemQueue(int maxThreads, long crawlDelay,
                long minCrawlDelay, int maxQueueSize) {
            this.maxThreads = maxThreads;
            this.crawlDelay = crawlDelay;
            this.minCrawlDelay = minCrawlDelay;
            this.queue = new LinkedBlockingDeque<>(maxQueueSize);
            // ready to start
            setNextFetchTime(System.currentTimeMillis(), true);
        }

        public int getQueueSize() {
            return queue.size();
        }

        public int getInProgressSize() {
            return inProgress.get();
        }

        public void finishFetchItem(FetchItem it, boolean asap) {
            if (it != null) {
                inProgress.decrementAndGet();
                setNextFetchTime(System.currentTimeMillis(), asap);
            }
        }

        public boolean addFetchItem(FetchItem it) {
            return queue.offer(it);
        }

        public FetchItem getFetchItem() {
            if (inProgress.get() >= maxThreads)
                return null;
            if (nextFetchTime.get() > System.currentTimeMillis())
                return null;
            FetchItem it = queue.pollFirst();
            if (it != null) {
                inProgress.incrementAndGet();
            }
            return it;
        }

        private void setNextFetchTime(long endTime, boolean asap) {
            if (!asap)
                nextFetchTime.set(endTime
                        + (maxThreads > 1 ? minCrawlDelay : crawlDelay));
            else
                nextFetchTime.set(endTime);
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
        final long crawlDelay;
        final long minCrawlDelay;

        int maxQueueSize;

        final Config conf;

        public FetchItemQueues(Config conf) {
            this.conf = conf;
            this.defaultMaxThread = ConfUtils.getInt(conf,
                    "fetcher.threads.per.queue", 1);

            this.crawlDelay = (long) (ConfUtils.getFloat(conf,
                    "fetcher.server.delay", 1.0f) * 1000);
            this.minCrawlDelay = (long) (ConfUtils.getFloat(conf,
                    "fetcher.server.min.delay", 0.0f) * 1000);
            this.maxQueueSize = ConfUtils.getInt(conf,
                    "fetcher.max.queue.size", -1);
            if (this.maxQueueSize == -1) {
                this.maxQueueSize = Integer.MAX_VALUE;
            }
        }

        /** @return true if the URL has been added, false otherwise **/
        public synchronized boolean addFetchItem(String node, Tuple input) {
            FetchItem it = FetchItem.create(node, input/*, queueMode*/);
            FetchItemQueue fiq = getFetchItemQueue(it.queueID);
            boolean added = fiq.addFetchItem(it);
            if (added) {
                inQueues.incrementAndGet();
            }
            return added;
        }

        public synchronized void finishFetchItem(FetchItem it, boolean asap) {
            FetchItemQueue fiq = queues.get(it.queueID);
            if (fiq == null) {
                LOG.warn("Attempting to finish item from unknown queue: {}",
                        it.queueID);
                return;
            }
            fiq.finishFetchItem(it, asap);
        }

        public synchronized FetchItemQueue getFetchItemQueue(String id) {
            FetchItemQueue fiq = queues.get(id);
            if (fiq == null) {
                // custom maxThread value?
                final int customThreadVal = ConfUtils.getInt(conf,
                        "fetcher.maxThreads." + id, defaultMaxThread);
                // initialize queue
                fiq = new FetchItemQueue(customThreadVal, crawlDelay,
                        minCrawlDelay, maxQueueSize);
                queues.put(id, fiq);
                LOG.info("Queue id: {}, custome thread number: {}, queues size: {}", id, customThreadVal, queues.size());
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
     * This class picks items from queues and fetches the pages.
     */
    private class FetcherThread extends Thread {

        // max. delay accepted from robots.txt
        private final long maxCrawlDelay;
        // whether maxCrawlDelay overwrites the longer value in robots.txt
        // (otherwise URLs in this queue are skipped)
        private final boolean maxCrawlDelayForce;
        // whether the default delay is used even if the robots.txt
        // specifies a shorter crawl-delay
        private final boolean crawlDelayForce;
        private int threadNum;

        public FetcherThread(Config conf, int num) {
            this.setDaemon(true); // don't hang JVM on exit
            this.setName("FetcherThread #" + num); // use an informative name

            this.maxCrawlDelay = ConfUtils.getInt(conf,
                    "fetcher.max.crawl.delay", 30) * 1000;
            this.maxCrawlDelayForce = ConfUtils.getBoolean(conf,
                    "fetcher.max.crawl.delay.force", false);
            this.crawlDelayForce = ConfUtils.getBoolean(conf,
                    "fetcher.server.delay.force", false);
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
                }
                if (metadata == null) {
                    metadata = Metadata.empty;
                }

                boolean asap = false;

                try {
                    LOG.info("Node: {}", fit.node);

                    // conganh add
                    long start = System.currentTimeMillis();
                    // long timeInQueues = start - fit.creationTime;
                    Result result = null;
                    String type = metadata.getFirstValue("type");
                    switch (type) {
                        case Constants.NodeTypeSearchPages:
                            SearchPages searchPages = new SearchPages();
                            result = searchPages.search(fbClient.getClient(), fit.node, 100);
                            break;
                        case Constants.NodeTypeGetPosts:
                            GetPosts getPosts = new GetPosts();
                            result = getPosts.get(fbClient.getClient(), fit.node, 100);
                            break;
                        case Constants.NodeTypeGetComments:
                            GetComments getComments = new GetComments();
                            result = getComments.get(fbClient.getClient(), fit.node, 100);
                            break;
                        default:
                            break;
                    }
                    long timeFetching = System.currentTimeMillis() - start;
                    
                    FetchItemQueue fiq = fetchQueues
                            .getFetchItemQueue(fit.queueID);
                    if (timeFetching > 0
                            && timeFetching != fiq.crawlDelay) {
                        if (timeFetching > maxCrawlDelay
                                && maxCrawlDelay >= 0) {
                            boolean force = false;
                            String msg = "skipping";
                            if (maxCrawlDelayForce) {
                                force = true;
                                msg = "using value of fetcher.max.crawl.delay instead";
                            }
                            LOG.info("Crawl-Delay for {} too long ({}), {}",
                                    fit.node, timeFetching, msg);
                            if (force) {
                                fiq.crawlDelay = maxCrawlDelay;
                            } else {
                                // pass the info about crawl delay
                                metadata.setValue(Constants.STATUS_ERROR_CAUSE,
                                        "crawl_delay");
                                collector
                                        .emit(com.digitalpebble.stormcrawler.Constants.StatusStreamName,
                                                fit.t, new Values(fit.node,
                                                        metadata, Status.ERROR));
                                // no need to wait next time as we won't request
                                // from that site
                                asap = true;
                                continue;
                            }
                        } else if (timeFetching < fetchQueues.crawlDelay
                                && crawlDelayForce) {
                            fiq.crawlDelay = fetchQueues.crawlDelay;
                            LOG.info(
                                    "Crawl delay for {} too short ({}), set to fetcher.server.delay",
                                    fit.node, timeFetching);
                        } else {
                            fiq.crawlDelay = timeFetching;
                            LOG.info(
                                    "Crawl delay for queue: {}  is set to {} as per robots.txt. url: {}",
                                    fit.queueID, fiq.crawlDelay, fit.node);
                        }
                    }

                    Integer statusCode = null;
                    if(result != null && result.getError() != null){
                        statusCode = result.getError().getCode();
                    }
                    
                    LOG.info(
                        "[Fetcher #{}] Fetched {} with status {} in msec {}",
                        taskID, fit.node, statusCode,
                        timeFetching);
                    // end conganh

                    // chua set metadata result

                    // final int byteLength = response.getContent().length;

                    // metadata.setValue("fetch.statusCode",
                    //     statusCode.toString());

                    // mergedMD.setValue("fetch.byteLength",
                    //         Integer.toString(byteLength));

                    // metadata.setValue("fetch.loadingTime",
                    //         Long.toString(timeFetching));

                    // metadata.setValue("fetch.timeInQueues",
                    //         Long.toString(timeInQueues));

                    // determine the status based on the status code

                    // conganh add
                    final Status status = Status.fromApiResponseCode(statusCode);
                    // end conganh

                    final Values tupleToSend = new Values(fit.node, metadata,
                            status);

                    // if the status is OK emit on default stream
                    if (status.equals(Status.FETCHED)) {
                        collector.emit(fit.t, new Values(fit.node, metadata));
                    } else {
                        collector.emit(Constants.StatusStreamName, fit.t, tupleToSend);
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
                    fetchQueues.finishFetchItem(fit, asap);
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

        // co can static hay khong?
        // conganh add
        String access_token = ConfUtils.getString(conf,
                Constants.FB_ACCESS_TOKEN_ParamName, Constants.FB_ACCESS_TOKEN);
        fbClient = new FBClient(access_token);
        // end conganh

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss",
                Locale.ENGLISH);
        long start = System.currentTimeMillis();
        LOG.info("[Fetcher #{}] : starting at {}", taskID, sdf.format(start));

        this.fetchQueues = new FetchItemQueues(conf);

        this.taskID = context.getThisTaskId();

        int threadCount = ConfUtils.getInt(conf, "fetcher.threads.number", 10);
        for (int i = 0; i < threadCount; i++) { // spawn threads
            new FetcherThread(conf, i).start();
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
        declarer.declare(new Fields("node", "metadata"));
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
            // dump the list of URLs being fetched
            for (int i = 0; i < beingFetched.length; i++) {
                if (beingFetched[i].length() > 0) {
                    sb2.append("\n\tThread #").append(i).append(": ")
                            .append(beingFetched[i]);
                }
            }
            LOG.info("URLs being fetched {}", sb2.toString());
        }
    }

}
