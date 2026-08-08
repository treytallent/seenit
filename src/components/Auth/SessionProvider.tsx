'use client'

import { getSession } from '@/src/lib/auth/get-session'
import { createContext, use, useContext } from 'react'

type UserSession = ReturnType<typeof getSession>

const SessionContext = createContext<UserSession | null>(null)

export function useSession() {
  const sessionPromise = useContext(SessionContext)
  if (null === sessionPromise) {
    throw new Error('useContext must be used within a SessionProvider')
  }
  return use(sessionPromise)
}

export function SessionProvider({
  children,
  sessionPromise,
}: {
  children: React.ReactNode
  sessionPromise: UserSession
}) {
  return <SessionContext value={sessionPromise}>{children}</SessionContext>
}
