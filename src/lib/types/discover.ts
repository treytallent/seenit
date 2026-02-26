import type { Movie, Series } from './media'

interface DiscoverBase {
  page: number
  total_results: number
  total_pages: number
}

export interface DiscoverMovies extends DiscoverBase {
  results: Movie[]
}

export interface DiscoverSeries extends DiscoverBase {
  results: Series[]
}

export type DiscoverUnknownMedia = DiscoverMovies | DiscoverSeries
