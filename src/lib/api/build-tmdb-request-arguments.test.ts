import { describe, expect, test } from 'vitest'
import { buildTmdbRequestArguments } from './build-tmdb-request-arguments'

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
      it: 'Should replace path sections, append multiple query params, override authorization bearer token, add header content-type, convert requestBody to JSON & forward additional properties.',
      args: {
        headers: {
          authorization: 'bearer 123',
        },
        cache: 'force-cache',
        query: {
          guest_session_id: '123',
          session_id: '456',
        },
        path: {
          series_id: 1,
          season_number: 2,
          episode_number: 3,
        },
        requestBody: { foo: 'bar' },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating?guest_session_id=123&session_id=456',
        {
          method: 'POST',
          headers: {
            authorization: 'bearer 123',
            'Content-Type': 'application/json',
          },
          body: '{"foo":"bar"}',
          cache: 'force-cache',
        },
      ],
    },
    {
      it: "It should not modify the URL's dynamic sections or append query params.",
      args: undefined,
      expected: [
        'https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/rating',
        { headers: { authorization: '' }, method: 'POST' },
      ],
    },
    {
      it: 'It should not append missing query parameters to the URL.',
      args: {
        query: {},
        path: {
          series_id: 1,
          season_number: 2,
          episode_number: 3,
        },
        requestBody: { foo: 'bar' },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating',
        {
          method: 'POST',
          headers: { authorization: '', 'Content-Type': 'application/json' },
          body: '{"foo":"bar"}',
        },
      ],
    },
    {
      it: 'It should not append undefined query parameters to the URL.',
      args: {
        query: { guest_session_id: undefined },
        path: {
          series_id: 1,
          season_number: 2,
          episode_number: 3,
        },
        requestBody: { foo: 'bar' },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating',
        {
          method: 'POST',
          headers: { authorization: '', 'Content-Type': 'application/json' },
          body: '{"foo":"bar"}',
        },
      ],
    },
    {
      it: 'It should not append undefined query parameters to the URL.',
      args: {
        query: {
          guest_session_id: undefined,
          session_id: undefined,
        },
        path: {
          series_id: 1,
          season_number: 2,
          episode_number: 3,
        },
        requestBody: { foo: 'bar' },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating',
        {
          method: 'POST',
          headers: { authorization: '', 'Content-Type': 'application/json' },
          body: '{"foo":"bar"}',
        },
      ],
    },
    {
      it: 'It should only append defined query parameters to the URL.',
      args: {
        query: {
          guest_session_id: '123',
          session_id: undefined,
        },
        path: {
          series_id: 1,
          season_number: 2,
          episode_number: 3,
        },
        requestBody: { foo: 'bar' },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating?guest_session_id=123',
        {
          method: 'POST',
          headers: { authorization: '', 'Content-Type': 'application/json' },
          body: '{"foo":"bar"}',
        },
      ],
    },
    {
      it: 'It should append multiple query parameters to the URL.',
      args: {
        query: {
          guest_session_id: '123',
          session_id: '456',
        },
        path: {
          series_id: 1,
          season_number: 2,
          episode_number: 3,
        },
        requestBody: { foo: 'bar' },
      },
      expected: [
        'https://api.themoviedb.org/3/tv/1/season/2/episode/3/rating?guest_session_id=123&session_id=456',
        {
          method: 'POST',
          headers: { authorization: '', 'Content-Type': 'application/json' },
          body: '{"foo":"bar"}',
        },
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
})
