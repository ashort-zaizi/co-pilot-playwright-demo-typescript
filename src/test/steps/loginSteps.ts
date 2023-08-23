import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { chromium, Page, Browser, expect } from "@playwright/test"
import { fixture } from "../../hooks/pageFixture"


setDefaultTimeout(60 * 1000 * 1) // 1 minutes

Given('user is on the app login page', async function() {
    await fixture.page.goto('https://bookcart.azurewebsites.net/')
})
   
Given('user clicks on the login link', async function () {
    await fixture.page.locator("//span[text()='Login']").click()
});

Given('user enters the username {string}', async function (username) {
    await fixture.page.locator("input[formcontrolname='username']").type(username)
});

Given('user enters the password {string}', async function (password) {
    await fixture.page.locator("input[formcontrolname='password']").type(password)
});

When('clicks on the login button', async function () {
    await fixture.page.locator("button[color='primary']").click()
});

Then('user is successfully logged in', async function () {
    const text = await fixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent();
    console.log(text);
});

Then('user is not logged in', async function () {const failureMessage = await fixture.page.locator("//mat-error[@role='alert']");
    await expect(failureMessage).toBeVisible();
});

