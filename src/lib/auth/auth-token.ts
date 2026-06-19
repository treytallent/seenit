import { tmdbClient } from '@/api/tmdb-client'

/**
 * Get a authentication token from TMDB for user authentication.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-request-token
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function fetchNewAuthenticationToken() {
  return tmdbClient('GET', '/3/authentication/token/new')
}
