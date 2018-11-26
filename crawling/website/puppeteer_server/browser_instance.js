var exports = module.exports;

const puppeteer = require('puppeteer');
let _instance = null;

exports.getBrowserInstance = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_instance) {
                console.log('Create new browser instance');
                _instance = await puppeteer.launch({
                    headless: true,
                    args: [`--window-size=${options.width},${options.height}`] 
                });
            }
            resolve(_instance);
        } catch (error) {
            console.log('error while getting the browser instance');
            reject(error);
        }
    });
};