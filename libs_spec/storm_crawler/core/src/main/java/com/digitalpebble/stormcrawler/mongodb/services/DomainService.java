package com.digitalpebble.stormcrawler.mongodb.services;

import com.digitalpebble.stormcrawler.mongodb.MongoConnection;
import com.digitalpebble.stormcrawler.mongodb.models.DomainEntity;
import xyz.morphia.query.Query;

import java.util.List;

public class DomainService {

    public static List<DomainEntity> getRulesByHost(String host){
        final Query<DomainEntity> query = MongoConnection.getDatastore().createQuery(DomainEntity.class);
        final List<DomainEntity> domainEntities = query.field("host").equal(host).asList();
        return domainEntities;
    }

}
