package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

public class PageResult {

    @Facebook
    private String id;

    @Facebook
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
