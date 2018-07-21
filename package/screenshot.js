const puppeteer = require('puppeteer');
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.bing.com');
  await page.screenshot({path: 'bing.png'});
  await browser.close();
});