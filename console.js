const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.once('load', () => console.log('Page loaded!'));//当监听到load时间，在控制台打印
  await page.goto('http://www.bing.com');
  await browser.close();
})();

puppeteer.launch({devtools: true}).then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => { //如果没有监听console事件，这里的输出不会出现在你的控制台
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`); // 打印到代码的控制台
  });
  page.evaluate(() => console.log('hello', 5, {foo: 'bar'})); // 这个代码表示在页面实例中执行了console.log。
});