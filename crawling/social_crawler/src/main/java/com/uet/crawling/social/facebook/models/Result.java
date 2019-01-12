package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;
import com.restfb.json.JsonObject;

import java.util.List;

public class Result extends AbstractResult{

    @Facebook
    private List<JsonObject> data;

    @Override
    public List<JsonObject> getData() {
        return data;
    }

    public void setData(List<JsonObject> data) {
        this.data = data;
    }

}
