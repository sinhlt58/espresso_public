const utils = require('../utils');

module.exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('muabanhadat.vn: Click button to appear phone number');
            const buttonHienSdt = await page.$('span#MainContent_ctlDetailBox_lblContactPhone');
            await utils.clickButton(page, buttonHienSdt, options.buttonClickWaitTime);

            resolve(true);
        } catch (error) {
            if (error.name == 'TypeError') {
                // when the comment button is null we will return true
                console.log("Can't find the element phone button");
                resolve(true);
            } else {
                reject(error);
            }
        }
    });
};