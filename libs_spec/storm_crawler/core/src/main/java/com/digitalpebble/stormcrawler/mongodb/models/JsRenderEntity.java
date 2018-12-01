package com.digitalpebble.stormcrawler.mongodb.models;

import xyz.morphia.annotations.Entity;

@Entity("jsRender")
public class JsRenderEntity extends BaseEntity {

    private String hostname;
    private String scopes;

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getScopes() {
        return scopes;
    }

    public void setScopes(String scopes) {
        this.scopes = scopes;
    }
}
