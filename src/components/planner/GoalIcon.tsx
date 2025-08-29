'use client';

import React from 'react';

export function GoalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g>
        {/* Bar chart */}
        <rect x="50" y="65" width="10" height="35" />
        <rect x="65" y="55" width="10" height="45" />
        <rect x="80" y="45" width="10" height="55" />
        
        {/* Student */}
        <circle cx="28" cy="30" r="8" />
        <path d="M 20 40 L 20 80 L 35 80 L 35 55 L 45 65 L 45 95 L 30 95 L 30 85 Z" />
        <path d="M 15 28 L 35 22 L 32 28 Z" />
        <line x1="33" y1="24" x2="38" y2="30" stroke="currentColor" strokeWidth="2" />

        {/* Arm reaching for target */}
        <path d="M 35 40 C 45 35, 55 38, 62 45" stroke="currentColor" fill="none" strokeWidth="4" />

        {/* Papers */}
        <rect x="60" y="20" width="25" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="63" y="17" width="25" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="66" y="14" width="25" height="20" fill="white" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="18" x2="85" y2="18" stroke="currentColor" strokeWidth="1" />
        <line x1="70" y1="21" x2="85" y2="21" stroke="currentColor" strokeWidth="1" />
        <line x1="70" y1="24" x2="82" y2="24" stroke="currentColor" strokeWidth="1" />
        <line x1="70" y1="27" x2="80" y2="27" stroke="currentColor" strokeWidth="1" />


        {/* Target */}
        <circle cx="68" cy="48" r="7" stroke="currentColor" fill="none" strokeWidth="1.5"/>
        <circle cx="68" cy="48" r="3" fill="currentColor" />
        <line x1="68" y1="43" x2="68" y2="53" stroke="currentColor" strokeWidth="1" />
        <line x1="63" y1="48" x2="73" y2="48" stroke="currentColor" strokeWidth="1" />

        {/* Star */}
        <path d="M 80 35 L 82 40 L 87 40 L 83 43 L 85 48 L 80 45 L 75 48 L 77 43 L 73 40 L 78 40 Z" fill="currentColor"/>
      </g>
    </svg>
  );
}
