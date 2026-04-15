const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');

dotenv.config();

const baseURL = process.env.BASE_URL_WEB || 'http://localhost:4000';
const apiURL = process.env.BASE_URL_API || process.env.API_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';
const apiHealthURL = new URL('/swagger.json', apiURL).toString();

module.exports = defineConfig({
  testDir: './playwright/e2e',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 5_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm start',
      url: apiHealthURL,
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'npm run start:web',
      url: baseURL,
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
