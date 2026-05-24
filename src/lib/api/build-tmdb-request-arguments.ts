import { TMDB_API_BASE_URL } from '@/lib/constants'
import type {
  RequestArguments,
  HTTPMethodPaths,
  OmitUndefinedSubsets,
  Resolve,
  TmdbHTTPMethods,
} from '@/types/utils'

/**
 * Type-safe factory that builds fetch request arguments compatible with TMDB's OpenAPI schema.
 *
 * @template M Type of the HTTP method.
 * @template P Type of the API path.
 * @template A Type of the API path's arguments. Using generic M and P, it defaults to the type definition in the OpenAPI schema and removes irrelevant properties through utility types.
 *
 * @param method The HTTP method.
 * @param path The TMDB API path.
 * @param args The API path's arguments.
 * @returns TMDB OpenAPI compatible fetch arguments.
 */
export function buildTmdbRequestArguments<
  M extends TmdbHTTPMethods,
  P extends HTTPMethodPaths<M>,
>(
  method: M,
  path: P,
  args: OmitUndefinedSubsets<RequestArguments<M, P>>
): Parameters<typeof fetch> {
  let input: string = TMDB_API_BASE_URL.concat(path)
  interface Init extends Resolve<RequestInit> {
    headers: HeadersInit
  }
  const init: Init = {
    method: method,
    headers: {},
  }

  if (!args) {
    return [input, init]
  }

  if ('query' in args) {
    const queryEntries = Object.entries(args.query).filter(
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

  if ('path' in args) {
    for (const [k, v] of Object.entries(args.path)) {
      input = input.replace(`{${k}}`, `${v}`)
    }
  }

  if ('requestBody' in args && '' !== args.requestBody) {
    init.body = JSON.stringify(args.requestBody)
    init.headers = {
      ...init.headers,
      'Content-Type': 'application/json',
    }
  }

  return [input, init]
}
