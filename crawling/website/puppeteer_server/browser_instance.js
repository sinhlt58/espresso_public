var exports = module.exports;

const puppeteer = require('puppeteer');
const genericPool = require('generic-pool');
const options = require('./options');
const logger = require('./logger')(module);

_pagePoolOptions = {
    max: 10,
    min: 1,
    acquireTimeoutMillis: 1000
}
class BrowserHandler {
    constructor (options, scope) {
        let _this = this;

        this.options = options;
        this.scope = scope;

        this.pageFactory = {
            create: async () => {
                await BrowserHandler.waitForBrowser(_this);
                //const context = await _this.browser.createIncognitoBrowserContext();
                const page = await _this.browser.newPage();
                // Print log inside the page's evaluate function
                page.on('console', msg => {
                        let txt = msg._text;
                        let logType = msg._type;
                        if (txt[0] !== '[' && logType === 'log') {
                        logger.info(msg._text);
                    }
                });
                return page;
            },
        
            destroy: async (page) => {
                // we dont handle close here
                // await page.close();
            }
        }

        this.pagePool = null;
        
        (async () => {
            await this.launchBrowser();
        })();
    }

    static pagePoolOptions() {
        return _pagePoolOptions;
    }

    static waitForBrowser(browserHandler) {
        return new Promise ((resolve, reject) => {
            const browserCheck = setInterval(() => {
                if (browserHandler.browser !== false) {
                    clearInterval(browserCheck);
                    resolve(true);
                }
            }, 10);
        });
    }

    async launchBrowser() {
        logger.info(`${this.scope}: Launching the browser with options: `, this.options);
        this.browser = false;
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox',
                   '--disable-gpu',
                   '--proxy-server="direct://"',
                   '--proxy-bypass-list=*',
                   `--window-size=${this.options.width},
                                  ${this.options.height}`]
        });
        logger.info(`${this.scope}: Created a new browser instance`);

        if (this.pagePool) {
            logger.info(`${this.scope}: Drain the current pagePool`);
            await this.pagePool.drain();
            await this.pagePool.clear();
        }

        this.pagePool = genericPool.createPool(this.pageFactory,
            BrowserHandler.pagePoolOptions());

        this.browser.on('disconnected', this.launchBrowser);
    };

    getPage() {
        return new Promise(async (resolve, reject) => {
            try {
                await BrowserHandler.waitForBrowser(this);
                const page = await this.pagePool.acquire();
                
                resolve(page);
                logger.info(`${this.scope}: Get a page`);
                this.printPagePoolStatus();
            } catch (error) {
                // might get this when the timeout or maxWaitingClients
                logger.info(`${this.scope}: Error while getting a page from pool`);
                reject(error);
            }
        });
    }

    releasePage(page) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.pagePool.release(page);
                resolve(true);
                logger.info(`${this.scope}: Release a page`);
                this.printPagePoolStatus();
            } catch (error) {
                reject(error);
            }
        });
    }

    destroyPage(page) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.pagePool.destroy(page);
                resolve(true);
                logger.info(`${this.scope}: Destroy a page`);
                this.printPagePoolStatus();
            } catch (error) {
                reject(error);
            }
        });
    }

    printPagePoolStatus() {
        logger.info(`=== ${this.scope}: Pagepool status START ===`);
        logger.info(`${this.scope}: Pagepool spareResourceCapacity: ${this.pagePool.spareResourceCapacity}`);
        logger.info(`${this.scope}: Pagepool max: ${this.pagePool.max}`);
        logger.info(`${this.scope}: Pagepool min: ${this.pagePool.min}`);
        logger.info(`${this.scope}: Pagepool size: ${this.pagePool.size}`);
        logger.info(`${this.scope}: Pagepool available: ${this.pagePool.available}`);
        logger.info(`${this.scope}: Pagepool borrowed: ${this.pagePool.borrowed}`);
        logger.info(`${this.scope}: Pagepool pending: ${this.pagePool.pending}`);
        logger.info(`=== ${this.scope}: Pagepool status END ====`);
    }
}

let scopes = require('./scopes');
let _handlerInstances = {};

// init, create each browser handler for each domain scope
for (let i = 0; i < scopes.length; i++) {
    _handlerInstances[scopes[i]] = new BrowserHandler(options, scopes[i]);
}

exports.getPage = (scope) => {
    return new Promise(async (resolve, reject) => {
        try {
            await BrowserHandler.waitForBrowser(_handlerInstances[scope]);
            const page = await _handlerInstances[scope].getPage();
            resolve(page);
        } catch (error) {
            logger.info(`${scope}: Error while getting a page`);
            reject(error);
        }
    });
};

exports.releasePage = (page, scope) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await _handlerInstances[scope].releasePage(page);
            resolve(res);
        } catch (error) {
            logger.info(`${scope}: Error while releasing a page`);
            reject(error);
        }
    });
}

exports.destroyPage = (page, scope) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await _handlerInstances[scope].destroyPage(page);
            resolve(res);
        } catch (error) {
            logger.info(`${scope}: Error while releasing a page`);
            reject(error);
        }
    });
}
