package com.uet.nlp.nlp_analytics;

import java.util.Map;

import com.uet.nlp.common.Document;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.IRichBolt;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NormalizerBolt implements IRichBolt {

    private static final Logger LOG = LoggerFactory
            .getLogger(NormalizerBolt.class);

    private OutputCollector _collector;

    @Override
    public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
        _collector = collector;
    }

    @Override
    public void execute(Tuple input) {
        System.out.println(input);
        String docId = (String) input.getValueByField("docId");
        Document doc = (Document) input.getValueByField("doc");

        LOG.info("docId: {}", docId);
    }

    @Override
    public void cleanup() {

    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("docId", "doc"));
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		return null;
	}

}