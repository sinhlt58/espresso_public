package com.digitalpebble.stormcrawler.mongodb.models;

import xyz.morphia.annotations.Entity;

@Entity("legalUrl")
public class LegalUrlEntity extends BaseEntity {

    private String scope;
    private String patterns;

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getPatterns() {
        return patterns;
    }

    public void setPatterns(String patterns) {
        this.patterns = patterns;
    }

}
