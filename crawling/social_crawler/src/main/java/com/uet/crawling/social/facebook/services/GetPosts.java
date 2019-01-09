package com.uet.crawling.social.facebook.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.Post;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.facebook.ResultService;
import com.uet.crawling.social.facebook.models.GetPostResult;

import org.slf4j.LoggerFactory;

public class GetPosts extends ResultService{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(GetPosts.class);

    @Override
    public void getResult(FacebookClient client, String node, 
        Metadata md, ArrayList<Metadata> listMdResult) {
        if(client != null){
            GetPostResult getPostResult = client.fetchObject(node + "/posts", 
                GetPostResult.class,
                Parameter.with("limit", limit)
            );
            List<Post> posts = getPostResult.getData();
            if(posts.isEmpty() && getPostResult.getError() != null){
                md.setValue("error", getPostResult.getError().getCode().toString());
                return;
            }
            md.setValue("shouldIndex", Boolean.toString(index));
            md.setValue("shouldStatus", Boolean.toString(indexStatus));
            for (Post post: posts) {
                // LOG.info("ID post: {}, Message: {}", post.getId(), post.getMessage());
                Metadata mdChild = new Metadata();
                mdChild.setValue("node", post.getId());
                mdChild.setValue("type", typeBuildToIndex);
                mdChild.setValue("typeToStatus", typeBuildToStatus);
                mdChild.setValue("parent_node", node);
                // mdChild.setValue("parent_type", typeResult);
                mdChild.setValue("message", post.getMessage());
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
