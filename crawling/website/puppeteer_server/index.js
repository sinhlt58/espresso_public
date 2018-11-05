const express = require('express');
// const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;
const options = {
  width: 1920,
  height: 1080,
  viewPortW: 1920,
  viewPortH: 1080,
  scrollHeightFactor: 2000,
  agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
}

const SCOPE_OP_REQUEST = 'opreq'
const SCOPE_OP_SCROLL  = 'scroll'

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

  try {
    if (!_browser) {
      return res.send('The browser have not started yet.');
    }
    
    const page = await _browser.newPage();

    if (scopes.includes(SCOPE_OP_REQUEST)) {
      // 1. Intercept network requests.
      await page.setRequestInterception(true);

      page.on('request', req => {
        // 2. Ignore reqs that don't produce DOM (img/css/media)
        const whiteList = ['document', 'script', 'xhr', 'fetch'];

        if (!whiteList.includes(req.resourceType())) {
          return req.abort();
        }
        
        req.continue(); // 3. Pass through all other requests.
      });
    }

    let viewPortH = options.viewPortH;
    if (scopes.includes(SCOPE_OP_SCROLL)) {
      viewPortH += scrollHeightFactor;
    }

    await page.setUserAgent(options.agent);
    await page.setViewport({ width: options.viewPortW, height: viewPortH});
    await page.goto(decodedUrl, {waitUntil: 'networkidle0'});
    
    if (scopes.includes(SCOPE_OP_SCROLL)) {
      await page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);
      });
    }
    
    let html = await page.content()
    res.send(html);

    await page.close();
    console.log('Close page');
  }catch(error) {
    console.log('error: ', error);
    res.send('Error')
  }
  // await browser.close();
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

//create application/x-www-form-urlencoded parser // default true
// app.use(bodyParser.urlencoded({ extended: false })); // => value only string or array
// app.use(bodyParser.json()); // => cho truy cap req.body
/**allow other ip access */
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//   next();
// });