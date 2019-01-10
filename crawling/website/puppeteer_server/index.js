const express = require('express');
const app = express();
require('events').EventEmitter.prototype._maxListeners = 1000;

const browser_instance = require('./browser_instance');
const domains = require('./domains/domains');

const PORT = process.env.PORT || 3000;
const options = require('./options');
const logger = require('./logger')(module);

const SCOPE_OP_REQUEST = 'opreq';
const SCOPE_OP_SCROLL  = 'scroll';

const _scopes = require('./scopes');

const getBrowserDomainScope = (reqScopes, scopes) => {
	for (let i = 0; i < reqScopes.length; i++) {
		if (scopes.includes(reqScopes[i])) {
			return reqScopes[i];
		}
	}
	return 'unknow';
}

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
	logger.info(`Decoded url: ${decodedUrl}`);
	logger.info(`Scopes: ${scopes}`);

	let currentPage = null;
	let currentBrowserScope = 'unknow';
	let isCurrentPageClosed = false;
	try {
        let start = new Date().getTime();
		let browserScope = getBrowserDomainScope(scopes, _scopes);
		logger.info(`browserScope: ${browserScope}`);
		const page = await browser_instance.getPage(browserScope);
		let end = new Date().getTime();
		logger.info(`${browserScope}: Get page takes: ${end - start}ms`);		
		
		start = new Date().getTime();
		if (!page) {
			return res.send('Can not create page');
		}

		currentPage = page;
		currentBrowserScope = browserScope;
		page.once('close', () => {
			isCurrentPageClosed = true;
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
		start = new Date().getTime();
		await page.goto(decodedUrl, {waitUntil: 'networkidle0', timeout: options.pageTimeout});
		end = new Date().getTime();
		logger.info(`${browserScope}: Fetch page takes: ${end - start}ms`);

		start = new Date().getTime();
		const funcActions = await domains.getDomainFuncActionsByScopes(scopes);

		if (scopes.includes(SCOPE_OP_SCROLL)) {
			await domains.scrollAndFuncDoActions(page, options, funcActions);
		} else {
			await domains.doFuncActions(page, options, funcActions);
		}

		let html = await page.content();

		logger.info(`${browserScope}: isCurrentPageClosed: ${isCurrentPageClosed}`);
		if (!isCurrentPageClosed) {
			// put to the pool
			page.removeAllListeners('request'); // remove listeners we were using for this task.
			logger.info(`${browserScope}: Release the page`);
            await page.goto('about:blank');
			await browser_instance.releasePage(page, browserScope);
		} else {
			// the page might get closed automatically
			logger.info(`${browserScope}: Destroy the page`);
			await browser_instance.destroyPage(page, browserScope);
		}
		end = new Date().getTime();
		logger.info(`${browserScope}: Process page takes: ${end - start}ms`);

		res.status(200).send(html);
	} catch (error) {
		logger.info(`${currentBrowserScope}: Error while processing page: `, error);
		try {
			if (currentPage) {
				if (!isCurrentPageClosed) {
					await currentPage.close();
				}
				await browser_instance.destroyPage(currentPage, currentBrowserScope);
				logger.info(`${currentBrowserScope}: Closed page with error and destroy the page`);
			}
		} catch (error) {
			logger.info(`${currentBrowserScope}: Error while destroying a page`);	
		}
		
		res.status(500).send('Error');
	}
})


app.listen(PORT, () => {
	logger.info(`Server is listening on port ${PORT}`);
})
