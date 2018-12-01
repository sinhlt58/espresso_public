const express = require('express');
const elasticsearch = require('elasticsearch');

const app = express();

const common = require('./common/common');

app.common = common;
app.config = common.getConfig();

const PORT = app.config['port'] || 2222;
const esClient = new elasticsearch.Client({
    host: 'localhost:9200'
});

app.use(express.json());

// include routes
const apiV1 = require('./routes/v1');

app.use('/api/v1', apiV1);

app.listen(PORT, () => {
	console.log(`Domain server is listening on port ${PORT}`);
});