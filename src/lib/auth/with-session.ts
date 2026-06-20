import { cookies } from 'next/headers'

/**
 * Higher-order function that executes the provided callback with the user's session ID or a string literal 'invalid'.
 * A string literal fallback is used to return a 401 error rather than 404 from TMDB.
 *
 * @param callback Callback expecting a sessionId.
 * @returns Result of the callback.
 */
export async function withUserSessionId<T>(
  callback: (userSessionId: string | undefined) => T
) {
  const cookieStore = await cookies()
  const userSession = cookieStore.get('sessionId')

  return callback(userSession?.value ?? 'invalid')
}

/**
 * Higher-order function that executes the provided callback with the user's guest session ID or a string literal 'invalid'.
 * A string literal fallback is used to return a 401 error rather than 404 from TMDB.
 *
 * @param callback Callback expecting a guestSessionId.
 * @returns Result of the callback.
 */
export async function withGuestSessionId<T>(
  callback: (guestSessionId: string) => T
) {
  const cookieStore = await cookies()
  const guestSession = cookieStore.get('guestSessionId')

  return callback(guestSession?.value ?? 'invalid')
}
