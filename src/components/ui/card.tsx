import { Link } from '@/components/ui/link'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function Card<T extends React.ElementType>({
  as,
  className,
  children,
  ...props
}: {
  as?: T
} & React.PropsWithChildren<React.ComponentPropsWithoutRef<T>>) {
  const Element = as || 'div'

  return (
    <Element
      {...props}
      data-slot="card"
      className={twMerge(
        'group/card relative overflow-hidden rounded-xl border border-white/10',
        className
      )}
    >
      {children}
    </Element>
  )
}

export function CardContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="content"
      className={twMerge('flex flex-col gap-3', className)}
    >
      {children}
    </div>
  )
}

export function CardImage({ className, ...props }: ImageProps) {
  return (
    <Image // eslint-disable-line
      {...props}
      data-slot="image"
      className={twMerge('w-full object-cover', className)}
    />
  )
}

export function CardHead({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex h-10 items-end justify-between gap-x-2',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link> | React.ComponentProps<'h3'>) {
  const classes = twMerge(
    'line-clamp-2 text-base/5 font-semibold text-pretty sm:text-sm/5',
    className
  )
  return (
    <>
      {'href' in props ? (
        <h3>
          <Link {...props} className={classes}>
            <span className="absolute inset-0"></span>
            {children}
          </Link>
        </h3>
      ) : (
        <h3 {...props} className={classes}>
          {children}
        </h3>
      )}
    </>
  )
}
