import { replaceKey } from '@/lib/utils'
import {
  NullableAggregateCast,
  NullableAggregateCrew,
  NullableCast,
  NullableCrew,
} from '@/types/credits'
import type {
  NullableMovie,
  NullableMovieDetails,
  NullableSeries,
  NullableSeriesDetails,
} from '@/types/media'

enum MediaDiscriminant {
  MOVIE = 'movie',
  MOVIEDETAILS = 'movieDetails',
  SERIES = 'series',
  SERIESDETAILS = 'seriesDetails',
}

export function normalizeMovie(m: NullableMovie) {
  return {
    ...m,
    tag: MediaDiscriminant.MOVIE,
    title: m.title ?? m.original_title,
  }
}

export function normalizeMovieDetails(m: NullableMovieDetails) {
  return {
    ...m,
    tag: MediaDiscriminant.MOVIEDETAILS,
    title: m.title ?? m.original_title,
  }
}

export function normalizeSeries(m: NullableSeries) {
  return {
    ...m,
    tag: MediaDiscriminant.SERIES,
    title: m.name ?? m.original_name, // title property is consistent with Movies.
  }
}

export function normalizeSeriesDetails(m: NullableSeriesDetails) {
  return {
    ...m,
    tag: MediaDiscriminant.SERIESDETAILS,
    title: m.name ?? m.original_name, // title property is consistent with Movies.
  }
}

enum CreditDiscriminant {
  CAST = 'cast',
  AGGREGATECAST = 'aggregatecast',
  CREW = 'crew',
  AGGREGATECREW = 'aggregatecrew',
}

function normalizeCreditsBase(
  c: NullableCast | NullableCrew | NullableAggregateCast | NullableAggregateCrew
) {
  return {
    name: c.name ?? c.original_name ?? null,
  }
}

export function normalizeCast(c: NullableCast) {
  return {
    ...c,
    ...normalizeCreditsBase(c),
    tag: CreditDiscriminant.CAST,
    credit: c.character, // credit property is consistent with Crew.
    department: c.known_for_department, // department property is consistent with Crew.
  }
}

export function normalizeCrew(c: NullableCrew) {
  return {
    ...c,
    ...normalizeCreditsBase(c),
    tag: CreditDiscriminant.CREW,
    credit: c.job, // credit property is consistent with Cast.
  }
}

export function normalizeAggregateCast(c: NullableAggregateCast) {
  const credit = []
  for (const v of c.roles ?? []) {
    credit.push({
      ...replaceKey(v, 'character', 'credit'), // replace character property for consistency with AggregateCrew.
    })
  }

  return {
    ...c,
    ...normalizeCreditsBase(c),
    tag: CreditDiscriminant.AGGREGATECAST,
    credit,
  }
}

export function normalizeAggregateCrew(c: NullableAggregateCrew) {
  const credit = []
  for (const v of c.jobs ?? []) {
    credit.push({
      ...replaceKey(v, 'job', 'credit'), // replace character property for consistency with AggregateCast.
    })
  }

  return {
    ...c,
    ...normalizeCreditsBase(c),
    tag: CreditDiscriminant.AGGREGATECAST,
    credit,
  }
}
