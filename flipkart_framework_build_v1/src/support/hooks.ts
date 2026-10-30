import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { Browser, chromium } from "playwright";
import { config } from "../config/config";
import { CustomWorld } from "./world";

let workerBrowser: Browser;

// Keep Cucumber step/hook timeouts aligned with the framework-level timeout.
setDefaultTimeout(config.defaultTimeout);

/** Launch one Chrome process per Cucumber worker. */
BeforeAll(async () => {
  workerBrowser = await chromium.launch({
    headless: config.headless,
    channel: "chrome",
    slowMo: config.slowMo,
  });
});

/** Close the worker browser after its scenarios finish. */
AfterAll(async () => {
  await workerBrowser?.close();
});

/** Create a separate context and page for each scenario to prevent state leakage. */
Before(async function (this: CustomWorld) {
  this.browser = workerBrowser;
  this.context = await workerBrowser.newContext();
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.defaultTimeout);
  this.page.setDefaultNavigationTimeout(config.defaultTimeout);
  this.initializePages();
});

/** Capture unexpected failure evidence and close the scenario context. */
After(async function (this: CustomWorld, scenario) {
  if (
    scenario.result?.status === Status.FAILED &&
    this.page &&
    !this.page.isClosed()
  ) {
    try {
      await this.attach(
        `FAILED: ${scenario.pickle.name}\n${scenario.result.message ?? ""}`,
        "text/plain",
      );
      await this.attach(
        await this.page.screenshot({ fullPage: true }),
        "image/png",
      );
    } catch (error) {
      console.error("Failure screenshot could not be attached", error);
    }
  }

  await this.context?.close();
});
