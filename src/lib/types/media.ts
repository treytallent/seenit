import {
  normalizeMovie,
  normalizeMovieDetails,
  normalizeSeries,
  normalizeSeriesDetails,
} from '@/src/lib/api/normalize'
import type { SuccessResponse } from '@/types/utils'

export type NullableMovie = NonNullable<
  SuccessResponse<'discover-movie'>['results']
>[number]

export type NullableMovieDetails = SuccessResponse<'movie-details'>

export type NullableMovieDetailsOptions = NullableMovieDetails &
  Options<NullableMovieDetails>

export type NullableSeries = NonNullable<
  SuccessResponse<'discover-tv'>['results']
>[number]

export type NullableSeriesDetails = SuccessResponse<'tv-series-details'>

export type NullableSeriesDetailsOptions = NullableSeriesDetails &
  Options<NullableSeriesDetails>

// temp for testing
export type NullableMedia =
  | NullableMovie
  | NullableSeries
  | NullableMovieDetails
  | NullableSeries

type Options<T> = T extends NullableMovieDetails
  ? {
      reviews: SuccessResponse<'movie-reviews'>
      'watch/providers': SuccessResponse<'watch-providers-movie-list'>
      credits: SuccessResponse<'movie-credits'>
    }
  : {
      reviews: SuccessResponse<'tv-series-reviews'>
      'watch/providers': SuccessResponse<'watch-provider-tv-list'>
      aggregate_credits: SuccessResponse<'tv-series-aggregate-credits'>
    }

export type Movie = ReturnType<typeof normalizeMovie>
export type MovieDetails = ReturnType<typeof normalizeMovieDetails>
export type Series = ReturnType<typeof normalizeSeries>
export type SeriesDetails = ReturnType<typeof normalizeSeriesDetails>

// todo: how to stop ts compiler from flattening the type aliases so these comments are no longer needed
/** Movie or Series */
export type Media = Movie | Series
/** MovieDetails or SeriesDetails */
export type MediaDetails = MovieDetails | SeriesDetails
