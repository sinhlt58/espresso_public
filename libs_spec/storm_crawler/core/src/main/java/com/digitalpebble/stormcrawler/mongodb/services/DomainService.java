package com.digitalpebble.stormcrawler.mongodb.services;

import com.digitalpebble.stormcrawler.mongodb.models.DomainEntity;

import java.util.List;

public class DomainService extends BaseService{

    public static List<DomainEntity> getDatasByHost(String hostname){
        return datastore.createQuery(DomainEntity.class).field("hostname").equal(hostname).asList();
    }

}
