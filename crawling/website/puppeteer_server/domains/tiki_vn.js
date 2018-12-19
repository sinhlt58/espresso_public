var exports = module.exports;

const utils = require('../utils');
const logger = require('../logger')(module);

getReviewsData = async (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            const countBinhLuanButton = await page.$('.-reviews-count');
            if (!countBinhLuanButton) {
                resolve([]);
                return;
            }

            const numBinhLuan = await (await countBinhLuanButton.getProperty('innerText')).jsonValue();
            let numBinhLuanPage = (await page.$$('div.list-pager > ul > li')).length - 1;
            
            if (parseInt(numBinhLuan) === 0) {
                resolve([]);
                return;
            } else {
                if (numBinhLuanPage < 1) {
                    numBinhLuanPage = 1;
                }
            }
            logger.info('numBinhLuanPage: ', numBinhLuanPage);
        
            // get reviews by clicking next page
            let i = 0;
            let reviewsData = [];
            do {
                if (numBinhLuanPage > 0) {
                    const reviewData = await page.evaluate(() => {
                        let data = [];
                        let contentElements = document.getElementsByClassName('review_detail');
                        let rateElements = document.querySelectorAll('div.rating > div > meta[itemprop="ratingValue"]');
                        let timeElements = document.getElementsByClassName('days');
                        let userNamesElements = document.querySelectorAll('[itemprop="author"]');

                        for (let i = 0; i < rateElements.length; i++){
                            data.push({
                                content: contentElements[i].textContent,
                                rate: rateElements[i].getAttribute('content'),
                                time: timeElements[i].textContent,
                                userName: userNamesElements[i].textContent
                            });
                        }
        
                        return data;
                    });
        
                    reviewsData = reviewsData.concat(reviewData);
        
                    // click next page
                    if (i < numBinhLuanPage - 1) {
                        await utils.click(page,
                                          `[data-page-number="${i + 2}"]`, 
                                          options.buttonClickWaitTime);
                    }
                }
                i++;
            } while (i < options.maxPageComment && i < numBinhLuanPage);

            resolve(reviewsData);
        } catch (error) {
            logger.info(`Error while getting reviews: ${error}`);
            resolve([]);
        }
    });
}

exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info("Get comments and change DOM for tiki");
            let reviewsData = [];
            reviewsData = reviewsData.concat(await getReviewsData(page, options));

            if (reviewsData.length === 0) {
                resolve(true);
            }

            try {
                const dropDown = await page.$('#product-review-box > div > div.review-filter > div:nth-child(4)');
                await utils.clickButton(page, dropDown, 500);
                
                // get negative reviews
                const buttonChuaHaiLong = await page.$('[data-index="7"]');
                await utils.clickButton(page, buttonChuaHaiLong, options.buttonClickWaitTime);
                reviewsData = reviewsData.concat(await getReviewsData(page, options));
            } catch (error) {
                logger.info('error while getting more reviews');
            }
            
            // concat reviews to the dom
            await utils.addReviewsToDom(page, reviewsData);

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

let addContentFunc = (reviewData) => {
    return reviewData.content;
}

let addRateFunc = (reviewData) => {
    return reviewData.rating;
}

let addTimeFunc = (reviewData) => {
    return reviewData.created_at;
}

let addUserNameFunc = (reviewData) => {
    return reviewData.created_by.name;
}

exports.doActionsV2 = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info("Get comments and change DOM for tiki V2");
            const inputTagProductId = await page.$('#product_id');

            if (inputTagProductId) {
                const productId = await (await inputTagProductId.getProperty('value')).jsonValue();
                logger.info('productId: ' + productId);
                const params = {
                    product_id: productId,
                    include: 'comments',
                    limit: 1000
                };
                const reviewsRes = await utils.callGet('https://tiki.vn/api/v2/reviews', params);
                logger.info('number of reviews: ' + reviewsRes.data.length);

                // add to the dom
                await utils.addReviewsToDomV2(page, reviewsRes.data,
                    addContentFunc, addRateFunc, addTimeFunc, addUserNameFunc);
            }

            resolve(true);
        } catch(error) {
            logger.info('error while getting reviews: ' + error);
            resolve(true);
        }
    });
};