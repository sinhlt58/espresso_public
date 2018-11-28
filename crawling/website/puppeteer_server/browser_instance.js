var exports = module.exports;

const puppeteer = require('puppeteer');
let _instanceHandler = null;

class BrowserHandler {
    constructor (options) {
        const launchBrowser = async (options) => {
            this.browser = false;
            this.browser = await puppeteer.launch({
                headless: true,
                args: [`--window-size=${options.width},${options.height}`]
            });
            console.log('Created a new browser instance');
            this.browser.on('disconnected', launchBrowser);
        };
        
        (async () => {
            await launchBrowser(options);
        })();
    }
}

waitForBrowser = browserHandler => new Promise ((resolve, reject) => {
    const browserCheck = setInterval(() => {
        if (browserHandler.browser !== false) {
            clearInterval(browserCheck);
            resolve(true);
        }
    }, 10);
});

exports.getBrowserInstance = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_instanceHandler) {
                console.log('Create new browser handler instance');
                _instanceHandler = new BrowserHandler(options);
            }
            await waitForBrowser(_instanceHandler)
            resolve(_instanceHandler.browser);
        } catch (error) {
            console.log('error while getting the browser instance');
            reject(error);
        }
    });
};