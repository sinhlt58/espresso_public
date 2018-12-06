package com.digitalpebble.stormcrawler.mongodb.services;

import com.digitalpebble.stormcrawler.mongodb.MongoConnection;
import xyz.morphia.Datastore;

public abstract class BaseService {
    protected static Datastore datastore = MongoConnection.getDatastore();
}
