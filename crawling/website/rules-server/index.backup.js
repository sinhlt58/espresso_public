const fs = require('fs');
const express = require('express');
const app = express();

const file_data = require('./file_data');
const httpx = require('./httpx');
const es = require('./es');

const router = express.Router(); 
app.use(express.json());
app.use('/api/v1', router);

const PORT = process.env.PORT || 1111;
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

router.get('/domains', async (req, res) => {
    jsoupRulesData = file_data.getJsoupRulesData();

    const domainsData = [];
    for (let domain in jsoupRulesData) {
        domainData = {
            name: domain,
            fields: []
        };
        for (let field in jsoupRulesData[domain]) {
            domainData.fields.push(field);
        }
        domainsData.push(domainData);
    }
    return res.json(domainsData);
});

router.post('/domains', async (req, res) => {
    const json = req.body;
    const domain = json['domain'];
    const field = json['field'];
    const host = json['host'];
    const rule = json['rule'];
    
    try{
        file_data.updateJsoupRules(domain, field, host, rule);
    }catch(error){
        return sendError(res);
    }
    
    return sendOk(res);
});

router.post('/urlrules', async (req, res) => {
    const json = req.body;
    const hostname = json['hostname'];

    try {
        file_data.addHostnameUrlRule(hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.delete('/urlrules/:hostname', async (req, res) => {
    const hostname = req.params.hostname;

    try {
        file_data.removeHostnameUrlRule(hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.post('/jsrules', async (req, res) => {
    const json = req.body;
    const hostname = json['hostname'];

    try {
        file_data.addHostnameJsRule(hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.delete('/jsrules/:hostname', async (req, res) => {
    const hostname = req.params.hostname;

    try {
        file_data.removeHostnameJsRule(hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.post('/es/status', async (req, res) => {
    const json = req.body;
    const url = json['url'];
    const hostname = json['hostname'];

    try {
        await es.addUrlToEsStatus(url, hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.delete('/es/status/:url', async (req, res) => {
    const url = req.params.url;

    try {
        await es.removeUrlFromEsStatus(url);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.delete('/es/status_byhost/:hostname', async (req, res) => {
    const hostname = req.params.hostname;

    try {
        await es.removeUrlsByHostname(hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.delete('/es/index/:url', async (req, res) => {
    const url = req.params.url;

    try {
        await es.removeRecordFromEsIndex(url);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

router.delete('/es/index_byhost/:hostname', async (req, res) => {
    const hostname = req.params.hostname;

    try {
        await es.removeRecordsByHostname(hostname);
    } catch (error) {
        return sendError(res);
    }
    return sendOk(res);
});

function sendOk(res) {
    return res.status(200).send('ok');
}

function sendError(res) {
    return res.status(500).send('Internal error');
}

let server = httpx.createServer(httpsOptions, app);
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});