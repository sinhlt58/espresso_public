package com.uet.nlp.common.item;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ArrayOrStringDeserializer extends JsonDeserializer<String> {
    public static ObjectMapper mapper = new ObjectMapper();

	@Override
	public String deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		try {
            JsonNode node = mapper.readValue(parser, JsonNode.class);
        
            if (node.isArray()) {
                return node.get(0).asText();
            } else if (node.isValueNode()) {
                return node.asText();
            }

            return null;
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
	}

}