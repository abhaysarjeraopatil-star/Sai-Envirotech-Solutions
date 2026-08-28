import React from "react";

interface SaiLogoProps {
  className?: string;
  size?: number;
}

export default function SaiLogo({ className = "w-10 h-10", size = 40 }: SaiLogoProps) {
  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-white border border-slate-200/80 p-1 shadow-sm shrink-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Blue Caring Hand & Ring Gradient */}
          <linearGradient id="saiBlueGrad" x1="10" y1="90" x2="85" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0288d1" />
            <stop offset="40%" stopColor="#039be5" />
            <stop offset="85%" stopColor="#0277bd" />
            <stop offset="100%" stopColor="#01579b" />
          </linearGradient>

          {/* Green Leaf & Base Gradient */}
          <linearGradient id="saiGreenGrad" x1="20" y1="75" x2="80" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e7d32" />
            <stop offset="50%" stopColor="#43a047" />
            <stop offset="100%" stopColor="#7cb342" />
          </linearGradient>

          {/* Light Center Leaf Gradient */}
          <linearGradient id="saiLeafCenter" x1="50" y1="55" x2="50" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e7d32" />
            <stop offset="60%" stopColor="#689f38" />
            <stop offset="100%" stopColor="#8bc34a" />
          </linearGradient>
        </defs>

        {/* Outer Blue Protective Hand / Crescent Frame */}
        <path
          d="M 50 6 C 72 6 88 24 88 50 C 88 74 72 92 50 92 C 30 92 14 76 14 50 C 14 34 22 20 34 12 C 32 18 30 26 30 36 C 30 64 45 78 68 78 C 76 78 82 74 85 70 C 82 82 68 88 50 88 C 28 88 18 72 18 50 C 18 28 32 10 50 6 Z"
          fill="url(#saiBlueGrad)"
        />

        {/* Lower Blue Supportive Hand Thumb/Palm Silhouette */}
        <path
          d="M 22 62 C 28 75 42 85 58 84 C 70 83 78 76 82 68 C 72 73 58 72 48 64 C 40 57 32 58 22 62 Z"
          fill="url(#saiBlueGrad)"
        />

        {/* Green Grounding Wave / Caring Inner Palm */}
        <path
          d="M 30 64 C 42 63 52 70 65 67 C 76 64 80 55 78 52 C 68 57 58 54 48 50 C 38 46 28 52 30 64 Z"
          fill="url(#saiGreenGrad)"
        />

        {/* Lower Swirling Green Base Ring */}
        <path
          d="M 32 68 C 44 76 60 76 72 68 C 62 72 48 70 38 62 C 35 64 33 66 32 68 Z"
          fill="#388e3c"
        />

        {/* Left Green Sprout Leaf */}
        <path
          d="M 46 48 C 36 44 30 34 32 24 C 40 24 48 32 50 42 C 48 45 47 47 46 48 Z"
          fill="url(#saiGreenGrad)"
        />

        {/* Center Main Sprout Leaf */}
        <path
          d="M 50 46 C 45 36 45 22 50 14 C 55 22 55 36 50 46 Z"
          fill="url(#saiLeafCenter)"
        />

        {/* Right Green Sprout Leaf */}
        <path
          d="M 54 48 C 55 47 56 45 54 42 C 56 32 64 24 72 24 C 74 34 68 44 58 48 Z"
          fill="url(#saiGreenGrad)"
        />

        {/* Leaf Vein Center Accent */}
        <path
          d="M 50 42 L 50 20"
          stroke="#1b5e20"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
