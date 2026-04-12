/**
 * TMDB API
 * @see https://developer.themoviedb.org/docs/
 */
const API_BASE_URL = 'https://api.themoviedb.org'

/**
 * V4 Auth
 * @see https://developer.themoviedb.org/v4/reference/auth-create-access-token
 */
export const API_CREATE_REQUEST_TOKEN = buildPath(4, 'auth/request_token')
export const API_CREATE_ACCESS_TOKEN = buildPath(4, 'auth/access_token')
export const API_LOGOUT = buildPath(4, 'auth/access_token')

/**
 * V4 Account
 * @see https://developer.themoviedb.org/v4/reference/account-lists
 */
export const API_ACCOUNT_GET_LISTS = (accountId: string) =>
  buildPath(4, `account/${accountId}/lists`)

export const API_ACCOUNT_GET_RATED_MOVIES = (accountId: string) =>
  buildPath(4, `account/${accountId}/movie/rated`)

export const API_ACCOUNT_GET_RATED_SERIES = (accountId: string) =>
  buildPath(4, `account/${accountId}/tv/rated`)

export const API_ACCOUNT_GET_RECOMMENDED_MOVIES = (accountId: string) =>
  buildPath(4, `account/${accountId}/movie/recommendations`)

export const API_ACCOUNT_GET_RECOMMENDED_SERIES = (accountId: string) =>
  buildPath(4, `account/${accountId}/tv/recommendations`)

/**
 * V4 Lists
 * @see https://developer.themoviedb.org/v4/reference/list-details
 */
export const API_LIST_CREATE = buildPath(4, `list`)

export const API_LIST_DELETE = (listId: string) =>
  buildPath(4, `list/${listId}`)

export const API_LIST_GET_DETAILS = (listId: string) =>
  buildPath(4, `list/${listId}`)

export const API_LIST_UPDATE_DETAILS = (listId: string) =>
  buildPath(4, `list/${listId}`)

export const API_LIST_ADD_ITEMS = (listId: string) =>
  buildPath(4, `list/${listId}/items`)

export const API_LIST_GET_ITEM_STATUS = (listId: string) =>
  buildPath(4, `list/${listId}/item_status`)

export const API_LIST_UPDATE_ITEMS = (listId: string) =>
  buildPath(4, `list/${listId}/items`)

export const API_LIST_DELETE_ITEMS = (listId: string) =>
  buildPath(4, `list/${listId}/items`)

/**
 * V3 Configuration
 * @see https://developer.themoviedb.org/reference/configuration-details
 */
export const API_CONFIGURATION_GET_DETAILS = buildPath(3, 'configuration')

/**
 * V3 Discover
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export const API_DISCOVER_GET_MOVIES = buildPath(3, 'discover/movie')
export const API_DISCOVER_GET_SERIES = buildPath(3, 'discover/tv')

/**
 * V3 Genres
 * @see https://developer.themoviedb.org/reference/genre-movie-list
 */
export const API_GENRES_GET_MOVIES = buildPath(3, 'genre/movie/list')
export const API_GENRES_GET_SERIES = buildPath(3, 'genre/tv/list')

/**
 * V3 Movies
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export const API_MOVIES_GET_DETAILS = (movieId: string) =>
  buildPath(3, `movie/${movieId}`)

export const API_MOVIES_GET_RECOMMENDATIONS = (movieId: string) =>
  buildPath(3, `movie/${movieId}/recommendations`)

export const API_MOVIES_ADD_RATING = (movieId: string) =>
  buildPath(3, `movie/${movieId}/rating`)

export const API_MOVIES_DELETE_RATING = (movieId: string) =>
  buildPath(3, `movie/${movieId}/rating`)

/**
 * V3 Series
 * @see https://developer.themoviedb.org/reference/tv-series-details
 */
export const API_SERIES_GET_DETAILS = (seriesId: string) =>
  buildPath(3, `tv/${seriesId}`)

export const API_SERIES_GET_RECOMMENDATIONS = (seriesId: string) =>
  buildPath(3, `tv/${seriesId}/recommendations`)

export const API_SERIES_ADD_RATING = (seriesId: string) =>
  buildPath(3, `tv/${seriesId}/rating`)

export const API_SERIES_DELETE_RATING = (seriesId: string) =>
  buildPath(3, `tv/${seriesId}/rating`)

/**
 * V3 Search
 * @see https://developer.themoviedb.org/reference/search-multi
 */
export const API_SEARCH_GET_MULTI = buildPath(3, 'search/multi')
export const API_SEARCH_GET_KEYWORDS = buildPath(3, 'search/keyword')
export const API_SEARCH_GET_MOVIES = buildPath(3, 'search/movie')
export const API_SEARCH_GET_SERIES = buildPath(3, 'search/tv')

/**
 * Utility to build TMDB endpoints.
 *
 * @param version API version
 * @param identifier Endpoint identifier
 *
 * @returns Full endpoint
 */
function buildPath(version: number, identifier: string) {
  return `${API_BASE_URL}/${version}/${identifier}`
}

// todo: functions for appending search params i.e add query & page number to search endpoints and options to discover endpoints
