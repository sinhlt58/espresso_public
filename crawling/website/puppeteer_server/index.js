const express = require('express');
// const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();

const utils = require('./utils');

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

const SCOPE_OP_REQUEST = 'opreq'
const SCOPE_OP_SCROLL  = 'scroll'
const SCOPE_SHOPEE_COMMENT = 'shopeec'

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
    await page.goto(decodedUrl, {waitUntil: 'networkidle0', timeout: options.pageTimeout});
    
    if (scopes.includes(SCOPE_OP_SCROLL)) {
      await page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);
      });
      if (scopes.includes(SCOPE_SHOPEE_COMMENT)) {
        console.log("Get comments and change DOM for shopee");
        try {
          // Click on review which has comments and calcuate number of reviews.
          const buttonBinhLuan = await page.$('div.product-rating-overview__filter--with-comment')
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
    
                for (let i = 0; i < rateElements.length; i++){
                  data.push({
                    content: cotentElements[i].textContent,
                    rate: rateElements[i].getElementsByClassName('icon-rating-solid').length
                  })
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
            });
            return true
          }, reviewsData);

        }catch(error) {
          console.log(error);
          console.log("Can't find the element or error while reading reviews");
        }
      }
    }
    
    let html = await page.content()
    res.send(html);

    
  }catch(error) {
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

//create application/x-www-form-urlencoded parser // default true
// app.use(bodyParser.urlencoded({ extended: false })); // => value only string or array
// app.use(bodyParser.json()); // => cho truy cap req.body
/**allow other ip access */
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//   next();
// });
