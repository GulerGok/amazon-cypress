const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    baseUrl: "http://localhost:3000", // Projeye özel ayarlayabilirsin
    env: {
      allureResultsPath: "allure-results",
    },
    setupNodeEvents: async (on, config) => {
      // Cucumber plugin entegrasyonu
      await addCucumberPreprocessorPlugin(on, config);

      // Esbuild preprocessor (Cucumber için)
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Allure writer (rapor çıktısını kaydeder)
      allureWriter(on, config);

      return config;
    },
  },
});
