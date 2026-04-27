import { constructTmdbRequestArguments } from '@/api/api'
import { describe, expect, it } from 'vitest'

describe('constructTmdbRequest', () => {
  it('Path properties should replace their URL segment', () => {
    const args = constructTmdbRequestArguments(
      'GET',
      '/3/list/{list_id}/item_status',
      {
        parameters: {
          path: {
            list_id: 123,
          },
        },
      }
    )
    expect(args).toEqual([
      'https://api.themoviedb.org/3/list/123/item_status',
      { method: 'GET' },
    ])
  })
  it('Each property in query should be concatenated to the URL', () => {
    const args = constructTmdbRequestArguments(
      'GET',
      '/3/list/{list_id}/item_status',
      {
        parameters: {
          path: {
            list_id: 123,
          },
          query: {
            language: 'en-US',
            movie_id: 999,
          },
        },
      }
    )
    expect(args).toEqual([
      'https://api.themoviedb.org/3/list/123/item_status?language=en-US&movie_id=999',
      { method: 'GET' },
    ])
  })
})
