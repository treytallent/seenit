import type { OmitUndefinedSubsets, Resolve } from '@/lib/utils'
import type { operations, paths } from '@/src/lib/api/schema/tmdb-api-schema'

// HTTP methods included in TMDB's schema.
export type TmdbHTTPMethods = 'GET' | 'PUT' | 'POST' | 'DELETE'

/**
 * Narrow to the TMDB API routes that include an HTTP method T.
 *
 * @template T The HTTP method.
 */
export type HTTPMethodPaths<T extends TmdbHTTPMethods> = {
  [P in keyof paths]: paths[P][Lowercase<T>] extends undefined ? never : P
}[keyof paths]

/**
 * From a valid HTTP method M and a TMDB path P, get a simplified interface for fetch arguments.
 *
 * @template M The HTTP method.
 * @template P The API path.
 */
export type RequestArguments<M, P> = OmitUndefinedSubsets<
  M extends TmdbHTTPMethods
    ? P extends keyof paths
      ? paths[P][Lowercase<M>] extends {
          parameters: {
            query?: infer QU
            path?: infer PA
          }
          requestBody?: infer RB
        }
        ? {
            query: QU
            path: PA
            requestBody: RB extends undefined ? never : object // Omit when it's optional.
          }
        : paths[P][Lowercase<M>]
      : never
    : never
>

/**
 * Get the success response type for a given TMDB operation.
 *
 * @template O The API operation.
 */
export type OperationSuccessResponse<O extends keyof operations> =
  operations[O] extends object
    ? operations[O]['responses'][200]['content']['application/json']
    : never

/**
 * Get the success response type for a given HTTP method and TMDB schema path.
 *
 * @template M The HTTP method.
 * @template P The API path.
 */
export type EndpointSuccessResponse<
  M extends TmdbHTTPMethods,
  P extends keyof paths,
> = paths[P][Lowercase<M>] extends object
  ? paths[P][Lowercase<M>]['responses'][200]['content']['application/json']
  : never

/**
 * Successful response.
 *
 * @template T The data type.
 */
export type SuccessResponse<T> = { success: true; data: T }

/**
 * Unsuccessful response.
 */
export type ErrorResponse = {
  success: false
  error: { code: number; message: string }
}

/**
 * A discriminated union for API responses.
 *
 * @template T The data type of the successful response.
 */
export type ApiReturn<T> = Resolve<SuccessResponse<T> | ErrorResponse>

/**
 * Generic Tmdb error for non-200 responses.
 */
export type TmdbError = Resolve<
  Omit<
    operations['authentication-validate-key']['responses']['401']['content']['application/json'],
    'success'
  > & {
    success: false
  }
>

export function isTmdbError(result: unknown): result is TmdbError {
  return (
    null !== result &&
    'object' === typeof result &&
    'success' in result &&
    false === result.success
  )
}
