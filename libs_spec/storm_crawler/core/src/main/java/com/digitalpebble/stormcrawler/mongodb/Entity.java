package com.digitalpebble.stormcrawler.mongodb;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;

public abstract class Entity {

    protected static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(MongoConnection.class);

    protected MongoCollection<Document> collection;

    protected String collectionName;

    protected ObjectMapper mapper = new ObjectMapper();

    protected ArrayList<String> filter;

    protected long timeDelay;

    protected long nextRequest;

    protected Entity(){}

    public Entity(String collectionName){
        this.collectionName = collectionName;
    }

//    public MongoCollection<Document> getCollection() throws RuntimeException {
//        try {
//            collection = MongoConnection.getDatabase().getCollection(collectionName);
//        } catch (MongoException e) {
//            LOG.error("An error occoured when get collection: {} : {}", collectionName, e);
//        }s
//        return collection;
//    }

    public ArrayList<JsonNode> toListJsonNode(Iterable<Document> iterable){
        ArrayList<JsonNode> data = new ArrayList<>();
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

//    public void setCollectionName(String collectionName) {
//        this.collectionName = collectionName;
//        this.collection = getCollection();
//    }

    public void setTimeDelay(long timeDelay) {
        this.timeDelay = timeDelay;
    }
}
