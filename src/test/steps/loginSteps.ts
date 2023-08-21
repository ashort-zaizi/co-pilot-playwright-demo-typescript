import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

Given('user is on the login page', async function() {
    await this.page.goto('https://bookcart.azurewebsites.net/')
})