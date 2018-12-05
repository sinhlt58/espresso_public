package com.digitalpebble.stormcrawler.mongodb.models;

import xyz.morphia.annotations.Entity;

import java.util.ArrayList;

@Entity("legalUrl")
public class LegalUrlEntity extends BaseEntity {

    private String scope;
    private ArrayList<String> patterns;

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public ArrayList<String> getPatterns() {
        return patterns;
    }

    public void setPatterns(ArrayList<String>  patterns) {
        this.patterns = patterns;
    }

}
