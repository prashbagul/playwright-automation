import {
  IWorldOptions,
  setWorldConstructor,
  World,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "playwright";
import { UIActions } from "../actions/UIActions";
import { FlipkartSearchPage } from "../pages/FlipkartSearchPage";
import { ExcelUtils } from "../utilities/ExcelUtils";

/** Scenario-scoped state. Cucumber creates one World per scenario, including parallel scenarios. */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  uiActions!: UIActions;
  flipkartPage!: FlipkartSearchPage;
  excelUtils = new ExcelUtils();
  testData?: Map<string, string>;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /** Initialize page objects after the Before hook creates this scenario's page. */
  initializePages(): void {
    this.uiActions = new UIActions(this.page, (data, mediaType) => {
      const defaultMediaType =
        typeof data === "string" ? "text/plain" : "application/octet-stream";
      return this.attach(data, mediaType ?? defaultMediaType);
    });
    this.flipkartPage = new FlipkartSearchPage(this.page, this.uiActions);
  }
}

setWorldConstructor(CustomWorld);
