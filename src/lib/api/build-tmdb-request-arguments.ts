import type {
  HTTPMethodPaths,
  RequestArguments,
  TmdbHTTPMethods,
} from '@/api/types'
import { TMDB_API_BASE_URL } from '@/lib/constants'
import type { Resolve } from '@/lib/utils'

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
): [string, Parameters<typeof fetch>[1]] {
  // Separate building & fetching properties.
  const { query, path, requestBody, ...fetchOptions } = {
    query: undefined,
    path: undefined,
    requestBody: undefined,
    ...args,
  }

  const builtOptions: Resolve<RequestInit> = {
    method: httpMethod,
    ...fetchOptions,
  }

  let input: string = TMDB_API_BASE_URL.concat(httpPath)
  input = input.concat(`?api_key=${process.env.TMDB_API_KEY ?? ''}`)

  if (!args) {
    return [input, builtOptions]
  }

  if (query) {
    const queryEntries = Object.entries(query).filter(
      ([k, v]) => undefined !== v // eslint-disable-line @typescript-eslint/no-unused-vars
    )
    for (const [k, v] of queryEntries) {
      input = input.concat(`&${k}`, `=${v}`)
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
