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
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.elasticsearch.common.xcontent.XContentBuilder;

public class FieldsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(FieldsParseFilter.class);

    private final Map<String, Map<String, String>> fieldMap = new HashMap<>();

    @Override
    public void filter(String URL, byte[] content, DocumentFragment doc, ParseResult parse) {
        ParseData parseData = parse.get(URL);
        Metadata metadata = parseData.getMetadata();
        String html = metadata.getFirstValue("html");
        try {
            Document docJsoup = Jsoup.parse(html);
            XContentBuilder builder = jsonBuilder().startObject();
            for (String keyField : fieldMap.keySet()){

                ArrayList<Map<String, String>> objectBuilderArray = new ArrayList<>();
                Map<String, String> seletorsMap = fieldMap.get(keyField);
                try{
                    Map<String, String> objectBuilder = new HashMap<>();
                    for (String selectorsKey: seletorsMap.keySet()) {
                        String selector = seletorsMap.get(selectorsKey);
                        String contentChild = "";
                        try {
                            contentChild = getContentChild(selector, docJsoup);
                        } catch (Selector.SelectorParseException e) {
                            LOG.error("Error evaluating selector: {}", selector);
                        }
                        if(contentChild != null && contentChild.length() > 0){
                            objectBuilder.put(selectorsKey, contentChild);
                        }
                    }
                    if(!objectBuilder.keySet().isEmpty()){
                        objectBuilderArray.add(objectBuilder);
                    }
                } catch (Selector.SelectorParseException e) {
                    LOG.error("Error evaluating selector {}: {}", keyField, e);
                }

                if(objectBuilderArray.size() > 0){
                    builder.startArray(keyField);
                    for (Map<String, String> objectBuilder: objectBuilderArray) {
                        builder.startObject();
                        for (String key: objectBuilder.keySet()) {
                            builder.field(key, objectBuilder.get(key));
                        }
                        builder.endObject();
                    }
                    builder.endArray();
                }
            }
            metadata.setBuilder(builder);
        } catch (Exception error){
            LOG.error("Error filter element parent of: {} , error: {}", URL, error);
        }
        metadata.remove("html");
    }

    private String getContentChild(String selectorChild, Element elementParent){
        String contentChild = "";
        if (selectorChild.contains("&")){
            String[] selectorChildArray = selectorChild.split(",");
            for (int i = 0; i < selectorChildArray.length; i++) {
                if(selectorChildArray[i].contains("&")){
                    String[] concatSelectors = selectorChildArray[i].split("&");
                    for (String concatSelector: concatSelectors) {
                        contentChild = getTextContentChild(concatSelector, " ", contentChild, elementParent);
                    }
                    if (contentChild != null || contentChild.length() > 0){
                        break;
                    } else {
                        selectorChild = String.join(",", removeIndexInArray(selectorChildArray, i));
                        contentChild = getTextContentChild(selectorChild, "", contentChild, elementParent);
                    }
                }
            }
        } else {
            contentChild = getTextContentChild(selectorChild, "", contentChild, elementParent);
        }
        contentChild = contentChild.trim().replaceAll("\\s{2,}", " ");
        return contentChild;
    }

    private String[] removeIndexInArray(String[] array, int index){
        String [] newArray = new String[array.length];
        System.arraycopy(array, 0, newArray, 0, index);
        System.arraycopy(array, index+1, newArray, index, array.length-index-1);
        return newArray;
    }

    private String getTextContentChild(String selectorChildrent, String text, String contentChild, Element elementParent){
        Elements contentElements = elementParent.select(selectorChildrent);
        if (contentElements != null && !contentElements.isEmpty()){
            contentChild += text + contentElements.first().text();
        }
        return contentChild;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filterParams) {
        Iterator<Entry<String, JsonNode>> iterParams = filterParams.fields();
        while (iterParams.hasNext()) {
            Entry<String, JsonNode> fieldES = iterParams.next();
            String keyFieldES = fieldES.getKey();
            Iterator<Entry<String, JsonNode>> iterSelectors = fieldES.getValue().fields();
            Map<String, String> selectorsMap = new HashMap<>();
            while(iterSelectors.hasNext()){
                Entry<String, JsonNode> selectorNode = iterSelectors.next();
                String keySelector = selectorNode.getKey();
                String selector = addSelector(selectorNode.getValue().fields());
                if(selector != null && selector.length() > 0){
                    selectorsMap.put(keySelector, selector);
                }
            }
            fieldMap.put(keyFieldES, selectorsMap);
        }
    }

    private String addSelector(Iterator<Entry<String, JsonNode>> iter) {
        String selectors = "";
        while (iter.hasNext()) {
            Entry<String, JsonNode> entryNode = iter.next();
            String select = entryNode.getValue().asText();
            if(select != null && select.length() > 0){
                selectors += select + ",";
            }
        }
        if(selectors.length() > 1){
            selectors = selectors.substring(0, selectors.length()-1);
        }
        LOG.info("selectors: {}", selectors);
        return selectors;
    }
    
}
