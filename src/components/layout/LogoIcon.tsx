
import React from 'react';

const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
        fill="url(#paint0_linear)"
        fillOpacity="0.2"
      />
      <path
        d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16"
        stroke="url(#paint1_linear)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M19 9L13 16L19 23"
        stroke="url(#paint2_linear)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="2"
          y1="2"
          x2="30"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4CAF50" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="6"
          y1="16"
          x2="26"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4CAF50" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="13"
          y1="16"
          x2="19"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4CAF50" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoIcon;
