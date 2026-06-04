import {
  normalizeMovie,
  normalizeMovieDetails,
  normalizeSeries,
  normalizeSeriesDetails,
} from '@/src/lib/api/normalize'
import type { OperationSuccessResponse } from '@/types/api'

export type NullableMovie = NonNullable<
  OperationSuccessResponse<'discover-movie'>['results']
>[number]

export type NullableMovieDetails = OperationSuccessResponse<'movie-details'>

export type NullableMovieDetailsOptions = NullableMovieDetails &
  Options<NullableMovieDetails>

export type NullableSeries = NonNullable<
  OperationSuccessResponse<'discover-tv'>['results']
>[number]

export type NullableSeriesDetails =
  OperationSuccessResponse<'tv-series-details'>

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
      reviews: OperationSuccessResponse<'movie-reviews'>
      'watch/providers': OperationSuccessResponse<'watch-providers-movie-list'>
      credits: OperationSuccessResponse<'movie-credits'>
    }
  : {
      reviews: OperationSuccessResponse<'tv-series-reviews'>
      'watch/providers': OperationSuccessResponse<'watch-provider-tv-list'>
      aggregate_credits: OperationSuccessResponse<'tv-series-aggregate-credits'>
    }

export type Movie = ReturnType<typeof normalizeMovie>
export type MovieDetails = ReturnType<typeof normalizeMovieDetails>
export type Series = ReturnType<typeof normalizeSeries>
export type SeriesDetails = ReturnType<typeof normalizeSeriesDetails>

// todo: how to stop ts compiler from flattening the type aliases so these comments are no longer needed
// Movie or Series.
export type Media = Movie | Series
// MovieDetails or SeriesDetails.
export type MediaDetails = MovieDetails | SeriesDetails
