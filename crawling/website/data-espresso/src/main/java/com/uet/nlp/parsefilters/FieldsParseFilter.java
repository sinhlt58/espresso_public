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
import org.elasticsearch.common.Strings;

public class FieldsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(FieldsParseFilter.class);

    private final Map<String, FiledElasticsearch> fieldMap = new HashMap<>();

    class FiledElasticsearch {
        public String selectorParent;
        public Map<String, String> selectorChildrentMap;
        FiledElasticsearch(String selectorParent, Map<String, String> selectorChildrentMap){
            this.selectorParent = selectorParent;
            this.selectorChildrentMap = selectorChildrentMap;
        }
    }

    @Override
    public void filter(String URL, byte[] content, DocumentFragment doc, ParseResult parse) {
        ParseData parseData = parse.get(URL);
        Metadata metadata = parseData.getMetadata();
        String html = metadata.getFirstValue("html");
        Iterator<Entry<String, FiledElasticsearch>> iterFieldMap= fieldMap.entrySet().iterator();
        try {
            Document docJsoup = Jsoup.parse(html);

            while (iterFieldMap.hasNext()){
                Entry<String, FiledElasticsearch> filedElasticsearchEntry = iterFieldMap.next();
                String keyField = filedElasticsearchEntry.getKey();
                String selectorParent = filedElasticsearchEntry.getValue().selectorParent;
                Map<String, String> selectorChildrentMap = filedElasticsearchEntry.getValue().selectorChildrentMap;

                try{
                    Elements elementParents = docJsoup.select(selectorParent);
                    if (elementParents != null && !elementParents.isEmpty()) {
                        ArrayList<String> objectStringArray = new ArrayList<>();

                        for (Element elementParent: elementParents) {
                            XContentBuilder builder = jsonBuilder().startObject();
                            Iterator<Entry<String, String>> iterSelectorChildrentMap = selectorChildrentMap.entrySet().iterator();
                            while (iterSelectorChildrentMap.hasNext()){
                                Entry<String, String> selectorChildEntry = iterSelectorChildrentMap.next();
                                String keySelectorChild = selectorChildEntry.getKey();
                                String selectorChild = selectorChildEntry.getValue();
                                String contentChild = "";
                                try {
                                    contentChild = getContentChild(selectorChild, elementParent);
                                } catch (Selector.SelectorParseException e) {
                                    LOG.error("Error evaluating selector child of items {}: {}", keySelectorChild, e);
                                }
                                if(contentChild != null && contentChild.length() > 0){
                                    builder.field(keySelectorChild, contentChild);
                                }
                            }
                            String objectJson = Strings.toString(builder.endObject());
                            if(objectJson.length()>2){
                                objectStringArray.add(objectJson);
                            }

                        }
                        LOG.info("@@@@@@@@ Array String object: {}", objectStringArray);
                        metadata.addValues(keyField, objectStringArray);
                    }
                } catch (Selector.SelectorParseException e) {
                  LOG.error("Error evaluating selector {}: {}", keyField, e);
                }
            }
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
            Entry<String, JsonNode> selectorParentNode = iterSelectors.next();
            String selectorParent = addSelector(selectorParentNode.getValue().fields());

            Map<String, String> selectorChildrentMap = new HashMap<>();
            Entry<String, JsonNode> selectorChildrentNode = iterSelectors.next();
            Iterator<Entry<String, JsonNode>> iterSelectorChildrentNode = selectorChildrentNode.getValue().fields();
            while(iterSelectorChildrentNode.hasNext()){
                Entry<String, JsonNode> selectorChildNode = iterSelectorChildrentNode.next();
                String keySelectorChild = selectorChildNode.getKey();
                String selectorChild = addSelector(selectorChildNode.getValue().fields());
                selectorChildrentMap.put(keySelectorChild, selectorChild);
            }

            FiledElasticsearch filedElasticsearch = new FiledElasticsearch(selectorParent, selectorChildrentMap);

            fieldMap.put(keyFieldES, filedElasticsearch);
        }
    }

    private String addSelector(Iterator<Entry<String, JsonNode>> iter) {
        String selectors = "";
        while (iter.hasNext()) {
            Entry<String, JsonNode> entryNode = iter.next();
            selectors += entryNode.getValue().asText() + ",";
        }
        selectors = selectors.substring(0, selectors.length()-1);
        LOG.info("selectors: {}", selectors);
        return selectors;
    }
    
}
