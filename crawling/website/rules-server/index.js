const fs = require('fs');
const httpx = require('./httpx');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 1111;
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

app.use(express.json());

// We will use database later
FILE_RULES = '../data-espresso/src/main/resources/parsefilters.json';
function getRules(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function getJsoupData(rules) {
    return rules['com.digitalpebble.stormcrawler.parse.ParseFilters']
    .find(obj => obj.name === 'FieldsParseFilter')['params'];
}

function getJsoupRulesData() {
    const rules = getRules(FILE_RULES);
    const params = getJsoupData(rules);
    return params;
}

function updateJsoupRules(domain, field, host, rule) {
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

app.get('/api/v1/domains', async function(req, res) {
    jsoupRulesData = getJsoupRulesData();

    const domainsData = [];
    for (let domain in jsoupRulesData) {
        domainData = {
            name: domain,
            fields: []
        };
        for (let field in jsoupRulesData[domain]['selectorChildrent']) {
            domainData.fields.push(field);
        }
        domainsData.push(domainData);
    }
    return res.json(domainsData);
});

app.post('/api/v1/domains', async function(req, res) {
    const json = req.body;
    const domain = json['domain'];
    const field = json['field'];
    const host = json['host'];
    const rule = json['rule'];
    
    try{
        updateJsoupRules(domain, field, host, rule);
    }catch(error){
        return res.send(500, 'Internal error');
    }
    
    return res.send('Ok');
});

let server = httpx.createServer(httpsOptions, app);
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});