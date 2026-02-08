/**
 * Modified Lucide Icons' X icon to decrease the path size by 20%.
 *
 * @link https://lucide.dev/icons/
 */
export function XMark({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 6L6 14" />
      <path d="M6 6L14 14" />
    </svg>
  )
}
