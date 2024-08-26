import {test, expect} from '@playwright/test'
import { beforeEach } from 'node:test';


test.beforeEach(async({page}) => {
    page.goto('/');
     
})

test('basic test', async ({page}) => {

    await expect(page).toHaveTitle('Credit Association');

    //await page.close();
})
test('Register with valid mandatory fields - no invalid-feedback is displayed', async({page}) => {

    const firstName = page.getByLabel("First name");
     const lastName = page.getByLabel("Last name");
     const email = page.getByLabel("Email");
     const dateOfBirth = page.locator('#dob');
     const registerBtn = page.getByRole("button", {name: "Register"});
     const feedback = page.locator('.invalid-feedback');

     await firstName.fill("John");
     await lastName.fill("Smith");
     await email.fill("john@smith.com");
     await registerBtn.click();

     const count = await feedback.count();
     for (let i = 0; i < count; i ++){
        await expect(feedback.nth(i)).toBeHidden();
        //await expect(feedback.nth(i)).toHaveCount(0); - znajduje 1 bo ten element istnieje w DOM
     }
})
test('Register with empty mandatory fields - invalid-feddback', async({page}) => {

     const registerBtn = page.getByRole("button", {name: "Register"});
     const feedback = page.locator('.invalid-feedback');

     await registerBtn.click();
     await expect(feedback).toHaveCount(3);

})
test("Register test with all inputs", async({page})=> {
    
    const firstName = page.getByLabel("First name");
     const lastName = page.getByLabel("Last name");
     const email = page.getByLabel("Email");
     const dateOfBirth = page.locator('#dob');
     const registerBtn = page.getByRole("button", {name: "Register"});
     const feedback = page.locator('.invalid-feedback');

     await firstName.fill("John");
     await lastName.fill("Smith");
     await email.fill("john@smith.com");
     await registerBtn.click();

     for (const message of await feedback.all()){
            console.log(await message.textContent());
     }
     await expect(feedback).toHaveCount(3);
     await expect(feedback.nth(0)).toContainText("Valid first name is required");
     await expect(feedback.nth(1)).toContainText("Valid last name is required");
     await expect(feedback.nth(2)).toContainText("Please enter a valid email address");
})