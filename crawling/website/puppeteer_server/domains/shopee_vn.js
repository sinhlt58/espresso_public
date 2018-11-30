var exports = module.exports;

const utils = require('../utils');

exports.doActions = (page, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Get comments and change DOM for shopee");
            // Click on review which has comments and calcuate number of reviews.
            const buttonBinhLuan = await page.$('div.product-rating-overview__filter--with-comment');
            const buttonBinhLuanText = await (await buttonBinhLuan.getProperty('innerText')).jsonValue();
            const numBinhLuan = parseInt(buttonBinhLuanText.match(/\d+/)[0]);
            const numBinhLuanPage = parseInt(numBinhLuan / 6) + 1; // 6 review per page for shopee
            console.log('numBinhLuan: ', numBinhLuan);
            console.log('numBinhLuanPage: ', numBinhLuanPage);
            await utils.clickButton(page, buttonBinhLuan, options.buttonClickWaitTime);
            
            // get reviews from clicking next page
            let i = 0;
            let reviewsData = [];
            do {
                if (numBinhLuan > 0) {
                    const reviewData = await page.evaluate(() => {
                        let data = [];
                        let cotentElements = document.getElementsByClassName('shopee-product-rating__content');
                        let rateElements = document.getElementsByClassName('shopee-product-rating__rating');
                        let timeElements = document.getElementsByClassName('shopee-product-rating__time');
                        let userNamesElements = document.getElementsByClassName('shopee-product-rating__author-name');
    
                        for (let i = 0; i < rateElements.length; i++){
                            data.push({
                                content: cotentElements[i].textContent,
                                rate: rateElements[i].getElementsByClassName('icon-rating-solid').length,
                                time: timeElements[i].textContent,
                                userName: userNamesElements[i].textContent
                            });
                        }
    
                        return data;
                    });
                    reviewsData = reviewsData.concat(reviewData);
                    if (i < numBinhLuanPage - 1) {
                        await utils.click(page,
                                            'button.shopee-icon-button--right',
                                            options.buttonClickWaitTime);
                    }
                }
                i++;
            } while (i < options.maxPageComment && i < numBinhLuanPage);
    
            // concat reviews to the dom
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