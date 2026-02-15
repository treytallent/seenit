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
        'group relative block w-full',
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
          'text-base/5 placeholder:text-obsidian-400 sm:text-sm',
          // Border
          'border border-white/10 data-hover:border-white/20',
          // Background color
          'bg-white/5',
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
            className="size-5 stroke-obsidian-400 group-has-data-disabled:stroke-obsidian-600 sm:size-4 forced-colors:stroke-[CanvasText]"
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
