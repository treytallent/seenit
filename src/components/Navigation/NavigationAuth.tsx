'use client'

import { UserIcon } from 'lucide-react'
import { type ComponentProps } from 'react'
import { useSession } from '../Auth/SessionProvider'
import { SignInPrompt } from '../Auth/SignInPrompt'
import { UserSessionDropdown } from '../Auth/UserSessionDropdown'
import { Button } from '../ui/button'

export function NavigationAuth() {
  const session = useSession()

  const signedOut = false === session
  if (signedOut) {
    return <SignInPrompt action="rate" />
  }

  const isGuest = session && session.isGuest
  if (isGuest) {
    return <SignInPrompt action="save" />
  }

  return <UserSessionDropdown userSession={session} />
}

export function NavigationAuthButton(props: ComponentProps<typeof Button>) {
  return (
    <Button {...props} size="sm">
      <UserIcon />
    </Button>
  )
}
