import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, firefox, Page, webkit } from "@playwright/test";
import { CartPage } from "../pages/cart-page";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import * as dotenv from 'dotenv';
import { LOGGER } from "../utils/logger";

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
        LOGGER.warn(`Browser setting is not configured. Configure it in ".env" file.`);
        LOGGER.warn(`Chromium will be used for this test run.`);
        browserName = "chromium";
    }

    LOGGER.info(`Browser ==> ${browserName}`);
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
                LOGGER.error(`Configured browser "${browserName}" is not supported.`);
                LOGGER.info(`Using default "Chromium" browser instead.`);
                browser = await chromium.launch({ headless: process.env.CI ? true : false });
                break;
        }
    } catch (error) {
        LOGGER.error(`An error occurred while launching "${browserName}" browser.`);
        LOGGER.debug(`An error occurred while launching "${browserName}" browser.`);
        LOGGER.debug(error);
        LOGGER.info(`Launching default "Chromium" browser instead.`);
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
        LOGGER.warn(`Browser setting is not configured. Configure it in ".env" file.`);
        LOGGER.warn(`Chromium was used for this test run.\n`);
    }
});

export { page, browser, loginPage, productsPage, cartPage };
