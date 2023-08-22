import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"

import { chromium, Page, Browser, expect } from "@playwright/test"

let browser: Browser
let page: Page

setDefaultTimeout(60 * 1000 * 2)


Given('user is on the app login page', async function() {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    await page.goto('https://bookcart.azurewebsites.net/')
})
   
Given('user clicks on the login link', async function () {
    await page.locator("//span[text()='Login']").click()
});

Given('user enters the username {string}', async function (username) {
    await page.locator("input[formcontrolname='username']").type(username)
});

Given('user enters the password {string}', async function (password) {
    await page.locator("input[formcontrolname='password']").type(password)
});

When('clicks on the login button', async function () {
    await page.locator("button[color='primary']").click()
});

Then('user is successfully logged in', async function () {
    const text = await page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent();
    console.log(text);
    await browser.close()
});

Then('user is not logged in', async function () {
    const failureMessage = await page.locator("//mat-error[@role='alert']");
    await expect(failureMessage).toBeVisible();
    await browser.close()
});

