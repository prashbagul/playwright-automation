# Architecture

~~~text
Feature -> Cucumber Steps -> Page Object -> UIActions -> Playwright
                    |             |             |
                 ExcelUtils     Locators     Assertions + screenshots

Cucumber workers -> isolated Worlds -> separate BrowserContexts/Pages
Cucumber JSON + embedded attachments -> HTML report
~~~

Responsibilities:
- Feature: business scenario only.
- Steps: orchestration, no selectors.
- Page Object: application-specific locators and workflows.
- UIActions: generic interactions, assertions and evidence.
- World: per-scenario state.
- Hooks: browser lifecycle and failure evidence.
- ExcelUtils: read-only lookup by TCID.

Parallel workers run scenarios, not steps. Each scenario has a fresh World, BrowserContext and Page. Avoid mutable module-level scenario state and shared carts/accounts.
