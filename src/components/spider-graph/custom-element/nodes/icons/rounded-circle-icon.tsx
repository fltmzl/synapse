import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  color?: string;
  strokeColor?: string;
};

export default function RoundedCircleIcon({
  color = "#2447D5",
  strokeColor = "white",
  ...props
}: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_11173_10112)">
        <circle cx="12" cy="11" r="9" fill={color} />
        <circle cx="12" cy="11" r="9" stroke={strokeColor} strokeWidth="2" />
      </g>
      <defs>
        <filter
          id="filter0_d_11173_10112"
          x="0"
          y="0"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11173_10112"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11173_10112"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
