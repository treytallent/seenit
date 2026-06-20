import { TMDB_API_BASE_URL } from '@/lib/constants'
import { server } from '@/vitest.setup'
import { http, HttpResponse } from 'msw'
import { tmdbClient } from './tmdb-client'

describe('tmdbClient', () => {
  it('should call fetch with valid options', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    tmdbClient('GET', '/3/account/{account_id}', {
      headers: {
        authorization: 'bearer 123',
      },
      cache: 'force-cache',
      next: {
        revalidate: 123,
        tags: ['foo', 'bar'],
      },
      query: {
        session_id: '1234',
      },
      path: {
        account_id: 5678,
      },
    })

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/account/5678?api_key=stubbed-api-key&session_id=1234',
      {
        headers: {
          authorization: 'bearer 123',
        },
        method: 'GET',
        cache: 'force-cache',
        next: {
          revalidate: 123,
          tags: ['foo', 'bar'],
        },
      }
    )
  })

  it('should handle TMDB success responses', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/account/:account_id'), () =>
        HttpResponse.json({
          id: 123,
          include_adult: false,
        })
      )
    )

    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toHaveProperty('success', true)
    expect(res).toHaveProperty('data.id', 123)
    expect(res).toHaveProperty('data.include_adult', false)
  })

  it('should handle TMDB error responses', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/account/:account_id'), () =>
        HttpResponse.json(
          {
            success: false,
            status_code: 1,
            status_message: 'tmdb error',
          },
          {
            status: 401,
          }
        )
      )
    )

    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', 1)
    expect(res).toHaveProperty('error.message', 'tmdb error')
  })

  it('should handle unknown errors', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/account/:account_id'), () =>
        HttpResponse.json('', {
          status: 401,
        })
      )
    )

    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', 0)
    expect(res).toHaveProperty('error.message', 'An unknown error occured.')
  })

  it('should handle JSON parse errors', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/account/:account_id'), () =>
        HttpResponse.html('<!DOCTYPE html>')
      )
    )

    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error.code', 0)
    expect(res).toHaveProperty(
      'error.message',
      `Unexpected token '<', "<!DOCTYPE html>" is not valid JSON`
    )
  })

  it('should handle fetch promise rejection', async () => {
    server.use(
      http.get(TMDB_API_BASE_URL.concat('/3/account/:account_id'), () =>
        HttpResponse.error()
      )
    )

    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toHaveProperty('success', false)
    expect(res).toHaveProperty('error', { code: 0, message: 'Failed to fetch' })
  })
})
