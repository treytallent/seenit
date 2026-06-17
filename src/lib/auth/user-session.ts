'use server'

import {
  createErrorReturn,
  createMissingPropertyReturn,
  createSuccessReturn,
} from '@/api/tmdb-client'
import { APP_BASE_URL, TMDB_BASE_URL } from '@/lib/constants'
import {
  fetchNewAuthenticationToken,
  fetchNewSessionId,
} from '@/src/lib/api/tmdb-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Redirects the user to TMDB with a new authentication token and requests authentication approval.
 * todo: rename to getTmdbAuthApproval? or authApproval?
 *
 * @link https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id
 * @returns A promise that resolves to an unsuccessful response including error details, or void if successful.
 */
export async function authRedirect() {
  const res = await fetchNewAuthenticationToken()

  if (!res.success) {
    return res
  }

  if (!res.data.request_token) {
    return createMissingPropertyReturn(
      'Missing request_token in TMDB response.'
    )
  }

  const redirectURL = new URL(
    `/authenticate/${res.data.request_token}`,
    TMDB_BASE_URL
  )
  redirectURL.searchParams.set('redirect_to', `${APP_BASE_URL}/api/auth`)

  redirect(redirectURL.toString())
}

/**
 * Create a new TMDB session and stores its ID in cookies.
 * Runs in proxy on '/auth' paths where it validates the TMDB approval request.
 *
 * @param req
 * @returns  A promise that resolves to an unsuccessful response including error details, or void if successful.
 */
export async function createNewUserSession(request: NextRequest) {
  // TODO: update jsdoc comment & returns comment.
  // todo: differ returns if success/error and propagate like guest-session.ts
  const searchParams = request.nextUrl.searchParams

  const requestApproved = searchParams.get('approved')

  if (!requestApproved) {
    return createErrorReturn({
      status_code: 401,
      status_message: 'TMDB authentication was denied.',
    })
  }

  const reqToken = searchParams.get('request_token')

  if (!reqToken) {
    return createMissingPropertyReturn(
      'Missing request_token in TMDB redirect URL.'
    )
  }

  const res = await fetchNewSessionId(reqToken)

  if (!res.success) {
    return res
  }

  if (!res.data.session_id) {
    return createMissingPropertyReturn('Missing session_id in TMDB response.')
  }

  const cookieStore = await cookies()

  cookieStore.set('sessionId', res.data.session_id, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  return createSuccessReturn('Successfully authenticated with TMDB.')
}
