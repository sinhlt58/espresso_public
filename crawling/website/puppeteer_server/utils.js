var exports = module.exports;

exports.click = async function(page, selector, clickTimeWait) {
    return Promise.all([
        // page.waitForNavigation({waitUtil: 'load'}),
        page.waitFor(clickTimeWait),
        page.click(selector)
    ]);
}