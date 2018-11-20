var exports = module.exports;

const shopee_vn = require('./shopee_vn');

exports.scopeFunctionsMap = {
    'shopeec': shopee_vn.doActions
};

exports.getDomainFuncActionsByScopes = (scopes) => {
    return new Promise(resolve => {
        const funcActions = [];
        scopes.forEach(scope => {
            if (exports.scopeFunctionsMap.hasOwnProperty(scope)) {
                funcActions.push(exports.scopeFunctionsMap[scope]);
            }
        });
        resolve(funcActions);
    });
};

exports.doFuncActions = (page, options, funcActions) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < funcActions.length; i++){
                await funcActions[i](page, options);
            }
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    });
};

exports.doOptimizeRequests = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. Intercept network requests.
            await page.setRequestInterception(true);
    
            page.on('request', req => {
                // 2. Ignore reqs that don't produce DOM (img/css/media)
                const whiteList = ['document', 'script', 'xhr', 'fetch'];
        
                if (!whiteList.includes(req.resourceType())) {
                    return req.abort();
                }
                
                req.continue(); // 3. Pass through all other requests.
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    });
};

exports.scrollAndFuncDoActions = (page, options, funcActions) => {
    return new Promise(async (resolve, reject) => {
        try {
            await page.evaluate(_ => {
                window.scrollBy(0, window.innerHeight);
            });
            await exports.doFuncActions(page, options, funcActions);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};