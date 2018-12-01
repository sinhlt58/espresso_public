const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send({
        message: 'Hi from sentiment'
    });
});

router.post('/predict', async (req, res) => {
    try {
        json = req.body;
        const data = {
            'inputs': json['sentences']
        }
        const body = await req.app.common.callPost(req.app.config['nlp_sentiment_url'], data);
        
        return res.json(body);
    } catch(error) {
        return app.common.sendError(res);
    }
});

module.exports = router;