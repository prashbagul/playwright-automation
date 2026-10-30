module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "src/support/world.ts",
      "src/support/hooks.ts",
      "src/steps/**/*.ts",
    ],
    paths: ["features/**/*.feature"],
    format: ["progress", "json:reports/cucumber-report.json"],
    retry: 0,
    timeout: 60000,
  },
};
