import { createNewUserSession } from '@/src/lib/auth/user-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // todo: protect route
  const res = await createNewUserSession(request)

  const cookieStore = await cookies()
  // Not sure whether to store the result as a cookie or search params. I'm leaning towards cookie because I think it's cleaner.
  cookieStore.set('flash', res.toString(), {
    secure: true,
    maxAge: 10,
    httpOnly: false,
    path: '/',
  })

  // todo: redirect back to previous URL.
  const redirectTo = new URL('/', request.url)

  return redirect(redirectTo.toString())
}
