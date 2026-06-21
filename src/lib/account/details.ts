import { tmdbClient } from '@/lib/api/tmdb-client'
import { withUserSessionId } from '@/lib/auth/with-session'

/**
 * Get account details belonging to an authenticated user.
 *
 * I don't think it's possible to query a specific user's accountId.
 * Querying someone else's ID always returns the details of the user who the session_id belongs to.
 * However, if you don't provide a session_id the result is always a 401 error.
 * Therefore, account_id currently defaults to 0 to provide a valid parameter.
 *
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function getUserSessionAccountDetails() {
  return await withUserSessionId((sessionId) =>
    tmdbClient('GET', '/3/account/{account_id}', {
      query: {
        session_id: sessionId,
      },
      path: {
        account_id: 0,
      },
    })
  )
}
