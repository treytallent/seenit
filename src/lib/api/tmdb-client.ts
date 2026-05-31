import { isTmdbError, SuccessResponse, TmdbError } from '@/types/api'
import type {
  ApiReturn,
  RequestArguments,
  HTTPMethodPaths,
  TmdbHTTPMethods,
} from '@/types/api'
import { buildTmdbRequestArguments } from './build-tmdb-request-arguments'

/**
 * Client to interact with the The Movie Database's REST API.
 *
 * @param method The HTTP method.
 * @param path The API path.
 * @param options TMDB & fetch arguments for the endpoint.
 * @returns Normalised fetch response using the result type pattern.
 */
export async function tmdbClient<
  M extends TmdbHTTPMethods,
  P extends HTTPMethodPaths<M>,
>(method: M, path: P, options?: RequestArguments<M, P> & RequestInit) {
  const [url, builtArgs] = buildTmdbRequestArguments(method, path, options)

  try {
    const req = await fetch(url, builtArgs)
    const json = (await req.json()) as unknown

    /**
     * All successful responses in the schema have a status of 200. However, the TMDB docs claim that successful updates have a 201 status.
     * In case of further discrepancies in the schema, check for a status in the 200 range.
     *
     * {@link https://developer.themoviedb.org/docs/errors}
     */
    if (!req.ok) {
      throw new InvalidStatusError(json)
    }
    return createSuccessReturn(json as SuccessResponse<M, P>)
  } catch (e) {
    // TODO: log error here.
    if (e instanceof InvalidStatusError && isTmdbError(e.json)) {
      return createErrorReturn(e.json)
    }
    if (e instanceof Error && !(e instanceof InvalidStatusError)) {
      // Handle Fetch API rejected promises & json() SyntaxError.
      return createErrorReturn({
        status_code: 0,
        status_message: e.message,
      })
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

const createSuccessReturn = <T>(data: T): ApiReturn<T> => {
  return { success: true, data }
}

const createErrorReturn = <E extends Omit<TmdbError, 'success'>>(
  error: E
): ApiReturn<never> => {
  return {
    success: false,
    error: {
      code: error.status_code,
      message: error.status_message ?? '',
    },
  }
}
