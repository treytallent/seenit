'use client'

import { XMark } from '@/components/ui/icons/x-mark'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
} from '@/components/ui/popover'
import * as Headless from '@headlessui/react'
import { MenuIcon } from 'lucide-react'
import React from 'react'
import { twJoin } from 'tailwind-merge'

export function MobilePopover({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Popover>>) {
  'use client'

  return (
    <Popover {...props}>
      {({ open }) => (
        <>
          <PopoverButton
            iconOnly
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="z-1 data-open:scale-100"
            size="sm"
          >
            {open ? <XMark /> : <MenuIcon />}
          </PopoverButton>
          <PopoverBackdrop
            transition
            className="fixed inset-0 h-screen scrollbar-none bg-obsidian-950/25 transition duration-(--duration-ui) ease-ui focus:outline-0 data-closed:opacity-0 dark:bg-obsidian-950/50"
          />
          <Headless.PopoverPanel
            modal
            transition
            className={twJoin(
              'fixed inset-x-0 top-0 rounded-br-3xl rounded-bl-3xl bg-white px-3 pt-17 pb-3 dark:bg-obsidian-950',
              // Forced colors mode
              'forced-colors:outline',
              // Shadows
              'shadow-lg ring-1 ring-obsidian-900/10 dark:ring-white/10',
              'transition duration-(--duration-ui) ease-ui will-change-transform data-closed:-translate-y-12 data-closed:opacity-0'
            )}
          >
            {children}
          </Headless.PopoverPanel>
        </>
      )}
    </Popover>
  )
}
