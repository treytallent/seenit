import { defineConfig, devices } from '@playwright/test'
import path from 'path'

const PORT = process.env.PORT || 3000

const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'e2e'),
  retries: 0,
  outputDir: path.join(__dirname, 'e2e/results'),
  webServer: {
    command: 'pnpm dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: 'retry-with-trace',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
