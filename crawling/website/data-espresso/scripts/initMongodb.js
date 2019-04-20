const DOMAIN = require('./../src/main/resources/parsefilters.json');
const JSRENDER = require('./../src/main/resources/filtered-js-url-file.json');
const LEGALURL = require('./../src/main/resources/fast.urlfilter.json');

let param = DOMAIN["com.digitalpebble.stormcrawler.parse.ParseFilters"][0]["params"];

let detail = {
    "bds": "Bất động sản",
    "ttn": "Thời trang nữ"
}

let domainEntities = [];

for (let esname in param){
    let properties = param[esname];
    let tmp = {};

    // khởi tạo array rules
    for(let property in properties){
        let rules = properties[property];
        for(let host in rules){
            let rule = rules[host];
            if(rule.length>0){
                tmp[host] = []; //*
            }
        }
    }

    // push rules
    for(let property in properties){
        let rules = properties[property];
        for(let host in rules){
            let rule = rules[host];
            if(rule.length>0){
                tmp[host].push({
                    label:property,
                    rule: rule
                })
            }
        }
    }

    // push entity
    for(let hostname in tmp){
        let domainEntity = {};
        domainEntity.name = detail[esname];
        domainEntity.esname = esname;
        domainEntity.hostname = hostname;
        domainEntity.rules = [];
        for(let rule in tmp[hostname]){
            domainEntity.rules.push(tmp[hostname][rule]);
        }
        domainEntities.push(domainEntity);
    }
}

const fs = require('fs');
let writeDomain = "let domainEntities=" + JSON.stringify(domainEntities) + ";db.domain.drop();db.domain.insert(domainEntities);"
fs.writeFile('domain.js', writeDomain, 'utf8', ()=>{
    console.log("Writed domain");
});

let writeJsRender = "let jsRenderEntities=" + JSON.stringify(JSRENDER["urls"]) + ";db.jsRender.drop();db.jsRender.insert(jsRenderEntities);"
fs.writeFile('jsRender.js', writeJsRender, 'utf8', ()=>{
    console.log("Writed jsRender");
});

let writeLegalUrl = "let legalUrlEntities=" + JSON.stringify(LEGALURL) + ";db.legalUrl.drop();db.legalUrl.insert(legalUrlEntities);"
fs.writeFile('legalUrl.js', writeLegalUrl, 'utf8', ()=>{
    console.log("Writed legalUrl");
});
