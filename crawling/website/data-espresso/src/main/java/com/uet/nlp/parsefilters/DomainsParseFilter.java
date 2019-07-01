package com.uet.nlp.parsefilters;

import java.util.*;

import com.digitalpebble.stormcrawler.mongodb.models.DomainEntity;
import com.digitalpebble.stormcrawler.mongodb.models.Rules;
import com.digitalpebble.stormcrawler.mongodb.services.DomainService;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;

import com.digitalpebble.stormcrawler.Metadata;
import com.digitalpebble.stormcrawler.parse.ParseData;
import com.digitalpebble.stormcrawler.parse.ParseFilter;
import com.digitalpebble.stormcrawler.parse.ParseResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.w3c.dom.DocumentFragment;

public class DomainsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(DomainsParseFilter.class);

    private final Map<String, Map<String, ArrayList<CustomRule>>> domainFieldRulesMap = new HashMap<>();

    private ObjectMapper mapper = new ObjectMapper();

    public enum RuleType {
        NORMAL, CONCAT, ATTRIBUTE, OWNTEXT, JSON_SCRIPT, INNER_HTML, NESTED
    }

    public class CustomRule {
        private String selectorExpression;
        private RuleType type;

        public CustomRule(String selector) {
            selectorExpression = selector.trim();
            type = getType(selector);

            if (type == RuleType.OWNTEXT) {
                selectorExpression = selectorExpression.replace("rule_own_text", "");
            } else if (type == RuleType.JSON_SCRIPT){
                selectorExpression = selectorExpression.replace("rule_json_script", "");
            } else if(type == RuleType.INNER_HTML) {
                selectorExpression = selectorExpression.replace("rule_inner_html", "");
            } else if(type == RuleType.NESTED) {
                selectorExpression = selectorExpression.replace("rule_nested_ul", "");
            }
        }

        private RuleType getType(String selector) {
            if (selector.contains("&")) {
                return RuleType.CONCAT;
            } else if (selector.contains("@")) {
                return RuleType.ATTRIBUTE;
            } else if (selector.contains("rule_own_text")) {
                return RuleType.OWNTEXT;
            } else if (selector.contains("rule_json_script")) {
                return RuleType.JSON_SCRIPT;
            } else if (selector.contains("rule_inner_html")) {
                return RuleType.INNER_HTML;
            } else if (selector.contains("rule_nested_ul")) {
                return RuleType.NESTED;
            } else {
                return RuleType.NORMAL;
            }
        }

        public ArrayList<String> evaluate(Document docJsoup) {
            if (type == RuleType.CONCAT) {
                return evaluateConcat(docJsoup);
            }

            if (type == RuleType.ATTRIBUTE) {
                return evaluateAttribute(docJsoup);
            }

            if (type == RuleType.OWNTEXT) {
                return evaluateOwnText(docJsoup);
            }

            if (type == RuleType.JSON_SCRIPT) {
                return evaluateJsonScript(docJsoup);
            }

            if (type == RuleType.INNER_HTML) {
                return evaluateInnerHtml(docJsoup);
            }

            if (type == RuleType.NESTED) {
                return evaluateNested(docJsoup);
            }

            return evaluateNormal(docJsoup);
        }

        public ArrayList<String> evaluateNormal(Document docJsoup) {

            Elements els = docJsoup.select(selectorExpression);

            ArrayList<String> res = new ArrayList<>();
            for (Element e : els) {
                res.add(e.text());
            }

            return res;
        }

        public ArrayList<String> evaluateOwnText(Document docJsoup) {
            Elements els = docJsoup.select(selectorExpression);

            ArrayList<String> res = new ArrayList<>();
            for (Element e : els) {
                res.add(e.ownText());
            }

            return res;
        }

        public ArrayList<String> evaluateJsonScript(Document docJsoup) {
            String[] tokens = selectorExpression.split("rootpath");
            String selector = tokens[0].trim();
            String path     = tokens[1].trim();

            Elements els = docJsoup.select(selector);
            ArrayList<String> res = new ArrayList<>();
            for (Element e : els) {
                try {
                    String data = e.data();
                    data = data.replaceAll("<!--.*?-->", "");
                    JsonNode root = mapper.readTree(data);
                    JsonNode node = root.at(path);
                    if(!node.isMissingNode()){
                        res.add(node.textValue());
                    }
                } catch (Exception exception) {
                    LOG.error("Error in read json script: {}", exception);
                }
            }
            return res;
        }

        public ArrayList<String> evaluateInnerHtml(Document docJsoup) {
            String[] tokens = selectorExpression.split("%remove%");
            String selector = tokens[0].trim();

            Elements els = docJsoup.select(selector);
            ArrayList<String> res = new ArrayList<>();
            for (Element e : els) {
                if(tokens.length > 1){
                    for(int i=0; i<tokens.length; i++) {
                        Elements removeElements = e.select(tokens[i].trim());
                        if(removeElements != null){
                           removeElements.remove();
                        }
                    }
                }
                String innerHtml = e.html();
                if(innerHtml != null && innerHtml.trim().length() > 0) res.add(innerHtml);
            }
            return res;
        }

        public ArrayList<String> evaluateNested(Document docJsoup) {

            Elements els = docJsoup.select(selectorExpression);
            ArrayList<String> res = new ArrayList<>();
            ArrayNode arrayRoot = mapper.createObjectNode().arrayNode();
            for (Element e : els) {
                arrayRoot.add(buildJsonNested(e, true));
            }
            if(arrayRoot.size()>0) res.add((arrayRoot.toString()));
            return res;

        }

        private ObjectNode buildJsonNested(Element e, boolean isFisrt) {
            ObjectNode node = mapper.createObjectNode();
            String spec_header = e.child(0).text();
            node.put("name", spec_header);

            // if(e.children().size() > 1){
            //     Elements lis = e.child(1).children();
            //     ArrayNode arrayNode = mapper.createObjectNode().arrayNode();
            //     for (Element li : lis) {
            //         arrayNode.add(buildJsonNested(li));
            //     }
            //     if(arrayNode.size() > 0) node.put("children", arrayNode);
            // }

            // Lay header cua phan tu dau tien lam 'name' neu trong ul cha khong co 1 the khac lam tieu de
            Elements lis = null;
            if(e.children().size() > 1 && isFisrt == false){
                lis = e.child(1).children();
            } else {
                lis = e.child(0).children();
            }
            // ???
            ArrayNode arrayNode = mapper.createObjectNode().arrayNode();
            for (Element li : lis) {
                arrayNode.add(buildJsonNested(li, false));
            }
            if(arrayNode.size() > 0) node.put("children", arrayNode);

            return node;

        }

        public ArrayList<String> evaluateConcat(Document docJsoup) {
            List<String> selectors = Arrays.asList(selectorExpression.split("&"));
            ArrayList<String> res = new ArrayList<>();
            ArrayList<String> values = new ArrayList<>();

            for (String selector : selectors) {
                Elements els = docJsoup.select(selector.trim());
                if (els != null && !els.isEmpty()){
                    values.add(els.first().text());
                }
            }
            String joinedValue = String.join(" ", values);
            if (!joinedValue.isEmpty()){
                res.add(joinedValue);
            }
            return res;
        }

        public ArrayList<String> evaluateAttribute(Document docJsoup) {
            String[] tokens = selectorExpression.split("@");
            String selector = tokens[0].trim();
            String attr     = tokens[1].trim();

            Elements els = docJsoup.select(selector);
            ArrayList<String> res = new ArrayList<>();
            for (Element e : els) {
                res.add(e.attr(attr));
            }
            return res;
        }

        public String toString() {
            return selectorExpression;
        }
    }

    @Override
    public void filter(String URL, byte[] content, DocumentFragment doc, ParseResult parse) {
        ParseData parseData = parse.get(URL);
        Metadata metadata = parseData.getMetadata();
        // String html = metadata.getFirstValue("html");

        try {

            getRules(metadata.getFirstValue("hostname"));

            Document jsoupDoc = (Document) metadata.getObjectValue("jsoupDoc");

            // for each domain
            for (String domainName : domainFieldRulesMap.keySet()){
                Map<String, ArrayList<CustomRule>> fieldRulesMap = domainFieldRulesMap.get(domainName);

                // for each field
                Map<String, ArrayList<String>> record = null;
                for (String fieldName : fieldRulesMap.keySet()) {
                    ArrayList<CustomRule> rules = fieldRulesMap.get(fieldName);

                    for (CustomRule rule : rules) {
                        ArrayList<String> values = rule.evaluate(jsoupDoc);

                        int l = values.size();
                        if (l > 0) {
                            if (record == null) {
                                record = new HashMap<>();
                            }
                            ArrayList<String> fieldValues = record.get(fieldName);
                            if (fieldValues == null) {
                                fieldValues = new ArrayList<>();
                                record.put(fieldName, fieldValues);
                            }
                            fieldValues.addAll(values);

                            // break; // We use only the first matching rule
                            // dieu nay lam cho 1 field cua 1 esname co nhieu luat nhung ko duoc xet het
                            // can xem xet lai khi 1 host co nhieu esname
                        }
                    }
                }
                if (record != null) {
                    metadata.addRecordToDomainData(domainName, record);
                }
            }

        } catch (Exception error){
            LOG.error("Error filter element parent of: {} , error: {}", URL, error);
        }

        metadata.remove("html");
    }

    public void getRules(String host){
        List<DomainEntity> domainEntities = DomainService.getDatasByHost(host);
        for (DomainEntity domainEntity :domainEntities) {
            String domainKey = domainEntity.getEsname();
            //LOG.info("Domain name: {}", domainKey);

            ArrayList<Rules> rules = domainEntity.getRules();

            Map<String, ArrayList<CustomRule>> fieldRulesMap = new HashMap<>();
            domainFieldRulesMap.put(domainKey, fieldRulesMap);

            for (Rules rule:rules) {
                String fieldKey = rule.getLabel();
                //LOG.info("Field: {}", fieldKey);

                ArrayList<CustomRule> selectorList = new ArrayList<>();
                String ruleData = rule.getRule();
                List<String> selectors = Arrays.asList(ruleData.split(", "));

                for (String selector : selectors) {
                    //LOG.info("Selector: {}", selector);
                    if (selector.length() > 0){
                        selectorList.add(new CustomRule(selector));
                    }
                }
                fieldRulesMap.put(fieldKey, selectorList);

            }
        }
    }

}
