import { Text } from '@/components/ui/text'
import * as Headless from '@headlessui/react'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}

export function Alert({
  open,
  size = 'md',
  className,
  children,
  ...props
}: {
  open: boolean
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
} & Omit<Headless.DialogProps, 'as' | 'className'>) {
  return (
    <Headless.Dialog open={open} {...props}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 z-99 flex w-screen justify-center overflow-y-auto bg-obsidian-950/25 px-2 py-2 transition duration-(--duration-ui) ease-ui focus:outline-0 data-closed:opacity-0 sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-obsidian-950/50"
      />

      <div className="fixed inset-0 z-100 w-screen overflow-y-auto pt-6 sm:pt-0">
        <div className="grid min-h-full grid-rows-[1fr_auto_1fr] justify-items-center p-8 sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <Headless.DialogPanel
            transition
            className={twMerge(
              'row-start-2 w-full rounded-3xl bg-white p-8 text-obsidian-900 shadow-lg ring-1 ring-obsidian-900/10 sm:p-6 dark:bg-obsidian-900 dark:text-white dark:ring-white/10 forced-colors:outline',
              'transition duration-(--duration-ui) ease-ui will-change-transform data-closed:scale-95 data-closed:opacity-0',
              sizes[size],
              className
            )}
          >
            {children}
          </Headless.DialogPanel>
        </div>
      </div>
    </Headless.Dialog>
  )
}

export function AlertTitle({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DialogTitleProps,
  'as' | 'className'
>) {
  return (
    <Headless.DialogTitle
      {...props}
      className={twMerge(
        'text-center text-base/6 font-semibold text-balance sm:text-left',
        className
      )}
    />
  )
}

export function AlertDescription({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DescriptionProps<typeof Text>,
  'as' | 'className'
>) {
  return (
    <Headless.Description
      as={Text}
      {...props}
      className={twMerge(
        'mt-1 text-center text-pretty sm:text-left',
        className
      )}
    />
  )
}

export function AlertBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={twMerge(className, 'mt-4')} />
}

export function AlertActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={twMerge(
        'mt-10 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto',
        className
      )}
    />
  )
}
