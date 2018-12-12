package com.uet.crawling.social.facebook.entity;

import com.restfb.Connection;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.Page;
import org.slf4j.LoggerFactory;

import java.util.List;

public class SearchPage {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(SearchPage.class);

    Connection<Page> pages = null;
    public void search(FacebookClient client, String search, int limit){
        if(client != null){
            Connection<Page> pagesConnection = client.fetchConnection("search", Page.class,
                    Parameter.with("q", search),
                    Parameter.with("limit", limit)
            );
            for (List<Page> pages : pagesConnection) {
                for (Page page : pages) {
                    LOG.info("ID page: {}, Name: {}", page.getId(), page.getName());
                }
            }
        } else {
            LOG.info("Null client fb");
        }
    }
}
