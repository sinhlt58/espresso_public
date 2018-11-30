package com.digitalpebble.stormcrawler.mongodb.models;
//
//import com.digitalpebble.stormcrawler.mongodb.Entity;
//import com.fasterxml.jackson.databind.JsonNode;
//import org.bson.Document;
//import static com.mongodb.client.model.Filters.eq;
//import static com.mongodb.client.model.Projections.*;
//
//import java.util.*;
//
//public class DomainEntity extends Entity {
//
//    private Map<String, Long> fetchHostMap = new HashMap<>();
//
//    public DomainEntity(){
//        filter = new ArrayList<>(
//                Arrays.asList("esname", "properties.label", "properties.rule")
//        );
//    }
//
//    public DomainEntity(String collectionName, long timeDelay){
//        setCollectionName(collectionName);
//        setTimeDelay(timeDelay);
//        filter = new ArrayList<>(
//                Arrays.asList("esname", "properties.label", "properties.rule")
//        );
//    }
//
//    public ArrayList<JsonNode> getDataByHost(String host){
//        if(checkHost(host)){
//            Iterable<Document> iterable = collection.find(eq("host", host))
//                    .projection(excludeId())
//                    .projection(fields(include(filter)));
//            return toListJsonNode(iterable);
//        }
//        return null;
//    }
//
//    public ArrayList<JsonNode>
//
//    private boolean checkHost(String host){
//        long currentTime = System.currentTimeMillis();
//        if(fetchHostMap.get(host) == null){
//            fetchHostMap.put(host, currentTime + timeDelay);
//            return true;
//        } else{
//            return (currentTime < fetchHostMap.get(host));
//        }
//    }
//
//
//
//}

import com.digitalpebble.stormcrawler.mongodb.BaseEntity;
import com.digitalpebble.stormcrawler.mongodb.MongoConnection;
import com.digitalpebble.stormcrawler.mongodb.models.Rules;
import xyz.morphia.annotations.Embedded;
import xyz.morphia.annotations.Entity;
import xyz.morphia.query.Query;

import java.util.ArrayList;
import java.util.List;

@Entity("domain")
public class DomainEntity extends BaseEntity {

    private String name;
    private String host;
    private String esname;

    @Embedded
    private ArrayList<Rules> properties = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getEsname() {
        return esname;
    }

    public void setEsname(String esname) {
        this.esname = esname;
    }

    public ArrayList<Rules> getProperties() {
        return properties;
    }

    public void setProperties(ArrayList<Rules> properties) {
        this.properties = properties;
    }

}
