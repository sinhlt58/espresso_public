package com.uet.crawling.social.facebook.services;

import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.Post;
import com.uet.crawling.social.facebook.models.GetPostResult;
import org.slf4j.LoggerFactory;

public class GetPosts {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(GetPosts.class);

    public GetPostResult get(FacebookClient client, String idPage, int limit){
        if(client != null){
            GetPostResult getPostResult = client.fetchObject(idPage + "/posts", GetPostResult.class,
                    Parameter.with("limit", limit)
            );
            for (Post post: getPostResult.getData()) {
                LOG.info("ID post: {}, Message: {}", post.getId(), post.getMessage());
            }
            return getPostResult;
        } else {
            LOG.info("Null client fb");
            return null;
        }
    }
}
