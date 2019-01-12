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
            
            addKeys("", jsonDetail, mdChild);
            
            md.setValue("shouldIndex", Boolean.toString(index));
            md.setValue("shouldStatus", Boolean.toString(indexStatus));

            mdChild.setValue("node", nodeId);
            mdChild.setValue("node_id", nodeId);
            mdChild.setValue("type", typeBuildToIndex);
            mdChild.setValue("typesToStatus", typesBuildToStatus);
            mdChild.setValue("parent_node_id", md.getFirstValue("parent_node_id"));
                
            listMdResult.add(mdChild);

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
