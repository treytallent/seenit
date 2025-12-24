import { Arrow } from '@/components/icons/arrow'
import { TouchTarget } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { twJoin, twMerge } from 'tailwind-merge'

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function Heading({
  level = 1,
  className,
  ...props
}: HeadingProps &
  React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={twMerge('text-3xl/10 font-semibold text-pretty', className)}
    />
  )
}

const subheadingStyles = {
  base: ['text-xl/8 font-semibold text-pretty'],
  marker: [
    'relative pl-3',
    'before:bg-purple-vivid-600 before:absolute  before:left-0  before:w-1 before:rounded-full',
    'before:h-5 before:top-1.5',
  ],
}

type SubheadingProps = ({
  children?: React.ReactNode
  marker?: boolean
} & HeadingProps) &
  (
    | React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
    | React.ComponentPropsWithoutRef<typeof Link>
  )

export function Subheading({
  level = 2,
  children,
  marker = true,
  className,
  ...props
}: SubheadingProps) {
  const Element: `h${typeof level}` = `h${level}`
  const classes = twJoin(
    subheadingStyles.base,
    marker && subheadingStyles.marker
  )

  return 'href' in props ? (
    <Element>
      <Link
        {...props}
        className={twMerge(classes, 'flex items-baseline', className)}
      >
        <TouchTarget>
          {children}
          <Arrow
            direction="right"
            className="ml-1 size-6 self-center [--btn-icon:var(--color-white)]"
          />
        </TouchTarget>
      </Link>
    </Element>
  ) : (
    <Element {...props} className={twMerge(classes, className)}>
      {children}
    </Element>
  )
}
