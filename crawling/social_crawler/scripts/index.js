
const crypto = require('crypto');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

let index_name = 'fb_status';
let index_type = 'status';

async function indexStatus(node, type_node){
    await client.index({
        index: index_name,
        type: index_type,
        id: crypto.createHash('sha256').update(node).digest('hex'),
        body: {
            node: node,
            status: 'DISCOVERED',
            metadata: {
                type: type_node
            },
            nextFetchDate: new Date().toISOString()
        },
        refresh: 'true',
        routing: type_node // magic here @@
    });
}

var data = [
    {
        node: 'thoi%20trang%20nu',
        type_node: 'search_pages'
    }
]

data.forEach(element => {
    indexStatus(element.node, element.type_node)
});