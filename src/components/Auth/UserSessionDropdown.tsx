'use client'

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/ui/dropdown'
import { type UserSession } from '@/src/lib/auth/get-session'
import { deleteUserSession } from '@/src/lib/auth/user-session'
import * as Headless from '@headlessui/react'
import { UserIcon } from 'lucide-react'
import { startTransition, useActionState } from 'react'
import { NavigationAuthButton } from '../Navigation/NavigationAuth'
import { LoadingSpinner } from '../ui/icons/loading-spinner'

export function UserSessionDropdown({
  userSession,
  ...props
}: { userSession: UserSession } & Headless.MenuProps) {
  return (
    <Dropdown {...props}>
      <DropdownButton
        data-testid="user-session-dropdown"
        as={NavigationAuthButton}
      />
      <DropdownMenu anchor="bottom">
        <UserDropdown />
      </DropdownMenu>
    </Dropdown>
  )
}

function UserDropdown() {
  const [_, action, pending] = useActionState(deleteUserSession, null)

  return (
    <>
      <DropdownItem>
        <UserIcon />
        <DropdownLabel> Foo</DropdownLabel>
      </DropdownItem>
      <DropdownItem
        data-testid="user-sign-out"
        color="red"
        disabled={pending}
        className="has-data-[slot=loading-icon]:bg-transparent! data-disabled:has-data-[slot=loading-icon]:opacity-100"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault() // Prevent closing the dropdown menu. https://headlessui.com/react/menu#closing-menus-manually
          startTransition(action)
        }}
      >
        {pending ? (
          <DropdownLabel className="flex h-6 items-center justify-self-center">
            <LoadingSpinner className="size-4" />
          </DropdownLabel>
        ) : (
          <DropdownLabel>Sign out</DropdownLabel>
        )}
      </DropdownItem>
    </>
  )
}
