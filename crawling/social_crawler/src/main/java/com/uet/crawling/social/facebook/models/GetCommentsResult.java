package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;
import com.restfb.types.Comment;

import java.util.List;

public class GetCommentsResult extends Result{

    @Facebook
    private List<Comment> data;

    public List<Comment> getData() {
        return data;
    }

    public void setData(List<Comment> data) {
        this.data = data;
    }

}
