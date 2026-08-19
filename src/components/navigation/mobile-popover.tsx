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
          <PopoverButton className="z-1 data-open:scale-100" size="sm">
            {open ? <XMark /> : <MenuIcon />}
          </PopoverButton>
          <PopoverBackdrop
            transition
            className="fixed inset-0 h-screen scrollbar-none bg-obsidian-950/50 transition duration-(--duration-ui) focus:outline-0 data-closed:opacity-0 data-enter:ease-ui data-leave:duration-(--duration-snap) data-leave:ease-snap"
          />
          <Headless.PopoverPanel
            modal
            transition
            className={twJoin(
              'fixed inset-x-0 top-0 rounded-br-3xl rounded-bl-3xl bg-obsidian-900 px-3 pt-17 pb-3',
              // Forced colors mode
              'forced-colors:outline',
              // Shadows
              'shadow-lg ring-1 ring-white/10',
              'transition duration-(--duration-ui) will-change-transform data-closed:-translate-y-12 data-closed:opacity-0 data-enter:ease-ui data-leave:duration-(--duration-snap) data-leave:ease-snap'
            )}
          >
            {children}
          </Headless.PopoverPanel>
        </>
      )}
    </Popover>
  )
}
