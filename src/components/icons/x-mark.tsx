/**
 * Modified HeroIcons' x-circle icon to isolate the x and increase its size.
 * @see https://heroicons.com/
 */
export function XMark({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-slot="icon"
      className={className}
    >
      <path
        d="M12.8657 5.36599C13.3538 4.87793 14.1457 4.87808 14.6339 5.36599C15.122 5.85413 15.122 6.64602 14.6339 7.13416L11.7681 9.99994L14.6339 12.8657C15.122 13.3539 15.122 14.1458 14.6339 14.6339C14.1458 15.122 13.3539 15.122 12.8657 14.6339L9.99994 11.7681L7.13416 14.6339C6.64602 15.122 5.85413 15.122 5.36599 14.6339C4.87808 14.1457 4.87793 13.3538 5.36599 12.8657L8.23308 9.99994L5.36599 7.13416C4.87808 6.646 4.87793 5.85405 5.36599 5.36599C5.85405 4.87793 6.646 4.87808 7.13416 5.36599L9.99994 8.23308L12.8657 5.36599Z"
        className="fill-(--btn-icon)"
      />
    </svg>
  );
}
