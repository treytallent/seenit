import { tmdbClient } from '@/api/tmdb-client'
import { cookies } from 'next/headers'
import { withGuestSessionId, withUserSessionId } from './with-session'

// TODO: move to relevant feature once created.
async function getUserFavourites() {
  return await withUserSessionId((sessionId) =>
    tmdbClient('GET', '/3/account/{account_id}/favorite/movies', {
      query: {
        language: 'EN',
        page: 1,
        session_id: sessionId,
      },
      path: {
        account_id: 123,
      },
    })
  )
}

// TODO: move to relevant feature once created.
async function getGuestMovieStates() {
  return await withGuestSessionId((sessionId) =>
    tmdbClient('GET', '/3/movie/{movie_id}/account_states', {
      query: {
        guest_session_id: sessionId,
      },
      path: {
        movie_id: 123,
      },
    })
  )
}

describe('withUserSession', () => {
  it("appends the user's session ID to the request's query params", async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const cookieStore = await cookies()
    cookieStore.set('sessionId', 'test-user-session-id')

    await getUserFavourites()

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/account/123/favorite/movies?api_key=stubbed-api-key&language=EN&page=1&session_id=test-user-session-id',
      expect.any(Object)
    )
  })

  it("does not append a missing user session ID to the request's paths", async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    await getUserFavourites()

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/account/123/favorite/movies?api_key=stubbed-api-key&language=EN&page=1&session_id=invalid',
      expect.any(Object)
    )
  })
})

describe('withGuestSession', () => {
  it("appends the user's guest session ID to the request's query params", async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const cookieStore = await cookies()
    cookieStore.set('guestSessionId', 'test-guest-session-id')

    await getGuestMovieStates()

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/123/account_states?api_key=stubbed-api-key&guest_session_id=test-guest-session-id',
      expect.any(Object)
    )
  })

  it("does not append a missing guest session ID to the request's paths", async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    await getGuestMovieStates()

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/123/account_states?api_key=stubbed-api-key&guest_session_id=invalid',
      expect.any(Object)
    )
  })
})
