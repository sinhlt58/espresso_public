package com.uet.nlp.nlp_analytics;

import java.util.ArrayList;
import java.util.Map;

import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Item;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.IRichBolt;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
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
    public void execute(Tuple tuple) {
        
        try {
            String docId = (String) tuple.getValueByField("docId");
            Document doc = (Document) tuple.getValueByField("doc");
            ArrayList<Item> items = (ArrayList<Item>) tuple.getValueByField("items");

            for (Item item : items) {
                item.normalize();
            }
    
            _collector.emit(tuple, new Values(docId, doc, items));
            _collector.ack(tuple);

        } catch (Exception e) {
            LOG.error(e.getMessage());
            _collector.fail(tuple);
        }
        
    }

    @Override
    public void cleanup() {

    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("docId", "doc", "items"));
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		return null;
	}

}