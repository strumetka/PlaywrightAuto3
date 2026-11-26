import { test, expect } from '@playwright/test';
import { LoginSauce } from '../page-objects/LoginSauce';

 const placeOrder =  JSON.parse(JSON.stringify(require('../test-data/placeorder.json')));

for (const data of placeOrder) {
  test(`Client Login for ${data.productname}`, async ({ page }) => {
      await page.pause();
    const login = new LoginSauce(page);
    await login.goto();
  
    await login.login(data.username, data.password);

    if (data.loginSuccessfull) {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await page
        .locator('.inventory_item_description')
        .filter({ hasText: data.productname })
        .locator('button', { hasText: 'Add to Cart' })
        .click();
         await page.locator('button[id="react-burger-menu-btn"]').click();
        await page.locator('#logout_sidebar_link').click();
        await page.close();
    } else {
      await expect(page.locator('.error-message-container')).toHaveText("Epic sadface: Username and password do not match any user in this service");
      const errorMessage = await page.locator('.error-message-container').textContent();
      console.log('Login failed as expected:', errorMessage);  
    await page.close();
      
    }
  });
}