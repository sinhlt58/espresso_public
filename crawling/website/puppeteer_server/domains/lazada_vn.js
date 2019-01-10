var exports = module.exports;

const utils = require('../utils');
const logger = require('../logger')(module);

let addContentFunc = (reviewData) => {
    return reviewData.reviewContent;
}

let addRateFunc= (reviewData) => {
    return reviewData.rating;
}

let addTimeFunc = (reviewData) => {
    return reviewData.zonedReviewTime;
}

let addUserNameFunc = (reviewData) => {
    return reviewData.buyerName;
}

exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info("Get comments and change DOM for lazada");
            const url = page.url();
            const match = url.match(/i\d{5,}-s\d{5,}/);
            if (match) {
                const productId = match[0].split('-')[0].substring(1);
                logger.info('ProductId: ' + productId);

                const params = {
                    itemId: productId,
                    sort: 0,
                    pageSize: 1000,
                    filter: 0,
                    pageNo: 0
                };
                const reviewsRes = await utils.callGet('https://my.lazada.vn/pdp/review/getReviewList', params);
                
                if (reviewsRes && reviewsRes.model) {
                    const numReview = reviewsRes.model.ratings.reviewCount;
                    let reviewsData = [];
                    if (numReview > 0) {
                        reviewsData = reviewsRes.model.items;
                    }
                    logger.info('Number of reviews: ' + numReview);

                    // add to the dom
                    await utils.addReviewsToDomV2(page, productId, reviewsData,
                        addContentFunc, addRateFunc, addTimeFunc, addUserNameFunc);
                } else {
                    logger.info('Error getting revews with successfull reviewsRes');
                }
            }
            resolve(true);
        } catch(error) {
            logger.info('Error while getting reviews: ', error);
            reject(true);
        }
    });
};