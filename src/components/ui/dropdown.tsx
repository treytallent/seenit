'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import * as Headless from '@headlessui/react'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

export function Dropdown(props: Headless.MenuProps) {
  return <Headless.Menu {...props} />
}

export function DropdownButton<T extends React.ElementType = typeof Button>({
  as = Button,
  ...props
}: { className?: string } & Omit<Headless.MenuButtonProps<T>, 'className'>) {
  return <Headless.MenuButton as={as} {...props} />
}

export function DropdownMenu({
  anchor = 'bottom',
  className,
  ...props
}: {
  className?: string
} & Omit<Headless.MenuItemsProps, 'as' | 'className'>) {
  return (
    <Headless.MenuItems
      {...props}
      transition
      anchor={anchor}
      className={twMerge(
        // Anchor positioning
        '[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]',
        // Base styles
        'isolate z-20 w-max rounded-2xl p-1',
        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
        'outline outline-transparent focus:outline-hidden',
        // Handle scrolling when menu won't fit in viewport
        'overflow-y-auto',
        // Popover background
        'bg-obsidian-900',
        // Shadows
        'shadow-lg ring-1 ring-white/10 ring-inset',
        // Transitions
        'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0',
        // Define grid at the menu level if subgrid is supported
        'supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]',
        className
      )}
    />
  )
}

export const itemColors = {
  dark: ['data-focus:bg-white/10', 'data-focus:*:[svg]:text-obsidian-300'],
  red: ['data-focus:bg-red-700', 'data-focus:*:[svg]:text-red-100'],
}

export function DropdownItem({
  color = 'dark',
  className,
  ...props
}: {
  color?: keyof typeof itemColors
  className?: string
} & (
  | Omit<Headless.MenuItemProps<'button'>, 'as' | 'className'>
  | Omit<Headless.MenuItemProps<typeof Link>, 'as' | 'className'>
)) {
  const classes = twMerge(
    // Base styles
    'group cursor-default rounded-xl px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5',
    // Text styles
    'text-left text-base/6 sm:text-sm/6 forced-colors:text-[CanvasText]',
    // Disabled state
    'data-disabled:opacity-50',
    // Forced colors mode
    'forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText] forced-colors:data-focus:*:[svg]:text-[HighlightText]',
    // Use subgrid when available but fallback to an explicit grid layout if not
    'col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid',
    // Icons
    '*:[svg]:text-obsidian-400',
    '*:[svg]:col-start-1 *:[svg]:row-start-1 *:[svg]:mr-2.5 *:[svg]:-ml-0.5 sm:*:[svg]:mr-2 sm:*:[svg]:size-4',
    itemColors[color],
    className
  )

  return 'href' in props ? (
    <Headless.MenuItem as={Link} {...props} className={classes} />
  ) : (
    <Headless.MenuItem
      as="button"
      type="button"
      {...props}
      className={classes}
    />
  )
}

export function DropdownSection({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.MenuSectionProps,
  'as' | 'className'
>) {
  return (
    <Headless.MenuSection
      {...props}
      className={twMerge(
        // Define grid at the section level instead of the item level if subgrid is supported
        'col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]',
        className
      )}
    />
  )
}

export function DropdownDivider({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.MenuSeparatorProps,
  'as' | 'className'
>) {
  return (
    <Headless.MenuSeparator
      {...props}
      className={twMerge(
        'col-span-full mx-1 my-1 h-px border-0 bg-white/10 forced-colors:bg-[CanvasText]',
        className
      )}
    />
  )
}

export function DropdownLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      data-slot="label"
      className={twMerge('col-start-2 row-start-1', className)}
    />
  )
}
