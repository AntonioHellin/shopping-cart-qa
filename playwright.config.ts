import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',

  // CI optimization
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // 📊 RICH REPORTING: Multiple output formats for visibility
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['line'], // Console output
  ],

  use: {
    baseURL: 'http://localhost:5173',

    // 🔍 DEBUGGING TOOLS: Rich visibility on failures
    trace: 'retain-on-failure', // Students will change to 'on' in Exercise 2
    screenshot: 'only-on-failure', // Visual evidence of what went wrong
    video: 'retain-on-failure', // Video recording of failed tests
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Auto-start dev server
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
