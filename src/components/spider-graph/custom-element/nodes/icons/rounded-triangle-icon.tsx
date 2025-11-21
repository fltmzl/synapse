import * as React from "react";

type Props = {
  color?: string;
};

export default function RoundedTriangleIcon({
  color = "#475569" // default slate-600
}: Props) {
  const size = 20;

  return (
    <svg
      width={size}
      height={(size * 19) / 20} // menjaga proporsi asli
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_11173_10185)">
        <path
          d="M7.38203 2.9001C8.36768 1.16676 10.8318 1.16677 11.8174 2.9001L16.2528 10.7001C17.2385 12.4334 16.0064 14.6001 14.0351 14.6001H5.16433C3.19304 14.6001 1.96099 12.4334 2.94663 10.7001L7.38203 2.9001Z"
          fill={color}
        />
        <path
          d="M7.38203 2.9001C8.36768 1.16676 10.8318 1.16677 11.8174 2.9001L16.2528 10.7001C17.2385 12.4334 16.0064 14.6001 14.0351 14.6001H5.16433C3.19304 14.6001 1.96099 12.4334 2.94663 10.7001L7.38203 2.9001Z"
          stroke="white"
          strokeWidth="1.2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_11173_10185"
          x="0"
          y="0"
          width="19.1995"
          height="18.2002"
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
            result="effect1_dropShadow_11173_10185"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11173_10185"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
