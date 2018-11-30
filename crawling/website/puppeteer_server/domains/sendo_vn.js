var exports = module.exports;

const utils = require('../utils');

exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Get comments and change DOM for sendo");

            resolve(true);
        } catch(error) {
            if (error.name == 'TypeError') {
                // when the comment button is null we will return true
                console.log("Can't find the element or error while reading reviews");
                resolve(true);
            } else {
                reject(error);
            }
        }
    });
};