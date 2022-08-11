const puppeteer = require('puppeteer-core');

 export const exportPdf  = async (link:string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link);
    let filename = ''
    filename = link.match(/\/([^\/]+)\/?$/)[1]
    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      };
    });
    page.setViewport({dimensions})
    await page.pdf({path: './pdf/' + filename +'.pdf', format: 'a4', fullPage : true}); 
    await browser.close();
  };