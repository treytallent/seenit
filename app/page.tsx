'use client'

import { authRedirect } from '@/lib/auth/user-session'
import { Button } from '@/src/components/ui/button'

export default function Home() {
  return (
    <div className="">
      <h1>Heading</h1>
      <Button data-testid="submit-auth-redirect" onClick={() => authRedirect()}>
        Auth
      </Button>
    </div>
  )
}
