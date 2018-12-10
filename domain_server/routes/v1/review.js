const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send({
        message: 'Hi from review'
    });
});

router.post('/sumary', async (req, res) => {
    try {
        const json = req.body;
        const brand = json['brand'] || '';
    
        const esClient = req.app.esClient;
        const esRes = await esClient.search({
            index: 'analysis',
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                bool: {
                                    should: [
                                        { match: { brand: brand }},
                                        { match: { parentAuthor: brand }}
                                    ]
                                }
                            },
                            {
                                match: {
                                    itemType: "review"
                                }
                            },
                        ]
                    }
                },
                aggs: {
                    group_by_url_domain: {
                        terms: {
                            field: 'domain.keyword',
                            size: 20
                        }
                    }
                }
            }
        });
    
        res.json(esRes);
    } catch (error) {
        res.status(500).json({error: error});
    }
    
});

module.exports = router;