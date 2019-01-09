package com.uet.crawling.social.facebook.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.Comment;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.facebook.ResultService;
import com.uet.crawling.social.facebook.models.GetCommentsResult;

import org.slf4j.LoggerFactory;

public class GetComments extends ResultService{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(GetComments.class);

    @Override
    public void getResult(FacebookClient client, String node, 
        Metadata md, ArrayList<Metadata> listMdResult) {
        if(client != null){
            GetCommentsResult getCommentsResult = client.fetchObject(node + "/comments", 
                GetCommentsResult.class,
                Parameter.with("limit", limit)
            );
            List<Comment> comments = getCommentsResult.getData();
            if(comments.isEmpty() && getCommentsResult.getError() != null){
                md.setValue("error", getCommentsResult.getError().getCode().toString());
                return;
            }
            md.setValue("shouldIndex", Boolean.toString(index));
            md.setValue("shouldStatus", Boolean.toString(indexStatus));
            for (Comment comment: comments) {
                // LOG.info("ID comment: {}, Message: {}", comment.getId(), comment.getMessage());
                Metadata mdChild = new Metadata();
                mdChild.addValue("node", comment.getId());
                mdChild.addValue("type", typeBuildToIndex);
                mdChild.setValue("typeToStatus", typeBuildToStatus);
                mdChild.addValue("parent_node", node);
                // mdChild.setValue("parent_type", typeResult);
                mdChild.addValue("message", comment.getMessage());
                // can them cac truong
                listMdResult.add(mdChild);
            }
        }
    }

    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filterParams) {
        JsonNode node = filterParams.get("typeResult");
        if (node != null && node.isTextual()) {
            typeResult = node.asText();
        }
        node = filterParams.get("typeBuildToIndex");
        if (node != null && node.isTextual()) {
            typeBuildToIndex = node.asText();
        }
        node = filterParams.get("typeBuildToStatus");
        if (node != null && node.isTextual()) {
            typeBuildToStatus = node.asText();
        }
        node = filterParams.get("limit");
        if (node != null && node.isInt()) {
            limit = node.asInt();
        }
        node = filterParams.get("index");
        if (node != null && node.isBoolean()) {
            index = node.asBoolean();
        }
        node = filterParams.get("indexStatus");
        if (node != null && node.isBoolean()) {
            indexStatus = node.asBoolean();
        }
    }

}
