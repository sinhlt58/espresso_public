package com.uet.crawling.social.facebook.services;

import java.util.ArrayList;

import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.exception.FacebookGraphException;
import com.restfb.json.JsonObject;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.facebook.ResultService;

import org.slf4j.LoggerFactory;


public class GetPageDetail extends ResultService{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(GetPageDetail.class);

    @Override
    public void getResult(FacebookClient client, Metadata md, ArrayList<Metadata> listMdResult) {
        try {
            String nodeId = md.getFirstValue("node_id");
            Metadata mdChild = new Metadata();

            JsonObject jsonDetail = client.fetchObject(nodeId, 
                JsonObject.class,
                Parameter.with("fields",fields)
            );
                   
            checkRateLimit(client, md);
            
            addKeys("", jsonDetail, mdChild);
            
            setShould(md, index, indexStatus);

            setNodes(mdChild, nodeId, nodeId, md.getFirstValue("parent_node_id"));
            setTypes(mdChild);
                
            listMdResult.add(mdChild);

        } catch (FacebookGraphException e) {
            setError(e, md);
            LOG.error("Error: {}", e);
        } catch (NullPointerException e){
            LOG.error("Error: {}", e);
        }
    }
}
