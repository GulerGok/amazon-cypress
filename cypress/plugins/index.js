module.exports = (on, config) => {
    require('@shelex/cypress-allure-plugin/writer')(on, config);
    return config;
  };
  
  module.exports = (on, config) => {
    require('@shelex/cypress-allure-plugin/plugin')(on, config);
    return config;
  };