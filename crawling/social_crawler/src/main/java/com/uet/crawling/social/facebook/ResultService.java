
package com.uet.crawling.social.facebook;

import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.WebRequestor;
import com.restfb.DebugHeaderInfo.HeaderUsage;
import com.restfb.exception.FacebookGraphException;
import com.restfb.json.JsonArray;
import com.restfb.json.JsonObject;
import com.restfb.json.JsonValue;
import com.restfb.json.JsonObject.Member;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.Configurable;

import org.slf4j.LoggerFactory;

public abstract class ResultService implements Configurable {

    protected int limit = 10;

    protected String typeResult = "get";

    protected String typeBuildToIndex = "get";

    protected String typesBuildToStatus = "get";

    protected boolean index = false;

    protected boolean indexStatus = false;

    protected String fields = "id";

    protected int rateLimit = 80;

    public abstract void getResult(FacebookClient client, Metadata md, ArrayList<Metadata> listMdResult);

    public String getTypeResult() {
        return typeResult;
    }

    public String getTypeBuildToIndex() {
        return typeBuildToIndex;
    }

    public String getTypesBuildToStatus() {
        return typesBuildToStatus;
    }

    protected void addKeys(String currentPath, JsonValue json, Metadata mdChild) {
        if(json == null || json.isNull()){
            return;
        } else if(json.isString()){
            mdChild.addValue(currentPath, json.asString());
        } else if(json.isBoolean()){
            mdChild.addValue(currentPath, String.valueOf(json.asBoolean()));
        } else if(json.isNumber()){
            mdChild.addValue(currentPath, String.valueOf(json));
        } else if (json.isObject()) {
            String pathPrefix = currentPath.isEmpty() ? "" : currentPath + ".";
            for (Member member : json.asObject()) {
                addKeys(pathPrefix + member.getName(), member.getValue(), mdChild);
            }
        } else if (json.isArray()) {
          JsonArray arrayJson = json.asArray();
          for (int i = 0; i < arrayJson.size(); i++) {
            addKeys(currentPath, arrayJson.get(i), mdChild);
          }
        } else {
            return; 
        }
    }

    protected void checkRateLimit(FacebookClient client, Metadata md){
        WebRequestor dwr = client.getWebRequestor();
        HeaderUsage headerUsage = dwr.getDebugHeaderInfo().getAppUsage();
        if(headerUsage == null){
            headerUsage = dwr.getDebugHeaderInfo().getPageUsage();
        }
        if(headerUsage.getCallCount().intValue() > rateLimit || 
            headerUsage.getTotalCputime().intValue() > rateLimit || 
            headerUsage.getTotalTime().intValue() > rateLimit
        ){
            md.setValue("error", "4");
        }
    }

    protected void removeShould(Metadata md){
        md.remove("shouldIndex");
        md.remove("shouldStatus");
    }

    protected void setShould(Metadata md, boolean shouldIndex, boolean shouldStatus){
        md.setValue("shouldIndex", Boolean.toString(shouldIndex));
        md.setValue("shouldStatus", Boolean.toString(shouldStatus));
    }
    
    protected void setTypes(Metadata md){
        md.setValue("type", typeBuildToIndex);
        md.setValue("typesToStatus", typesBuildToStatus);
    }

    protected void setNodes(Metadata md, String node, String node_id, String parent_node_id){
        md.setValue("node", node);
        md.setValue("node_id", node_id);
        md.setValue("parent_node_id", parent_node_id);
    }

    protected void setError(FacebookGraphException e, Metadata md){
        md.setValue("error", e.getErrorCode().toString());
        removeShould(md);
    }

    public void getResultDefault(FacebookClient client,
            Metadata md, ArrayList<Metadata> listMdResult, Class nameClass) {

        try {
            final org.slf4j.Logger LOG = LoggerFactory
                .getLogger(nameClass);

            String nodeId = md.getFirstValue("node_id");
            Metadata mdChild = new Metadata();

            JsonObject jsonDetail = client.fetchObject(nodeId, 
                JsonObject.class,
                Parameter.with("fields",fields)
            );
                    
            checkRateLimit(client, md);
            
            addKeys("", jsonDetail, mdChild);
            
            setShould(md, index, indexStatus);

            setNodes(mdChild, nodeId, nodeId, md.getFirstValue("parent_node_id"));
            setTypes(mdChild);
                
            listMdResult.add(mdChild);

        } catch (FacebookGraphException e) {
            setError(e, md);
            LOG.error("Error: {}", e);
        } catch (NullPointerException e){
            LOG.error("Error: {}", e);
        }
    }


    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filterParams) {
        JsonNode node = filterParams.get("typeResult");
        if (node != null && node.isTextual()) {
            typeResult = node.asText();
        }
        node = filterParams.get("typeBuildToIndex");
        if (node != null && node.isTextual()) {
            typeBuildToIndex = node.asText();
        }
        node = filterParams.get("typesBuildToStatus");
        if (node != null && node.isTextual()) {
            typesBuildToStatus = node.asText();
        }
        node = filterParams.get("limit");
        if (node != null && node.isInt()) {
            limit = node.asInt();
        }
        node = filterParams.get("index");
        if (node != null && node.isBoolean()) {
            index = node.asBoolean();
        }
        node = filterParams.get("indexStatus");
        if (node != null && node.isBoolean()) {
            indexStatus = node.asBoolean();
        }
        node = filterParams.get("fields");
        if (node != null && node.isTextual()) {
            fields = node.asText();
        }
        node = filterParams.get("rateLimit");
        if(node != null && node.isInt()){
            int ratePercent = node.asInt();
            if(ratePercent > 0 && ratePercent < 100){
                rateLimit = ratePercent;
            }
        }
    }

}