import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  color?: string; // warna isi (fill)
  strokeColor?: string; // warna garis
};

const PentagonIcon: React.FC<Props> = ({
  color = "#DC2626",
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
    <g filter="url(#pentagon_shadow)">
      <path
        d="M8.68197 1.98203C9.38295 1.47274 10.3321 1.47274 11.0331 1.98203L16.2904 5.80169C16.9914 6.31098 17.2847 7.21371 17.017 8.03776L15.0089 14.2181C14.7411 15.0421 13.9732 15.6001 13.1067 15.6001H6.60835C5.74189 15.6001 4.97398 15.0421 4.70623 14.2181L2.69812 8.03776C2.43037 7.21371 2.72369 6.31098 3.42466 5.80169L8.68197 1.98203Z"
        fill={color}
      />
      <path
        d="M8.68197 1.98203C9.38295 1.47274 10.3321 1.47274 11.0331 1.98203L16.2904 5.80169C16.9914 6.31098 17.2847 7.21371 17.017 8.03776L15.0089 14.2181C14.7411 15.0421 13.9732 15.6001 13.1067 15.6001H6.60835C5.74189 15.6001 4.97398 15.0421 4.70623 14.2181L2.69812 8.03776C2.43037 7.21371 2.72369 6.31098 3.42466 5.80169L8.68197 1.98203Z"
        stroke={strokeColor}
        strokeWidth="1.2"
      />
    </g>
    <defs>
      <filter
        id="pentagon_shadow"
        x="0"
        y="0"
        width="19.7151"
        height="19.2"
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

export default PentagonIcon;
