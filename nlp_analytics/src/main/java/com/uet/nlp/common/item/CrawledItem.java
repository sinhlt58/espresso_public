package com.uet.nlp.common.item;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CrawledItem extends Item {
    public String domainType;

    @JsonProperty("domain")
    public String domain;

    @JsonProperty("url")
    public String url;

    public double crawlTime;
    
    // calculated fields
    public String itemType;

    public CrawledItem() {
    }

    @JsonProperty("domainType")
    public String _getDomainType() {
        return this.domainType;
    }

    @JsonProperty("crawlTime")
    public double _getCrawlTimes() {
        return this.crawlTime;
    }

    // setters
    @JsonProperty("domain_type")
    public void _setDomainTypes(String v) {
        this.domainType = v;
    }

    @JsonProperty("created_time")
    public void _setCrawlTimes(String v) {
        this.crawlTime = Double.parseDouble(v);
    }
}