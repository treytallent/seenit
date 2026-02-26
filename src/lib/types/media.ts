import type { Reviews } from './reviews'
import type { WatchProviders } from './watch-providers'
import type { Credits, AggregateCredits } from './credits'

interface MediaBase {
  id: number
  poster_path: string | null
  backdrop_path: string | null
  popularity: number
  overview: string
  adult: boolean
  vote_count: number
  vote_average: number
  original_language: string
}

export interface Genre {
  id: number
  name: string
}

interface MovieBase extends MediaBase {
  release_date: string
  original_title: string
  title: string
  video: boolean
}

export interface Movie extends MovieBase {
  genre_ids: number[]
}

export interface MovieWithMediaType extends Movie {
  media_type: 'movie'
}

interface MovieDetails extends MovieBase {
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  } | null
  budget: number
  genres: Genre[]
  origin_country: string[]
  homepage: string
  imdb_id: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: { iso_3166_1: string; name: string }[]
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
}

interface SeriesBase extends MediaBase {
  name: string
  first_air_date: string
  origin_country: string[]
  original_name: string
}

export interface Series extends SeriesBase {
  genre_ids: number[]
}

export interface SeriesWithMediaType extends Series {
  media_type: 'tv'
}

interface Episode {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number | null
  season_number: number
  show_id: number
  still_path: string | null
}

interface SeriesDetails extends SeriesBase {
  created_by: {
    id: number
    credit_id: string
    name: string
    original_name: string
    gender: number
    profile_path: string | null
  }[]
  episode_run_time: number[]
  genres: Genre[]
  homepage: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Episode
  next_episode_to_air?: Episode | null
  networks: {
    name: string
    id: number
    logo_path: string
    origin_country: string
  }[]
  number_of_episodes: number
  number_of_seasons: number
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: { iso_3166_1: string; name: string }[]
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    vote_average: number
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  type: string
}

interface MovieDetailsOptions {
  reviews: Reviews
  'watch/providers': WatchProviders
  credits: Credits
}

interface SeriesDetailsOptions {
  reviews: Reviews
  'watch/providers': WatchProviders
  aggregate_credits: AggregateCredits
}

export type MovieDetailsWithOptions = MovieDetails & MovieDetailsOptions
export type SeriesDetailsWithOptions = SeriesDetails & SeriesDetailsOptions

export type UnknownMovie = Movie | MovieDetailsWithOptions
export type UnknownSeries = Series | SeriesDetailsWithOptions
export type UnknownMediaUnion = UnknownMovie | UnknownSeries

export type UnknownMedia = Movie | Series
export type UnknownMediaDetails =
  | MovieDetailsWithOptions
  | SeriesDetailsWithOptions

export function isUnknownMovie(
  media: UnknownMediaUnion
): media is UnknownMovie {
  return 'release_date' in media ? true : false
}

export function isUnknownSeries(
  media: UnknownMediaUnion
): media is UnknownSeries {
  return 'first_air_date' in media ? true : false
}

export function isSeriesDetailsWithOptions(
  media: UnknownMediaUnion
): media is SeriesDetailsWithOptions {
  return 'number_of_episodes' in media
}

export function isMovieDetailsWithOptions(
  media: UnknownMediaUnion
): media is MovieDetailsWithOptions {
  return 'runtime' in media
}

export function isUnknownMediaDetails(media: UnknownMediaUnion) {
  return isSeriesDetailsWithOptions(media) || isMovieDetailsWithOptions(media)
}
