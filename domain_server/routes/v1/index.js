const express = require('express');

const router = express.Router();

const review = require('./review'); // module1
const sentiment = require('./sentiment'); // module2
const opponent = require('./opponent'); // module3

router.use('/review', review);
router.use('/sentiment', sentiment);
router.use('/opponent', opponent);

module.exports = router;