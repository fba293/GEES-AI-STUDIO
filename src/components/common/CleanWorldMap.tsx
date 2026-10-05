/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Neat and Clean High-Fidelity World Map Vector Background Component
 * Incorporates authentic continental contours with subtle dotted particle matrix
 * inspired by professional study abroad agency websites.
 */

import React from 'react';

interface CleanWorldMapProps {
  className?: string;
  opacity?: number;
}

export const CleanWorldMap: React.FC<CleanWorldMapProps> = ({
  className = "absolute inset-0 w-full h-full pointer-events-none",
}) => {
  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 560"
        className="w-full h-full object-cover sm:object-contain transition-opacity duration-700 opacity-20 dark:opacity-25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle Dotted Particle Pattern for Continents */}
          <pattern id="dotPatternClean" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.3" className="fill-slate-400 dark:fill-slate-300" opacity="0.8" />
          </pattern>
          <radialGradient id="cleanVignette" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
          </radialGradient>
          <mask id="cleanMask">
            <rect width="1200" height="560" fill="url(#cleanVignette)" />
          </mask>
        </defs>

        <g mask="url(#cleanMask)">
          {/* North America */}
          <path
            d="M80,120 Q120,70 190,75 Q260,80 320,110 Q350,150 330,210 Q280,260 250,290 Q220,330 200,340 Q180,310 160,260 Q130,250 100,210 Q70,160 80,120 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          {/* Alaska */}
          <path
            d="M40,110 Q80,90 120,105 Q110,150 70,160 Q40,140 40,110 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          {/* Greenland */}
          <path
            d="M370,50 Q430,40 470,70 Q450,130 400,140 Q360,110 370,50 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* South America */}
          <path
            d="M260,330 Q330,320 370,360 Q410,410 380,480 Q350,540 320,550 Q290,530 280,450 Q260,390 260,330 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* Europe */}
          <path
            d="M510,130 Q580,110 650,125 Q680,165 670,220 Q620,240 550,235 Q510,195 510,130 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          {/* UK & Ireland */}
          <path
            d="M490,140 Q510,130 515,160 Q500,180 485,170 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          {/* Scandinavia */}
          <path
            d="M560,70 Q620,60 635,110 Q590,135 565,110 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* Africa */}
          <path
            d="M510,245 Q630,240 680,285 Q710,360 670,440 Q630,500 590,510 Q550,450 530,360 Q490,320 510,245 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          {/* Madagascar */}
          <path
            d="M700,430 Q720,430 715,480 Q695,480 700,430 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* Asia / Eurasia */}
          <path
            d="M670,110 Q850,85 1060,115 Q1100,160 1080,240 Q1020,300 950,280 Q910,340 860,340 Q840,280 780,270 Q710,290 680,240 Q660,170 670,110 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* India & South Asia */}
          <path
            d="M780,270 Q840,280 850,330 Q820,390 790,360 Q770,310 780,270 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* Southeast Asia & Malaysia / Indonesia */}
          <path
            d="M880,310 Q940,310 950,365 Q910,395 870,360 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          <path
            d="M890,380 Q970,375 1010,400 Q950,420 890,380 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* Japan */}
          <path
            d="M1060,200 Q1090,210 1085,260 Q1055,250 1060,200 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />

          {/* Australia */}
          <path
            d="M940,410 Q1060,400 1090,460 Q1070,520 980,525 Q920,490 940,410 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
          {/* New Zealand */}
          <path
            d="M1100,490 Q1125,485 1130,530 Q1105,535 1100,490 Z"
            fill="url(#dotPatternClean)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
};
