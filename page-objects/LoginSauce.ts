import { Locator, Page } from '@playwright/test';

export class LoginSauce{
   readonly username: Locator;
    readonly password: Locator;
readonly loginButton: Locator;
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
        this.username = page.locator('[placeholder="Username"]');
        this.password = page.locator('[placeholder="Password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async goto()
    {
        await this.page.goto('https://www.saucedemo.com/');
    }
    
}