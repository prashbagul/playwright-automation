import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given(
  "I open Flipkart for test case {string}",
  async function (this: CustomWorld, id: string) {
    this.testData = await this.excelUtils.getSearchTestCase(id);
    await this.flipkartPage.open();
  },
);

When(
  "I search using the Excel data",
  async function (this: CustomWorld) {
    const searchText = this.testData?.get("SearchText");
    if (!searchText) {
      throw new Error("SearchText is blank or missing in Excel.");
    }
    await this.flipkartPage.search(searchText);
  },
);

Then(
  "the search results should contain the expected text",
  async function (this: CustomWorld) {
    const expected = this.testData?.get("Expected");
    if (!expected) {
      throw new Error("Expected is blank or missing in Excel.");
    }
    await this.flipkartPage.verifySearchResults(expected);
  },
);
