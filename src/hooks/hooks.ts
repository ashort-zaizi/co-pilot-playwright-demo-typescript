import { BeforeAll, Before, AfterAll, After  } from "@cucumber/cucumber"
import { chromium, Browser, Page } from "@playwright/test"
import { fixture } from "./pageFixture"

let browser: Browser
let page: Page


BeforeAll(async function () {
    browser = await chromium.launch({ headless: false })
    // page = await browser.newPage()
    // fixture.page = page
})

Before(async function () {
    page = await browser.newPage()
    fixture.page = page
})

After(async function () {
    await fixture.page.close()
})

AfterAll(async function () {
    await page.close()
    await browser.close()
})
