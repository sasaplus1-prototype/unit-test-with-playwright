const config = {};

config.forbidOnly = false;
config.retries = 0;
config.testMatch = /\.test\.ts$/;
config.use = {
  baseURL: 'http://127.0.0.1:8080',
  trace: 'on-first-retry'
};
config.webServer = {
  command: 'npm run server',
  url: config.use.baseURL,
  timeout: 120 * 1000,
  reuseExistingServer: false
};

module.exports = config;
