
package com.uet.crawling.social.bolt;

import java.util.Map;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Fields;

import com.uet.crawling.social.Constants;
import com.uet.crawling.social.facebook.ResultServices;

/**
 * Provides common functionalities for Bolts which emit tuples to the status
 * stream, e.g. Fetcher.
 **/
public abstract class StatusEmitterBolt extends BaseRichBolt {

    protected OutputCollector collector;

    protected ResultServices resultServices;

    @Override
    public void prepare(Map stormConf, TopologyContext context,
            OutputCollector collector) {
        resultServices = ResultServices.fromConf(stormConf);
        this.collector = collector;
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declareStream(
            Constants.StatusStreamName,
            new Fields("node", "metadata", "status")
        );
    }

}
