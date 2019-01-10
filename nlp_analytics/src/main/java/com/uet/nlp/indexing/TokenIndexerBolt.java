package com.uet.nlp.indexing;

import java.util.ArrayList;

import com.uet.nlp.common.Document;
import com.uet.nlp.common.item.Token;

import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.script.Script;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TokenIndexerBolt extends IndexerBolt {
    private static final Logger LOG = LoggerFactory
            .getLogger(TokenIndexerBolt.class);

    @Override
    public void execute(Tuple tuple) {

        try {
            String docId = (String) tuple.getValueByField("docId");
            Document doc = (Document) tuple.getValueByField("doc");
            ArrayList<Token> tokens = (ArrayList<Token>) tuple.getValueByField("tokens");

            for (Token token : tokens) {
                IndexRequest indexRequest = new IndexRequest(indexName, docType, token.id)
                        .source(jsonBuilder()
                                .startObject()
                                    .field("orth", token.orth)
                                    .field("norm", token.norm)
                                    .field("count", token.inDocCount)
                                    .field("docCount", 1)
                                .endObject());

                UpdateRequest updateRequest = new UpdateRequest(indexName, docType, token.id)
                        .script(new Script("ctx._source.docCount += 1; ctx._source.count += " + token.inDocCount))
                        .upsert(indexRequest);

                connection.getProcessor().add(updateRequest);
            }
            
            _collector.emit(tuple, new Values(docId, doc, tokens));
            _collector.ack(tuple);

        } catch (Exception e) {
            LOG.error("Error sending log tuple to ES", e);
            // do not send to status stream so that it gets replayed
            _collector.fail(tuple);
        }
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("docId", "doc", "tokens"));
	}
}