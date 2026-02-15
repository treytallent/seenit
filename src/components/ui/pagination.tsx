import { Button } from '@/components/ui/button'
import { Arrow } from '@/components/ui/icons/arrow'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={twMerge('flex gap-x-2', className)}
    />
  )
}

export function PaginationPrevious({
  href = null,
  className,
  children = 'Previous',
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={twMerge('grow basis-0', className)}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        plain
        aria-label="Previous page"
      >
        <Arrow />
        {children}
      </Button>
    </span>
  )
}

export function PaginationNext({
  href = null,
  className,
  children = 'Next',
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={twMerge('flex grow basis-0 justify-end', className)}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        plain
        aria-label="Next page"
      >
        {children}
        <Arrow direction="right" />
      </Button>
    </span>
  )
}

export function PaginationList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={twMerge('hidden items-baseline gap-x-2 sm:flex', className)}
    />
  )
}

export function PaginationPage({
  href,
  current = false,
  className,
  children,
}: React.PropsWithChildren<{
  href: string
  current?: boolean
  className?: string
}>) {
  return (
    <Button
      href={href}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      className={twMerge('min-w-14', current && 'bg-white/10', className)}
    >
      {children}
    </Button>
  )
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={twMerge(
        'w-10 text-center text-sm font-semibold select-none',
        className
      )}
    >
      {children}
    </span>
  )
}
