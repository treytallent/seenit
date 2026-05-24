import type { operations, paths } from './schema/tmdb-api-schema'

/** Flatten out the display of properties in generic T. @see https://effectivetypescript.com/2022/02/25/gentips-4-display/ */
export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] } // eslint-disable-line @typescript-eslint/no-unsafe-function-type

/** Get the response types of a TMDB operation T. */
export type TmdbResponses<T extends keyof operations> =
  operations[T]['responses']

/** Get the success response type of a TMDB operation T. */
export type SuccessResponse<T extends keyof operations> =
  operations[T]['responses'][200]['content']['application/json']

/** HTTP methods included in TMDB's schema. */
export type TmdbHTTPMethods = 'GET' | 'PUT' | 'POST' | 'DELETE'

/** From an HTTP method T, narrow the possible TMDB paths. */
export type HTTPMethodPaths<T extends TmdbHTTPMethods> = {
  [P in keyof paths]: paths[P][Lowercase<T>] extends undefined ? never : P
}[keyof paths]

/** From a valid HTTP method M and a TMDB path P, get a simplified interface for fetch arguments. */
export type RequestArguments<M, P> = M extends TmdbHTTPMethods
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

/** Omits properties whose set is a subset of undefined. A conditional check follows a constraint on T so tooltips display the recursion evaluation. */
export type OmitUndefinedSubsets<T> = T extends object
  ? {
      [P in keyof T as T[P] extends undefined ? never : P]: T[P] extends object
        ? OmitUndefinedSubsets<T[P]>
        : T[P]
    }
  : T
