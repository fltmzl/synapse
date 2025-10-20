import { SVGProps } from "react";

export function CircleCheckOutlinedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE */}
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
        <path d="m9 12l2 2l4-4" />
      </g>
    </svg>
  );
}
