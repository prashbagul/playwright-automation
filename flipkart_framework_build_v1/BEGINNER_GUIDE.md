# Beginner Guide

**Playwright:** browser automation library for opening pages, locating elements, typing, clicking and checking.

**TypeScript:** JavaScript with types such as string, Page and Locator.

**Cucumber:** runs readable Gherkin Given/When/Then scenarios using TypeScript step definitions.

**Page Object Model:** a page class stores application locators and workflows. FlipkartSearchPage knows the Flipkart search box.

**UIActions:** a shared toolbox. Page objects call enterText() or verifyVisible() rather than repeating generic Playwright code.

**World:** Cucumber creates a separate World for every scenario. It stores that scenario's page, objects and data.

**Excel Map:** getSearchTestCase("TC001") returns a Map. Read values with testData.get("SearchText") and testData.get("Expected").

**Hooks:** Before creates a context/page; After captures unexpected failure evidence and closes the context.

Exercise: add TC003 to Excel, add a static feature scenario for TC003, run sequentially, inspect the report, then try 3 workers.
