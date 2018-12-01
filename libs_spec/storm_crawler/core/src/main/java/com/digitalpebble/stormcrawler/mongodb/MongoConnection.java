package com.digitalpebble.stormcrawler.mongodb;

import com.mongodb.*;
import org.slf4j.LoggerFactory;
import xyz.morphia.Datastore;
import xyz.morphia.Morphia;


public class MongoConnection {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(MongoConnection.class);

    private static MongoClient mongoClient = null;

    private static Datastore dataStore = null;

    private static Morphia morphia = null;

    private static final String dbName = "test";

    private static final String url = "mongodb://localhost:27017/";

    private static final String mapPackage = "com.digitalpebble.stormcrawler.mongodb.models";

    private MongoConnection() {}

    public static synchronized MongoClient getMongo() throws RuntimeException {
        if (mongoClient == null) {
            LOG.info("Starting Mongo");
            String urlDB = url + dbName;

//            MongoClientOptions.Builder options = MongoClientOptions.builder()
//                    .connectionsPerHost(4)
//                    .maxConnectionIdleTime((60 * 1000))
//                    .maxConnectionLifeTime((120 * 1000));

//            MongoClientURI uri = new MongoClientURI(urlDB, options);

            MongoClientURI uri = new MongoClientURI(urlDB);

            LOG.info("About to connect to MongoDB: {}", uri.toString());

            try {
                mongoClient = new MongoClient(uri);
                //mongoClient.setWriteConcern(WriteConcern.ACKNOWLEDGED);
            } catch (MongoException ex) {
                LOG.error("An error occoured when connecting to MongoDB: {}", ex);
            }

            // To be able to wait for confirmation after writing on the DB
            //mongoClient.setWriteConcern(WriteConcern.ACKNOWLEDGED);

        }
        return mongoClient;
    }

    public static synchronized Morphia getMorphia() {
        if (morphia == null) {
            LOG.info("Starting Morphia");
            morphia = new Morphia();
            LOG.info("Mapping packages from: {}", mapPackage);
            morphia.mapPackage(mapPackage);
        }

        return morphia;
    }

    public static synchronized Datastore getDatastore() {
        if (dataStore == null && mongoClient != null && morphia != null) {
            LOG.info("Starting DataStore on DB: {}", dbName);
            dataStore = getMorphia().createDatastore(getMongo(), dbName);
        }
        return dataStore;
    }

    public static synchronized void init() {
        LOG.info("Bootstraping");
        getMongo();
        getMorphia();
        getDatastore();
    }

    public static synchronized void close() {
        LOG.info("Closing MongoDB connection");
        if (mongoClient != null) {
            try {
                mongoClient.close();
                LOG.info("Nulling the connection dependency objects");
                mongoClient = null;
                morphia = null;
                dataStore = null;
            } catch (Exception e) {
                LOG.error("An error occurred when closing the MongoDB connection: {}", e);
            }
        } else {
            LOG.error("mongo object was null, wouldn't close connection");
        }
    }

}

