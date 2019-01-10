package com.uet.crawling.social.facebook.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.Page;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.facebook.ResultService;
import com.uet.crawling.social.facebook.models.SearchPageResult;

import org.slf4j.LoggerFactory;


public class SearchPages extends ResultService{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(SearchPages.class);

    @Override
    public void getResult(FacebookClient client, String node, 
        Metadata md, ArrayList<Metadata> listMdResult) {
        if(client != null){
            SearchPageResult searchPageResult = client.fetchObject("pages/search", 
                SearchPageResult.class,
                Parameter.with("q", node),
                Parameter.with("limit", limit)
            );
            List<Page> pages = searchPageResult.getData();
            // if((pages == null || pages.isEmpty()) && searchPageResult.getError() != null){
            if(pages.isEmpty() && searchPageResult.getError() != null){
                md.setValue("error", searchPageResult.getError().getCode().toString());
                return;
            }
            md.setValue("shouldIndex", Boolean.toString(index));
            md.setValue("shouldStatus", Boolean.toString(indexStatus));
            for (Page page: pages) {
                // LOG.info("ID page: {}, Name page: {}", 
                //     page.getId(), page.getName());
                Metadata mdChild = new Metadata();
                mdChild.setValue("node", page.getId());
                mdChild.setValue("type", typeBuildToIndex);
                mdChild.setValue("typeToStatus", typeBuildToStatus);
                mdChild.setValue("parent_node", node);
                // mdChild.setValue("parent_type", typeResult);
                mdChild.setValue("name_page", page.getName());
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
