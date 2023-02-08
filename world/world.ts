import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";
import { CartPage } from "../pages/cart-page";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";

let page: Page;
let browser: Browser;
let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;

setDefaultTimeout(30_000);

Before(async function () {
    try {
        // Do not launch headed browser on GitHub CI.
        browser = await chromium.launch({ headless: process.env.CI ? true : false });
        const context = await browser.newContext();
        page = await context.newPage();

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
    } catch (error) {
        console.error(`Error initializing the browser.`);
        throw new Error(`Error initializing the browser ${error}`);
    }

    return page;
});

After(async function () {
    await browser.close();
});

export { page, browser, loginPage, productsPage, cartPage };
