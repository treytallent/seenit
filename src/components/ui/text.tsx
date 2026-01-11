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
        'text-base/6 text-obsidian-400 sm:text-sm/6',
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
        'decoration-white/50 data-hover:decoration-white',
        className
      )}
    />
  )
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={twMerge('font-semibold', className)} />
}
