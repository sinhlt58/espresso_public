package com.uet.nlp.nlp_analytics;

import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Item;
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

public class PreprocessReviewBolt implements IRichBolt {

    private static final Logger LOG = LoggerFactory
            .getLogger(PreprocessReviewBolt.class);

    private OutputCollector _collector;

    @Override
    public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
        _collector = collector;
    }

    @Override
    public void execute(Tuple tuple) {
        String docId = (String) tuple.getValueByField("docId");
        Document doc = (Document) tuple.getValueByField("doc");

        ArrayList<Item> items = getItems(doc.jsonDoc);

        if (!items.isEmpty()) {
            _collector.emit(tuple, new Values(docId, doc, items));
        }
            
        _collector.ack(tuple);
    }

    public ArrayList<Item> getItems(JsonNode jsonNode) {
        ArrayList<Item> items = new ArrayList<>();

        JsonNode blDiemNode = jsonNode.get("bl_diem");

        try {
            TTNItem ttnItem = Document.mapper.treeToValue(jsonNode, TTNItem.class);
            ttnItem.generateId();
            items.add(ttnItem);

            if (blDiemNode != null) {
                if (blDiemNode.isArray()) {
                    for (int i = 0; i < blDiemNode.size(); i++) {
                        try {
                            Review review  = Document.mapper.treeToValue(jsonNode, Review.class);
                            review.author  = jsonNode.get("bl_nguoi_dang").get(i).asText();
                            review.rate    = blDiemNode.get(i).asDouble();
                            review.content = jsonNode.get("bl_noi_dung").get(i).asText();
                            review.date    = jsonNode.get("bl_thoi_gian").get(i).asDouble();
                            
                            joinReviewTTNItem(review, ttnItem);
                            
                            items.add(review);

                        } catch (Exception e) {
                            break;
                        }
                    }
                } else {
                    Review review  = Document.mapper.treeToValue(jsonNode, Review.class);
                    review.author  = jsonNode.get("bl_nguoi_dang").asText();
                    review.rate    = blDiemNode.asDouble();
                    review.content = jsonNode.get("bl_noi_dung").asText();
                    review.date    = jsonNode.get("bl_thoi_gian").asDouble();

                    joinReviewTTNItem(review, ttnItem);
                            
                    items.add(review);
                }
                
            }

        } catch (Exception e) {
            LOG.error(e.getMessage());
        }

        return items;
    }

    private void joinReviewTTNItem(Review review, TTNItem ttnItem) {
        // trade off here
        // duplicate here but for fast query
        review.parentId       = ttnItem.id;
        review.brand          = ttnItem.brand;
        review.parentAuthor   = ttnItem.author;
        review.parentItemType = ttnItem.itemType;
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