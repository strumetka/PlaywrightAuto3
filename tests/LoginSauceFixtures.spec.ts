import { test, expect , type Page, type BrowserContext } from '@playwright/test';
import { LoginSauce } from '../page-objects/LoginSauce';
import { customTest } from '../fixtures/fixtureDemo';
let page: Page;
let context: BrowserContext | undefined;


customTest('Fixtures test',async ({ pom }) => {
  await expect(pom.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});