import { Button } from '@/components/ui/button'
import * as Headless from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

export function PopoverGroup(props: Headless.PopoverGroupProps) {
  return <Headless.PopoverGroup {...props} />
}

export function Popover(props: Headless.PopoverProps) {
  return <Headless.Popover {...props} />
}

export function PopoverButton<T extends React.ElementType = typeof Button>({
  as = Button,
  ...props
}: { className?: string } & Omit<Headless.PopoverButtonProps<T>, 'className'>) {
  return <Headless.PopoverButton as={as} {...props} />
}

export function PopoverBackdrop({ ...props }: Headless.PopoverBackdropProps) {
  return <Headless.PopoverBackdrop {...props} />
}

export function PopoverPanel({
  anchor = 'bottom',
  className,
  ...props
}: {
  className?: string
} & Omit<Headless.PopoverPanelProps, 'as' | 'className'>) {
  return (
    <Headless.PopoverPanel
      {...props}
      focus
      transition
      anchor={anchor}
      className={twMerge(
        // Anchor positioning
        '[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]',
        // Base styles
        'isolate z-20 w-max min-w-40 rounded-2xl px-4 py-1.5',
        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
        'outline outline-transparent focus:outline-hidden',
        // Handle scrolling when menu won't fit in viewport
        'overflow-y-auto',
        // Popover background
        'bg-obsidian-900',
        // Shadows
        'shadow-lg ring-1 ring-white/10 ring-inset',
        // Transitions
        'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0',
        className
      )}
    />
  )
}
