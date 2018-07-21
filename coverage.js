const puppeteer = require('puppeteer');
puppeteer.launch({headless:false}).then(async browser => {
  const page = await browser.newPage();
  // Enable both JavaScript and CSS coverage
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);
// Navigate to page
  await page.goto('https://www.bing.com');
  await page.type('.b_searchbox', 'puppeteer');
  await page.click('.b_searchboxSubmit');
// Disable both JavaScript and CSS coverage
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);
  let totalBytes = 0;
  let usedBytes = 0;
  const coverage = [...jsCoverage, ...cssCoverage];
  for (const entry of coverage) {
    totalBytes += entry.text.length;
    for (const range of entry.ranges)
      usedBytes += range.end - range.start - 1;
  }
  console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
  await browser.close();
});