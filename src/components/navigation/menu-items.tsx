'use client'

import { Button } from '@/components/ui/button'
import * as Headless from '@headlessui/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function MenuItems({
  closePopover = false,
  className,
}: {
  closePopover?: boolean
  className?: string
}) {
  'use client'

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' },
    { name: 'Series', href: '/series' },
    { name: 'My lists', href: '/my-lists' },
  ]

  return (
    <div className={twMerge('flex items-center', className)}>
      {links.map((link) => (
        <MenuItem closePopover={closePopover} key={link.href} href={link.href}>
          {link.name}
        </MenuItem>
      ))}
    </div>
  )
}

function MenuItem({
  href,
  closePopover,
  children,
}: React.PropsWithChildren<{
  href: string
  closePopover: boolean
}>) {
  'use client'

  const close = Headless.useClose()
  const current = href === usePathname()

  return (
    <Button
      plain
      {...(current ? { disabled: true } : { href })}
      className={`justify-start px-3 py-2.75 max-sm:w-full max-sm:rounded-2xl max-sm:[--active-scale:0.99] ${current ? 'text-white data-disabled:opacity-100' : 'not-data-hover:text-obsidian-400'}`}
      onClick={closePopover ? () => close() : undefined}
    >
      {children}
    </Button>
  )
}
