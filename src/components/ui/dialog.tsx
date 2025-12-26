import { XMark } from '@/components/icons/x-mark'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import * as Headless from '@headlessui/react'
import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

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

export function Dialog({
  size = 'lg',
  className,
  children,
  ...props
}: {
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
} & Omit<Headless.DialogProps, 'as' | 'className'>) {
  return (
    <Headless.Dialog {...props}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 z-99 scrollbar-none flex w-screen justify-center overflow-y-auto bg-obsidian-950/50 px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16"
      />

      <div
        className={twJoin(
          'pt-6',
          'fixed inset-0 z-100 scrollbar-none w-screen sm:pt-0'
        )}
      >
        <div
          className={twJoin(
            'sm:p-4',
            'grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr]'
          )}
        >
          <Headless.DialogPanel
            transition
            className={twMerge(
              // Basic layout
              'row-start-2 w-full min-w-0 rounded-t-3xl sm:mb-auto sm:rounded-3xl',
              // Overflow overlay height
              '[--overlay-height:--spacing(3)]',
              // Sizing
              'p-(--gutter) [--gutter:--spacing(6)] has-data-[slot=overlay]:*:data-[slot=body]:pb-10 *:data-[slot=head]:mb-6',
              // Background color
              'bg-obsidian-900',
              // Forced colors mode
              'forced-colors:outline',
              // Shadows
              'shadow-lg ring-1 ring-white/10',
              // Transitions
              'transition duration-100 will-change-transform data-closed:translate-y-12 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:data-enter:scale-95',
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

export function DialogTitle({
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
        'text-lg/6 font-semibold text-balance sm:text-base/6',
        className
      )}
    />
  )
}

export function DialogClose<T extends React.ElementType = typeof Button>({
  as = Button,
  className,
  ...props
}: { className?: string } & Omit<Headless.CloseButtonProps<T>, 'className'>) {
  return (
    <Headless.CloseButton
      as={as}
      size="xs"
      color="light"
      aria-label="Close navigation"
      className={twMerge('sm:p-px sm:*:data-[slot=icon]:size-5', className)}
      {...props}
    >
      <XMark />
    </Headless.CloseButton>
  )
}

export function DialogDescription({
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
        'mt-3 mb-10 text-base text-pretty sm:text-sm',
        className
      )}
    />
  )
}

export function DialogHead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      data-slot="head"
      className={twMerge('flex justify-between', className)}
    />
  )
}

const dialogBodyStyles = {
  base: ['scrollbar-none overflow-scroll'],
  filter: [
    // Override label responsive behaviour
    'sm:**:data-[slot=label]:text-base/6',
    // Label layout
    '**:data-[slot=label]:pr-3 **:data-[slot=label]:w-full',
    // Increase width of body to prevent checkbox & radio focus clipping
    '-mx-1 px-1',
  ],
}

export function DialogBody({
  filter = false,
  className,
  ...props
}: {
  filter?: boolean
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      data-slot="body"
      className={twMerge(
        dialogBodyStyles.base,
        filter && dialogBodyStyles.filter,
        className
      )}
    />
  )
}

export function DialogActions({
  overflowOverlay = false,
  className,
  children,
  ...props
}: {
  overflowOverlay?: boolean
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <div
        {...props}
        className={twMerge(
          'relative flex items-center justify-end gap-3',
          overflowOverlay ? 'pt-2' : 'mt-10',
          className
        )}
      >
        {children}
        {overflowOverlay && <DialogOverflowOverlay />}
      </div>
    </>
  )
}

export function DialogOverflowOverlay({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot="overlay"
      className={twMerge(
        'absolute -top-[calc(var(--overlay-height))] left-0 z-1 h-(--overlay-height) w-full',
        'bg-linear-to-t from-obsidian-900 to-transparent',
        className
      )}
    />
  )
}
