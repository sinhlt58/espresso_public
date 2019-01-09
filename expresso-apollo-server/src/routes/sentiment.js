const express = require('express');
const router = express.Router();

router.post('/predict', async (req, res) => {
    try {
        const json = req.body;
        
        const data = {
            'inputs': json['sentences']
        }
        const body = await req.app.common.callPost(req.app.configs['nlp_sentiment_url'], data);
        
        return res.json(body);
    } catch(error) {
        console.log(error);
        return req.app.common.sendError(res);
    }
});

module.exports = router;