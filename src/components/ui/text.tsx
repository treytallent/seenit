import { Link } from '@/components/ui/link'
import { twMerge } from 'tailwind-merge'

export function Text({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      {...props}
      data-slot="text"
      className={twMerge(
        'text-base/6 text-obsidian-600 sm:text-sm/6 dark:text-obsidian-400',
        className
      )}
    />
  )
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={twMerge(
        'text-obsidian-900 underline decoration-obsidian-900/50 data-hover:decoration-obsidian-900 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white',
        className
      )}
    />
  )
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'strong'>) {
  return (
    <strong
      {...props}
      className={twMerge(
        'font-semibold text-obsidian-900 dark:text-white',
        className
      )}
    />
  )
}
