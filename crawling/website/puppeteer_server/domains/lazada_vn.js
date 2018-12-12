var exports = module.exports;

const utils = require('../utils');

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
            console.log("Get comments and change DOM for lazada");
            const url = page.url();
            const match = url.match(/i\d{5,}-s\d{5,}/);
            if (match) {
                const productId = match[0].split('-')[0].substring(1);
                console.log('productId: ' + productId);

                const params = {
                    itemId: productId,
                    sort: 0,
                    pageSize: 1000,
                    filter: 0,
                    pageNo: 0
                };
                const reviewsRes = await utils.callGet('https://my.lazada.vn/pdp/review/getReviewList', params);
                console.log('number of reviews: ' + reviewsRes.model.items.length);

                // add to the dom
                await utils.addReviewsToDomV2(page, reviewsRes.model.items,
                    addContentFunc, addRateFunc, addTimeFunc, addUserNameFunc);
            }
            resolve(true);
        } catch(error) {
            console.log('error while getting reviews: ' + error);
            resolve(true);
        }
    });
};