package com.digitalpebble.stormcrawler.mongodb;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.slf4j.LoggerFactory;

public abstract class Entity {

    protected static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(MongoConnection.class);

    protected MongoCollection<Document> collection;

    protected String collectionName;

    protected ObjectMapper mapper = new ObjectMapper();

    protected Entity(){}

    public Entity(String collectionName){
        this.collectionName = collectionName;
    }

    public MongoCollection<Document> getCollection() throws RuntimeException {
        try {
            collection = MongoConnection.getDatabase().getCollection(collectionName);
        } catch (MongoException e) {
            LOG.error("An error occoured when get collection: {} : {}", collectionName, e);
        }
        return collection;
    }

}
