
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    requestTimeout: 1200000
});

const index_name = 'book_index';
const index_type = '_doc';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

// getAllBook().then(async data => {
//     let hits = data.hits.hits;
//     for (let i = 0; i < hits.length; i++) {

//         let source = hits[i]._source;
//         let id = hits[i]._id;

//         let dom = JSDOM.fragment(source.muc_luc_sach);

//         let nodes = dom.children;
//         let arrayNodes = [];
//         for (let i = 0; i < nodes.length; i++) {
//             arrayNodes.push(buildJsonNested(nodes[i], true));
//         }

//         let payload = {
//             doc: {
//                 muc_luc_sach_json: JSON.stringify(arrayNodes),
//                 refix: 1
//             }
//         }

//         update(id, payload).then(res => {
//             console.log(res)
//         }).catch(err => {
//             console.log(err)
//         })

//         sleep(200)

//     }
// })

//  template nested
// li
//     a
//     ul
//         li
//             a
//             ul
function buildJsonNested(parent, isFisrt) {

    let node = {};

    let spec_header = null;

    let subUl = null;
    let arrayNodes = [];

    if (isFisrt == true && parent.children.length == 1) {

        let ul = parent.children[0];
        let li = ul.children[0];
        spec_header = li.children[0].textContent.trim();

        subUl = li.querySelector('ul');

    } else {

        let head = parent.children[0];
        spec_header = head.textContent.trim();

        subUl = parent.querySelector('ul');

    }

    node.name = spec_header;
    if (subUl) {
        for (let i = 0; i < subUl.children.length; i++) {
            let subLi = subUl.children[i];
            arrayNodes.push(buildJsonNested(subLi, false));
        }
    }
    if (arrayNodes.length > 0) node.children = arrayNodes;

    return node;

}

async function updateUnits() {
    while (true) {
        let data = await getUnits();
        let hits = data.hits.hits;
        if (hits.length == 0) break;

        for (let index = 0; index < hits.length; index++) {

            const source = hits[index]._source;

            let payload = {
                doc: {
                    ly_thuyet_or_bai_tap: source.ly_thuyet_or_bai_tap.replace('loigiaihay.com', '').replace('Loigiaihay.com', ''),
                    refix: 1
                }
            }

            update(hits[index]._id, payload).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })

            sleep(200)
        }
    }
}

// updateUnits();