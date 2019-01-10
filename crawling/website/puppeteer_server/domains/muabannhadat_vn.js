const utils = require('../utils');
const logger = require('../logger')(module);

module.exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info('muabanhadat.vn: Click button to appear phone number');
            const buttonHienSdt = await page.$('span#MainContent_ctlDetailBox_lblContactPhone');
            await utils.clickButton(page, buttonHienSdt, options.buttonClickWaitTime);

            resolve(true);
        } catch (error) {
            if (error.name == 'TypeError') {
                // when the comment button is null we will return true
                logger.info("Can't find the element phone button");
                resolve(true);
            } else {
                reject(error);
            }
        }
    });
};