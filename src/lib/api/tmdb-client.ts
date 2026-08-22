'use server'

import type {
  HTTPMethodPaths,
  RequestArguments,
  TmdbHTTPMethods,
} from '@/lib/api/types'
import { EndpointSuccessResponse, isTmdbError } from '@/lib/api/types'
import {
  createErrorReturn,
  createSuccessReturn,
  createUnknownErrorReturn,
} from '@/lib/create-return'
import { buildTmdbRequestArguments } from '@/api/build-tmdb-request-arguments'

/**
 * Client to interact with the The Movie Database's REST API.
 *
 * @param method The HTTP method.
 * @param path The API path.
 * @param options TMDB & fetch arguments for the endpoint.
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function tmdbClient<
  M extends TmdbHTTPMethods,
  P extends HTTPMethodPaths<M>,
>(method: M, path: P, options?: RequestArguments<M, P> & RequestInit) {
  'use server'

  const [url, builtArgs] = buildTmdbRequestArguments(method, path, options)

  try {
    const res = await fetch(url, builtArgs)
    const json = (await res.json()) as unknown

    /**
     * All successful responses in the schema have a status of 200. However, the TMDB docs claim that successful updates have a 201 status.
     * In case of further discrepancies in the schema, check for a status in the 200 range.
     *
     * @link https://developer.themoviedb.org/docs/errors
     */
    if (!res.ok) {
      throw new InvalidStatusError(json)
    }
    return createSuccessReturn(json as EndpointSuccessResponse<M, P>)
  } catch (e) {
    // TODO: log error here.
    if (e instanceof InvalidStatusError && isTmdbError(e.json)) {
      return createErrorReturn(e.json)
    }
    if (e instanceof Error && !(e instanceof InvalidStatusError)) {
      // Handle Fetch API rejected promises & json() SyntaxError.
      return createUnknownErrorReturn(e.message)
    }
    return createErrorReturn({
      status_code: 0,
      status_message: 'An unknown error occured.',
    })
  }
}

class InvalidStatusError extends Error {
  json: unknown
  constructor(json: unknown) {
    super('InvalidStatusError')
    this.json = json
  }
}
