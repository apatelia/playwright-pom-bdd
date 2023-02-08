import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page, loginPage, productsPage } from "../world/world";

Given('the user is logged in and on Products page', async function () {
    await loginPage.goto();
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(productsPage.productHeading).toBeVisible();
});

When('the user adds {string} to the cart', async function (productName: string) {
    await productsPage.addProductToCart(productName);
});

Then('the cart item badge must show correct count of {int}', async function (count: number) {
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

Then('{string} link in footer should be visible', async function (link: string) {
    switch (link) {
        case 'Twitter':
            await expect(productsPage.footer.twitterLink).toBeEnabled();
            break;
        case 'Facebook':
            await expect(productsPage.footer.facebookLink).toBeEnabled();
            break;
        case 'LinkedIn':
            await expect(productsPage.footer.linkedInLink).toBeEnabled();
            break;
        default:
            break;
    }
});

When('the user clicks {string} link from footer, it should open correct page in a new tab', async function (socialMedia: string) {
    const newPagePromise = page.context().waitForEvent('page');

    switch (socialMedia) {
        case 'Twitter':
            await productsPage.footer.clickTwitterLink();
            const twitterPage = await newPagePromise;
            await twitterPage.waitForLoadState();
            await expect(twitterPage).toHaveURL('https://twitter.com/saucelabs');
            break;
        case 'Facebook':
            await productsPage.footer.clickFacebookLink();
            const facebookPage = await newPagePromise;
            await facebookPage.waitForLoadState();
            await expect(facebookPage).toHaveURL('https://www.facebook.com/saucelabs');
            break;
        case 'LinkedIn':
            await productsPage.footer.clickLinkedInLink();
            const linkedInPage = await newPagePromise;
            await expect(linkedInPage).toHaveURL(/.*https:\/\/www\.linkedin\.com\/company\/sauce-labs\/.*/);
            break;
        default:
            break;
    }
});

Then('copyright text in footer should be visible', async function () {
    await expect(productsPage.footer.copyrightText).toBeVisible();
});

Then('the copyright text contents should be correct', async function () {
    const textContent = await productsPage.footer.getCopyrightTextContent();
    expect(textContent).toEqual('© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
});

Then('Robot image in footer should be visible', async function () {
    await expect(productsPage.footer.robotImage).toBeVisible();
});
