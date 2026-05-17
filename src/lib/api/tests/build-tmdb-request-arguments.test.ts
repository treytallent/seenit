import { buildTmdbRequestArguments } from '@/api/api'
import { describe, expect, test } from 'vitest'

describe('buildTmdbRequestArguments', () => {
  const post_series_rating_fixtures: Array<{
    it: string
    args: Parameters<
      typeof buildTmdbRequestArguments<
        'POST',
        '/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/rating'
      >
    >[2]
    expected: ReturnType<typeof buildTmdbRequestArguments>
  }> = [
    {
      it: 'Should replace path sections, append query params and build the init object.',
      args: {
        parameters: {
          query: {
            guest_session_id: '123',
            session_id: '456',
          },
          header: { 'Content-Type': 'application/json' },
          path: {
            series_id: 1,
            season_number: 2,
            episode_number: 3,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating?guest_session_id=123&session_id=456',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      ],
    },
    {
      it: 'Should not modify input or mutate the default init object.',
      args: undefined,
      expected: [
        'https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/rating',
        { method: 'POST', headers: {} },
      ],
    },
    {
      it: 'Should not append query parameters to path.',
      args: {
        parameters: {
          query: undefined,
          header: { 'Content-Type': 'application/json' },
          path: {
            series_id: 1,
            season_number: 2,
            episode_number: 3,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      ],
    },
    {
      it: 'Should not append query parameters to path.',
      args: {
        parameters: {
          query: {},
          header: { 'Content-Type': 'application/json' },
          path: {
            series_id: 1,
            season_number: 2,
            episode_number: 3,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      ],
    },
    {
      it: 'Should not append undefined query parameters to the path.',
      args: {
        parameters: {
          query: {
            guest_session_id: undefined,
            session_id: undefined,
          },
          header: { 'Content-Type': 'application/json' },
          path: {
            series_id: 1,
            season_number: 2,
            episode_number: 3,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      ],
    },
    {
      it: 'Should not append undefined query parameters to path.',
      args: {
        parameters: {
          query: {
            guest_session_id: '123',
            session_id: undefined,
          },
          header: { 'Content-Type': 'application/json' },
          path: {
            series_id: 1,
            season_number: 2,
            episode_number: 3,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating?guest_session_id=123',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      ],
    },
    {
      it: 'Should not append undefined query parameters to path.',
      args: {
        parameters: {
          query: {
            guest_session_id: undefined,
            session_id: '456',
          },
          header: { 'Content-Type': 'application/json' },
          path: {
            series_id: 1,
            season_number: 2,
            episode_number: 3,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating?session_id=456',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      ],
    },
  ]

  test.for(post_series_rating_fixtures)('$it', ({ args, expected }) => {
    expect(
      buildTmdbRequestArguments(
        'POST',
        '/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/rating',
        args
      )
    ).toEqual(expected)
  })

  const post_list_add_movie_fixtures: Array<{
    it: string
    args: Parameters<
      typeof buildTmdbRequestArguments<'POST', '/3/list/{list_id}/add_item'>
    >[2]
    expected: ReturnType<typeof buildTmdbRequestArguments>
  }> = [
    {
      it: 'Should replace the path section, append the query param, add content-type application/json to the headers, and body property to the init object.',
      args: {
        parameters: {
          query: { session_id: '123' },
          path: { list_id: 456 },
        },
        requestBody: {
          content: {
            'application/json': {
              RAW_BODY: 'foobar',
            },
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/list/456/add_item?session_id=123',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: 'foobar',
        },
      ],
    },
    {
      it: 'Should not mutate the default init object or add a body property to the init object.',
      args: {
        parameters: {
          query: { session_id: '123' },
          path: { list_id: 456 },
        },
        requestBody: undefined,
      },
      expected: [
        'https://api.themoviedb.org/3/list/456/add_item?session_id=123',
        {
          method: 'POST',
          headers: {},
        },
      ],
    },
    {
      it: 'Should not mutate the default init object or add a body property to the init object.',
      args: {
        parameters: {
          query: { session_id: '123' },
          path: { list_id: 456 },
        },
        requestBody: {
          content: {
            'application/json': {
              RAW_BODY: undefined,
            },
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/list/456/add_item?session_id=123',
        {
          method: 'POST',
          headers: {},
        },
      ],
    },
  ]

  test.for(post_list_add_movie_fixtures)('$it', ({ args, expected }) => {
    expect(
      buildTmdbRequestArguments('POST', '/3/list/{list_id}/add_item', args)
    ).toEqual(expected)
  })

  const movie_delete_rating_fixtures: Array<{
    it: string
    args: Parameters<
      typeof buildTmdbRequestArguments<'DELETE', '/3/movie/{movie_id}/rating'>
    >[2]
    expected: ReturnType<typeof buildTmdbRequestArguments>
  }> = [
    {
      it: 'Should return an empty headers object when header is undefined.',
      args: {
        parameters: {
          query: { session_id: '123' },
          path: { movie_id: 456 },
          header: undefined,
        },
      },
      expected: [
        'https://api.themoviedb.org/3/movie/456/rating?session_id=123',
        {
          method: 'DELETE',
          headers: {},
        },
      ],
    },
    {
      it: 'Should not add undefined properties to headers.',
      args: {
        parameters: {
          query: { session_id: '123' },
          path: { movie_id: 456 },
          header: {
            'Content-Type': undefined,
          },
        },
      },
      expected: [
        'https://api.themoviedb.org/3/movie/456/rating?session_id=123',
        {
          method: 'DELETE',
          headers: {},
        },
      ],
    },
  ]
  test.for(movie_delete_rating_fixtures)('$it', ({ args, expected }) => {
    expect(
      buildTmdbRequestArguments('DELETE', '/3/movie/{movie_id}/rating', args)
    ).toEqual(expected)
  })
})
