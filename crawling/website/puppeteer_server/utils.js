var exports = module.exports;

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