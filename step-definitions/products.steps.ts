import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page, loginPage, productsPage } from "../world/world";

Given('the user is logged in and on Products page',async function () {
    await loginPage.goto();
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(productsPage.productHeading).toBeVisible();
});

When('the user adds {string} to the cart', async function (productName: string) {
    await productsPage.addProductToCart(productName);
});

Then('the cart item badge must show correct count of {int}', async function (count:number) {
    const cartItemCount = await productsPage.header.getCartItemCount();
    expect(cartItemCount).toEqual(count);
});

Then('the user should be able to remove {string} from the cart, using the `Remove` button', async function (productName: string) {
    await productsPage.removeProductFromCart(productName);
});

Then('the cart item badge must not be displayed', async function () {
    await expect(productsPage.header.cartItemCount).toHaveCount(0);
});

When('the user clicks Log out from hamburger menu', async function () {
    await productsPage.header.doLogout();
});

Then('the user must not be logged out', async function () {
    await expect(loginPage.loginButton).toBeVisible();
});
