const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    specPattern: 'cypress/e2e/**/*.feature',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    html: true,
    json: true,
    reportDir: 'test-artifacts/reports',
    reportPageTitle: 'OrangeHRM Cypress E2E Results',
    overwrite: true,
    saveAllAttempts: false,
  },
  video: false,
  screenshotsFolder: 'test-artifacts/screenshots',
});
