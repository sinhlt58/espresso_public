package com.uet.nlp.vocabulary;

import java.util.Map;

import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Review;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.IRichBolt;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TokenizerBolt implements IRichBolt {
    private static final Logger LOG = LoggerFactory.getLogger(TokenizerBolt.class);

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
            Review review = Document.mapper.treeToValue(doc.jsonDoc, Review.class);
            if (review.itemType != null && review.itemType.equals("review")) {
                String content = review.content;
                LOG.info("content: {}", content);
            } else {
                LOG.error("Not a review record");
                _collector.fail(tuple);
            }
        
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