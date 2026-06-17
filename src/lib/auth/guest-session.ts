'use server'

import {
  createMissingPropertyReturn,
  createSuccessReturn,
} from '@/api/tmdb-client'
import { fetchNewGuestSessionId } from '@/src/lib/api/tmdb-auth'
import { cookies } from 'next/headers'

/**
 * Create a new TMDB guest session and stores its ID in cookies.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-guest-session
 * @returns A promise that resolves to the session creation outcome.
 */
export async function createNewGuestSession() {
  const res = await fetchNewGuestSessionId()

  if (!res.success) {
    return res
  }

  if (!res.data.guest_session_id) {
    return createMissingPropertyReturn(
      'Missing guest_session_id in TMDB response.'
    )
  }

  const cookieStore = await cookies()

  cookieStore.set('guestSessionId', res.data.guest_session_id, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  return createSuccessReturn('Guest session successfully created.')
}
