import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(request: NextRequest) {
  const cookieStore = await cookies()

  const previousPathname = cookieStore.get('previousPathname')?.value

  if (!previousPathname) {
    return redirectHomeResponse(request)
  }

  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  })
  response.headers.set('x-previous-pathname', previousPathname)
  cookieStore.delete('previousPathname')

  return response
}

export const config = {
  matcher: '/api/:path',
}

const redirectHomeResponse = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url))
}
