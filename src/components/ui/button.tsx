import { Link } from '@/components/ui/link'
import * as Headless from '@headlessui/react'
import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

const styles = {
  base: [
    // Base
    'relative isolate inline-flex items-baseline justify-center gap-x-2.5 rounded-full border border-transparent',
    // Font size
    'text-base/6 sm:text-sm/6 font-semibold',
    // Focus
    'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon
    '*:[svg]:size-5 sm:*:[svg]:size-4  *:[svg]:shrink-0 *:[svg]:self-center *:[svg]:text-(--btn-icon) forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
    // Transition
    'transition data-active:scale-(--active-scale)',
  ],
  size: {
    base: [
      '[--active-scale:0.97]',
      'px-[calc(--spacing(4)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
      '*:[svg]:-mx-1 *:[svg]:my-0.5 sm:*:[svg]:my-1',
    ],
    sm: [
      '[--active-scale:0.94]',
      'sm:*:[svg]:size-5 p-[calc(--spacing(1.5)-1px)]',
    ],
  },
  solid: [
    // Border is rendered on `after` so background is set to button background
    'bg-(--btn-bg)',
    // Subtle white outline is applied using a border
    'border-white/5',
    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    'after:absolute after:z-1 after:rounded-full after:-inset-px',
    // Inner highlight shadow
    'after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
    // White overlay on hover
    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
    // Disabled
    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
  ],
  plain: [
    // Base
    'data-active:bg-white/10 data-hover:bg-white/10',
    // Icon
    '[--btn-icon:var(--color-obsidian-400)] data-active:[--btn-icon:var(--color-obsidian-300)] data-hover:[--btn-icon:var(--color-obsidian-300)]',
  ],
  colors: {
    dark: [
      '[--btn-bg:var(--color-obsidian-900)] [--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-obsidian-400)] data-active:[--btn-icon:var(--color-obsidian-300)] data-hover:[--btn-icon:var(--color-obsidian-300)]',
    ],
    light: [
      '[--btn-bg:var(--color-obsidian-800)] [--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-obsidian-400)] data-active:[--btn-icon:var(--color-obsidian-300)] data-hover:[--btn-icon:var(--color-obsidian-300)]',
    ],
    'light-opacity': [
      '[--btn-bg:var(--color-obsidian-700)]/90 [--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-obsidian-300)] data-active:[--btn-icon:var(--color-obsidian-200)] data-hover:[--btn-icon:var(--color-obsidian-200)]',
    ],
    purple: [
      '[--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-purple-vivid-600)] [--btn-border:var(--color-purple-vivid-700)]',
      '[--btn-icon:var(--color-purple-vivid-200)] data-active:[--btn-icon:var(--color-purple-vivid-100)] data-hover:[--btn-icon:var(--color-purple-vivid-100)]',
    ],
    red: [
      '[--btn-bg:var(--color-red-700)] [--btn-hover-overlay:var(--color-white)]/10',
      '[--btn-icon:var(--color-red-100))]',
    ],
  },
}

type ButtonProps = (
  | { plain?: true; color?: never }
  | { color?: keyof typeof styles.colors; plain?: never }
) & {
  size?: keyof typeof styles.size
  className?: string
  children: React.ReactNode
} & (
    | Omit<Headless.ButtonProps, 'as' | 'className'>
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
  )

export const Button = React.forwardRef(function Button(
  { size = 'base', plain, color, className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const classes = twMerge(
    styles.base,
    styles.size[size],
    plain ? styles.plain : twJoin(styles.solid, styles.colors[color ?? 'dark']),
    className
  )

  return 'href' in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <Headless.Button
      {...props}
      className={twJoin(classes, 'cursor-default')}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  )
})

/**
 * Increases touch target size to 44x44px to comply with WCAG standards.
 *
 * @link https://youtu.be/soFSSkf4oVYx
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
