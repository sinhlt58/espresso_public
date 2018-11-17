const fs = require('fs');
const express = require('express');
const app = express();

const file_data = require('./file_data');
const httpx = require('./httpx');

const PORT = process.env.PORT || 1111;
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

app.use(express.json());

app.get('/api/v1/domains', async function(req, res) {
    jsoupRulesData = file_data.getJsoupRulesData();

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
        file_data.updateJsoupRules(domain, field, host, rule);
    }catch(error){
        return res.send(500, 'Internal error');
    }
    
    return res.send('Ok');
});

let server = httpx.createServer(httpsOptions, app);
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});