package com.uet.nlp.common.item;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.apache.commons.codec.digest.DigestUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Item {    
    // calculated fields
    public String id;
    public double createdTime;

    public Item() {
        createdTime = System.currentTimeMillis();
    }

    public void normalize() {

    }

    public void generateId(String uniqueString) {
        id = DigestUtils.sha256Hex(uniqueString);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Item) {
            return ((Item) obj).id == id;
        }
        return false;
    }
}