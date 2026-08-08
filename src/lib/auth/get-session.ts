'use server'

import { cookies } from 'next/headers'

/**
 * Get a session cookie, prioritising userSession over guestSession because a request could contain both.
 * @returns A promise that resolves to false if no session is found, or a discriminated union for the user session.
 */
export async function getSession() {
  const cookieStore = await cookies()

  const userSession = cookieStore.get('sessionId')
  if (userSession?.value) {
    return {
      isGuest: false,
      id: userSession.value,
    }
  }

  const guestSession = cookieStore.get('guestSessionId')
  if (guestSession?.value) {
    return {
      isGuest: true,
      id: guestSession.value,
    }
  }

  return false
}
