package com.uet.nlp.parsefilters;

import java.util.*;
import java.util.Map.Entry;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.jsoup.select.Selector;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;

import com.digitalpebble.stormcrawler.Metadata;
import com.digitalpebble.stormcrawler.parse.ParseData;
import com.digitalpebble.stormcrawler.parse.ParseFilter;
import com.digitalpebble.stormcrawler.parse.ParseResult;
import com.fasterxml.jackson.databind.JsonNode;
import org.w3c.dom.DocumentFragment;

public class ItemsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(ItemsParseFilter.class);

    private final Map<String, String> selectorChildrentMap = new HashMap<>();
    private Map<String, String> selectorItemsMap = new HashMap<>();

    @Override
    public void filter(String URL, byte[] content, DocumentFragment doc, ParseResult parse) {
        ParseData parseData = parse.get(URL);
        Metadata metadata = parseData.getMetadata();
        String html = metadata.getFirstValue("html");
        Entry<String, String> selectorItemsEntry = selectorItemsMap.entrySet().iterator().next();

        try {
            Document docJsoup = Jsoup.parse(html);
//            LOG.info("selectorItemsEntry: {}", selectorItemsEntry.getValue());
            Elements elementItems = docJsoup.select(selectorItemsEntry.getValue());

            if (elementItems != null && !elementItems.isEmpty()) {

                ArrayList<String> objectStringArray = new ArrayList<>();

                for (Element elementItem: elementItems) {

                    LOG.info("@@@@@@@@@elementItem: {}", elementItem);
                    // metadata value moi key dang la string, can sua lai dang metadata neu muon dung json
                    String jsonObjectString = "{";
                    int initLengthOfObject = jsonObjectString.length();
                    Iterator<Entry<String, String>> iterSelectorChildrentMap = selectorChildrentMap.entrySet().iterator();

                    while (iterSelectorChildrentMap.hasNext()){

                        Entry<String, String> selectorChildrentEntry = iterSelectorChildrentMap.next();
                        String jsonPropertyString = "\"" + selectorChildrentEntry.getKey()+ "\":\"";
                        int initLengthOfProperty = jsonPropertyString.length();
                        String selectorChildrent = selectorChildrentEntry.getValue();
                        String contentChild = "";
                        LOG.info("@@@@@@@@@selectorChildrent: {}", selectorChildrent);

                        try {

                            if (selectorChildrent.contains("&")){
                                String[] selectorChildrentArray = selectorChildrent.split(",");
                                for (int j = 0; j < selectorChildrentArray.length; j++) {
                                    if(selectorChildrentArray[j].contains("&")){
                                        String[] concatSelectors = selectorChildrentArray[j].split("&");
                                        for (String concatSelector: concatSelectors) {
                                            contentChild = getContentChild(concatSelector, " ", contentChild, elementItem);
                                        }
                                        if (contentChild != null || contentChild.length() > 0){
                                            break;
                                        } else {
                                            selectorChildrent = String.join(",", removeIndexInArray(selectorChildrentArray, j));
                                            contentChild = getContentChild(selectorChildrent, "", contentChild, elementItem);
                                        }
                                    }
                                }
                            } else {
                                contentChild = getContentChild(selectorChildrent, "", contentChild, elementItem);
                            }

                            contentChild = contentChild.trim().replaceAll("\\s{2,}", " ");

                            if(contentChild != null && !contentChild.isEmpty()) {
                                jsonPropertyString += contentChild + "\"";
                            }

                        } catch (Selector.SelectorParseException e) {
                            LOG.error("Error evaluating selector child of items {}: {}", selectorChildrentEntry.getKey(), e);
                        }

                        LOG.info("@@@@@@@@@@contentChild: {}", contentChild);
                        if(jsonPropertyString.length() >  initLengthOfProperty){
                            jsonObjectString += jsonPropertyString + ",";
                        }
                    }

                    if(jsonObjectString.length() > initLengthOfObject){
                        jsonObjectString = jsonObjectString.substring(0, jsonObjectString.length()-1);
                        jsonObjectString += "}";
                        LOG.info("@@@@@@@@@String Object Json: {}", jsonObjectString);
                        objectStringArray.add(jsonObjectString);
                    }

                }

                if(objectStringArray.size() > 0){
                    LOG.info("Array String Object Json: {}", objectStringArray);
                    metadata.addValues(selectorItemsEntry.getKey(), objectStringArray);
                }

            }
        } catch (Selector.SelectorParseException e) {
            LOG.error("Error evaluating selector {}: {}", selectorItemsEntry.getKey(), e);
        } catch (Exception error){
            LOG.error("Error filter items of: {} , error: {}", URL, error);
        }
        metadata.remove("html");
    }

    private String[] removeIndexInArray(String[] array, int index){
        String [] newArray = new String[array.length];
        System.arraycopy(array, 0, newArray, 0, index);
        System.arraycopy(array, index+1, newArray, index, array.length-index-1);
        return newArray;
    }

    private String getContentChild(String selectorChildrent, String text, String contentChild, Element elementItem){
        Elements contentElements = elementItem.select(selectorChildrent);
        if (contentElements != null && !contentElements.isEmpty()){
            contentChild += text + contentElements.first().text();
        }
        return contentChild;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filterParams) {
        
        Iterator<Entry<String, JsonNode>> iter = filterParams.fields();
        while (iter.hasNext()) {
            Entry<String, JsonNode> entry = iter.next();
            String key = entry.getKey();
            JsonNode node = entry.getValue();
            if (node.isArray()) {
                for (JsonNode selector : node) {
                    addSelector(key, selector);
                }
            }
            else if (node.isObject()) {
                Iterator<Entry<String, JsonNode>> iterNode = node.fields();
                while (iterNode.hasNext()) {
                    Entry<String, JsonNode> entryNode = iterNode.next();
                    JsonNode childNode = entryNode.getValue();
                    if (childNode.isArray()) {
                        for (JsonNode selector : childNode) {
                            addSelector(key, selector);
                        }
                    } else {
                        addSelector(key, childNode);
                    }
                }
            }
            else {
                addSelector(key, entry.getValue());
            }
        }
    }

    private void addSelector(String key, JsonNode selector) {
        String jsoupSelector = selector.asText();
        if (jsoupSelector != null && jsoupSelector.length() > 0){
            String selectorList = selectorItemsMap.get(key);
            if (selectorItemsMap.size() == 0){
                selectorItemsMap.put(key, jsoupSelector);
            } else if (selectorList != null) {
                selectorList += ", " + jsoupSelector;
                selectorItemsMap.replace(key, selectorList);
            } else {
                selectorList = selectorChildrentMap.get(key);
                if (selectorList == null) {
                    selectorChildrentMap.put(key, jsoupSelector);
                } else {
                    selectorList += ", " + jsoupSelector;
                    selectorChildrentMap.replace(key, selectorList);
                }
            }
        }
        LOG.info("@@@@@@@@@@@@@@@@@@@@@key: {}, value: {}", key, jsoupSelector);
    }
    
}
