import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  color?: string;
  strokeColor?: string;
};

const HexagonIcon: React.FC<Props> = ({
  color = "#F59E0B",
  strokeColor = "white",
  ...props
}) => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_11173_10191)">
      <path
        d="M8.92822 1L15.8564 5V13L8.92822 17L2.00002 13V5L8.92822 1Z"
        fill={color}
      />
      <path
        d="M15.2563 5.3457V12.6533L8.92822 16.3066L2.6001 12.6533V5.3457L8.92822 1.69238L15.2563 5.3457Z"
        stroke={strokeColor}
        strokeWidth="1.2"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_11173_10191"
        x="0"
        y="0"
        width="17.8564"
        height="20"
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
          result="effect1_dropShadow_11173_10191"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_11173_10191"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default HexagonIcon;
