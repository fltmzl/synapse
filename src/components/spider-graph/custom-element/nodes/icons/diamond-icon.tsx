import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  color?: string; // warna isi (fill)
  strokeColor?: string; // warna garis (stroke)
};

const DiamondIcon: React.FC<Props> = ({
  color = "#58A4FF",
  strokeColor = "white",
  ...props
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#diamond_shadow)">
      <path
        d="M8.35739 2.1857C9.13844 1.40465 10.4048 1.40465 11.1858 2.1857L16.3574 7.35727C17.1384 8.13832 17.1384 9.40465 16.3574 10.1857L11.1858 15.3573C10.4048 16.1383 9.13844 16.1383 8.35739 15.3573L3.18582 10.1857C2.40477 9.40465 2.40477 8.13832 3.18582 7.35727L8.35739 2.1857Z"
        fill={color}
      />
      <path
        d="M8.35739 2.1857C9.13844 1.40465 10.4048 1.40465 11.1858 2.1857L16.3574 7.35727C17.1384 8.13832 17.1384 9.40465 16.3574 10.1857L11.1858 15.3573C10.4048 16.1383 9.13844 16.1383 8.35739 15.3573L3.18582 10.1857C2.40477 9.40465 2.40477 8.13832 3.18582 7.35727L8.35739 2.1857Z"
        stroke={strokeColor}
        strokeWidth="1.2"
      />
    </g>
    <defs>
      <filter
        id="diamond_shadow"
        x="0"
        y="0"
        width="19.5432"
        height="19.543"
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
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default DiamondIcon;
