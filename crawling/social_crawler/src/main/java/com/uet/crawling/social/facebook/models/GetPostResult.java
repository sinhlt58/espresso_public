package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;
import com.restfb.types.Post;

import java.util.List;

public class GetPostResult extends Result{

    @Facebook
    private List<Post> data;

    public List<Post> getData() {
        return data;
    }

    public void setData(List<Post> data) {
        this.data = data;
    }


}
