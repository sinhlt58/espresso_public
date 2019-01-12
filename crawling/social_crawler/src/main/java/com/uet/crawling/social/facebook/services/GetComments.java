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

public class GetComments extends ResultService{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(GetComments.class);

    @Override
    public void getResult(FacebookClient client, Metadata md, ArrayList<Metadata> listMdResult) {
        try {
            String nodeId = md.getFirstValue("node_id");
            Result result = client.fetchObject(nodeId + "/comments", 
                Result.class,
                Parameter.with("limit", limit)
            );

            md.setValue("shouldIndex", Boolean.toString(index));
            md.setValue("shouldStatus", Boolean.toString(indexStatus));
            
            for (JsonObject json: result.getData()) {
                String id = json.getString("id",null);
                if(id == null){
                    md.setValue("shouldIndex", Boolean.toString(false));
                    md.setValue("shouldStatus", Boolean.toString(false));
                    return;
                }
                Metadata mdChild = new Metadata();
                mdChild.setValue("node", id);
                mdChild.setValue("node_id", id);
                mdChild.setValue("type", typeBuildToIndex);
                mdChild.setValue("typesToStatus", typesBuildToStatus);
                mdChild.setValue("parent_node_id", nodeId);
                mdChild.setValue("message", json.getString("message",null));

                listMdResult.add(mdChild);
            }
        } catch (FacebookGraphException e) {
            md.setValue("error", e.getErrorCode().toString());
            LOG.error("Error", e);
            md.remove("shouldIndex");
            md.remove("shouldStatus");
        } catch (NullPointerException e){
            LOG.error("Error", e);
            LOG.error("FaceBook client is null");
        }
    }

}
