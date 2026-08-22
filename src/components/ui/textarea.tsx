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
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-xl)-1px)] before:bg-white before:shadow-sm',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
        // Disabled state
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-obsidian-950/5 has-data-disabled:before:shadow-none',
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
          'text-base/6 text-obsidian-900 placeholder:text-obsidian-600 sm:text-sm/6 dark:text-white dark:placeholder:text-obsidian-400',
          // Border
          'border border-obsidian-900/10 data-hover:border-obsidian-900/20 dark:border-white/10 dark:data-hover:border-white/20',
          // Background color
          'bg-transparent dark:bg-white/5',
          // Hide default focus styles
          'focus:outline-hidden',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500',
          // Disabled state
          'disabled:border-obsidian-900/15 disabled:bg-obsidian-950/2.5 data-hover:disabled:border-obsidian-900/15 dark:disabled:border-white/15 dark:disabled:bg-white/2.5 dark:data-hover:disabled:border-white/15',
          // Resizable
          resizable ? 'resize-y' : 'resize-none',
        ])}
      />
    </span>
  )
})
