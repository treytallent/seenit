import { tmdbClient } from './tmdb-client'
import type { EndpointSuccessResponse } from '@/types/api'
import { vi, describe, expect, test, beforeEach } from 'vitest'

describe('tmdbClient', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    global.fetch = mockFetch
  })

  test('It calls fetch with valid options', () => {
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
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/account/5678?session_id=1234',
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

  test('It handles TMDB success responses', async () => {
    mockFetch.mockResolvedValue({
      status: 200,
      ok: true,
      json: (): EndpointSuccessResponse<'GET', '/3/account/{account_id}'> => {
        return {
          id: 1,
          include_adult: false,
        }
      },
    })
    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toEqual({
      success: true,
      data: {
        id: 1,
        include_adult: false,
      },
    })
  })

  test('It handles TMDB error responses', async () => {
    mockFetch.mockResolvedValue({
      status: 401,
      ok: false,
      json: () => {
        return { success: false, status_code: 1, status_message: 'tmdb error' }
      },
    })
    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toEqual({
      success: false,
      error: { code: 1, message: 'tmdb error' },
    })
  })

  test('It handles unknown errors', async () => {
    mockFetch.mockResolvedValue({
      status: 401,
      ok: false,
      json: () => {
        return ''
      },
    })
    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toEqual({
      success: false,
      error: { code: 0, message: 'An unknown error occured.' },
    })
  })

  test('It handles JSON parse errors', async () => {
    mockFetch.mockResolvedValue({
      status: 200,
      ok: true,
      json: () => {
        return JSON.parse('<!DOCTYPE html>')
      },
    })
    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toEqual({
      success: false,
      error: {
        code: 0,
        message: `Unexpected token '<', "<!DOCTYPE html>" is not valid JSON`,
      },
    })
  })

  test('It handles fetch promise rejection', async () => {
    mockFetch.mockRejectedValue(new TypeError('fetch failed'))
    const res = await tmdbClient('GET', '/3/account/{account_id}')
    expect(res).toEqual({
      success: false,
      error: {
        code: 0,
        message: 'fetch failed',
      },
    })
  })
})
