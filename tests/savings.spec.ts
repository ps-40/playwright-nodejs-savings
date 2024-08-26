import {test, expect} from '@playwright/test'

test('basic', async({page}) => {
    await page.goto('/savings.html');

    await expect(page).toHaveTitle('Save with us');
})
test('Verify table content', async({page}) => {
    await page.goto('/savings.html');

    const table = page.locator('#rates');
    const rows = table.locator('tr');
    const usRow = table.filter({hasText: 'Us'});
    const competitionRow = rows.filter({hasText: 'Competition'});
    const usData = ['Us', '4%', '5%', '6%'];

    const tableData = [
        ['','6 months', '1 year', '2 years'],
        ['Us', '4%', '5%', '6%'],
        ['Competition', '2%', '3%', '4%']
    ]

    await expect(rows).toHaveCount(3);

    //iterate through each row
    for (let j = 0; j < await rows.count(); j++) {

        const cells =  rows.nth(j).locator('td');

        //iterate through each cell in the row
        for (let i = 0; i < await cells.count(); i++) {
            const cellText = await cells.nth(i).textContent();
            expect(cellText).toBe(tableData[j][i]);
        }
    }
    
    //await expect(await usRow.textContent()).toContain();
})