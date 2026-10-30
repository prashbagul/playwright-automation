import { Page } from "@playwright/test";
import { UIActions } from "../actions/UIActions";
import { BasePage } from "./BasePage";

/** Flipkart locators and search flow; generic interactions are delegated to UIActions. */
export class FlipkartSearchPage extends BasePage {
  constructor(
    page: Page,
    private readonly ui: UIActions,
  ) {
    super(page);
  }

  /** Select the editable search input, excluding Flipkart's read-only duplicate. */
  private searchInput() {
    return this.page.locator('input[name="q"]:not([readonly])').first();
  }

  /** Open the Flipkart home page. */
  async open(): Promise<void> {
    await this.navigateTo();
  }

  /** Enter a product term and submit the search with Enter. */
  async search(term: string): Promise<void> {
    const input = this.searchInput();
    await this.ui.waitForVisible(input);
    await this.ui.enterText(input, term);
    await this.ui.pressKey(input, "Enter");
  }

  /** Verify that the expected phrase appears in the search results. */
  async verifySearchResults(expected: string): Promise<void> {
    const result = this.page.getByText(expected, { exact: false }).first();
    await this.ui.verifyVisible(result, `Results contain "${expected}"`);
  }
}
