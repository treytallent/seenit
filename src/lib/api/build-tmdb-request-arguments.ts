import { TMDB_API_BASE_URL } from '@/lib/constants'
import type { Resolve } from '@/types/utils'
import type {
  RequestArguments,
  HTTPMethodPaths,
  TmdbHTTPMethods,
} from '@/types/api'

/**
 * Utility function for building fetch request arguments compatible with TMDB's OpenAPI schema.
 *
 * @param method The HTTP method.
 * @param path The API path.
 * @param args The API endpoint's arguments.
 *
 * @returns TMDB OpenAPI compatible fetch arguments.
 */
export function buildTmdbRequestArguments<
  M extends TmdbHTTPMethods,
  P extends HTTPMethodPaths<M>,
>(
  httpMethod: M,
  httpPath: P,
  args?: RequestArguments<M, P> & RequestInit
): Parameters<typeof fetch> {
  // Separate building & fetching properties.
  const { query, path, requestBody, headers, ...fetchOptions } = {
    query: undefined,
    path: undefined,
    requestBody: undefined,
    headers: undefined,
    ...args,
  }

  const builtOptions: Resolve<RequestInit> = {
    method: httpMethod,
    headers: {
      authorization: process.env.TMDB_READ_ACCESS_TOKEN ?? '',
      ...headers,
    },
    ...fetchOptions,
  }

  let input: string = TMDB_API_BASE_URL.concat(httpPath)

  if (!args) {
    return [input, builtOptions]
  }

  if (query) {
    const queryEntries = Object.entries(query).filter(
      ([k, v]) => undefined !== v // eslint-disable-line @typescript-eslint/no-unused-vars
    )
    for (const entry of queryEntries) {
      const [k, v] = entry
      if (queryEntries.indexOf(entry) === 0) {
        input = input.concat(`?${k}`, `=${v}`)
      } else {
        input = input.concat(`&${k}`, `=${v}`)
      }
    }
  }

  if (path) {
    for (const [k, v] of Object.entries(path)) {
      input = input.replace(`{${k}}`, `${v}`)
    }
  }

  if (requestBody) {
    builtOptions.body = JSON.stringify(requestBody)
    builtOptions.headers = {
      ...builtOptions.headers,
      'Content-Type': 'application/json',
    }
  }

  return [input, builtOptions]
}
