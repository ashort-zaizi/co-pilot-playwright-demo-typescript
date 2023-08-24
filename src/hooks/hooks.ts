import { BeforeAll, Before, AfterAll, After, Status  } from "@cucumber/cucumber"
import { Browser, BrowserContext } from "@playwright/test"
import { invokeBrowser } from "../helper/browser/browserManager"
import { getEnv } from "../helper/env/env"
import { fixture } from "./pageFixture"

let browser: Browser
let context: BrowserContext


BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser()
})

Before(async function () {
    context = await browser.newContext()
    const page = await browser.newPage()
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
