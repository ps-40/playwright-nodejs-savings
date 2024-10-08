import {test, chromium, webkit,firefox} from '@playwright/test'

test('Check the browser', async({browser}, testInfo) => { //mysle ze najlepsza opcja, odpala na trzech przegladarkach
    const browserType = browser.browserType();
    const page = await browser.newPage();
    await page.goto('https://www.whatsmybrowser.org');

    //zapisuje screenshot bezposrednio w projekcie playwright
    await page.screenshot({path: `pw-${browserType.name()}.png`})
    //zapisuej screenshot w folderze outputDir z .config
    const screenshotpath = testInfo.outputPath(`${browserType.name()}.png`);
    await page.screenshot({path: screenshotpath});

    console.log('Browser running:', browserType.name());
    //console.log('Browser running:', browser.browserType().name());


    await page.close(); //musi byc w tej kolejnosci bo nie zamknie
    await browser.close(); //jak jest async({browser}) to sam zamknie przegladarke ale jak jest testInfo
    //to mjusi byc browser.close() bo inaczej dlugo mieli 
    
    //tutaj mozna uruchomic rozne przegladarki podczas odpalania testu - w projects playwright.config
});
/*
test('Check three browsers', async() => {
    
    for (const browserType of [chromium, webkit, firefox]) {
        console.log('Running three browsers:', browserType.name());

        const browser = await browserType.launch();
        const context = await browser.newContext();
        const page = await context.newPage();        

        await page. goto('https://www.whatsmybrowser.org');
        await page.screenshot({path: `pw-${browserType.name()}.png`});//zapisuje plik w prokekcie playwright

        await browser.close();

    }
}); //nie dziala, otwiera trzy przegladarki ale w kazdej pokazuje "you're using Chrome"
    //firefox czasem sie wywala, moze parallel pomoze

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
        console.log("Browser running with userAgent:", browserType.name());

        await page.close();
        await browser.close();
      }
      
}); //podaje userAgent ale nie jestem przekonana, jaki sie poda ua taki wyswietli na stronie



// test('Check the browser', async ({ browser }, testInfo) => {
// //....
// //sciezka dla screenshot, zapisuje w pliku outputPath
// const screenshotPath = testInfo.outputPath(`pw-name.png`); 
//     await page.screenshot({ path: screenshotPath });
*/
