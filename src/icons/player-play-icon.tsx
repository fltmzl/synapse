import { SVGProps } from "react";

export function PlayerPlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE */}
      <defs>
        <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="10%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF20" />
        </linearGradient>
      </defs>

      <path
        fill="url(#customGradient)"
        d="M6 4v16a1 1 0 0 0 1.524.852l13-8a1 1 0 0 0 0-1.704l-13-8A1 1 0 0 0 6 4"
      />
    </svg>
  );
}
