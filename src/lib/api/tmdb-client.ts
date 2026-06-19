import type {
  ApiReturn,
  HTTPMethodPaths,
  RequestArguments,
  TmdbHTTPMethods,
} from '@/src/lib/api/types'
import {
  EndpointSuccessResponse,
  isTmdbError,
  TmdbError,
} from '@/src/lib/api/types'
import { buildTmdbRequestArguments } from './build-tmdb-request-arguments'

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

/**
 * Utility for creating a normalised API response.
 *
 * @template T The data type.
 * @returns A successful response containing the provided data.
 */
export const createSuccessReturn = <T>(data: T): ApiReturn<T> => {
  return { success: true, data }
}

/**
 * Utility for creating a normalised API response.
 *
 * @returns An unsuccessful response containing error details.
 */
export const createUnknownErrorReturn = (
  message: string = 'An unknown error occured.'
): ApiReturn<never> => {
  return {
    success: false,
    error: {
      code: 0,
      message,
    },
  }
}

/**
 * Utility for creating a normalised API response.
 *
 * @returns An unsuccessful response containing error details.
 */
export const createErrorReturn = <E extends Omit<TmdbError, 'success'>>(
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

/**
 * Utility for creating a consistent error response.
 *
 * @returns An unsuccessful response containing error details.
 */
export const createMissingPropertyReturn = (
  message: string
): ApiReturn<never> => {
  return {
    success: false,
    error: {
      code: 500,
      message,
    },
  }
}
