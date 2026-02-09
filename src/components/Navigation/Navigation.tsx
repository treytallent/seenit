'use client'

import { SearchDialog } from '@/components/Navigation/SearchDialog'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { XMark } from '@/components/ui/icons/x-mark'
import { PopoverButton } from '@/components/ui/popover'
import * as Headless from '@headlessui/react'
import * as Motion from 'framer-motion'
import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { AccountDropdown } from './AccountDropdown'

export function MenuItem({
  href,
  closePopover,
  children,
}: React.PropsWithChildren<{
  href: string
  closePopover: boolean
}>) {
  const close = Headless.useClose()
  const current = href === usePathname()

  return (
    <Button
      plain
      className="justify-start px-3 py-2.75 max-sm:w-full max-sm:rounded-2xl max-sm:[--active-scale:0.99]"
      {...(current ? { disabled: true } : { href })}
      onClick={closePopover ? () => close() : undefined}
    >
      {children}
    </Button>
  )
}

function MenuItems({
  closePopover = false,
  className,
}: {
  closePopover?: boolean
  className?: string
}) {
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

function MobileSidebar({
  children,
  ...props
}: React.PropsWithChildren<Headless.PopoverProps>) {
  return (
    <Headless.Popover {...props}>
      {({ open }) => (
        <>
          <PopoverButton className="z-1 data-open:scale-100" size="sm">
            {open ? <XMark /> : <MenuIcon />}
          </PopoverButton>
          <Headless.PopoverBackdrop
            transition
            className="fixed inset-0 scrollbar-none h-screen bg-obsidian-950/50 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
          />
          <Headless.PopoverPanel
            modal
            transition
            className={twJoin(
              'fixed inset-x-0 top-0 rounded-br-3xl rounded-bl-3xl bg-obsidian-950 px-3 pt-17 pb-3',
              // Forced colors mode
              'forced-colors:outline',
              // Shadows
              'shadow-lg ring-1 ring-white/10',
              'transition duration-100 will-change-transform data-closed:-translate-y-12 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in'
            )}
          >
            {children}
          </Headless.PopoverPanel>
        </>
      )}
    </Headless.Popover>
  )
}

export function Navigation() {
  const { scrollY } = Motion.useScroll()
  const [scrollDirection, setScrollDirection] = React.useState('up')
  const isScrollDown = scrollDirection === 'down'

  Motion.useMotionValueEvent(scrollY, 'change', (current) => {
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
      <Container
        as="nav"
        className="flex items-center justify-between gap-x-3 py-2"
      >
        <MobileSidebar className="sm:hidden">
          <MenuItems closePopover className="flex-col" />
        </MobileSidebar>

        <MenuItems className="max-sm:hidden" />

        <div className="flex items-center gap-3">
          <AccountDropdown />
          <SearchDialog />
        </div>
      </Container>
    </header>
  )
}
