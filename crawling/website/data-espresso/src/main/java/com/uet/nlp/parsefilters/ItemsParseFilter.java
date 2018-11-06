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

    private static final Logger LOG = LoggerFactory
            .getLogger(ItemsParseFilter.class);

    private final Map<String, ArrayList<String>> selectorsChildrentMap = new HashMap<>();
    private Map<String, ArrayList<String>> selectorItemsMap = new HashMap<>();

    @Override
    public void filter(String URL, byte[] content, DocumentFragment doc, ParseResult parse) {
        ParseData parseData = parse.get(URL);
        Metadata metadata = parseData.getMetadata();
        String html = metadata.getFirstValue("html");
        try {
            Document docJsoup = Jsoup.parse(html);
            Iterator<Entry<String, ArrayList<String>>> iterItems = selectorItemsMap.entrySet().iterator();
            Entry<String, ArrayList<String>> selectorItemsEntry = iterItems.next();
//            LOG.info("selectorItemsEntry: {}", selectorItemsEntry.getValue());


            // Bat dau loc ra cac items cha
            for (String selectorItem: selectorItemsEntry.getValue()) {
//                LOG.info("@@@@@@@@@selectorItem: {}", selectorItem);
                try {
                    // Cac items cha
                    Elements elementItems = docJsoup.select(selectorItem);
                    if (elementItems != null && !elementItems.isEmpty()) {
                        ArrayList<String> objectStringArray = new ArrayList<>();
                        for (Element elementItem: elementItems) {
//                            LOG.info("@@@@@@@@@elementItem: {}", elementItem);
                            // metadata value moi key dang la string, can sua lai dang metadata neu muon dung json
                            String jsonObjectString = "{";
                            Iterator<Entry<String, ArrayList<String>>> iterChildrent = selectorsChildrentMap.entrySet().iterator();
                            while (iterChildrent.hasNext()){
                                Entry<String, ArrayList<String>> selectorChildEntry = iterChildrent.next();
                                ArrayList<String> selectorChildrent = selectorChildEntry.getValue();
                                String jsonPropertyString = "\"" + selectorChildEntry.getKey()+ "\":\"";
                                for (int i = 0; i < selectorChildrent.size(); i++) {
                                    String selectorChild = selectorChildrent.get(i);
                                    String contentChild = "";
                                    try {
                                        if (selectorChild.contains("|")){
                                            String[] arrayConcatText = selectorChild.split("|");
                                            for (int j = 0; j < arrayConcatText.length; j++) {
                                                Elements contentElements = elementItem.select(arrayConcatText[j]);
                                                if (contentElements != null && !contentElements.isEmpty()){
                                                    String tmp = contentElements.first().text();
                                                    contentChild = contentChild + " " + tmp;
                                                }
                                            }
                                        } else {
                                            Elements contentElements = elementItem.select(selectorChild);
                                            if (contentElements != null && !contentElements.isEmpty()){
                                                contentChild = contentElements.first().text();
                                            }
                                        }
                                        if(contentChild != null && !contentChild.isEmpty()){
                                            jsonPropertyString += contentChild + "\"";
                                            break;
                                        }
                                    } catch (Selector.SelectorParseException e) {
                                        LOG.error("Error evaluating selector child of items {}: {}", selectorChildEntry.getKey(), e);
                                    }
                                    LOG.info("@@@@@@@@@@contentChild: {}", contentChild);
                                }
                                if(jsonPropertyString.length() >=  selectorChildEntry.getKey().length() + 4){
                                    jsonObjectString += jsonPropertyString + ",";
                                }
                            }
                            if(jsonObjectString.length() > 1){
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
                        break;
                    }
                } catch (Selector.SelectorParseException e) {
                    LOG.error("Error evaluating selector {}: {}", selectorItemsEntry.getKey(), e);
                }
            }
        } catch (Exception error){
            LOG.error("Error filter items of: {} , error: {}", URL, error);
        }
        metadata.remove("html");
    }

    // chu y, jsoup selector se loi neu trong query co dau gach noi
//    int start = pos;
//         while (!isEmpty() && (matchesWord() || matchesAny('-', '_')))
//    pos++;
//
//    return queue.substring(start, pos);

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
        ArrayList<String> selectorList = selectorItemsMap.get(key);
        if (selectorItemsMap.size() == 0){
            selectorList = new ArrayList<>();
            selectorList.add(jsoupSelector);
            selectorItemsMap.put(key, selectorList);
        } else if (selectorList != null) {
            selectorItemsMap.put(key, selectorList);
        } else {
            selectorList = selectorsChildrentMap.get(key);
            if (selectorList == null) {
                selectorList = new ArrayList<>();
                selectorsChildrentMap.put(key, selectorList);
            }
            selectorList.add(jsoupSelector);
        }
        LOG.info("@@@@@@@@@@@@@@@@@@@@@key: {}, value: {}", key, jsoupSelector);
    }
    
}
