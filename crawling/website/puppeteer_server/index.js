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
	let isCurrentPageClosed = false;
	try {
		const page = await browser_instance.getPage();

		if (!page) {
			return res.send('Can not create page');
		}

		currentPage = page;
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
		await page.goto(decodedUrl, {waitUntil: 'networkidle0', timeout: options.pageTimeout});

		const funcActions = await domains.getDomainFuncActionsByScopes(scopes);

		if (scopes.includes(SCOPE_OP_SCROLL)) {
			await domains.scrollAndFuncDoActions(page, options, funcActions);
		} else {
			await domains.doFuncActions(page, options, funcActions);
		}

		let html = await page.content();

		logger.info(`isCurrentPageClosed: ${isCurrentPageClosed}`);
		if (!isCurrentPageClosed) {
			// put to the pool
			page.removeAllListeners('request'); // remove listeners we were using for this task.
			logger.info('Release the page');
			await browser_instance.releasePage(page);
		} else {
			// the page might get closed automatically
			logger.info('Destroy the page');
			await browser_instance.destroyPage(page);
		}

		res.status(200).send(html);
	} catch (error) {
		logger.info('error: ', error);
		try {
			if (currentPage) {
				if (!isCurrentPageClosed) {
					await currentPage.close();
				}
				await browser_instance.destroyPage(currentPage);
				logger.info('Closed page with error and release the page');
			}
		} catch (error) {
			logger.info('Error while destroying a page');	
		}
		
		res.status(500).send('Error');
	}
})


app.listen(PORT, () => {
	logger.info(`Server is listening on port ${PORT}`);
})
