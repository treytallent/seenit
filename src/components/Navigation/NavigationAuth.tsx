'use client'

import { useSession } from '../Auth/SessionProvider'
import { SignInPrompt } from '../Auth/SignInPrompt'
import { UserSessionDropdown } from '../Auth/UserSessionDropdown'

export function NavigationAuth() {
  const session = useSession()

  const signedOut = false === session
  if (signedOut) {
    return <SignInPrompt action="rate" />
  }

  const isGuest = session && session.isGuest
  if (isGuest) {
    return 'guest user'
  }

  return <UserSessionDropdown />
}

export function NavigationAuthSkeleton() {
  return <div>Placeholder</div>
}
