import { test as base } from '@playwright/test';
import { LoginSauce } from '../page-objects/LoginSauce';

type FixtureType = {
    pom: LoginSauce;
};

export const customTest = base.extend<FixtureType>({
    pom: async ({ page }, use) => {
       // await page.goto('https://saucedemo.com');
        const loginInstance = new LoginSauce(page);
        await loginInstance.goto();
        await loginInstance.login('standard_user', 'secret_sauce');
        await use(loginInstance);
    }
});