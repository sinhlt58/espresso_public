const utils = require('../utils');

module.exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('mubanhadat.vn: Click button to appear phone number');
            const buttonHienSdt = await page.$('span#MainContent_ctlDetailBox_lblContactPhone');
            await utils.clickButton(page, buttonHienSdt, options.buttonClickWaitTime);

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};