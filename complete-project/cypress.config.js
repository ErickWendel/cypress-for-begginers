import { defineConfig } from "cypress";

export default defineConfig({
  "chromeWebSecurity": false,
  "experimentalModuleVariables": true,
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: 'https://erickwendel.github.io/vanilla-js-web-app-example',
    testIsolation: false,
  },
});
