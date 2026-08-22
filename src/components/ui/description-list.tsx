import { twMerge } from 'tailwind-merge'

const descriptionListStyles = {
  outline: [
    '*:[dt]:border-t *:[dt]:border-obsidian-900/5 *:[dt]:first:border-none sm:*:[dt]:border-t sm:*:[dt]:border-obsidian-900/5',
    'sm:*:[dd]:border-t sm:*:[dd]:border-obsidian-900/5 sm:*:[dd]:nth-2:border-none',
    'dark:*:[dt]:border-white/5 sm:dark:*:[dt]:border-white/5 sm:dark:*:[dd]:border-white/5',
  ],
  size: {
    base: ['*:[dt]:pt-3 sm:*:[dt]:py-3', '*:[dd]:pb-3 sm:*:[dd]:py-3'],
    sm: ['*:[dt]:pt-1.5 sm:*:[dt]:py-1.5', '*:[dd]:pb-1.5 sm:*:[dd]:py-1.5'],
  },
}

export function DescriptionList({
  outline,
  size = 'base',
  className,
  ...props
}: {
  outline?: boolean
  size?: keyof typeof descriptionListStyles.size
} & React.ComponentPropsWithoutRef<'dl'>) {
  return (
    <dl
      {...props}
      className={twMerge(
        outline && descriptionListStyles.outline,
        descriptionListStyles.size[size],
        'grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,--spacing(80))_auto] sm:text-sm/6',
        className
      )}
    />
  )
}

export function DescriptionTerm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'dt'>) {
  return (
    <dt
      {...props}
      className={twMerge(
        'col-start-1 text-obsidian-600 dark:text-obsidian-400',
        className
      )}
    />
  )
}

export function DescriptionDetails({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'dd'>) {
  return (
    <dd
      {...props}
      className={twMerge('pt-1 text-obsidian-900 dark:text-white', className)}
    />
  )
}
