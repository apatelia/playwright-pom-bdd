let common = [
  'features/**/*.feature',                // Specify our feature files
  '--require-module ts-node/register',    // Load TypeScript module
  '--require step-definitions/**/*.ts',   // Load step definitions
  '--format @cucumber/pretty-formatter', // Load custom formatter, displays scenarios as they are executed.
  '--format html:reports/cucumber_report.html', // Load custom formatter i.e. built-in html report
  '--format json:reports/report.json',    // Load custom formatter, generates a .json report
  'default: --publish-quiet',
].join(' ');

module.exports = {
  default: common
};
