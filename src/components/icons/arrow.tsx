import { twMerge } from "tailwind-merge";

/**
 * Modified HeroIcons' arrow-left-circle icon to isolate the arrow and increase its size.
 * @see https://heroicons.com/
 */
export function Arrow({
  className,
  direction = "left",
}: {
  className?: string;
  direction?: "left" | "right";
}) {
  const classes = twMerge(
    "stroke-white stroke-2 [stroke-linecap:round] [stroke-linejoin:round] *:[path]:stroke-(--btn-icon)",
    "forced-colors:[--btn-bg:Canvas] forced-colors:data-hover:[--btn-bg:Canvas]",
    direction === "right" && "rotate-180",
    className,
  );
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-slot="icon"
      className={classes}
    >
      <path
        d="
        M4,10
        h 12
        "
      />
      <path
        d="
        M10,4.5
        L4,10
        L10,15.5
        "
      />
    </svg>
  );
}
