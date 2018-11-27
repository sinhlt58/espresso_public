package com.digitalpebble.stormcrawler.mongodb;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.slf4j.LoggerFactory;


public class MongoConnection {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(MongoConnection.class);

    private static MongoClient mongoClient;

    private static MongoDatabase mongoDatabase;

    private static final String dbName = "test";

    private MongoConnection() {}

    public static synchronized MongoClient getMongo() throws RuntimeException {
        if (mongoClient == null) {
            LOG.info("Starting Mongo");
            String url = "mongodb://localhost:27017";
            LOG.info("About to connect to MongoDB : {}", url);

            try {
                mongoClient = MongoClients.create(url);
            } catch (MongoException e) {
                LOG.error("An error occoured when connecting to MongoDB: {}", e);
            } catch (Exception e) {
                LOG.error("An error occoured when connecting to MongoDB: {}", e);
            }
        }
        return mongoClient;
    }

    public static MongoDatabase getDatabase() throws RuntimeException {
        if (mongoDatabase == null && mongoClient != null) {
            LOG.info("Starting Database");
            try {
                mongoDatabase = mongoClient.getDatabase(dbName);
            } catch (MongoException e) {
                LOG.error("An error occoured when get database: {} - {}", dbName, e);
            } catch (Exception e) {
                LOG.error("An error occoured when get database: {} - {}", dbName, e);
            }
        }
        return mongoDatabase;
    }

    public static synchronized void close() {
        LOG.info("Closing MongoDB connection");
        if (mongoClient != null) {
            try {
                mongoClient.close();
                LOG.info("Nulling the connection dependency objects");
                mongoClient = null;
            } catch (Exception e) {
                LOG.error("An error occurred when closing the MongoDB connection: {}", e);
            }
        } else {
            LOG.error("mongo object was null, wouldn't close connection");
        }
    }

}

