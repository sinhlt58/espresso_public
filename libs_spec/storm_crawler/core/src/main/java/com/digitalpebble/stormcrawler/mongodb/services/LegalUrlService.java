package com.digitalpebble.stormcrawler.mongodb.services;

import com.digitalpebble.stormcrawler.mongodb.models.LegalUrlEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xyz.morphia.query.Query;

import java.util.List;

public class LegalUrlService extends BaseService{

    public static final Logger LOG = LoggerFactory
            .getLogger(LegalUrlService.class);
    public static List<LegalUrlEntity> getDatasByHost(String hostname){
        Query<LegalUrlEntity> query = datastore.createQuery(LegalUrlEntity.class);

        String global = "GLOBAL";
        String domainScope = "domain:" + hostname;
        String hostScope = "host:" + hostname;
        String metadataScope = "metadata:" + hostname;
        query.or(
            query.criteria("scope").equal(global),
            query.criteria("scope").equal(domainScope),
            query.criteria("scope").equal(hostScope),
            query.criteria("scope").equal(metadataScope)
        );
        return query.asList();
    }

}
