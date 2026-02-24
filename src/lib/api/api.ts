import { ApiReturn, TmdbErrorReturn, isTmdbErrorReturn } from '@/lib/api/types'

/**
 * Wrapper for TMDB api requests that normalizes errors as values.
 *
 * @param request The request function
 * @returns Promise that resolves to an object with a success property for narrowing the return type
 */
export async function tryTmdbRequest<
  T extends object,
  E extends TmdbErrorReturn = TmdbErrorReturn,
>(request: () => Promise<Response>) {
  try {
    const response = await request()
    const result: T | E = await response.json()

    if (isTmdbErrorReturn(result)) {
      throw new TmdbError(result)
    }
    return createSuccessReturn(result)
  } catch (error) {
    if (error instanceof TmdbError) {
      return createErrorReturn<E>(error.tmdbError)
    }

    return createErrorReturn({
      status_code: 0,
      status_message: 'An unknown error occured.',
      unknown_error: error,
    })
  }
}

export function createSuccessReturn<T>(data: T): ApiReturn<T, never> {
  return { success: true, data: data }
}

export function createErrorReturn<E>(error: E): ApiReturn<never, E> {
  return { success: false, error }
}

export class TmdbError<E extends TmdbErrorReturn> extends Error {
  tmdbError: E

  constructor(error: E) {
    super('TmdbError')
    this.tmdbError = error
  }
}
