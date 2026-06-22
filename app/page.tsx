'use client'

import { authRedirect } from '@/lib/auth/user-session'
import { Button } from '@/src/components/ui/button'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathname = usePathname()
  return (
    <div className="">
      <h1>Heading</h1>
      <Button
        data-testid="submit-auth-redirect"
        onClick={() => {
          authRedirect(pathname)
        }}
      >
        Auth
      </Button>
    </div>
  )
}
