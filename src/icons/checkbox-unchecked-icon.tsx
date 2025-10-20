import { SVGProps } from "react";

export function CheckboxUncheckedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE */}
      <rect
        width="16.5"
        height="16.5"
        x="3.75"
        y="3.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        rx="4"
      />
    </svg>
  );
}
