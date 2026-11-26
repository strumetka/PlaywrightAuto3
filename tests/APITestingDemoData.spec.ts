import { test, expect, request } from '@playwright/test';
const LoginPayload={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token:any;
test.beforeAll( async ()=> {
    
const apiContext = await request.newContext();
const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: LoginPayload
});//200, 201,..
await expect(loginResponse.ok()).toBeTruthy();

const loginResponseJson = await loginResponse.json();
token = loginResponseJson.token;
console.log('Login successful, token:', token);


    

});
test('API login test', async ({page}) => {

    page.addInitScript(value=>
    {
        window.localStorage.setItem('token', value);
    }
    , token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.pause();
   //await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

   await page.getByRole("button",{name :"Checkout"}).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");

   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();

   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});