import { test, expect, Page, BrowserContext } from '@playwright/test';
import { LoginSauce } from '../page-objects/LoginSauce';
let page: Page;
let context: BrowserContext | undefined;
test.describe('Sauce Demo Tests', () => {
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const login = new LoginSauce(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});



test('Add to Card', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('3');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});


test('Remove from Cart', async () => {
    // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    // await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});
test('Checkout', async () => {
  
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('[data-test="firstName"]').fill('spasenka');
    await page.locator('[data-test="lastName"]').fill('aaa');
    await page.locator('[data-test="postalCode"]').fill('233');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
});
test.afterAll(async () => {
    if (context) {
        await page.locator('button[id="react-burger-menu-btn"]').click();
        await page.locator('#logout_sidebar_link').click();
        await context.close();
    }
});
});

