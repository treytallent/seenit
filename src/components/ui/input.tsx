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
        // X-axis padding
        'has-[svg:first-child]:[&_input]:pl-10 has-[svg:last-child]:[&_input]:pr-10 sm:has-[svg:first-child]:[&_input]:pl-8 sm:has-[svg:last-child]:[&_input]:pr-8',
        // Icon style
        '*:[svg]:size-5 *:[svg]:text-obsidian-400 sm:*:[svg]:size-4',
        '*:[svg]:pointer-events-none *:[svg]:absolute *:[svg]:z-10',
        // Icon positions
        '*:[svg]:top-3 sm:*:[svg]:top-2.5',
        '[&>svg:first-child]:left-3 sm:[&>svg:first-child]:left-2.5',
        '[&>svg:last-child]:right-3 sm:[&>svg:last-child]:right-2.5',
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
        // Disabled state
        'has-data-disabled:opacity-50',
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
          'text-base/5 placeholder:text-obsidian-400 sm:text-sm/5',
          // Border
          'border-white/10 data-hover:border-white/20',
          // Background color
          'bg-white/5',
          // Hide default focus styles
          'focus:outline-hidden',
          // System icons
          'scheme-dark',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500',
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
