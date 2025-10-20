import { SVGProps } from "react";

export function MessageCircle2FilledIcon(props: SVGProps<SVGSVGElement>) {
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
        <linearGradient
          id="messageGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF80" />
        </linearGradient>
      </defs>

      <path fill="url(#messageGradient)" d="m3 20l1.3-3.9A9 8 0 1 1 7.7 19z" />
    </svg>
  );
}
