const puppeteer = require("puppeteer");
var http        = require('http');
var url         = require('url');

http.createServer(function (req, res) {
  (async () => {
    //Google
    try {
      var browser = await puppeteer.launch({ headless: true });
      var page    = await browser.newPage();
      var query   = url.parse(req.url, true).query
      await page.goto(`https://www.google.com/search?&tbm=isch&q=${query.q}`);
      await page.waitForSelector("div#isr_mc");

      var result = await page.evaluate(() => {
        var imgs = document.querySelectorAll(`div#rg_s > div[jscontroller='Q7Rsec'] > a`);
        var href = imgs[0].getAttribute("href");
        var url  = unescape(href.split('?')[1].split('=')[1]).split('&')[0];

        //return JSON.parse(raw);
        return '{ "murl": "' + url + '" }';
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
}).listen(8080);
