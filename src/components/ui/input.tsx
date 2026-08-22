import * as Headless from '@headlessui/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function InputGroup({
  className,
  children,
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="control"
      className={twMerge(
        // Basic layout
        'relative isolate block',
        // Icon size
        '[--icon-size:--spacing(5)] sm:[--icon-size:--spacing(4)]',
        // Space between icon & edge of input
        '[--icon-edge-gap:calc(--spacing(3)-1px)] sm:[--icon-edge-gap:calc(--spacing(2.5)-1px)]',
        // Space between icon & text
        '[--icon-text-gap:--spacing(1.5)]',
        // Computed padding
        '[--icon-padding:calc(var(--icon-size)+var(--icon-edge-gap)+var(--icon-text-gap))]',
        // X-axis padding
        'has-[svg:first-child]:[&_input]:pl-(--icon-padding) has-[svg:last-child]:[&_input]:pr-(--icon-padding)',
        // Icon style
        '*:[svg]:size-(--icon-size) *:[svg]:text-obsidian-500 dark:*:[svg]:text-obsidian-400',
        '*:[svg]:pointer-events-none *:[svg]:absolute *:[svg]:z-10',
        // Icon positions
        '*:[svg]:top-3 sm:*:[svg]:top-2.5',
        '[&>svg:first-child]:left-(--icon-edge-gap) [&>svg:last-child]:right-(--edge-gap)',
        className
      )}
    >
      {children}
    </span>
  )
}

const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week']
type DateType = (typeof dateTypes)[number]

export function Input({
  focusRing = true,
  className,
  ...props
}: {
  focusRing?: boolean
  className?: string
  type?:
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | DateType
} & Omit<Headless.InputProps, 'as' | 'className'>) {
  return (
    <span
      data-slot="control"
      className={twMerge([
        // Basic layout
        'relative block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-xl)-1px)] before:bg-white before:shadow-sm',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Disabled state
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-obsidian-950/5 has-data-disabled:before:shadow-none',
        // Invalid state
        'has-data-invalid:before:shadow-red-500/10',
        // Focus ring
        focusRing &&
          'after:pointer-events-none after:absolute after:inset-0 after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
        className,
      ])}
    >
      <Headless.Input
        {...props}
        className={twMerge(
          // Basic layout
          'relative block w-full appearance-none border px-[calc(--spacing(4)-1px)] py-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(2)-1px)]',
          // Typography
          'text-base/5 text-obsidian-900 placeholder:text-obsidian-600 sm:text-sm/5 dark:text-white dark:placeholder:text-obsidian-400',
          // Border
          'border-obsidian-900/10 data-hover:border-obsidian-900/20 dark:border-white/10 dark:data-hover:border-white/20',
          // Background color
          'bg-transparent dark:bg-white/2.5',
          // Hide default focus styles
          'focus:outline-hidden',
          // System icons
          'dark:scheme-dark',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500',
          // Disabled state
          'data-disabled:border-transparent data-disabled:opacity-50',
          // Date classes
          props.type &&
            dateTypes.includes(props.type) && [
              '[&::-webkit-datetime-edit-fields-wrapper]:p-0',
              '[&::-webkit-date-and-time-value]:min-h-[1.5em]',
              '[&::-webkit-datetime-edit]:inline-flex',
              '[&::-webkit-datetime-edit]:p-0',
              '[&::-webkit-datetime-edit-year-field]:p-0',
              '[&::-webkit-datetime-edit-month-field]:p-0',
              '[&::-webkit-datetime-edit-day-field]:p-0',
              '[&::-webkit-datetime-edit-hour-field]:p-0',
              '[&::-webkit-datetime-edit-minute-field]:p-0',
              '[&::-webkit-datetime-edit-second-field]:p-0',
              '[&::-webkit-datetime-edit-millisecond-field]:p-0',
              '[&::-webkit-datetime-edit-meridiem-field]:p-0',
            ]
        )}
      />
    </span>
  )
}
