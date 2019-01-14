package com.uet.crawling.social.facebook.services;

import java.util.ArrayList;

import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.exception.FacebookGraphException;
import com.restfb.json.JsonObject;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.facebook.ResultService;
import com.uet.crawling.social.facebook.models.Result;

import org.slf4j.LoggerFactory;


public class SearchPages extends ResultService{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(SearchPages.class);

    @Override
    public void getResult(FacebookClient client, Metadata md, ArrayList<Metadata> listMdResult) {
        try {
            String nodeId = md.getFirstValue("node_id");
            Result result = client.fetchObject("pages/search", 
                Result.class,
                Parameter.with("q", nodeId),
                Parameter.with("limit", limit)
            );

            checkRateLimit(client, md);
        
            setShould(md, index, indexStatus);

            for (JsonObject json: result.getData()) {
                String id = json.getString("id",null);
                
                if(id == null){
                    setShould(md, false, false);
                    return;
                }

                Metadata mdChild = new Metadata();
                setNodes(mdChild, id, id, nodeId);
                setTypes(mdChild);
                mdChild.setValue("name_page", json.getString("name",null));

                listMdResult.add(mdChild);
            }
        } catch (FacebookGraphException e) {
            setError(e, md);
            LOG.error("Error: {}", e);
        } catch (NullPointerException e){
            LOG.error("Error: {}", e);
        }
    }
}
