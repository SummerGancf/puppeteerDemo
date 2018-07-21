const puppeteer = require('puppeteer');

//default is true .puppeteer.launch({headless:true})
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();

//Turn off headless mode - sometimes it's useful to see what the browser is displaying
(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();

// slow down by 250ms
(async () => {
  const browser = await puppeteer.launch({headless:false,slowMo:250});
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();

//Capture console output
(async () => {
  const browser = await puppeteer.launch({headless:false,slowMo:250});
  const page = await browser.newPage();
  await page.goto('http://www.bing.com');
  await page.evaluate(() => console.log(`url is ${location.href}`));

  await browser.close();
})();

//debugger
(async () => {
  const browser = await puppeteer.launch({devtools: true});
  const page = await browser.newPage();
  await page.goto('http://www.bing.com');
  await page.evaluate(() => {debugger;});
  await browser.close();
})();