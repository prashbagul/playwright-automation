import { Page } from "@playwright/test";
import { config } from "../config/config";

/** Shared parent class for application page objects. */
export class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a URL or the configured base URL. */
  async navigateTo(url: string = config.baseUrl): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }
}
