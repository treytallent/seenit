import { handlers } from '@/cypress/mocks/handlers'
import { setupServer } from 'msw/node'

export async function register() {
  if (
    process.env.MSW_ENABLED === 'true' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    const server = setupServer(...handlers)
    server.listen()
  }
}
