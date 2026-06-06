import type { operations } from './schema/tmdb-api-schema'

/**
 * Flatten out the display of properties in generic T.
 *
 * @link https://effectivetypescript.com/2022/02/25/gentips-4-display/
 * @template T Type to resolve.
 */
export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] } // eslint-disable-line @typescript-eslint/no-unsafe-function-type

/**
 * Get the response types of a TMDB operation T.
 *
 * @template T Operation key.
 */
export type TmdbResponses<T extends keyof operations> =
  operations[T]['responses']

/**
 * Omits properties whose set is a subset of undefined.
 * A conditional check follows a constraint on T so tooltips display the recursion evaluation.
 *
 * @template T Object to use.
 */
export type OmitUndefinedSubsets<T> = T extends object
  ? {
      [P in keyof T as T[P] extends undefined ? never : P]: T[P] extends object
        ? OmitUndefinedSubsets<T[P]>
        : T[P]
    }
  : T
