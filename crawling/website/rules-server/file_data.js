const fs = require('fs');

var exports = module.exports;

// We will use database later
FILE_RULES = '../data-espresso/src/main/resources/parsefilters.json';
exports.getRules = function (file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

exports.getJsoupData = function(rules) {
    return rules['com.digitalpebble.stormcrawler.parse.ParseFilters']
    .find(obj => obj.name === 'FieldsParseFilter')['params'];
}

exports.getJsoupRulesData = function() {
    const rules = getRules(FILE_RULES);
    const params = getJsoupData(rules);
    return params;
}

exports.updateJsoupRules = function(domain, field, host, rule) {
    const rules = getRules(FILE_RULES);
    const jsoupData = getJsoupData(rules);

    if (jsoupData.hasOwnProperty(domain)){
        if (jsoupData[domain]['selectorChildrent'].hasOwnProperty(field)){
            const fieldData = jsoupData[domain]['selectorChildrent'][field];
            if (fieldData.hasOwnProperty(host)) {
                if (!fieldData[host].includes(rule)) {
                    let rules = fieldData[host].split(', ');
                    rules = rules.filter(r => {
                        return r.length > 0;
                    });
                    rules.push(rule);
                    fieldData[host] = rules.join(', ');
                }
            } else {
                fieldData[host] = rule;
            }
        }
    } else {
        console.log(`Domain ${domain} not exsit!`);
    }

    const json = JSON.stringify(rules, null, 2);
    fs.writeFileSync(FILE_RULES, json, 'utf-8');
}