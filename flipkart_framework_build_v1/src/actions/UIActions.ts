import { expect, Locator, Page } from "@playwright/test";

export type AttachFunction = (
  data: Buffer | string,
  mediaType?: string,
) => void | Promise<void>;

/** Central reusable toolbox for generic browser interactions, checks, and evidence. */
export class UIActions {
  constructor(
    private readonly page: Page,
    private readonly attach: AttachFunction,
  ) {}

  /** Attach a timestamped description and full-page screenshot to the current scenario. */
  async captureScreenshot(label: string): Promise<void> {
    await this.attach(`[${new Date().toISOString()}] ${label}`, "text/plain");
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, "image/png");
  }

  /** Execute an assertion, attach evidence on pass or fail, and preserve the original failure. */
  private async validate(
    name: string,
    assertion: () => Promise<void>,
  ): Promise<void> {
    try {
      await assertion();
      await this.captureScreenshot(`PASS - ${name}`);
    } catch (error) {
      try {
        await this.captureScreenshot(`FAIL - ${name}\n${String(error)}`);
      } catch (screenshotError) {
        console.error("Screenshot attachment failed", screenshotError);
      }
      throw error;
    }
  }

  /** Replace the current input value with the supplied text. */
  async enterText(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /** Clear an input value. */
  async clearText(locator: Locator): Promise<void> {
    await locator.clear();
  }

  /** Press a keyboard key such as Enter or Tab. */
  async pressKey(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  /** Click a button-like element. */
  async clickButton(locator: Locator): Promise<void> {
    await locator.click();
  }

  /** Click a hyperlink. */
  async clickLink(locator: Locator): Promise<void> {
    await locator.click();
  }

  /** Select an option in a native HTML select element. */
  async selectDropdown(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /** Wait until an element becomes visible. */
  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
  }

  /** Wait until an element becomes hidden or detached. */
  async waitForHidden(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "hidden" });
  }

  /** Assert visibility and attach a screenshot. */
  async verifyVisible(locator: Locator, name: string): Promise<void> {
    await this.validate(name, async () => expect(locator).toBeVisible());
  }

  /** Assert hidden state and attach a screenshot. */
  async verifyHidden(locator: Locator, name: string): Promise<void> {
    await this.validate(name, async () => expect(locator).toBeHidden());
  }

  /** Assert exact text and attach a screenshot. */
  async verifyText(
    locator: Locator,
    expected: string,
    name: string,
  ): Promise<void> {
    await this.validate(name, async () => expect(locator).toHaveText(expected));
  }

  /** Assert partial text and attach a screenshot. */
  async verifyContainsText(
    locator: Locator,
    expected: string,
    name: string,
  ): Promise<void> {
    await this.validate(name, async () =>
      expect(locator).toContainText(expected),
    );
  }

  /** Assert that a control is enabled. */
  async verifyEnabled(locator: Locator, name: string): Promise<void> {
    await this.validate(name, async () => expect(locator).toBeEnabled());
  }

  /** Assert that a control is disabled. */
  async verifyDisabled(locator: Locator, name: string): Promise<void> {
    await this.validate(name, async () => expect(locator).toBeDisabled());
  }

  /** Assert the current browser URL. */
  async verifyURL(expected: string | RegExp): Promise<void> {
    await this.validate(`URL ${String(expected)}`, async () =>
      expect(this.page).toHaveURL(expected),
    );
  }

  /** Read visible element text. */
  async getText(locator: Locator): Promise<string> {
    return locator.innerText();
  }

  /** Return the current visibility state. */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /** Return the current enabled state. */
  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  /** Read an HTML attribute. */
  async getAttribute(
    locator: Locator,
    attribute: string,
  ): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  /** Check a checkbox or radio control. */
  async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  /** Uncheck a checkbox. */
  async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }
}
