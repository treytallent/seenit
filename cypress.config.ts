import { defineConfig } from 'cypress'
import { APP_BASE_URL, TMDB_BASE_URL } from './src/lib/constants'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      appBaseUrl: APP_BASE_URL,
      tmdbBaseUrl: TMDB_BASE_URL,
    },
  },
})
