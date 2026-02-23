module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "src/steps/**/*.ts",
      "src/hooks/**/*.ts",
      "src/support/**/*.ts"
    ],
    paths: ["features/**/*.feature"],
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ]
  }
};