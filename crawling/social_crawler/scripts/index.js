
const crypto = require('crypto');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

let index_name = 'fb_status';
let index_type = 'status';

async function indexStatus(node, type_node){
    var nodeBuild = node + '_' + type_node
    await client.index({
        index: index_name,
        type: index_type,
        id: crypto.createHash('sha256').update(nodeBuild).digest('hex'),
        body: {
            node: nodeBuild,
            status: 'DISCOVERED',
            metadata: {
                type: type_node,
                node_id: node
            },
            nextFetchDate: new Date().toISOString()
        },
        refresh: 'true',
        routing: type_node // magic here @@
    });
}

var data = [
    // {
    //     node: 'thoi%20trang%20nu',
    //     type_node: 'search_pages'
    // },
    // {
    //     node: 'áo bóng đá',
    //     type_node: 'search_pages'
    // }
    {
        node: 'ViruSs',
        type_node: 'search_pages'
    }
]

data.forEach(element => {
    try {
        indexStatus(element.node, element.type_node);
        console.log('Inject node: ' + element.node)
    } catch (error) {
        console.log('Error inject node: ' + element.node + ' : ' + error);
    }
});