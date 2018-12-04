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
            index: 'index',
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                bool: {
                                    should: [
                                        { match: { thuong_hieu: brand }},
                                        { match: { nguoi_dang: brand }}
                                    ]
                                }
                            },
                            {
                                bool: {
                                    filter: {
                                        exists : {
                                            field : 'bl_diem'
                                        }
                                    }
                                }
                            },
                            // {
                            //     bool: {
                            //         should: [
                            //             {term: {
                            //                 bl_diem: 6
                            //             }}
                            //         ]
                                    
                            //     }
                            // }
                        ]
                    },
                },
                aggs: {
                    group_by_url_domain: {
                        terms: {
                            field: 'domain.keyword',
                            size: 20
                        },
                        aggs: {
                            newest: {
                                top_hits: {
                                    sort: [
                                        {
                                            created_time: {
                                                order: 'desc'
                                            }
                                        }
                                    ],
                                    size: 1
                                }
                            },
                            num_reviews: {
                                sum: {
                                    script: {
                                        lang: 'painless',
                                        source: "doc['bl_diem'].length"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const items = esRes['hits']['hits'];
    
        console.log(esRes)
    
        res.json(esRes['aggregations']['group_by_url_domain']);
    } catch (error) {
        res.status(500).json({error: error});
    }
    
});

module.exports = router;