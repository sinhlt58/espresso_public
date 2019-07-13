const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    requestTimeout: 1200000
});

const index_name = 'book_index';
const index_type = '_doc';

module.exports = {
    searchBookByName: searchBookByName,
    searchUnitByBookAndName: searchUnitByBookAndName,
    getAllBook: getAllBook,
    update: update,
    getUnits: getUnits,
    sleep: sleep
}

function searchBookByName(key) {
    return client.search({
        index: index_name,
        type: index_type,
        body: {
            "query": {
                "term": { "ten_sach.keyword": key }
            },
            // "from" : 0, "size" : 1000
        }
    })
}

function searchUnitByBookAndName(book, unit, isTheory) {

    let queryString;
    if (isTheory) {
        queryString = "lí lý +thuyết";
    } else {
        queryString = "-thuyết";
    }

    return client.search({
        index: index_name,
        type: index_type,
        body: {
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "sach.keyword": book
                            }
                        },
                        // {
                        //     "match_phrase_prefix": {
                        //         "sach": book
                        //     }
                        // },
                        {
                            "match_phrase_prefix": {
                                "tieu_de": unit
                            }
                        },
                        {
                            "query_string": {
                                "fields": ["tieu_de"],
                                "query": queryString
                            }
                        }
                    ]
                }
            },
            "sort": [
                {
                    "created_time": {
                        "order": "desc"
                    }
                }
            ],
            "from": 0, "size": 1000
        }
    })
}

function getAllBook() {
    return client.search({
        index: index_name,
        type: index_type,
        body: {
            "sort": [
                { "created_time": "desc" }
            ],
            "query": {
                "exists": { "field": "ten_sach" }
            },
            "from": 0, "size": 1000
        }
    })
}

function update(id, payload) {
    return client.update({
        index: index_name,
        type: index_type,
        id: id,
        body: payload
    })
}

function getUnits() {
    return client.search({
        index: index_name,
        type: index_type,
        body: {
            "query": {
                "bool": {
                    "must_not": {
                        "exists": {
                            "field": "refix"
                        }
                    },
                    "must": [
                        { "exists": { "field": "ly_thuyet_or_bai_tap" } }
                    ]
                }
            },
            "from": 0, "size": 1000
        }
    })
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}