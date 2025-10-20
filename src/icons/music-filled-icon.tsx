import { SVGProps } from "react";

export function MusicFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License */}

      <defs>
        <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A0D14" />
          <stop offset="100%" stopColor="#3D4F7A" />
        </linearGradient>
      </defs>

      <path
        fill="url(#customGradient)"
        d="M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465"
      />
    </svg>
  );
}
