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
    return res.status(500);
  let URL = decodeURIComponent(req.query.url);
  console.log('After decode: ' + URL);
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(URL, {waitUntil: 'networkidle0'});
    let html = await page.content()
    res.send(html);
    await browser.close();
  });
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})