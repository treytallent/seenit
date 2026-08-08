'use client'

import { Button } from '@/components/ui/button'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  type itemColors as dropdownColors,
} from '@/components/ui/dropdown'
import * as Headless from '@headlessui/react'
import { LogOut, UserRound } from 'lucide-react'
import React from 'react'

type Link = {
  title: string
  url: string
  color?: keyof typeof dropdownColors
  icon?: React.ReactNode
}

// todo: links
const links: Link[] = [
  {
    title: 'Sign Out',
    url: '',
    color: 'red',
    icon: <LogOut />,
  },
]

export function UserSessionDropdown({ ...props }: Headless.MenuProps) {
  return (
    <Dropdown {...props}>
      <DropdownButton size="sm" as={Button}>
        <UserRound />
      </DropdownButton>
      <DropdownMenu anchor="bottom">
        {links.map((link) => (
          <DropdownItem
            key={link.title}
            color={link.color ?? 'dark'}
            href={link.url}
          >
            {link.icon && link.icon}
            <DropdownLabel>{link.title}</DropdownLabel>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
