const express = require('express');

const router = express.Router();

const sentiment = require('./sentiment');

router.use('/sentiment', sentiment);

module.exports = router;