const request = require('request');
const fs = require('fs');

const commonHeaders = {
    'Content-Type': 'application/json'
};

exports.callPost = (url, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: commonHeaders,
            body: JSON.stringify(data)
        }
        request.post(url, options, (error, res, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
            return;
        });
    });
};

exports.getConfig = () => {
    return JSON.parse(fs.readFileSync('config/configs.json', 'utf-8'));
};

exports.sendError = (res) => {
    return res.status(500).json({error: 'Internal error server'});
};

exports.sendOk = (res) => {
    return res.json({result: 'Ok'});
}