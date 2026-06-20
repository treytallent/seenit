import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

const { cookieMap } = vi.hoisted(() => {
  return {
    cookieMap: new Map<string, { value: string }>(),
  }
})

vi.mock('next/headers', () => {
  const store = {
    get: vi.fn((k: string) => cookieMap.get(k)),
    set: vi.fn((k: string, v: string) => cookieMap.set(k, { value: v })),
  }

  return { cookies: vi.fn(async () => store) }
})

vi.stubEnv('TMDB_API_KEY', 'stubbed-api-key')

export const server = setupServer()

beforeEach(() => {
  cookieMap.clear()
})

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
