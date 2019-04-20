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
    // get rules
    let ruleProperties = param[esname]['rules'];
    let tmpRules = {};

    // khởi tạo array rules
    for(let property in ruleProperties){
        let rules = ruleProperties[property];
        for(let host in rules){
            let rule = rules[host];
            if(rule.length>0){
                tmpRules[host] = []; //*
            }
        }
    }

    // push rules
    for(let property in ruleProperties){
        let rules = ruleProperties[property];
        for(let host in rules){
            let rule = rules[host];
            if(rule.length>0){
                tmpRules[host].push({
                    label:property,
                    rule: rule
                })
            }
        }
    }


    // get schedules
    let scheduleProperties = param[esname]['schedules'];
    let tmpSchedules = {};

    // khởi tạo array schedules
    for(let property in scheduleProperties){
        let schedules = scheduleProperties[property];
        for(let host in schedules){
            let schedule = schedules[host];
            if(schedule){
                tmpSchedules[host] = []; 
            }
        }
    }

    // push schedules
    for(let property in scheduleProperties){
        let schedules = scheduleProperties[property];
        for(let host in schedules){
            let schedule = schedules[host];
            if(schedule){
                tmpSchedules[host].push({
                    regex: property,
                    nextFecthDate: schedule
                })
            }
        }
    }

    // push entity
    for(let hostname in tmpRules){
        let domainEntity = {};
        domainEntity.name = detail[esname];
        domainEntity.esname = esname;
        domainEntity.hostname = hostname;
        domainEntity.rules = [];
        domainEntity.schedules = [];
        for(let property in tmpRules[hostname]){
            domainEntity.rules.push(tmpRules[hostname][property]);
        }
        for(let property in tmpSchedules[hostname]){
            domainEntity.schedules.push(tmpSchedules[hostname][property]);
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
