package com.uet.nlp.common.item;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.apache.commons.codec.digest.DigestUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Item {
    public String domainType;

    @JsonProperty("domain")
    public String domain;

    @JsonProperty("url")
    public String url;

    public String crawlTime;
    
    // calculated fields
    public String id;
    public String itemType;
    public long createdTime;

    public Item() {
        createdTime = System.currentTimeMillis();
    }

    public void normalize() {

    }

    public void generateId(String uniqueString) {
        id = DigestUtils.sha256Hex(uniqueString);
    }

    @JsonProperty("domainType")
    public String _getDomainType() {
        return this.domainType;
    }

    @JsonProperty("crawlTime")
    public String _getCrawlTimes() {
        return this.crawlTime;
    }

    // setters
    @JsonProperty("domain_type")
    public void _setDomainTypes(String v) {
        this.domainType = v;
    }

    @JsonProperty("created_time")
    public void _setCrawlTimes(String v) {
        this.crawlTime = v;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Item) {
            return ((Item) obj).id == id;
        }
        return false;
    }
}