import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, firefox, Page, webkit } from "@playwright/test";
import { CartPage } from "../pages/cart-page";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import * as dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

let page: Page;
let browser: Browser;
let browserName: string;
let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;

setDefaultTimeout(30_000);

BeforeAll(async function () {
    // Read browser to be used from the configuration.
    if (process.env.BROWSER) {
        browserName = process.env.BROWSER.toLowerCase()
    } else {
        console.warn(`\n\nWARNING: Browser setting is not configured. Configure it in ".env" file.`);
        console.info(`Chromium will be used for this test run.`);
        browserName = "chromium";
    }

    console.log(`\n\nCONFIGURATION:`);
    console.log(`==============`);
    console.log(`Browser ==> ${browserName} \n\n`);
});

Before(async function () {
    try {
        switch (browserName) {
            case `google chrome`:
            case `chrome`:
            case `chromium`:
                // Do not launch headed browser on GitHub CI.
                browser = await chromium.launch({ headless: process.env.CI ? true : false });
                break;
            case `firefox`:
                // Do not launch headed browser on GitHub CI.
                browser = await firefox.launch({ headless: process.env.CI ? true : false });
                break;
            case `safari`:
                // Do not launch headed browser on GitHub CI.
                browser = await webkit.launch({ headless: process.env.CI ? true : false });
                break;
            default:
                // By default, run tests on Chrome.
                console.error(`Configured browser "${browserName}" is not supported.`);
                console.info(`Using default "Chromium" browser instead.`);
                browser = await chromium.launch({ headless: process.env.CI ? true : false });
                break;
        }
    } catch (error) {
        console.error(`An error occurred while launching "${browserName}" browser.`);
        console.log(`Launching default "Chromium" browser instead.`);
        browser = await chromium.launch({ headless: process.env.CI ? true : false });

        // Reset browser value to the default browser, in order to avoid any further browser launching failures.
        browserName = 'chromium';
    }

    const context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    return page;
});

After(async function () {
    await browser.close();
});

AfterAll(async function () {
    // Warn if browser was not configured.
    // Warning at the end of run is more visible.
    if (!process.env.BROWSER) {
        console.warn(`\nWARNING: Browser setting is not configured. Configure it in ".env" file.`);
        console.info(`Chromium was used for this test run.\n`);
    }
});

export { page, browser, loginPage, productsPage, cartPage };
