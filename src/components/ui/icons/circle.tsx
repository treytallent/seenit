import { twMerge } from 'tailwind-merge'

export function Circle({ className }: { className?: string }) {
  return (
    <svg
      width="3"
      height="3"
      viewBox="0 0 2 2"
      data-slot="divider"
      aria-hidden="true"
      className={twMerge('fill-obsidian-600 dark:fill-obsidian-700', className)}
    >
      <circle r="1" cx="1" cy="1"></circle>
    </svg>
  )
}
