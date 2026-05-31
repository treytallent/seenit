import type { operations, paths } from '@/types/schema/tmdb-api-schema'
import type { OmitUndefinedSubsets, Resolve } from './utils'
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
          requestBody?: {
            content: { 'application/json': { RAW_BODY?: infer RB } }
          }
        }
        ? {
            query: QU
            path: PA
            requestBody: RB extends string | undefined ? RB : undefined // Conditional check because the inferred type is deeply nested and only exists on some paths.
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
export type SuccessResponse<
  M extends TmdbHTTPMethods,
  P extends keyof paths,
> = paths[P][Lowercase<M>] extends object
  ? paths[P][Lowercase<M>]['responses'][200]['content']['application/json']
  : never

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

/**
 * Result type pattern implementation for API returns.
 *
 * @template T type of the successful response payload.
 */
export type ApiReturn<T> =
  | { success: true; data: T }
  | { success: false; error: { code: number; message: string } }
