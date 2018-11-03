const express = require('express');
// const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

//create application/x-www-form-urlencoded parser // default true
// app.use(bodyParser.urlencoded({ extended: false })); // => value only string or array
// app.use(bodyParser.json()); // => cho truy cap req.body
/**allow other ip access */
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//   next();
// });

app.get('/api/v1/viewDom', function(req, res) {
  if (req.query.url == null)
    return res.send('no url');

  let URL = decodeURIComponent(req.query.url);
  console.log('After decode: ' + URL);
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    try {
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

      await page.goto(URL, {waitUntil: 'networkidle0'});
      let html = await page.content()
      res.send(html);
    }catch(error) {
      console.log('error: ', error);
      res.send('error')
    }
    await browser.close();
  });
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})