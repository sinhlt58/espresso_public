package com.digitalpebble.stormcrawler.mongodb.collections;

import com.digitalpebble.stormcrawler.mongodb.Entity;
import com.fasterxml.jackson.databind.JsonNode;
import org.bson.Document;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Projections.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class DomainEntity extends Entity {

    public DomainEntity(String collectionName){
        this.collectionName = collectionName;
        collection = getCollection();
    }

    public ArrayList<JsonNode> getDataByHost(String host){
        ArrayList<JsonNode> data = new ArrayList<>();
        ArrayList<String> filter = new ArrayList<>(
                Arrays.asList("esname", "properties.label", "properties.rule")
        );
        Iterable<Document> iterable = collection.find(eq("host", host))
                                                .projection(excludeId())
                                                .projection(fields(include(filter)));
        for(Document cur : iterable){
            try {
                String stringCur = cur.toJson();
                JsonNode jsonCur = mapper.readTree(stringCur);
                data.add(jsonCur);
            } catch (IOException e){
                LOG.error("Can't convert data from mongodb: {}", e);
            }
        }
        return data;
    }

}
