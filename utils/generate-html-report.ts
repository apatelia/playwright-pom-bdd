const reporter = require('cucumber-html-reporter');

let options = {
    theme: 'bootstrap',
    jsonFile: 'reports/report.json',
    output: 'reports/report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
};

reporter.generate(options);
