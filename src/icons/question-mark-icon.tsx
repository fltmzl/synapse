import { SVGProps } from "react";

export function QuestionMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE */}
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 8a3.5 3 0 0 1 3.5-3h1A3.5 3 0 0 1 16 8a3 3 0 0 1-2 3a3 4 0 0 0-2 4m0 4v.01"
      />
    </svg>
  );
}
