
package com.uet.crawling.social.bolt;

import java.util.ArrayList;

import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Constants;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.persistence.Status;
import com.uet.crawling.social.util.Builders;

public class NodesDiscoverBolt extends StatusEmitterBolt {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(NodesDiscoverBolt.class);

    @Override
    public void execute(Tuple tuple) {
        Metadata metadata = (Metadata) tuple.getValueByField("metadata");
        ArrayList<Metadata> listMdResult = (ArrayList<Metadata>) tuple.getValueByField("listMdResult");

        try {

            if("true".equals(metadata.getFirstValue("shouldStatus"))){
                for(Metadata md: listMdResult){

                    String node = md.getFirstValue("node");
                    String parent_node_id = md.getFirstValue("parent_node_id");
                    String node_id = md.getFirstValue("node_id");

                    String[] types =  md.getFirstValue("typesToStatus").split(",");

                    for (String type : types) {

                        Metadata mdChild = new Metadata();
                        mdChild.setValue("parent_node_id", parent_node_id);
                        mdChild.setValue("node_id", node_id);
                        mdChild.setValue("type",type);

                        String nodeChild = Builders.buildNode(node, type);

                        collector.emit(Constants.StatusStreamName, tuple, 
                            new Values(nodeChild, mdChild, Status.DISCOVERED));
                        // collector.ack(tuple);
                    }
                }
            }

            // can da luong cho nay
            if("true".equals(metadata.getFirstValue("shouldIndex"))){
                collector.emit(tuple, tuple.getValues());
                // collector.ack(tuple);
            }
        } catch (Exception e) {
            LOG.info("Error: {}", e);
            // collector.ack(tuple);
        } finally{
            collector.ack(tuple);
        }
        
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        super.declareOutputFields(declarer);
        declarer.declare(new Fields("node", "metadata", "listMdResult"));
    }

}
