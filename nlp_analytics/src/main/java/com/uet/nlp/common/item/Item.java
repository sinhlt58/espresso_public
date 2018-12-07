package com.uet.nlp.common.item;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Item {
    @JsonProperty("domain_type")
    public String domainType;

    @JsonProperty("domain")
    public String domain;

    @JsonProperty("url")
    public String url;

    @JsonProperty("created_time")
    public String crawlTime;
    
    public String id;
    public String itemType;
    public String createdTime;

    public Item() {
        id = UUID.randomUUID().toString();
    }

    public void normalize() {

    }
}