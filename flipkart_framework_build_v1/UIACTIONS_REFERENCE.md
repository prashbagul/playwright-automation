# UIActions Reference

| Function | Purpose |
|---|---|
| enterText(locator,text) | Fill input |
| clearText(locator) | Clear input |
| pressKey(locator,key) | Keyboard action |
| clickButton(locator) / clickLink(locator) | Click controls |
| selectDropdown(locator,value) | Select native option |
| waitForVisible/Hidden(locator) | Wait for state |
| verifyVisible/Hidden(locator,name) | Assert state and attach evidence |
| verifyText(locator,expected,name) | Exact text assertion and evidence |
| verifyContainsText(locator,expected,name) | Partial text assertion and evidence |
| verifyEnabled/Disabled(locator,name) | Enabled-state assertion |
| verifyURL(expected) | URL assertion |
| getText(locator) | Read text |
| isVisible/isEnabled(locator) | Read state |
| getAttribute(locator,name) | Read attribute |
| check/uncheck(locator) | Checkbox control |
| captureScreenshot(label) | Attach screenshot |

Each function is documented in the TypeScript source. Add new generic operations here and in UIActions.ts, not in individual page objects.
