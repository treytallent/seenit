import { setFlashCookie } from '@/src/features/toast/flash'
import { createNewUserSession } from '@/src/lib/auth/user-session'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const previousPathname = request.headers.get('x-previous-pathname')

  const redirectUrl = new URL(
    previousPathname ? `/${previousPathname}` : '/',
    request.url
  )

  if (!previousPathname) {
    return redirect(redirectUrl.toString())
  }

  const res = await createNewUserSession(request)
  await setFlashCookie(res)
  return redirect(redirectUrl.toString())
}
