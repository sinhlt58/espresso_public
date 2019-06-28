var exports = module.exports;

const crypto = require('crypto');

const elasticsearch = require('elasticsearch');
const port = process.env.ES_PORT || 9200;
const local = "localhost:" + port;
const remote = (process.env.ES_REMOTE || '103.220.68.79:9200') + ":" + port;
const client = new elasticsearch.Client({
  host: local
});
const remoteClient = new elasticsearch.Client({
    host: remote
});

let index_name = process.env.ES_INDEX_NAME || 'book_status';
let index_type = process.env.ES_INDEX_TYPE || 'book_status';

exports.addUrlToEsStatus = async function(url, hostname, remote=false) {
    try {
        let clientEs = client;
        if (remote) {
            clientEs = remoteClient;
        }

        const res =  await clientEs.index({
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
        return res;
    } catch (error) {
        throw 'error';
    }
};

exports.removeUrlFromEsStatus = async function(url) {
    try {
        const res = await client.deleteByQuery({
            index: index_name,
            conflicts: 'proceed',
            body: {
                query: {
                    match: {
                        url: url
                    }
                }
            }
        });
        return res;
    } catch (error) {
        throw 'error';
    }
}

exports.removeUrlsByHostname = async function(hostname) {
    try {
        const res = await client.deleteByQuery({
            index: index_name,
            conflicts: 'proceed',
            body: {
                query: {
                    wildcard: {
                        url: `*${hostname}*`
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.log(error)
        throw 'error';
    }
}

exports.removeRecordFromEsIndex = async function(url) {
    console.log(url)
    try {
        const res = await client.deleteByQuery({
            index: 'index',
            conflicts: 'proceed',
            body: {
                query: {
                    match: {
                        url: url
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.log(error)
        throw 'error';
    }
}

exports.removeRecordsByHostname = async function(hostname) {
    try {
        const res = await client.deleteByQuery({
            index: 'index',
            conflicts: 'proceed',
            body: {
                query: {
                    wildcard: {
                        url: `*${hostname}*`
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.log(error)
        throw 'error';
    }
}