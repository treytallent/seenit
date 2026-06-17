import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(request: NextRequest) {
  return redirectHomeResponse(request)
}

export const config = {
  matcher: '/auth',
}

const redirectHomeResponse = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url))
}
