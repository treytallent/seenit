import type { operations } from './schema/tmdb-api-schema'

/** Obtain the success response type of a TMDB operation T. */
export type SuccessResponse<T extends keyof operations> =
  operations[T]['responses'][200]['content']['application/json']
