package com.digitalpebble.stormcrawler.mongodb.services;

import com.digitalpebble.stormcrawler.mongodb.models.JsRenderEntity;

public class JsRenderService extends BaseService{

    public static JsRenderEntity getDataByHost(String hostname){
        return datastore.createQuery(JsRenderEntity.class).field("hostname").equal(hostname).get();
    }

}