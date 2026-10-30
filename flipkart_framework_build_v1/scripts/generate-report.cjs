const fs = require("fs");
const path = require("path");
const reporter = require("multiple-cucumber-html-reporter");

const jsonFile = path.resolve("reports/cucumber-report.json");

if (!fs.existsSync(jsonFile) || !fs.readFileSync(jsonFile, "utf8").trim()) {
  console.error("Cucumber JSON missing; run tests first.");
  process.exit(1);
}

try {
  const reportData = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  if (!Array.isArray(reportData)) {
    throw new Error("Expected JSON array.");
  }
} catch (error) {
  console.error("Invalid Cucumber JSON:", error.message);
  process.exit(1);
}

reporter.generate({
  jsonDir: path.resolve("reports"),
  reportPath: path.resolve("reports/html-report"),
  metadata: {
    browser: { name: "Chrome", version: "Installed locally" },
    device: "Local machine",
    platform: { name: process.platform, version: process.arch },
  },
  customData: {
    title: "Flipkart Automation",
    data: [
      { label: "Framework", value: "Playwright + TypeScript + Cucumber" },
      { label: "Generated", value: new Date().toLocaleString() },
    ],
  },
});
