const puppeteer = require("puppeteer");
const PORT      = process.env.PORT || 8080
var http        = require('http');
var url         = require('url');

http.createServer(function (req, res) {
  (async () => {
    //Google
    try {
      var browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      var page    = await browser.newPage();
      var query   = url.parse(req.url, true).query
      await page.goto(`https://www.google.com/search?&tbm=isch&q=${query.q}`);
      await page.waitForSelector("div#isr_mc");

      var result = await page.evaluate((q) => {
        var imgs = document.querySelectorAll(`div#rg_s > div[jscontroller='Q7Rsec'] > a`);
        var href = imgs[0].getAttribute("href");
        var url  = unescape(href.split('?')[1].split('=')[1]).split('&')[0];
        var srcp = unescape(href.split('?')[1].split('=')[2]).split('&')[0];

        //return JSON.parse(raw);
        return '{ "term": "' + q + '", "murl": "' + url + '", "source_page": "' + srcp + '" }';
      }, query.q);

      await browser.close();
      console.log(result);
      console.log("INFO: Browser Closed");
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(result);
      res.end();
    } catch (err) {
      console.log(err);
      await browser.close();
      console.log("ERROR: Browser Closed");
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end();
    }
  })();

  //Bing
  /*
  (async () => {
    try {
      var browser = await puppeteer.launch({ headless: true });
      var page    = await browser.newPage();
      var query   = url.parse(req.url, true).query
      await page.goto(`https://www.bing.com/images/search?q=${query.q}`);
      await page.waitForSelector("ul.dgControl_list");

      var result = await page.evaluate(() => {
        var imgs = document.querySelectorAll(`a.iusc`);
        var raw  =  imgs[0].getAttribute("m");
        //return JSON.parse(raw);
        return raw;
      });

      await browser.close();
      console.log(result);
      console.log("INFO: Browser Closed");
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(result);
      res.end();
    } catch (err) {
      console.log(err);
      await browser.close();
      console.log("ERROR: Browser Closed");
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end();
    }
  })();
  */
}).listen(PORT, () => console.log(`Listening on ${PORT}`));
