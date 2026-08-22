import * as Headless from '@headlessui/react'
import type React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      data-slot="control"
      className={twMerge(
        // Basic groups
        'space-y-3 **:data-[slot=label]:font-normal',
        // With descriptions
        'has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-semibold',
        className
      )}
    />
  )
}

const checkboxFieldStyles = {
  base: [
    // Base layout
    'grid',
    // Control layout
    '*:data-[slot=control]:row-start-1',
    // Label layout
    '*:data-[slot=label]:row-start-1',
    // Group fields to enable shared hover state
    'group/field',
    // Add pointer cursor to child elements
    '*:cursor-pointer',
    // Disabled state
    'data-disabled:*:cursor-default',
  ],
  variants: {
    default: [
      // Base layout
      'grid-cols-[1.25rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]',
      // Control layout
      '*:data-[slot=control]:col-start-1',
      '*:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1',
      // Label layout
      '*:data-[slot=label]:col-start-2',
      // Description layout
      '*:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2',
      // With description
      'has-data-[slot=description]:**:data-[slot=label]:font-semibold',
    ],
    dialogOption: [
      // Base layout
      'grid-cols-[1fr_1.25rem]',
      // Bottom border
      'not-[:last-child]:border-b border-obsidian-900/5 dark:border-white/5',
      // Control layout
      '*:data-[slot=control]:col-start-2',
      '*:data-[slot=control]:py-3.25',
      '*:data-[slot=control]:mt-px',
      // Label layout
      '*:data-[slot=label]:col-start-1',
      // Label size
      '*:data-[slot=label]:py-3 *:data-[slot=label]:pr-5',
      // Control size
      'sm:[&>[data-slot=control]>span]:size-5 sm:[&>[data-slot=control]>span]:rounded-md sm:[&>[data-slot=control]>span>svg]:size-4',
    ],
  },
}

export function CheckboxField({
  variant = 'default',
  className,
  ...props
}: {
  variant?: keyof typeof checkboxFieldStyles.variants
  className?: string
} & Omit<Headless.FieldProps, 'as' | 'className'>) {
  return (
    <Headless.Field
      {...props}
      data-slot="field"
      className={twMerge(
        checkboxFieldStyles.base,
        checkboxFieldStyles.variants[variant],
        className
      )}
    />
  )
}

export function Checkbox({
  className,
  ...props
}: {
  className?: string
} & Omit<Headless.CheckboxProps, 'as' | 'className'>) {
  return (
    <Headless.Checkbox
      {...props}
      data-slot="control"
      className={twMerge('group inline-flex focus:outline-hidden', className)}
    >
      <span
        className={twJoin(
          // Basic layout
          'relative isolate flex size-5 items-center justify-center rounded-md sm:size-4 sm:rounded-sm',
          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          'before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white before:shadow-sm sm:before:rounded-sm',
          'group-data-checked:before:bg-(--checkbox-checked-bg)',
          // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
          'dark:before:hidden',
          // Background color applied to control in dark mode
          'bg-transparent dark:bg-white/5 dark:group-data-checked:bg-(--checkbox-checked-bg)',
          // Border
          'border border-obsidian-900/15 group-hover/field:border-obsidian-900/30 group-data-checked:border-obsidian-900/5 group-hover/field:group-data-checked:border-obsidian-900/5',
          'dark:border-white/15 dark:group-hover/field:border-white/30 dark:group-data-checked:border-white/5 dark:group-hover/field:group-data-checked:border-white/5',
          // Inner highlight shadow
          'after:absolute after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
          'after:-inset-px after:hidden after:rounded-sm group-data-checked:after:block',
          // Focus ring
          'group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-focus:outline-blue-500',
          // Disabled state
          'group-data-disabled:opacity-50',
          'group-data-disabled:before:bg-transparent',
          'group-data-disabled:border-obsidian-900/20 group-data-disabled:bg-obsidian-950/2.5 group-data-disabled:[--checkbox-check:var(--color-obsidian-900)]/50 group-data-checked:group-data-disabled:after:hidden',
          'dark:group-data-disabled:border-white/20 dark:group-data-disabled:bg-white/2.5 dark:group-data-disabled:[--checkbox-check:var(--color-white)]/50',
          'group-data-disabled:group-hover/field:group-data-checked:border-obsidian-900/20 dark:group-data-disabled:group-hover/field:group-data-checked:border-white/20',
          // Forced colors mode
          'forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-data-disabled:[--checkbox-check:Highlight]',
          // Color
          '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-purple-vivid-500)]'
        )}
      >
        <svg
          className={twJoin(
            'size-4 stroke-obsidian-700 opacity-0 sm:size-3.5',
            // Hover & checked states
            'group-hover/field:opacity-100 group-data-checked:stroke-(--checkbox-check) group-data-checked:opacity-100',
            // Disabled state
            'group-data-disabled:group-hover/field:opacity-100'
          )}
          viewBox="0 0 14 14"
          fill="none"
        >
          {/* Checkmark icon */}
          <path
            className="opacity-100 group-data-indeterminate:opacity-0"
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Indeterminate icon */}
          <path
            className="opacity-0 group-data-indeterminate:opacity-100"
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Headless.Checkbox>
  )
}
