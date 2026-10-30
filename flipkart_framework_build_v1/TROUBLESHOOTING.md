# Troubleshooting

- Chrome launch failure: confirm Chrome is installed or remove channel: "chrome" to use Playwright Chromium.
- No tests found: check feature path, Gherkin syntax and cucumber.js.
- TCID missing: check workbook path, Search sheet, headers and exact TCID.
- Duplicate search locator: use input[name="q"]:not([readonly]).
- Browser not visible: ensure HEADLESS is not true.
- HTML report failure: run tests first and validate non-empty reports/cucumber-report.json.
- Parallel-only failures: lower worker count; check unique data, independent state, timing and throttling.
- CAPTCHA or access restriction: do not attempt to bypass it.
