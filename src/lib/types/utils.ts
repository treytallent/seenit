import type { operations, paths } from './schema/tmdb-api-schema'

/** Flatten out the display of properties in generic T. @see https://effectivetypescript.com/2022/02/25/gentips-4-display/ */
export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] } // eslint-disable-line @typescript-eslint/no-unsafe-function-type

/** Obtain the response types of a TMDB operation T. */
export type TmdbResponses<T extends keyof operations> =
  operations[T]['responses']

/** Obtain the success response type of a TMDB operation T. */
export type SuccessResponse<T extends keyof operations> =
  operations[T]['responses'][200]['content']['application/json']

/** HTTP methods included in TMDB's schema. */
export type TmdbHTTPMethods = 'GET' | 'PUT' | 'POST' | 'DELETE'

/** From an HTTP method T, narrow the possible TMDB paths. */
export type HTTPMethodPaths<T extends TmdbHTTPMethods> = {
  [P in keyof paths]: paths[P][Lowercase<T>] extends undefined ? never : P
}[keyof paths]

/** Omit the responses property of a Tmdb schema path operation. */
export type OmitResponses<T> = Resolve<
  T extends paths[keyof paths][Lowercase<TmdbHTTPMethods>]
    ? T extends object
      ? Omit<T, 'responses'>
      : T
    : never
>

/** Omits properties whose set is a subset of undefined. A conditional check follows a constraint on T so tooltips display the recursion evaluation. */
export type OmitUndefinedSubsets<T> = T extends object
  ? {
      [P in keyof T as T[P] extends undefined ? never : P]: T[P] extends object
        ? OmitUndefinedSubsets<T[P]>
        : T[P]
    }
  : T
