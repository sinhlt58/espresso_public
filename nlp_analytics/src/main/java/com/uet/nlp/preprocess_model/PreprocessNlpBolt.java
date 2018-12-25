package com.uet.nlp.preprocess_model;

import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Item;
import com.uet.nlp.common.item.NlpReview;
import com.uet.nlp.common.item.Review;
import com.uet.nlp.common.item.TTNItem;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.IRichBolt;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PreprocessNlpBolt implements IRichBolt {

    private static final Logger LOG = LoggerFactory
            .getLogger(PreprocessNlpBolt.class);

    private OutputCollector _collector;

    @Override
    public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
        _collector = collector;
    }

    @Override
    public void execute(Tuple tuple) {
        String docId = (String) tuple.getValueByField("docId");
        Document doc = (Document) tuple.getValueByField("doc");

        try {
            NlpReview nlpReview = Document.mapper.treeToValue(doc.jsonDoc, NlpReview.class);
            nlpReview.itemType = "nlp_review";
            
            nlpReview.preprocess();

            ArrayList<Item> items = new ArrayList<>();
            items.add(nlpReview);

            _collector.emit(tuple, new Values(docId, doc, items));
            _collector.ack(tuple);
        } catch (Exception e) {
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