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
      <g transform="translate(5, 5) scale(0.9)">
        {/* Bar chart */}
        <rect x="50" y="65" width="10" height="25" />
        <rect x="65" y="45" width="10" height="45" />
        <rect x="80" y="25" width="10" height="65" />
        
        {/* Student */}
        <path d="M 20 80 L 20 60 L 35 50 L 50 65 L 50 80 Z" />
        <circle cx="38" cy="30" r="8" />
        <path d="M 30 28 L 48 24 L 45 30 Z" /> 
        
        {/* Arm reaching for target */}
        <path d="M 45 40 C 55 35, 60 38, 62 45" stroke="currentColor" fill="none" strokeWidth="3" />

        {/* Papers & Target */}
        <g transform="translate(60, 10)">
          <rect x="0" y="0" width="25" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="4" y1="4" x2="21" y2="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="1.5" />

          {/* Target on papers */}
          <circle cx="12.5" cy="10" r="7" stroke="currentColor" fill="none" strokeWidth="1"/>
          <circle cx="12.5" cy="10" r="3" fill="currentColor" />
        </g>

        {/* Star */}
        <path d="M 80 10 L 82 15 L 87 15 L 83 18 L 85 23 L 80 20 L 75 23 L 77 18 L 73 15 L 78 15 Z" fill="currentColor"/>
      </g>
    </svg>
  );
}
