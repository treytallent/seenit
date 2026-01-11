import * as Headless from '@headlessui/react'
import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

export const Textarea = React.forwardRef(function Textarea(
  {
    resizable = true,
    className,
    ...props
  }: { className?: string; resizable?: boolean } & Omit<
    Headless.TextareaProps,
    'as' | 'className'
  >,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <span
      data-slot="control"
      className={twMerge([
        // Basic layout
        'relative block w-full',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
        // Disabled state
        'has-data-disabled:opacity-50',
        className,
      ])}
    >
      <Headless.Textarea
        {...props}
        ref={ref}
        className={twJoin([
          // Basic layout
          'relative block h-full w-full appearance-none px-4 py-3.5',
          // Typography
          'text-base/6 placeholder:text-obsidian-400 sm:text-sm/6',
          // Border
          'border border-white/10 data-hover:border-white/20',
          // Background color
          'bg-white/5',
          // Hide default focus styles
          'focus:outline-hidden',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500',
          // Disabled state
          'disabled:border-white/15 disabled:bg-white/2.5 data-hover:disabled:border-white/15',
          // Resizable
          resizable ? 'resize-y' : 'resize-none',
        ])}
      />
    </span>
  )
})
