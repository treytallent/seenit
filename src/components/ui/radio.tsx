import * as Headless from '@headlessui/react'
import { twJoin, twMerge } from 'tailwind-merge'

export function RadioGroup({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.RadioGroupProps,
  'as' | 'className'
>) {
  return (
    <Headless.RadioGroup
      data-slot="control"
      {...props}
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

const radioFieldStyles = {
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
      // Control layout
      '*:data-[slot=control]:col-start-2',
      '*:data-[slot=control]:py-3.25',
      '*:data-[slot=control]:mt-px',
      // Label layout
      '*:data-[slot=label]:col-start-1',
      // Label size
      '*:data-[slot=label]:py-3 *:data-[slot=label]:pr-5',
      // Control size
      'sm:[&>[data-slot=control]>span]:size-5 sm:[&>[data-slot=control]>span>span]:border-[4.5px]',
    ],
  },
}

export function RadioField({
  variant = 'default',
  className,
  ...props
}: {
  className?: string
  variant?: keyof typeof radioFieldStyles.variants
} & Omit<Headless.FieldProps, 'as' | 'className'>) {
  return (
    <Headless.Field
      data-slot="field"
      {...props}
      className={twMerge(
        radioFieldStyles.base,
        radioFieldStyles.variants[variant],

        className
      )}
    />
  )
}

export function Radio({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.RadioProps,
  'as' | 'className' | 'children'
>) {
  return (
    <Headless.Radio
      data-slot="control"
      {...props}
      className={twMerge('group inline-flex focus:outline-hidden', className)}
    >
      <span
        className={twJoin(
          // Basic layout
          'relative isolate flex size-5 shrink-0 rounded-full sm:size-4',
          // Background color when checked
          'group-data-checked:before:bg-(--radio-checked-bg)',
          // Background color applied to control
          'bg-white/5 group-data-checked:bg-(--radio-checked-bg)',
          // Border
          'border border-white/15 group-hover/field:border-white/30 group-data-checked:border-white/5 group-hover/field:group-data-checked:border-white/5',
          // Inner highlight shadow
          'after:absolute after:-inset-px after:rounded-full after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
          'after:hidden group-data-checked:after:block',
          // Indicator color
          '[--radio-indicator:transparent] group-data-checked:[--radio-indicator:var(--radio-checked-indicator)]',
          'group-hover/field:[--radio-indicator:var(--color-obsidian-700)] group-data-hover:group-data-checked:[--radio-indicator:var(--radio-checked-indicator)]',
          // Focus ring
          'group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-focus:outline-blue-500',
          // Disabled state
          'group-data-disabled:opacity-50',
          'group-data-disabled:before:bg-transparent',
          'group-data-disabled:border-white/20 group-data-disabled:bg-white/2.5 group-data-disabled:[--radio-checked-indicator:var(--color-white)]/50 group-data-checked:group-data-disabled:after:hidden',
          'group-data-disabled:group-hover/field:border-white/20 group-data-disabled:not-group-data-checked:group-hover/field:[--radio-indicator:transparent]',
          // Color
          '[--radio-checked-bg:var(--color-purple-vivid-500)] [--radio-checked-border:var(--color-purple-vivid-600)]/90 [--radio-checked-indicator:var(--color-white)]'
        )}
      >
        <span
          className={twJoin(
            'size-full rounded-full border-[4.5px] border-transparent bg-(--radio-indicator) bg-clip-padding sm:border-[3.5px]',
            // Forced colors mode
            'forced-colors:border-[Canvas] forced-colors:group-data-checked:border-[Highlight]'
          )}
        />
      </span>
    </Headless.Radio>
  )
}
