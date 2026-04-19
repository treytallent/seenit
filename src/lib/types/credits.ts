import type { SuccessResponse } from './utils'

export type NullableCast = NonNullable<
  SuccessResponse<'movie-credits'>['cast']
>[number]

export type NullableCrew = SuccessResponse<'movie-credits'>['crew']

export type NullableAggregateCast = NonNullable<
  SuccessResponse<'tv-series-aggregate-credits'>['cast']
>[number]

export type NullableAggregateCrew = NonNullable<
  SuccessResponse<'tv-series-aggregate-credits'>['crew']
>[number]

// todo: normalize
type Cast = null
type Crew = null
type AggregateCast = null
type AggregateCrew = null

/** Cast or AggregateCast */
export type CastCredit = Cast | AggregateCast
/** Crew or AggregateCrew */
export type CrewCredit = Crew | AggregateCrew
/** Cast or Crew */
export type Credit = Cast | Crew
/** AggregateCast or AggregateCrew */
export type AggregateCredit = AggregateCast | AggregateCrew
