'use client';

import React from 'react';

export function AshokaPillarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 125"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g>
        {/* Lions */}
        <path d="M50 10 L 30 40 L 70 40 Z" />
        <path d="M50 10 L 40 25 L 60 25 Z" />
        <path d="M50 10 L 45 35 L 55 35 Z" />
        <path d="M30 40 Q 25 50 30 60" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M70 40 Q 75 50 70 60" stroke="currentColor" fill="none" strokeWidth="2" />

        {/* Abacus */}
        <rect x="20" y="60" width="60" height="10" />

        {/* Frieze (simplified wheel) */}
        <circle cx="50" cy="75" r="8" stroke="currentColor" fill="none" strokeWidth="2" />
        <line x1="50" y1="67" x2="50" y2="83" stroke="currentColor" strokeWidth="2" />
        <line x1="42" y1="75" x2="58" y2="75" stroke="currentColor" strokeWidth="2" />

        {/* Bell lotus */}
        <path d="M30 85 C 40 100, 60 100, 70 85" />
      </g>
    </svg>
  );
}
