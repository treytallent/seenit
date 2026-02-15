/**
 * Lucide Icons' arrow-left icon to decrease the path size by 20%.
 *
 * @link https://lucide.dev/icons/
 */
export function Arrow({
  direction = 'left',
  className,
}: {
  direction?: 'left' | 'right'
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${direction === 'right' && 'rotate-180'} ${className}`}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
