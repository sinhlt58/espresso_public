
const fd = require('./file_data')
const elasticsearch = require('elasticsearch');
const urlParser = require('url')
const crypto = require('crypto');

const remoteClient = new elasticsearch.Client({
    host: '103.220.68.79:9200'
});

urls = fd.getLines('./moreurls.txt')

let index_name = 'v2_status';
let index_type = 'v2_status';

async function addUrls () {
    try {
        for (let i=0; i<urls.length; i++) {
            let hostname = urlParser.parse(urls[i]).hostname
            let url = urls[i];
            try {
                let res = await remoteClient.index({
                    index: index_name,
                    type: index_type,
                    id: crypto.createHash('sha256').update(url).digest('hex'),
                    body: {
                        url: url,
                        status: 'DISCOVERED',
                        metadata: {
                            hostname: hostname
                        },
                        nextFetchDate: new Date().toISOString()
                    },
                    refresh: 'true',
                    routing: hostname // magic here @@
                });
            } catch (err) {
                console.log(err);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

addUrls()
console.log("Done")