import { defineConfig, devices } from '@playwright/test'
import path from 'path'

const PORT = process.env.PORT || 3000

const baseURL = `https://localhost:${PORT}`

export default defineConfig({
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'e2e'),
  reporter: process.env.CI ? 'blob' : 'html',
  retries: 1,
  outputDir: path.join(__dirname, 'e2e/results'),
  webServer: {
    command: 'pnpm next dev --experimental-https',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
  use: {
    baseURL,
    trace: 'retry-with-trace',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12 Pro'],
      },
    },
  ],
})
