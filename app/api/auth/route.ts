import { createNewUserSession } from '@/src/lib/auth/user-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const previousPathname = request.headers.get('previous-pathname')
  const redirectUrl = new URL(previousPathname ?? '/', request.url)

  if (!previousPathname) {
    return redirect(redirectUrl.toString())
  }

  const res = await createNewUserSession(request)

  // Not sure whether to store the result as a cookie or search params. I'm leaning towards cookie because I think it's cleaner.
  const cookieStore = await cookies()
  cookieStore.set('flash', res.toString(), {
    secure: true,
    maxAge: 10,
    httpOnly: false,
    path: '/',
  })

  return redirect(redirectUrl.toString())
}
