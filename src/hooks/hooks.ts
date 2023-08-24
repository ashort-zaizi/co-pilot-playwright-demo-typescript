import { BeforeAll, Before, AfterAll, After, Status  } from "@cucumber/cucumber"
import { chromium, Browser, Page, BrowserContext } from "@playwright/test"
import { fixture } from "./pageFixture"

let browser: Browser
let page: Page
let context: BrowserContext


BeforeAll(async function () {
    browser = await chromium.launch({ headless: false })
    context = await browser.newContext()
})

Before(async function () {
    page = await browser.newPage()
    fixture.page = page
})

After(async function ({ pickle, result }) {
    // Take screen shots
    if (result?.status === Status.FAILED) {
        const img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' })
        await this.attach(img, 'image/png')
    }

    await fixture.page.close()
    await context.close()
})

AfterAll(async function () {
    await browser.close()
})
