import '@/app/globals.css'
import { SessionProvider } from '@/components/auth/session-provider'
import { Footer } from '@/components/footer'
import { NavigationLayout } from '@/components/navigation/navigation-layout'
import { getFlashCookie } from '@/features/toast/flash'
import { Toaster } from '@/features/toast/toaster'
import { getSession } from '@/lib/auth/get-session'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { twJoin } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | SeenIt',
    default: 'Home | SeenIt',
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  metadataBase: new URL(
    'https://seenit-a9qie8ih9-treys-projects-e0959bf2.vercel.app/'
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const flashCookiePromise = getFlashCookie()
  const sessionPromise = getSession()

  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-obsidian-900/30 scrollbar-track-obsidian-100 dark:scrollbar-thumb-white/30 dark:scrollbar-track-obsidian-900"
    >
      <body
        className={twJoin(
          inter.className,
          'relative isolate flex min-h-svh w-full flex-col antialiased',
          'bg-white text-obsidian-900 selection:bg-purple-vivid-300 selection:text-purple-vivid-950 dark:bg-obsidian-950 dark:text-white',
          '[--body-x:--spacing(6)] lg:[--body-x:--spacing(8)]'
        )}
      >
        <SessionProvider sessionPromise={sessionPromise}>
          <NavigationLayout />
          <main className="flex-1">{children}</main>
          <Footer />
          <Suspense>
            <Toaster flashCookiePromise={flashCookiePromise} />
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  )
}
