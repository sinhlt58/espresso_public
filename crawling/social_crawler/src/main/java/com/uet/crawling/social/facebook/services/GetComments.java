package com.uet.crawling.social.facebook.services;

import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.Comment;
import com.uet.crawling.social.facebook.models.GetCommentsResult;
import org.slf4j.LoggerFactory;

public class GetComments {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(GetComments.class);

    public GetCommentsResult get(FacebookClient client, String idPost, int limit){
        if(client != null){
            GetCommentsResult getCommentsResult = client.fetchObject(idPost + "/comments", GetCommentsResult.class,
                    Parameter.with("limit", limit)
            );
            for (Comment comment: getCommentsResult.getData()) {
                LOG.info("ID comment: {}, Message: {}", comment.getId(), comment.getMessage());
            }
            return getCommentsResult;
        } else {
            LOG.info("Null client fb");
            return null;
        }
    }

}
