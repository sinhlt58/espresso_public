const express = require('express');
// const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();

const domains = require('./domains/domains');

const PORT = process.env.PORT || 3000;
const options = {
	maxPageComment: 5,
	pageTimeout: 60000,
	width: 1920,
	height: 1080,
	viewPortW: 1920,
	viewPortH: 1080,
	scrollHeightFactor: 2000,
	buttonClickWaitTime: 1000,
	agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
}

const SCOPE_OP_REQUEST = 'opreq';
const SCOPE_OP_SCROLL  = 'scroll';

let _browser = null;
puppeteer.launch({
	headless: true,
	args: [`--window-size=${options.width},${options.height}`] 
}).then(browser => {
	console.log("Created browser instance successfully")
	_browser = browser;
});

app.get('/api/v1/viewDom', async function(req, res) {
	const queries = req.query;
	let url = queries.url || '';
	let scopes = queries.scopes;
	let scrollHeightFactor = queries.scrollHeight || options.scrollHeightFactor;

	if (scopes) {
		scopes = scopes.split(",");
	} else {
		scopes = [SCOPE_OP_REQUEST];
	}

	if (url === ''){
		return res.send('No url');
	}

	let decodedUrl = decodeURIComponent(url);
	console.log('Decoded url: ' + decodedUrl);
	console.log('Scopes: ', scopes);

	const page = await _browser.newPage();

	try {
		if (!_browser) {
			return res.send('The browser have not started yet.');
		}

		if (!page) {
			return res.send('Can not create page');
		}

		// Print log inside the page's evaluate function
		page.on('console', msg => {
				let txt = msg._text;
				let logType = msg._type;
				if (txt[0] !== '[' && logType === 'log') {
				console.log(msg._text);
			}
		});

		if (scopes.includes(SCOPE_OP_REQUEST)) {
			await domains.doOptimizeRequests(page);
		}

		let viewPortH = options.viewPortH;
		if (scopes.includes(SCOPE_OP_SCROLL)) {
			viewPortH += scrollHeightFactor;
		}

		await page.setUserAgent(options.agent);
		await page.setViewport({ width: options.viewPortW, height: viewPortH});
		await page.goto(decodedUrl, {waitUntil: 'networkidle0', timeout: options.pageTimeout});

		const funcActions = await domains.getDomainFuncActionsByScopes(scopes);
		if (scopes.includes(SCOPE_OP_SCROLL)) {
			await domains.scrollAndFuncDoActions(page, options, funcActions);
		} else {
			await domains.doFuncActions(page, options, funcActions);
		}

		let html = await page.content()
		res.send(html);

	} catch (error) {
		console.log('error: ', error);
		res.send('Error')
	}

	if (page) {
		await page.close();
		console.log('Closed page');
	}
	// await browser.close();
})


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
})
