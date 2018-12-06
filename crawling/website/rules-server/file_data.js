const fs = require('fs');

var exports = module.exports;

// We will use database later
PREFIX_RES = '../data-espresso/src/main/resources/';
FILE_PARSE_RULES = `${PREFIX_RES}parsefilters.json`;
FILE_URL_RULES = `${PREFIX_RES}fast.urlfilter.json`;
FILE_JS_RULES = `${PREFIX_RES}filtered-js-url-file.json`;
FILE_SEEDS = `${PREFIX_RES}../../../seeds.txt`;

function getRules (file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function getLines (file) {
    let lines = fs.readFileSync(file).toString().split('\n');
    lines = lines.filter(line => {
        return line !== '\n' && line.length > 0;
    });
    lines = lines.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    return lines;
}

function writeLines (file, lines) {
    const f = fs.createWriteStream(file);
    lines.forEach(line => {
        f.write(`${line}\n`);
    });
    f.end();
}

function writeToFile(file, data) {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(file, json, 'utf-8');
}

// Jsoup rules parser start
exports.getJsoupData = function(rules) {
    return rules['com.digitalpebble.stormcrawler.parse.ParseFilters']
    .find(obj => obj.name === 'DomainsParseFilter')['params'];
}

exports.getJsoupRulesData = function() {
    const rules = getRules(FILE_PARSE_RULES);
    const params = exports.getJsoupData(rules);
    return params;
}

exports.updateJsoupRules = function(domain, field, host, rule) {
    const rules = getRules(FILE_PARSE_RULES);
    const jsoupData = exports.getJsoupData(rules);

    if (jsoupData.hasOwnProperty(domain)){
        if (jsoupData[domain].hasOwnProperty(field)){
            const fieldData = jsoupData[domain][field];
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

    writeToFile(FILE_PARSE_RULES, rules);
}
// Jsoup rules parser end

// URL rules start
// create default url rules for a domain
exports.addHostnameUrlRule = function(hostname) {
    let urlRules = getRules(FILE_URL_RULES);
    let domainScope = `domain:${hostname}`;

    let hostDict = urlRules.find(d => {
        return d['scope'] === domainScope;
    });
    if (hostDict == undefined){
        urlRules.push({
            scope: domainScope,
            patterns: [
                `AllowPathQuery ${hostname}`,
                "DenyPathQuery .+"        
            ]
        });
    }

    writeToFile(FILE_URL_RULES, urlRules);
}

exports.removeHostnameUrlRule = function(hostname) {
    let urlRules = getRules(FILE_URL_RULES);
    let domainScope = `domain:${hostname}`;

    urlRules = urlRules.filter(d => {
        return d['scope'] !== domainScope;
    });

    writeToFile(FILE_URL_RULES, urlRules);
}

exports.addHostnameJsRule = function(hostname) {
    let jsRules = getRules(FILE_JS_RULES);

    let hostDict = jsRules['urls'].find(d => {
        return d['hostname'] === hostname;
    });
    if (hostDict == undefined){
        jsRules['urls'].push({
            hostname: hostname,
            scopes: "opreq"
        });
    }

    writeToFile(FILE_JS_RULES, jsRules);
}

exports.removeHostnameJsRule = function(hostname) {
    let jsRules = getRules(FILE_JS_RULES);

    jsRules['urls'] = jsRules['urls'].filter(d => {
        return d['hostname'] !== hostname;
    });

    writeToFile(FILE_JS_RULES, jsRules);
}

exports.addUrlToSeeds = function(url, hostname) {
    const lines = getLines(FILE_SEEDS);
    const inUrl = lines.find(line => {
        return line.includes(url);
    });
    if (inUrl == undefined) {
        lines.push(url);
    }
    writeLines(FILE_SEEDS, lines);
}

exports.removeUrlFromSeeds = function(url, hostname) {
    let lines = getLines(FILE_SEEDS);
    lines = lines.filter(line => {
        return !line.includes(url);
    });
    writeLines(FILE_SEEDS, lines);
}
// URL rules end