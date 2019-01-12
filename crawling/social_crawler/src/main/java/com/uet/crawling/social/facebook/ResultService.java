
package com.uet.crawling.social.facebook;

import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.restfb.FacebookClient;
import com.restfb.json.JsonArray;
import com.restfb.json.JsonValue;
import com.restfb.json.JsonObject.Member;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.Configurable;

public abstract class ResultService implements Configurable {

    protected int limit = 10;

    protected String typeResult = "get";

    protected String typeBuildToIndex = "get";

    protected String typesBuildToStatus = "get";

    protected boolean index = false;

    protected boolean indexStatus = false;

    protected String fields = "id";

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
    
    // public void getResultDefault(FacebookClient client,
    //         Metadata md, ArrayList<Metadata> listMdResult, Class class) {

    //     final org.slf4j.Logger LOG = LoggerFactory
    //             .getLogger(SearchPages.class);

    //     try {
    //         String nodeId = md.getFirstValue("node_id");
    //         Metadata mdChild = new Metadata();

    //         JsonObject jsonDetail = client.fetchObject(nodeId, 
    //             JsonObject.class,
    //             Parameter.with("fields",fields)
    //         );
        
    //         addKeys("", jsonDetail, mdChild);
            
    //         md.setValue("shouldIndex", Boolean.toString(index));
    //         md.setValue("shouldStatus", Boolean.toString(indexStatus));

    //         mdChild.setValue("node", nodeId);
    //         mdChild.setValue("node_id", nodeId);
    //         mdChild.setValue("type", typeBuildToIndex);
    //         mdChild.setValue("typesToStatus", typesBuildToStatus);
    //         mdChild.setValue("parent_node_id", md.getFirstValue("parent_node_id"));
                
    //         listMdResult.add(mdChild);

    //     } catch (FacebookGraphException e) {
    //         md.setValue("error", e.getErrorCode().toString());
    //         LOG.error("Error", e);
    //         md.remove("shouldIndex");
    //         md.remove("shouldStatus");
    //     } catch (NullPointerException e){
    //         LOG.error("Error", e);
    //         LOG.error("FaceBook client is null");
    //     }
    // }


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
    }

}