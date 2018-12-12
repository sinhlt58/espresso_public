package com.uet.crawling.social.facebook;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import org.slf4j.LoggerFactory;

public class FBClient {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(FBClient.class);

    private String access_token;

    private FacebookClient client = null;

    public FBClient(String access_token){
        this.access_token = access_token;
        LOG.info("Starting init FB Client");
        client = new DefaultFacebookClient(access_token, Version.LATEST);
    }

    public FacebookClient getClient(){
        return client;
    }

    public void logToken(){
        LOG.info("Token: {}", access_token);
    }
}

