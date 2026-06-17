import { tmdbClient } from './tmdb-client'

/**
 * Get a authentication token from TMDB for user authentication.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-request-token
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function fetchNewAuthenticationToken() {
  return tmdbClient('GET', '/3/authentication/token/new')
}

/**
 * Create a new TMDB session from an approved authentication token.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-session
 * @param authToken The authentication token used in the TMDB authentication request.
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function fetchNewSessionId(authToken: string) {
  return tmdbClient('POST', '/3/authentication/session/new', {
    requestBody: { request_token: authToken },
  })
}

/**
 * Create a new TMDB guest session.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-guest-session
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function fetchNewGuestSessionId() {
  // todo: do guest sessions refresh or do they always expire after 24 hours?
  return tmdbClient('GET', '/3/authentication/guest_session/new')
}
