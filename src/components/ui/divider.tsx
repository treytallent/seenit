import { twMerge } from 'tailwind-merge'

export function Divider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      role="presentation"
      {...props}
      className={twMerge(
        'w-full border-t',
        soft ? 'border-white/5' : 'border-white/10',
        className
      )}
    />
  )
}
