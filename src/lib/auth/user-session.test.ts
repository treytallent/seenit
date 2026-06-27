import { TMDB_API_BASE_URL } from '@/lib/constants'
import { server } from '@/vitest.setup'
import { http, HttpResponse } from 'msw'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { authRedirect, createNewUserSession } from './user-session'

describe('authRedirect', () => {
  it('returns an error for non 200 responses', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/authentication/token/new'), () =>
        HttpResponse.json(
          {
            success: false,
            status_code: 123,
            status_message: 'Foobar',
          },
          { status: 400 }
        )
      )
    )
    const res = await authRedirect('/foo')
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error')
  })

  it('returns an error when a 200 response is missing an authentication token', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/authentication/token/new'), () =>
        HttpResponse.json(
          {
            success: true,
          },
          { status: 200 }
        )
      )
    )
    const res = await authRedirect('/foo')
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error')
  })
})

describe('createNewUserSession', () => {
  it('returns an error when query params are invalid', async () => {
    const res = await createNewUserSession(
      new NextRequest('https://example.com?foo=bar')
    )
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', expect.any(Number))
    expect(res).toHaveProperty('error.message', expect.any(String))
  })

  it('returns an error when the user rejects the authentication request', async () => {
    const res = await createNewUserSession(
      new NextRequest(
        'https://example.com?request_token=test-req-token&denied=true'
      )
    )
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', expect.any(Number))
    expect(res).toHaveProperty('error.message', expect.any(String))
  })

  it('returns an error for non 200 responses', async () => {
    server.use(
      http.post(TMDB_API_BASE_URL.concat('/3/authentication/session/new'), () =>
        HttpResponse.json(
          { success: false, status_code: 123, status_message: 'foo' },
          { status: 400 }
        )
      )
    )

    const res = await createNewUserSession(
      new NextRequest(
        'https://example.com?request_token=test-req-token&approved=true'
      )
    )
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', expect.any(Number))
    expect(res).toHaveProperty('error.message', expect.any(String))
  })

  it('returns an error when a 200 response is missing a session ID', async () => {
    server.use(
      http.post(TMDB_API_BASE_URL.concat('/3/authentication/session/new'), () =>
        HttpResponse.json({ success: true })
      )
    )

    const res = await createNewUserSession(
      new NextRequest(
        'https://example.com?request_token=test-req-token&approved=true'
      )
    )
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', expect.any(Number))
    expect(res).toHaveProperty('error.message', expect.any(String))
  })

  it('creates a new user session', async () => {
    server.use(
      http.post(TMDB_API_BASE_URL.concat('/3/authentication/session/new'), () =>
        HttpResponse.json({ success: true, session_id: 'test-session-id' })
      )
    )

    const res = await createNewUserSession(
      new NextRequest(
        'https://example.com?request_token=test-req-token&approved=true'
      )
    )
    expect(res).toHaveProperty('success', true)
    expect(res).toHaveProperty('data', expect.any(String))

    const cookieStore = await cookies()
    expect(cookieStore.set).toHaveBeenCalledWith(
      'sessionId',
      'test-session-id',
      expect.any(Object)
    )
  })
})
