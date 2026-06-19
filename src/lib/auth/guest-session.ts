'use server'

import {
  createMissingPropertyReturn,
  createSuccessReturn,
  tmdbClient,
} from '@/api/tmdb-client'
import { cookies } from 'next/headers'

/**
 * Create a new TMDB guest session.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-guest-session
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
async function fetchNewGuestSessionId() {
  // todo: do guest sessions refresh or do they always expire after 24 hours?
  return tmdbClient('GET', '/3/authentication/guest_session/new')
}

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
