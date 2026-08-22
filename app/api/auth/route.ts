import { setFlashCookie } from '@/features/toast/flash'
import { createNewUserSession } from '@/lib/auth/user-session'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const previousPathname = request.headers.get('x-previous-pathname')

  if (!previousPathname) {
    const redirectUrl = new URL('/', request.url)
    return redirect(redirectUrl.toString())
  }

  const newString =
    previousPathname[0] === '/' ? previousPathname : `/${previousPathname}`
  const redirectUrl = new URL(newString, request.url)

  const res = await createNewUserSession(request)
  await setFlashCookie(res)
  return redirect(redirectUrl.toString())
}
