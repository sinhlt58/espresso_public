package com.uet.nlp.common;

import java.util.Map;

public class Document {
    private Map<String, Object> mapDoc;

    public Document(Map<String, Object> mDoc) {
        mapDoc = mDoc;

        for (String field : mDoc.keySet()) {
            Object valuesObj = mDoc.get(field);
            System.out.println("field, class: " + field + valuesObj.getClass().toString());
        }
    }

    public Map<String, Object> getMapDoc() {
        return this.mapDoc;
    }

    // public ArrayList<String> getValues(String field) {

    // }
}