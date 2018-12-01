const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send({
        message: 'Hi from review'
    });
});

module.exports = router;