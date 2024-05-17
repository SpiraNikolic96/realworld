const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  chromeWebSecurity: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, cypress-qase-reporter',
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
    },
    cypressQaseReporterReporterOptions: {
      apiToken: '',
      projectCode: '',
      logging: true,
      basePath: 'https://api.qase.io/v1/',
    },
  },
  e2e: {
    baseUrl: 'https://www.google.com/',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    includeShadowDom: true,
    env: {
      updateSnapshots: false
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);
      if (config.env.environment === "prod") {
        config.baseUrl = 'https://google.com'
      }
      else if (config.env.environment === "dev") {
        config.baseUrl = 'https://www.facebook.com/'
      }
      else if (config.env.environment === "stage") {
        config.baseUrl = 'https://docs.cypress.io/guides/overview/why-cypress'
      }
      return config
    },
  },
});
