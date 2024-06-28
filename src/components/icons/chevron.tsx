import React from "react";

interface ChevronDownProps {
  fill?: string;
  filled?: boolean;
  size?: number | string;
  height?: number | string;
  width?: number | string;
  label?: string;
  [key: string]: any;
}

export const ChevronDown: React.FC<ChevronDownProps> = ({
  fill = 'currentColor',
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      fill={fill}
      {...props}
    >
      <path d="M12 15.5l-7-7 1.4-1.4 5.6 5.6 5.6-5.6 1.4 1.4-7 7z" />
    </svg>
  );
};