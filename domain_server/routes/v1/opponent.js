const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send({
        message: 'Hi from opponent'
    });
});

module.exports = router;