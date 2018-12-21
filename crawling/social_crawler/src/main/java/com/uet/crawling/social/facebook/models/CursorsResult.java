package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

public class CursorsResult {

    @Facebook
    private String before;

    @Facebook
    private String after;

    public String getBefore() {
        return before;
    }

    public void setBefore(String before) {
        this.before = before;
    }

    public String getAfter() {
        return after;
    }

    public void setAfter(String after) {
        this.after = after;
    }
}
