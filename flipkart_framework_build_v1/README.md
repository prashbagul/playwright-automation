# Flipkart Automation Framework

Beginner-friendly UI automation using **Playwright, TypeScript, Cucumber, ExcelJS and Page Object Model**.

## Features
- Static Gherkin scenarios; no feature generation from Excel.
- Runtime Excel lookup by TCID returning Map<string,string>.
- Central UIActions for generic inputs, clicks, waits, getters and assertions.
- Screenshot attachment after every UIActions validation, on pass and fail.
- Screenshot and error attachment for unexpected scenario failures.
- Cucumber parallel execution with isolated scenario contexts.
- Consolidated JSON and HTML reporting.

## Prerequisites
Node.js 20+, npm and Google Chrome. Check node --version and npm --version.

## Install
~~~bash
npm install
~~~
The hooks use installed Chrome (channel: "chrome") and visible mode by default. If Chrome is unavailable, remove channel: "chrome" in src/support/hooks.ts and install Playwright Chromium with npx playwright install chromium.

## Excel data
Use testdata/TestData.xlsx, worksheet Search, with headers TCID, SearchText, and Expected. Add one unique TCID row for each scenario.

## Execute
~~~bash
npm test
npm run test:parallel
npm run test:parallel:5
npm run test:parallel:10
npm run typecheck
npm run report
~~~
Parallelism is scenario-level, not step-level. Start with 3 workers and increase after stability checks.

## HTML report
The npm test and npm run test:parallel* commands automatically generate the HTML report after Cucumber finishes, including when scenarios fail (provided Cucumber produced its JSON output). Open reports/html-report/index.html. Cucumber JSON is reports/cucumber-report.json; screenshots are embedded as scenario attachments. You can also regenerate the report manually with npm run report.

## Folder structure
- features/: static Gherkin scenarios
- src/actions/: generic reusable UIActions
- src/pages/: application-specific Page Objects
- src/steps/: Cucumber step definitions
- src/support/: World and hooks
- src/utilities/: Excel lookup
- src/config/: configuration
- scripts/: report generation, test runner and cleanup
- testdata/: Excel workbook

## Add a test
1. Add a unique TCID row to Excel.
2. Add a static scenario using that TCID.
3. Reuse or add step definitions.
4. Keep locators in page objects and generic functions in UIActions.
5. Run sequentially before parallel.

## Execution flow
Feature -> Step definition -> Page Object -> UIActions -> Playwright. ExcelUtils supplies test data; hooks manage browser lifecycle; Cucumber attachments feed the HTML report.

## Notes
Flipkart may change its UI, show login prompts/CAPTCHA or vary results by region/session. Update locators and expected data as required. Do not bypass CAPTCHA or access restrictions. This starter has not been run against your local browser/session; validate after installation. Cucumber steps and Playwright actions/navigation use a framework default timeout of 60 seconds, configurable in src/config/config.ts.
