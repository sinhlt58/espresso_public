package com.uet.nlp.parsefilters;

import java.util.*;

import com.digitalpebble.stormcrawler.mongodb.models.DomainEntity;
import com.digitalpebble.stormcrawler.mongodb.models.Rules;
import com.digitalpebble.stormcrawler.mongodb.services.DomainService;
// import org.jsoup.parser.Parser;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;

import com.digitalpebble.stormcrawler.Metadata;
import com.digitalpebble.stormcrawler.parse.ParseData;
import com.digitalpebble.stormcrawler.parse.ParseFilter;
import com.digitalpebble.stormcrawler.parse.ParseResult;
import org.w3c.dom.DocumentFragment;

public class DomainsParseFilter extends ParseFilter {

    private static final Logger LOG = LoggerFactory.getLogger(DomainsParseFilter.class);

    private final Map<String, Map<String, ArrayList<CustomRule>>> domainFieldRulesMap = new HashMap<>();

    public enum RuleType {
        NORMAL, CONCAT, ATTRIBUTE, OWNTEXT
    }

    public class CustomRule {
        private String selectorExpression;
        private RuleType type;

        public CustomRule(String selector) {
            selectorExpression = selector.trim();
            type = getType(selector);

            if (type == RuleType.OWNTEXT) {
                selectorExpression = selectorExpression.replace("rule_own_text", "");
            }
        }

        private RuleType getType(String selector) {
            if (selector.contains("&")) {
                return RuleType.CONCAT;
            } else if (selector.contains("@")) {
                return RuleType.ATTRIBUTE;
            } else if (selector.contains("rule_own_text")) {
                return RuleType.OWNTEXT;
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
                            break; // We use only the first matching rule
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
        List<DomainEntity> domainEntities = DomainService.getRulesByHost(host);
        for (DomainEntity domainEntity :domainEntities) {
            String domainKey = domainEntity.getEsname();
            //LOG.info("Domain name: {}", domainKey);

            ArrayList<Rules> properties = domainEntity.getProperties();

            Map<String, ArrayList<CustomRule>> fieldRulesMap = new HashMap<>();
            domainFieldRulesMap.put(domainKey, fieldRulesMap);

            for (Rules rule:properties) {
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
