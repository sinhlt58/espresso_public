var exports = module.exports;

const utils = require('../utils');

exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Get comments and change DOM for shopee");
            // Click on review which has comments and calcuate number of reviews.
            const buttonBinhLuan = await page.$('div.product-rating-overview__filter--with-comment');
            if (!buttonBinhLuan) {
                resolve(true);
                return;
            }
            
            const buttonBinhLuanText = await (await buttonBinhLuan.getProperty('innerText')).jsonValue();
            const numBinhLuan = parseInt(buttonBinhLuanText.match(/\d+/)[0]);
            const numBinhLuanPage = parseInt(numBinhLuan / 6) + 1; // 6 review per page for shopee
            console.log('numBinhLuan: ', numBinhLuan);
            console.log('numBinhLuanPage: ', numBinhLuanPage);
            await utils.clickButton(page, buttonBinhLuan, options.buttonClickWaitTime);
            
            // get reviews by clicking next page
            let i = 0;
            let reviewsData = [];
            do {
                if (numBinhLuan > 0) {
                    const reviewData = await page.evaluate(() => {
                        let data = [];
                        let contentElements = document.getElementsByClassName('shopee-product-rating__content');
                        let rateElements = document.getElementsByClassName('shopee-product-rating__rating');
                        let timeElements = document.getElementsByClassName('shopee-product-rating__time');
                        let userNamesElements = document.getElementsByClassName('shopee-product-rating__author-name');
    
                        for (let i = 0; i < rateElements.length; i++){
                            data.push({
                                content: contentElements[i].textContent,
                                rate: rateElements[i].getElementsByClassName('icon-rating-solid').length,
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
                                            'button.shopee-icon-button--right',
                                            options.buttonClickWaitTime);
                    }
                }
                i++;
            } while (i < options.maxPageComment && i < numBinhLuanPage);
    
            // concat reviews to the dom
            await utils.addReviewsToDom(page, reviewsData);

            resolve(true);
        } catch(error) {
            if (error.name == 'TypeError') {
                // when the comment button is null we will return true
                console.log("Can't find the element or error while reading reviews");
                resolve(true);
            } else {
                reject(error);
            }
        }
    });
};

let addContentFunc = (reviewData) => {
    return reviewData.comment;
}

let addRateFunc= (reviewData) => {
    return reviewData.rating_star;
}

let addTimeFunc = (reviewData) => {
    return reviewData.ctime;
}

let addUserNameFunc = (reviewData) => {
    return reviewData.author_username;
}

exports.doActionsV2 = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Get comments and change DOM for shopee V2");
            const urlTokens = page.url().split('.');
            

            if (urlTokens.length > 2) {
                const productId = urlTokens[urlTokens.length - 1];
                const shopId = urlTokens[urlTokens.length - 2];

                console.log('productId: ' + productId);
                console.log('shopId: ' + shopId);
                const params = {
                    itemid: productId,
                    shopid: shopId,
                    limit: 1000,
                    filter: 1,
                    flag: 1,
                    type: 0
                };
                const reviewsRes = await utils.callGet('https://shopee.vn/api/v2/item/get_ratings', params);
                console.log('number of reviews: ' + reviewsRes.data.ratings.length);

                // add to the dom
                await utils.addReviewsToDomV2(page, reviewsRes.data.ratings,
                    addContentFunc, addRateFunc, addTimeFunc, addUserNameFunc);
            }

            resolve(true);
        } catch(error) {
            console.log('error while getting reviews: ' + error);
            resolve(true);
        }
    });
};