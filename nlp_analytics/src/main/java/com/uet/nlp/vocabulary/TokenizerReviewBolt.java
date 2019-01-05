package com.uet.nlp.vocabulary;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Review;
import com.uet.nlp.common.item.Token;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.IRichBolt;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import vn.pipeline.Annotation;
import vn.pipeline.VnCoreNLP;
import vn.pipeline.Word;

public class TokenizerReviewBolt implements IRichBolt {
    private static final Logger LOG = LoggerFactory.getLogger(TokenizerReviewBolt.class);

    private OutputCollector _collector;

    String[] annotators = {"wseg"};
    VnCoreNLP pipeline;

    @Override
    public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
        _collector = collector;
        try {
            pipeline = new VnCoreNLP(annotators);
        } catch (Exception e) {
            LOG.error("Can not init VnCoreNLP pipeline with error: {}", e.getMessage());
        }
    }

    @Override
    public void execute(Tuple tuple) {
        String docId = (String) tuple.getValueByField("docId");
        Document doc = (Document) tuple.getValueByField("doc");

        try {
            Review review = Document.mapper.treeToValue(doc.jsonDoc, Review.class);
            if (review.itemType != null && review.itemType.equals("review")) {
                String content = review.content;
                if (!content.isEmpty()) {
                    // Segmentation
                    Annotation annotation = new Annotation(review.content);
                    pipeline.annotate(annotation);
                    
                    // Count word frequency in the content
                    Map<String, Integer> mapCount = new HashMap<>();
                    List<Word> words = annotation.getWords();
                    for (Word w : words) {
                        String key = w.getForm().toLowerCase();

                        if (!mapCount.containsKey(key)) {
                            mapCount.put(key, 1);
                        } else {
                            mapCount.put(key, mapCount.get(key) + 1);
                        }
                    }

                    ArrayList<Token> tokens = new ArrayList<>();
                    for (String key : mapCount.keySet()) {
                        Token token = new Token(key, mapCount.get(key));
                        tokens.add(token);
                    }

                    _collector.emit(tuple, new Values(docId, doc, tokens));
                }

                _collector.ack(tuple);
            } else {
                LOG.error("Not a review record");
                _collector.fail(tuple);
            }
        
        } catch (Exception e) {
            LOG.error("Error while proccessing tokenize reviews: {}", e.getMessage());
            _collector.fail(tuple);
        }
    }

    @Override
    public void cleanup() {

    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("docId", "doc", "tokens"));
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		return null;
	} 
}