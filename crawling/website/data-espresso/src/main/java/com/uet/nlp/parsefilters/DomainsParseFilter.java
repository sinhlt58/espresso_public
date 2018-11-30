package com.uet.nlp.parsefilters;

import java.util.*;

import com.digitalpebble.stormcrawler.mongodb.MongoConnection;
import com.digitalpebble.stormcrawler.mongodb.models.DomainEntity;
import com.digitalpebble.stormcrawler.mongodb.models.Rules;
import com.digitalpebble.stormcrawler.mongodb.models.DomainEntity;
import com.digitalpebble.stormcrawler.mongodb.services.DomainService;
import com.digitalpebble.stormcrawler.util.ConfUtils;
import org.jsoup.parser.Parser;
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
import org.w3c.dom.DocumentFragment;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.elasticsearch.common.xcontent.XContentBuilder;

public class DomainsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(DomainsParseFilter.class);

    //private static final DomainEntity domainEntities = new DomainEntity();

    private final Map<String, Map<String, ArrayList<CustomRule>>> domainFieldRulesMap = new HashMap<>();

    public enum RuleType {
        NORMAL, CONCAT, ATTRIBUTE
    }

    public class CustomRule {
        private String selectorExpression;
        private RuleType type;

        public CustomRule(String selector) {
            selectorExpression = selector.trim();
            type = getType(selector);
        }

        private RuleType getType(String selector) {
            if (selector.contains("&")) {
                return RuleType.CONCAT;
            } else if (selector.contains("@")) {
                return RuleType.ATTRIBUTE;
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
    };

    @Override
    public void filter(String URL, byte[] content, DocumentFragment doc, ParseResult parse) {
        ParseData parseData = parse.get(URL);
        Metadata metadata = parseData.getMetadata();
        String html = metadata.getFirstValue("html");

        try {

            getRules(metadata.getFirstValue("hostname"));
            LOG.info("@@Rule: {}", domainFieldRulesMap);
            Document docJsoup = Parser.htmlParser().parseInput(html, URL);
            XContentBuilder builder = jsonBuilder().startObject();

            // for each domain
            for (String domainName : domainFieldRulesMap.keySet()){
                Map<String, ArrayList<CustomRule>> fieldRulesMap = domainFieldRulesMap.get(domainName);

                // for each field
                boolean isFoundAnyField = false;
                for (String fieldName : fieldRulesMap.keySet()) {
                    ArrayList<CustomRule> rules = fieldRulesMap.get(fieldName);

                    for (CustomRule rule : rules) {
                        ArrayList<String> values = rule.evaluate(docJsoup);

                        int l = values.size();
                        if (l > 0) {
                            if (!isFoundAnyField) {
                                builder.startArray(domainName);
                                builder.startObject();
                                isFoundAnyField = true;
                            }
                            if (l == 1) {
                                builder.field(fieldName, values.get(0));
                            }
                            if (l > 1) {
                                builder.field(fieldName, values.toArray());
                            }
                        }
                    }
                }

                if (isFoundAnyField) {
                    builder.endObject();
                    builder.endArray();
                }
            }

            metadata.setBuilder(builder);
        } catch (Exception error){
            LOG.error("Error filter element parent of: {} , error: {}", URL, error);
        }

        metadata.remove("html");
    }

//    public void getRules(String host){
//        LOG.info("@@Get Rule");
//        if(domainEntities.getDataByHost(host) != null){
//            for (JsonNode node :domainEntities.getDataByHost(host)) {
//                String domainKey = node.get("esname").asText();
//                JsonNode properties = node.get("properties");
//                LOG.info("Domain name: {}", domainKey);
//
//                Map<String, ArrayList<CustomRule>> fieldRulesMap = new HashMap<>();
//                domainFieldRulesMap.put(domainKey, fieldRulesMap);
//
//                for (JsonNode property:properties) {
//                    String fieldKey = property.get("label").asText();
//                    LOG.info("Field: {}", fieldKey);
//
//                    ArrayList<CustomRule> selectorList = new ArrayList<>();
//                    String rule = property.get("rule").asText();
//
//                    List<String> selectors = Arrays.asList(rule.split(", "));
//
//                    for (String selector : selectors) {
//                        LOG.info("Selector: {}", selector);
//                        if (selector.length() > 0){
//                            selectorList.add(new CustomRule(selector));
//                        }
//                    }
//
//                    fieldRulesMap.put(fieldKey, selectorList);
//
//                }
//            }
//        }
//    }

    public void getRules(String host){
        LOG.info("@@Get Rule");
        List<DomainEntity> domainEntities = DomainService.getRulesByHost(host);
        for (DomainEntity domainEntity :domainEntities) {
            String domainKey = domainEntity.getEsname();
            LOG.info("Domain name: {}", domainKey);

            ArrayList<Rules> properties = domainEntity.getProperties();

            Map<String, ArrayList<CustomRule>> fieldRulesMap = new HashMap<>();
            domainFieldRulesMap.put(domainKey, fieldRulesMap);

            for (Rules rule:properties) {
                String fieldKey = rule.getLabel();
                LOG.info("Field: {}", fieldKey);

                ArrayList<CustomRule> selectorList = new ArrayList<>();
                String ruleData = rule.getRule();
                List<String> selectors = Arrays.asList(ruleData.split(", "));

                for (String selector : selectors) {
                    LOG.info("Selector: {}", selector);
                    if (selector.length() > 0){
                        selectorList.add(new CustomRule(selector));
                    }
                }
                fieldRulesMap.put(fieldKey, selectorList);

            }
        }
    }

    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filterParams){
        long timeDelay = (long) (ConfUtils.getFloat(stormConf,
                "mongo.domain.delay", 1.0f) * 1000);
//        String collectionName = "domain";
//        domainEntities.setCollectionName(collectionName);
//        domainEntities.setTimeDelay(timeDelay);
//        LOG.info("@@Time delay: {}", timeDelay);
    }

}
