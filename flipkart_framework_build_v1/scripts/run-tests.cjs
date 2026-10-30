const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const cucumberArgs = process.argv.slice(2);
const cucumberCommand = process.platform === "win32" ? "npx.cmd" : "npx";

// Run Cucumber first and preserve its exit code for CI and terminal callers.
const testResult = spawnSync(cucumberCommand, ["cucumber-js", ...cucumberArgs], {
  stdio: "inherit",
  shell: false,
});

const jsonReport = path.resolve("reports/cucumber-report.json");
let reportExitCode = 0;

// Generate the HTML report whenever Cucumber produced a JSON report.
if (fs.existsSync(jsonReport) && fs.readFileSync(jsonReport, "utf8").trim()) {
  const reportResult = spawnSync(process.execPath, ["scripts/generate-report.cjs"], {
    stdio: "inherit",
  });
  reportExitCode = reportResult.status ?? 1;
} else {
  console.error("HTML report skipped because Cucumber JSON was not generated.");
  reportExitCode = 1;
}

// A test failure takes precedence over a report-generation failure.
const testExitCode = testResult.status ?? 1;
process.exit(testExitCode !== 0 ? testExitCode : reportExitCode);
