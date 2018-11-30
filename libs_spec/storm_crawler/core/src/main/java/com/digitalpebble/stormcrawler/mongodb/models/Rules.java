package com.digitalpebble.stormcrawler.mongodb.models;

import xyz.morphia.annotations.Embedded;

@Embedded
public class Rules {

    private String label;
    private String rule;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }
}