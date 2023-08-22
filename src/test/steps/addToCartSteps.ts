import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"

import { chromium, Page, Browser, expect } from "@playwright/test"

let browser: Browser
let page: Page

setDefaultTimeout(60 * 1000 * 2)


When('user searches for a {string}', async function (book) {
    await page.locator("input[type='search']").type(book)
    await page.locator("mat-option[role='option'] span").click()
});

When('user adds the book to the cart', async function () {
    await page.locator("//button[@color='primary']").click()
});

Then('the cart badge gets updated', async function () {
    const badgeCount = await page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount?.length)).toBeGreaterThan(0)
});

When('user search for a {string}', async function (string) {

});

When('user add the book to the cart', async function () {
 
});

Then('the cart badge should get updated', async function () {
    
});