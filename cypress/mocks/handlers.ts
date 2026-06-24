import { TMDB_API_BASE_URL } from '@/lib/constants'
import { http, HttpResponse } from 'msw'
import { fetchNewAuthenticationToken, fetchNewSessionId } from './fixtures/auth'

export const handlers = [
  http.get(TMDB_API_BASE_URL.concat('/3/authentication/token/new'), () =>
    HttpResponse.json(fetchNewAuthenticationToken)
  ),
  http.post(TMDB_API_BASE_URL.concat('/3/authentication/session/new'), () =>
    HttpResponse.json(fetchNewSessionId)
  ),
]
