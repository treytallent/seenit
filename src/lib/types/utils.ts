import type { operations, paths } from './schema/tmdb-api-schema'

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

/** From a Tmdb schema path operation T, exclude responses from any objects. */
export type OmitResponses<
  T extends paths[keyof paths][Lowercase<TmdbHTTPMethods>],
> = T extends object ? Omit<T, 'responses'> : T
