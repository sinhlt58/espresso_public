var exports = module.exports;

const fs = require('fs');
const request = require('request');

exports.click = async function(page, selector, clickTimeWait) {
    return Promise.all([
        // page.waitForNavigation({waitUtil: 'load'}),
        page.waitFor(clickTimeWait),
        page.click(selector)
    ]);
};

exports.clickButton = async function(page, button, clickTimeWait) {
    return Promise.all([
        page.waitFor(clickTimeWait),
        button.click()
    ]);
};

exports.addReviewsToDom = async (page, reviewsData) => {
    await page.evaluate(reviewsData => {
        let body = document.getElementsByTagName("body")[0];
        reviewsData.forEach(reviewData => {
            function addDiv(text, className) {
                let div = document.createElement('div');
                div.innerText = text;
                div.classList.add(className);
                body.appendChild(div);
            }
            addDiv(reviewData.content, 'espresso-review-content');           
            addDiv(reviewData.rate, 'espresso-review-rate');
            addDiv(reviewData.time, 'espresso-review-time');
            addDiv(reviewData.userName, 'espresso-review-user-name');
        });
        return true
    }, reviewsData);
};

exports.addReviewsToDomV2 = (page, reviewsData, addContentFunc,
            addRateFunc, addTimeFunc, addUserNameFunc) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Can't use these because we resue the page
            // await page.exposeFunction('addContentFunc', addContentFunc);
            // await page.exposeFunction('addRateFunc', addRateFunc);
            // await page.exposeFunction('addTimeFunc', addTimeFunc);
            // await page.exposeFunction('addUserNameFunc', addUserNameFunc);

            const funcs = {
                addContentFunc: addContentFunc.toString(),
                addRateFunc: addRateFunc.toString(),
                addTimeFunc: addTimeFunc.toString(),
                addUserNameFunc: addUserNameFunc.toString(),
            }

            await page.$eval('body', async (body, reviewsData, funcs) => {
                function addDiv(text, className) {
                    let div = document.createElement('div');
                    div.innerText = text;
                    div.classList.add(className);
                    body.appendChild(div);
                }

                function strToFunc(stringFunc) {
                    return new Function(`return ( ${stringFunc} ).apply(null, arguments)`);
                }

                const addContentFunc = strToFunc(funcs['addContentFunc']);
                const addRateFunc = strToFunc(funcs['addRateFunc']);
                const addTimeFunc = strToFunc(funcs['addTimeFunc']);
                const addUserNameFunc = strToFunc(funcs['addUserNameFunc']);
                
                // let body = document.getElementsByTagName("body")[0];
                for (let i = 0; i < reviewsData.length; i++){
                    const reviewData = reviewsData[i];
                    
                    const content = addContentFunc(reviewData);
                    const rate = addRateFunc(reviewData);
                    const time = addTimeFunc(reviewData);
                    const userName = addUserNameFunc(reviewData);

                    addDiv(content, 'espresso-review-content');     
                    addDiv(rate, 'espresso-review-rate');
                    addDiv(time, 'espresso-review-time');
                    addDiv(userName, 'espresso-review-user-name');
                }
                
                return true;
            }, reviewsData, funcs);
            resolve(true);
        } catch (error) {
            console.log('error while add reviews to DOM: ' + error);
            resolve(true);
        }
    });
    
};

const commonHeaders = {
    'Content-Type': 'application/json'
};
exports.callGet = (url, params) => {
    return new Promise((resolve, reject) => {

        request.get({url: url, qs: params, json: true},
                        (error, res, body) => {
            if (error) {
                reject(error);
            } else {
                if (typeof(body) === 'object') {
                    resolve(body);
                } else if (typeof(body) === 'string') {
                    try {
                        const bodyObject = JSON.parse(body);
                        resolve(bodyObject);
                    } catch (error) {
                        console.log(`Error parsing string json url: ${url}, params: ${JSON.stringify(params)}`);
                        reject(false);
                    }
                } else {
                    reject(false);
                }
            }
            return;
        });
    });
};

exports.callPost = (url, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: commonHeaders,
            body: JSON.stringify(data)
        }
        request.post(url, options, (error, res, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
            return;
        });
    });
};