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

// todo: normalize
export type Movie = null
export type MovieDetails = null
export type Series = null
export type SeriesDetails = null

/** Movie or Series */
export type Media = Movie | Series
/** MovieDetails or SeriesDetails */
export type MediaDetails = MovieDetails | SeriesDetails
