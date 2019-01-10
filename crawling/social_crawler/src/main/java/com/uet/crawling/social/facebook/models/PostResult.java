package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

public class PostResult {

    @Facebook
    private String created_time;

    @Facebook
    private String message;

    @Facebook
    private String story;

    @Facebook
    private String id;

    public String getCreated_time() {
        return created_time;
    }

    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}