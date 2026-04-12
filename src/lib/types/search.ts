import type { SeriesWithMediaType, MovieWithMediaType } from './media'
import type { PersonWithMediaType } from './credits'

export interface Search<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

type SearchMultiResult =
  | SeriesWithMediaType
  | MovieWithMediaType
  | PersonWithMediaType

interface KeywordResult {
  id: number
  name: string
}

export type SearchMulti = Search<SearchMultiResult>
export type SearchKeyword = Search<KeywordResult>
