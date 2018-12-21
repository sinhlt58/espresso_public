package com.uet.crawling.social.facebook.services;

import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.uet.crawling.social.facebook.models.PageResult;
import com.uet.crawling.social.facebook.models.SearchPageResult;
import org.slf4j.LoggerFactory;


public class SearchPages {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(SearchPages.class);

    public SearchPageResult search(FacebookClient client, String search, int limit){
        if(client != null){
            SearchPageResult searchPageResult = client.fetchObject("pages/search", SearchPageResult.class,
                    Parameter.with("q", search),
                    Parameter.with("limit", limit)
            );
            for (PageResult pageResult: searchPageResult.getData()) {
                LOG.info("ID page: {}, Name page: {}", pageResult.getId(), pageResult.getName());
            }
            return searchPageResult;
        } else {
            LOG.info("Null client fb");
            return null;
        }
    }
}
