'use client'

import { useSession } from '@/components/auth/session-provider'
import { SignInPrompt } from '@/components/auth/sign-in-prompt'
import { UserSessionDropdown } from '@/components/auth/user-session-dropdown'
import { Button } from '@/components/ui/button'
import { UserIcon } from 'lucide-react'
import { type ComponentProps } from 'react'

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

export function NavigationAuthButton(
  props: ComponentProps<typeof Button> & {
    'aria-label': string
  }
) {
  return (
    <Button {...props} size="sm" iconOnly>
      <UserIcon />
    </Button>
  )
}
