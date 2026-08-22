import * as Headless from '@headlessui/react'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

export function Fieldset({
  initialMargin = true,
  className,
  ...props
}: { initialMargin?: boolean; className?: string } & Omit<
  Headless.FieldsetProps,
  'as' | 'className'
>) {
  return (
    <Headless.Fieldset
      {...props}
      className={twMerge(
        initialMargin &&
          '*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6',
        className
      )}
    />
  )
}

export function Legend({
  className,
  ...props
}: { className?: string } & Omit<Headless.LegendProps, 'as' | 'className'>) {
  return (
    <Headless.Legend
      {...props}
      data-slot="legend"
      className={twMerge(
        'text-xl/8 font-semibold text-obsidian-900 data-disabled:opacity-50 dark:text-white',
        className
      )}
    />
  )
}

export function FieldGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      data-slot="control"
      className={twMerge('space-y-8', className)}
    />
  )
}

const fieldStyles = {
  base: [
    '[&>[data-slot=control]>*]:rounded-xl *:data-[slot=control]:after:rounded-xl isolate',
    // when descripition comes after label, add a margin top to the description
    '[&>[data-slot=label]+[data-slot=description]]:mt-1',
    // when control comes after description, add a martin top to contol (positioned above input)
    '[&>[data-slot=description]+[data-slot=control]]:mt-3',
    // when description comes after control, add a margin top to the description (positioned below input)
    '[&>[data-slot=control]+[data-slot=description]]:mt-3',
    // When there's an error directly after a control, add a margin-top to the error
    '[&>[data-slot=control]+[data-slot=error]]:mt-3',
  ],
  variants: {
    default: [
      '[&>[data-slot=label]+[data-slot=control]]:mt-3  *:data-[slot=label]:font-semibold',
    ],
    placeholderTransition: [
      'relative group/field',
      '[&>[data-slot=control]>*]:transition-all',
      // No placeholder padding on input & textarea
      '[&>[data-slot=control]>*]:pt-[calc(--spacing(6)-1px)] sm:[&>[data-slot=control]>*]:pt-[calc(--spacing(5.5)-1px)] [&>[data-slot=control]>*]:pb-[calc(--spacing(2.5)-1px)] sm:[&>[data-slot=control]>*]:pb-[calc(--spacing(2)-1px)]',
      '[&>[data-slot=control]>*:placeholder-shown]:py-4 sm:[&>[data-slot=control]>*:placeholder-shown]:py-3.5',
      // Inactive state label position
      'has-[*:placeholder-shown]:*:data-[slot=label]:opacity-0 has-[*:placeholder-shown]:*:data-[slot=label]:top-4',
      // Active state label position
      '*:data-[slot=label]:text-xs *:data-[slot=label]:transition-all *:data-[slot=label]:text-obsidian-600 *:data-[slot=label]:absolute *:data-[slot=label]:top-1.75 *:data-[slot=label]:left-4 dark:*:data-[slot=label]:text-obsidian-400',
    ],
  },
}

export function Field({
  variant = 'placeholderTransition',
  className,
  ...props
}: { variant?: keyof typeof fieldStyles.variants; className?: string } & Omit<
  Headless.FieldProps,
  'as' | 'className'
>) {
  const classes = twMerge(
    fieldStyles.base,
    fieldStyles.variants[variant],
    className
  )
  return <Headless.Field {...props} className={classes} />
}

export function Label({
  className,
  ...props
}: { className?: string } & Omit<Headless.LabelProps, 'as' | 'className'>) {
  return (
    <Headless.Label
      {...props}
      data-slot="label"
      className={twMerge(
        'z-1 text-base/6 text-obsidian-900 select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-white',
        className
      )}
    />
  )
}

export function Description({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DescriptionProps,
  'as' | 'className'
>) {
  return (
    <Headless.Description
      {...props}
      data-slot="description"
      className={twMerge(
        'text-base/6 text-obsidian-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-obsidian-400',
        className
      )}
    />
  )
}

export function ErrorMessage({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DescriptionProps,
  'as' | 'className'
>) {
  return (
    <Headless.Description
      {...props}
      data-slot="error"
      className={twMerge(
        'text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500',
        className
      )}
    />
  )
}
