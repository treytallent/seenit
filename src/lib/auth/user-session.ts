'use server'

import { tmdbClient } from '@/api/tmdb-client'
import { APP_BASE_URL, TMDB_BASE_URL } from '@/lib/constants'
import {
  createErrorReturn,
  createMissingPropertyReturn,
  createSuccessReturn,
} from '@/lib/create-return'
import { setFlashCookie } from '@/features/toast/flash'
import { refresh } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Get a authentication token from TMDB for user authentication.
 *
 * @link https://developer.themoviedb.org/reference/authentication-create-request-token
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
async function fetchNewAuthenticationToken() {
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
 * Constructs the TMDB url used for requesting authentication approval.
 *
 * @link https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function buildAuthRedirectUrl() {
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

  return createSuccessReturn(redirectURL.toString())
}

/**
 * Sets the previousPathname cookie before redirecting to the provided url.
 * @returns void
 */
export async function redirectWithPreviousPathname(
  redirectUrl: string,
  previousPathname: string
) {
  const cookieStore = await cookies()
  cookieStore.set('previousPathname', previousPathname, {
    httpOnly: true,
    secure: true,
    path: '/',
  })

  redirect(redirectUrl)
}

/**
 * Create a new TMDB session and stores its ID in cookies.
 *
 * @param request TMDB authentication approval redirect request.
 * @returns A promise that resolves to a discriminated union of either a successful or unsuccessful response.
 */
export async function createNewUserSession(request: NextRequest) {
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

/**
 * Deletes the TMDB session from cookies and refreshes.
 *
 * @returns void
 */
export async function deleteUserSession() {
  const cookieStore = await cookies()
  cookieStore.delete('sessionId')

  const res = createSuccessReturn('Successfully signed out.')
  await setFlashCookie(res)

  refresh()
}
