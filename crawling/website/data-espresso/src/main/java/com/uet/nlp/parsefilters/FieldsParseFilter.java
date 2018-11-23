package com.uet.nlp.parsefilters;

import java.util.*;
import java.util.Map.Entry;

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

public class FieldsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(FieldsParseFilter.class);

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
            Document docJsoup = Parser.htmlParser().parseInput(html, URL);

            // for each domain
            for (String domainName : domainFieldRulesMap.keySet()){
                Map<String, ArrayList<CustomRule>> fieldRulesMap = domainFieldRulesMap.get(domainName);

                // for each field
                Map<String, ArrayList<String>> record = null;
                for (String fieldName : fieldRulesMap.keySet()) {
                    ArrayList<CustomRule> rules = fieldRulesMap.get(fieldName);

                    for (CustomRule rule : rules) {
                        ArrayList<String> values = rule.evaluate(docJsoup);
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

    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filterParams) {
        Iterator<Entry<String, JsonNode>> iterParams = filterParams.fields();

        // Iterate each domain
        while (iterParams.hasNext()) {
            Entry<String, JsonNode> domainEntry = iterParams.next();
            String domainKey = domainEntry.getKey();
            Iterator<Entry<String, JsonNode>> iterFields = domainEntry.getValue().fields();
            LOG.info("Domain name: {}", domainKey);
            
            Map<String, ArrayList<CustomRule>> fieldRulesMap = new HashMap<>();
            domainFieldRulesMap.put(domainKey, fieldRulesMap);

            // Iterate each field
            while(iterFields.hasNext()){
                Entry<String, JsonNode> fieldEntry = iterFields.next();
                String fieldKey = fieldEntry.getKey();
                Iterator<Entry<String, JsonNode>> iterHostRules = fieldEntry.getValue().fields();
                LOG.info("Field: {}", fieldKey);

                ArrayList<CustomRule> rules = new ArrayList<>();
                // Iterate each host name rules
                while(iterHostRules.hasNext()){
                    Entry<String, JsonNode> hostRuleEntry = iterHostRules.next();
                    String selectorsByHostStr = hostRuleEntry.getValue().asText();
                    List<String> selectorsByHost = Arrays.asList(selectorsByHostStr.split(", "));

                    for (String selector : selectorsByHost) {
                        if (selector.length() > 0){
                            rules.add(new CustomRule(selector));
                        }
                    }

                    LOG.info("Host {}: {}", hostRuleEntry.getKey(), selectorsByHostStr);
                }

                fieldRulesMap.put(fieldKey, rules);
                LOG.info("Rules: {}", rules.toString());
            }
        }
    }
}
