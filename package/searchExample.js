const puppeteer = require('puppeteer');
puppeteer.launch({headless:false}).then(async browser => {
  const page = await browser.newPage();

  await page.goto('https://www.bing.com');
  await page.type('.b_searchbox', 'puppeteer');
  await page.click('.b_searchboxSubmit');
  await browser.close();
});