import {
  normalizeAggregateCast,
  normalizeAggregateCrew,
  normalizeCast,
  normalizeCrew,
} from '@/api/normalize'
import { OperationSuccessResponse } from '@/src/lib/api/types'

export type NullableCast = NonNullable<
  OperationSuccessResponse<'movie-credits'>['cast']
>[number]

export type NullableCrew = NonNullable<
  OperationSuccessResponse<'movie-credits'>['crew']
>[number]

export type NullableAggregateCast = NonNullable<
  OperationSuccessResponse<'tv-series-aggregate-credits'>['cast']
>[number]

export type NullableAggregateCrew = NonNullable<
  OperationSuccessResponse<'tv-series-aggregate-credits'>['crew']
>[number]

type Cast = ReturnType<typeof normalizeCast>
type Crew = ReturnType<typeof normalizeCrew>
type AggregateCast = ReturnType<typeof normalizeAggregateCast>
type AggregateCrew = ReturnType<typeof normalizeAggregateCrew>

// Cast or AggregateCast
export type CastCredit = Cast | AggregateCast
// Crew or AggregateCrew
export type CrewCredit = Crew | AggregateCrew
// Cast or Crew
export type Credit = Cast | Crew
// AggregateCast or AggregateCrew
export type AggregateCredit = AggregateCast | AggregateCrew
