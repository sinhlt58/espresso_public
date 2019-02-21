package com.uet.nlp.nlp_analytics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.digitalpebble.stormcrawler.util.ConfUtils;
import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Item;
import com.uet.nlp.common.item.Review;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.IRichBolt;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tensorflow.SavedModelBundle;
import org.tensorflow.Session;
import org.tensorflow.Tensor;
import org.tensorflow.Session.Runner;

public class CallSentimentBolt implements IRichBolt {

    private static final Logger LOG = LoggerFactory
            .getLogger(CallSentimentBolt.class);

    static final String ESCallSentimentModelPathParamName = "model.sentiment.path";
    private String modelSentimentPath = "";
    Session tfSess = null;

    private OutputCollector _collector;

    @Override
    public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
        _collector = collector;

        modelSentimentPath = ConfUtils.getString(stormConf, ESCallSentimentModelPathParamName, "");
        SavedModelBundle b = SavedModelBundle.load(modelSentimentPath, "serve");
        tfSess = b.session();
    }

    @Override
    public void execute(Tuple tuple) {
        
        try {
            String docId = (String) tuple.getValueByField("docId");
            Document doc = (Document) tuple.getValueByField("doc");
            
            Review review = Document.mapper.treeToValue(doc.jsonDoc, Review.class);
            float[] sentimentScores = {0, 0};

            if (review.content.length() > 0) {
                byte [][] inputStr = {review.content.getBytes("UTF-8")};
                Tensor<String> inputs = Tensor.create(inputStr, String.class);
                List<Tensor<?>> resultTensors = tfSess.runner().feed("batch_input", inputs)
                                                    .fetch("raw")
                                                    .fetch("predictions").run();
                                            
                sentimentScores[0] = resultTensors.get(0).copyTo(new float[1])[0];
                sentimentScores[1] = resultTensors.get(1).copyTo(new int[1])[0];;
            }

            _collector.emit(tuple, new Values(docId, doc, sentimentScores));
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
        declarer.declare(new Fields("docId", "doc", "sentimentScores"));
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		return null;
	}

}