var exports = module.exports;

const utils = require('../utils');
const logger = require('../logger')(module);

exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info("Get comments and change DOM for sendo");

            resolve(true);
        } catch(error) {
            if (error.name == 'TypeError') {
                // when the comment button is null we will return true
                logger.info("Can't find the element or error while reading reviews");
                resolve(true);
            } else {
                reject(error);
            }
        }
    });
};