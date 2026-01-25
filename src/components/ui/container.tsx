import { twMerge } from 'tailwind-merge'

export function Container<T extends React.ElementType>({
  as,
  children,
  className,
  ...props
}: { as?: T } & React.PropsWithChildren<React.ComponentPropsWithoutRef<T>>) {
  const Element = as || 'div'

  return (
    <Element {...props} className="px-(--body-x)">
      <div className={twMerge('mx-auto max-w-7xl', className)}>{children}</div>
    </Element>
  )
}
