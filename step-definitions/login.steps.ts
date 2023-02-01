import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page, loginPage, productsPage } from "../world/world";

Given('the User is on login page', async function () {
    await loginPage.goto();
});

When('the User tries to login with {string} as username and {string} as password', async function (username: string, password: string) {
    await loginPage.doLogin(username, password);
});

Then('the User should be on Products page', async function () {
    await expect(page).toHaveURL(/.*inventory.html/);

    await expect(productsPage.productHeading).toBeVisible();
});

Then('the User should see a locked out error message', async function () {
    await expect(loginPage.errorMessage).toBeVisible();

    const errorText = await loginPage.errorMessage.textContent();
    expect(errorText).toEqual('Epic sadface: Sorry, this user has been locked out.');
});

Then('the User should see invalid credentials error message', async function () {
    await expect(loginPage.errorMessage).toBeVisible();

    const errorText = await loginPage.errorMessage.textContent();
    expect(errorText).toEqual('Epic sadface: Username and password do not match any user in this service');
});
