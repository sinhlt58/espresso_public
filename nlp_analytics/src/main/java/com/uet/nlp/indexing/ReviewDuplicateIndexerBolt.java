package com.uet.nlp.indexing;

import java.util.ArrayList;

import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Item;
import com.uet.nlp.common.item.NlpReview;

import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.script.Script;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReviewDuplicateIndexerBolt extends IndexerBolt {
    private static final Logger LOG = LoggerFactory
            .getLogger(ReviewDuplicateIndexerBolt.class);

    @Override
    public void execute(Tuple tuple) {

        try {
            String docId = (String) tuple.getValueByField("docId");
            Document doc = (Document) tuple.getValueByField("doc");
            ArrayList<NlpReview> reviews = (ArrayList<NlpReview>) tuple.getValueByField("nlp_reviews");

            for (NlpReview review : reviews) {
                if (review.content != null && !review.content.isEmpty()
                    && review.rate >= 1 && review.rate <= 5){
                    Item item = new Item();
                    item.generateId(review.content);

                    XContentBuilder builder = jsonBuilder().startObject();
                    builder.field("cotent", review.content);
                    for (int i = 1; i <= 5; i++) {
                        int freq = 0;
                        if (i == review.rate) {
                            freq = 1;
                        }
                        builder.field("star" + i, freq);
                    }

                    builder.field("created_time", item.createdTime);
                    builder.endObject();

                    IndexRequest indexRequest = new IndexRequest(indexName, docType, item.id)
                            .source(builder);

                    UpdateRequest updateRequest = new UpdateRequest(indexName, docType, item.id)
                            .script(new Script("ctx._source.star" + (int)review.rate + " += 1"))
                            .upsert(indexRequest);

                    connection.getProcessor().add(updateRequest);
                }
            }
            
            _collector.emit(tuple, new Values(docId, doc, reviews));
            _collector.ack(tuple);

        } catch (Exception e) {
            LOG.error("Error sending log tuple to ES", e);
            // do not send to status stream so that it gets replayed
            _collector.fail(tuple);
        }
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("docId", "doc", "nlp_reviews"));
	}
}