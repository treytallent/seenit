'use client'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import { PropsWithChildren, useState } from 'react'
import { twJoin } from 'tailwind-merge'

export function Navigation({ children }: PropsWithChildren) {
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState('up')
  const isScrollDown = scrollDirection === 'down'

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - (scrollY.getPrevious() ?? 0)
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })

  return (
    <header
      className={twJoin(
        isScrollDown && '-translate-y-15 opacity-0',
        'sticky top-0 z-1 w-full bg-obsidian-950 backdrop-blur-sm transition ease-in-out',
        'bg-linear-to-b from-white/2.5'
      )}
    >
      {children}
    </header>
  )
}
