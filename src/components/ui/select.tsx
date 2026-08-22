import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

export const Select = forwardRef(function Select(
  {
    multiple = false,
    className,
    ...props
  }: { className?: string } & Omit<Headless.SelectProps, 'as' | 'className'>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <span
      data-slot="control"
      className={twMerge([
        // Basic layout
        'group relative isolate block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-xl)-1px)] before:bg-white before:shadow-sm',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:ring-transparent after:ring-inset has-data-focus:after:ring-2 has-data-focus:after:ring-blue-500',
        // Override inherited border-radius to avoid scrollbar clipping
        multiple && 'has-data-focus:after:rounded-r-none!',
        // Disabled state
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-obsidian-950/5 has-data-disabled:before:shadow-none',
        className,
      ])}
    >
      <Headless.Select
        {...props}
        ref={ref}
        multiple={multiple}
        className={twJoin([
          // Override inherited border-radius to avoid scrollbar clipping
          multiple && 'rounded-r-none!',
          // Basic layout
          'relative block w-full appearance-none pt-[calc(--spacing(5.5)-1px)] pb-[calc(--spacing(2)-1px)]',
          // Horizontal padding
          multiple
            ? 'scrollbar-thin px-4'
            : 'pr-[calc(--spacing(10)-1px)] pl-4 sm:pr-[calc(--spacing(9)-1px)]',
          // Options (multi-select)
          '[&_optgroup]:font-semibold',
          // Typography
          'text-base/5 text-obsidian-900 placeholder:text-obsidian-600 sm:text-sm dark:text-white dark:placeholder:text-obsidian-400',
          // Border
          'border border-obsidian-900/10 data-hover:border-obsidian-900/20 dark:border-white/10 dark:data-hover:border-white/20',
          // Background color
          'bg-transparent dark:bg-white/5',
          // Hide default focus styles
          'focus:outline-hidden',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500',
          // Disabled state
          'data-disabled:opacity-50',
        ])}
      />
      {!multiple && (
        <span className="pointer-events-none absolute -top-1.75 right-0 flex items-center pr-2 sm:-top-1">
          <svg
            className="size-5 stroke-obsidian-500 group-has-data-disabled:stroke-obsidian-300 sm:size-4 dark:stroke-obsidian-400 dark:group-has-data-disabled:stroke-obsidian-600 forced-colors:stroke-[CanvasText]"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M5.75 10.75L8 13L10.25 10.75"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.25 5.25L8 3L5.75 5.25"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </span>
  )
})
