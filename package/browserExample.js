const puppeteer = require('puppeteer');

//一个断开连接并重连到[Browser]的例子：
(async () => {
  const browser = await puppeteer.launch({headless:false,slowMo:250});
  // Store the endpoint to be able to reconnect to Chromium
  const wsEndpoint = browser.wsEndpoint();
  // Disconnect puppeteer from Chromium
  browser.disconnect();

  // Use the endpoint to reestablish a connection
  const browser2 = await puppeteer.connect({browserWSEndpoint:wsEndpoint});
  // Close Chromium
  await browser2.close();
})();

//创建一个匿名的浏览器上下文。这将不会与其他浏览器上下文分享cookies/cache
(async () => {
  const browser = await puppeteer.launch({headless:false,slowMo:250});
  // 创建一个匿名的浏览器上下文
  const context = await browser.createIncognitoBrowserContext();
// 在一个原生的上下文中创建一个新页面
  const page = await context.newPage();

  await page.goto('https://example.com');
  await browser.close();
})();

//如何使用 BrowserFetcher 下载一个指定版本的 Chromium 并且 Puppeteer 使用其运行的例子：
(async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download('575194');
  const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath});
  const page = await browser.newPage();
  await page.goto('http://www.bing.com');
  await page.evaluate(() => {debugger;});
  await browser.close();
})();
