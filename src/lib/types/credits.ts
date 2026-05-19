import {
  normalizeAggregateCast,
  normalizeAggregateCrew,
  normalizeCast,
  normalizeCrew,
} from '@/api/normalize'
import type { SuccessResponse } from './utils'

export type NullableCast = NonNullable<
  SuccessResponse<'movie-credits'>['cast']
>[number]

export type NullableCrew = NonNullable<
  SuccessResponse<'movie-credits'>['crew']
>[number]

export type NullableAggregateCast = NonNullable<
  SuccessResponse<'tv-series-aggregate-credits'>['cast']
>[number]

export type NullableAggregateCrew = NonNullable<
  SuccessResponse<'tv-series-aggregate-credits'>['crew']
>[number]

type Cast = ReturnType<typeof normalizeCast>
type Crew = ReturnType<typeof normalizeCrew>
type AggregateCast = ReturnType<typeof normalizeAggregateCast>
type AggregateCrew = ReturnType<typeof normalizeAggregateCrew>

/** Cast or AggregateCast */
export type CastCredit = Cast | AggregateCast
/** Crew or AggregateCrew */
export type CrewCredit = Crew | AggregateCrew
/** Cast or Crew */
export type Credit = Cast | Crew
/** AggregateCast or AggregateCrew */
export type AggregateCredit = AggregateCast | AggregateCrew
