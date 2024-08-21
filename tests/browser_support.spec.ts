import {test, chromium, webkit,firefox} from '@playwright/test'

test('Check three browsers', async() => {
    
    for (const browserType of [chromium, webkit, firefox]) {
        console.log('Running:', browserType.name());

        const browser = await browserType.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page. goto('https://www.whatsmybrowser.org');
        await page.screenshot({path: `pw-${browserType.name()}.png`});//zapisuje plik w prokekcie palywright
        console.log('Running:', browserType.name());

        await browser.close();

    }
}); //nie dziala, otwiera trzy przegladarki ale w kazdej pokazuje "you're using Chrome"
    //firefoz czasem sie wywala, moze parallel pomoze
test('Check the browser', async({browser}) => {
    const browserType = browser.browserType();
    const page = await browser.newPage();

    await page.goto('https://www.whatsmybrowser.org');
    //await page.screenshot({path: `pw-${browserType.name()}1.png`})
    console.log('Browser running:', browserType.name());
    //console.log('Browser running:', browser.browserType().name());


    await page.close(); //musi byc w tej kolejnosci bo nie zamknie
    //await browser.close(); jak jest async({browser}) to sam zamknie przegladarke 
    
    //tutaj mozna uruchomic rozne przegladarki podczas odpalania testu - w projects playwright.config
});
test('check three browsers with userAgent', async() => {

    const browsers = [
        { type: chromium, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
        { type: firefox, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0' },
        { type: webkit, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15' }
      ];

      for (const browserInfo of browsers) {

        
        const browserType = await browserInfo.type;
        const browser = await browserType.launch();
        const context = await browser.newContext({
            userAgent : browserInfo.userAgent
      });
        const page = await context.newPage();

        await page.goto('https://www.whatsmybrowser.org');
        console.log("Browser running:", browserType.name());

        await page.close();
        await browser.close();
      }
      
}); //podaje userAgent ale nie jestem przekonana, jaki sie poda ua taki wyswietli na stronie

