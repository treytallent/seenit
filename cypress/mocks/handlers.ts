import { TMDB_API_BASE_URL } from '@/src/lib/constants'
import { paths } from '@/src/lib/types/schema/tmdb-api-schema'
import { http, HttpResponse } from 'msw'

import authenticationTokenNewSuccess from './fixtures/success/3-authentication-token-new.json'

/**
 * Build a TMDB route for a given path.
 * @template P The API path.
 */
const route = <P extends keyof paths>(path: P) => TMDB_API_BASE_URL.concat(path)

export const handlers = [
  http.get(route('/3/authentication/token/new'), () =>
    HttpResponse.json(authenticationTokenNewSuccess)
  ),
]
