import '@/app/globals.css'
import { Toaster } from '@/src/components/Toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-obsidian-900"
    >
      <body
        className={twJoin(
          inter.className,
          'relative isolate min-h-svh w-full antialiased',
          'bg-obsidian-950 text-white selection:bg-purple-vivid-300 selection:text-purple-vivid-950',
          '[--body-x:--spacing(6)] lg:[--body-x:--spacing(8)]'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
