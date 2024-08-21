const { chromium} = require('@playwright/test');

(async function firstScript() {
    const browser = await chromium.launch();
    await browser.close();
    console.log('We reached this line');
})();