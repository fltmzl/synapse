import { SVGProps } from "react";

export function CheckboxCheckedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Kotak luar */}
      <rect
        width="16.5"
        height="16.5"
        x="3.75"
        y="3.75"
        rx="4"
        fill="currentColor"
      />
      {/* Centang diperkecil pakai scale */}
      <g
        transform="scale(0.85) translate(2.1, 2.1)"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        fill="none"
      >
        <path d="m16.512 9.107l-5.787 5.786l-3.237-3.232" />
      </g>
    </svg>
  );
}
