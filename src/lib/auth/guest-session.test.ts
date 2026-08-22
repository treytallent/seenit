import { TMDB_API_BASE_URL } from '@/lib/constants'
import { server } from '@/vitest.setup'
import { http, HttpResponse } from 'msw'
import { cookies } from 'next/headers'
import { createNewGuestSession } from '@/lib/auth/guest-session'

describe('createNewGuestSession', () => {
  it('returns an error for non 200 responses', async () => {
    server.use(
      http.get(
        TMDB_API_BASE_URL.concat('/3/authentication/guest_session/new'),
        () =>
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

    const res = await createNewGuestSession()
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error')
  })

  it('returns an error when a 200 response is missing a guest session id', async () => {
    server.use(
      http.get(
        TMDB_API_BASE_URL.concat('/3/authentication/guest_session/new'),
        () =>
          HttpResponse.json(
            {
              success: true,
            },
            { status: 200 }
          )
      )
    )

    const res = await createNewGuestSession()
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error')
  })

  it('creates a new guest session stored in cookies', async () => {
    server.use(
      http.get(
        TMDB_API_BASE_URL.concat('/3/authentication/guest_session/new'),
        () =>
          HttpResponse.json({
            success: true,
            guest_session_id: 'test-guest-session-id',
          })
      )
    )

    const res = await createNewGuestSession()
    expect(res).toHaveProperty('success', true)
    expect(res).toHaveProperty('data', expect.any(String))

    const cookieStore = await cookies()
    expect(cookieStore.set).toHaveBeenCalledWith(
      'guestSessionId',
      'test-guest-session-id',
      expect.any(Object)
    )
  })
})
