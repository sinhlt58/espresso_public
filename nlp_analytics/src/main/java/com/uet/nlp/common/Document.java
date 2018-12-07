package com.uet.nlp.common;

import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Document {
    public JsonNode jsonDoc;
    public static ObjectMapper mapper = new ObjectMapper();

    public Document(Map<String, Object> mDoc) {
        jsonDoc = mapper.valueToTree(mDoc);
    }

    public JsonNode getJsonDoc() {
        return this.jsonDoc;
    }
}