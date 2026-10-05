/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Neat and Clean High-Fidelity Dotted World Map Vector Background Component
 * Incorporates authentic continental contours with clean dotted particle matrix
 * inspired by professional study abroad agency websites.
 */

import React, { useMemo } from 'react';

interface CleanWorldMapProps {
  className?: string;
}

export const CleanWorldMap: React.FC<CleanWorldMapProps> = ({
  className = "absolute inset-0 w-full h-full pointer-events-none",
}) => {
  // Precompute precise vector dots for all continents on a clean 1200x520 grid
  const dots = useMemo(() => {
    const points: [number, number][] = [];
    const step = 10; // Clean uniform particle spacing

    const isContinent = (x: number, y: number): boolean => {
      // 1. North America
      if (x >= 80 && x <= 380 && y >= 60 && y <= 310) {
        // Alaska
        if (x >= 80 && x <= 160 && y >= 80 && y <= 160) return true;
        // Canada
        if (x >= 150 && x <= 360 && y >= 60 && y <= 190) {
          if (x >= 270 && x <= 320 && y >= 90 && y <= 135) return false; // Hudson Bay
          return true;
        }
        // USA
        if (x >= 160 && x <= 370 && y >= 180 && y <= 250) return true;
        // Mexico & Central America
        if (x >= 180 && x <= 290 && y >= 240 && y <= 310) {
          return x <= (420 - y * 0.5) && x >= (130 + y * 0.25);
        }
      }

      // 2. Greenland
      if (x >= 370 && x <= 480 && y >= 30 && y <= 120) {
        return (x > 390 && y < 105) || (x < 460 && y > 40);
      }

      // 3. South America
      if (x >= 280 && x <= 440 && y >= 300 && y <= 500) {
        if (y >= 300 && y <= 390) {
          return x >= 290 && x <= (310 + (y - 300) * 1.3) && x <= 430;
        }
        if (y > 390 && y <= 500) {
          const width = Math.max(10, 110 - (y - 390) * 0.95);
          const left = 320 + (y - 390) * 0.18;
          return x >= left && x <= (left + width);
        }
      }

      // 4. UK & Ireland
      if (x >= 505 && x <= 550 && y >= 120 && y <= 180) {
        if (x <= 522 && y >= 135 && y <= 165) return true; // Ireland
        if (x >= 525 && x <= 548 && y >= 122 && y <= 178) return true; // UK
      }

      // 5. Scandinavia & Iceland
      if (x >= 450 && x <= 480 && y >= 100 && y <= 120) return true; // Iceland
      if (x >= 560 && x <= 660 && y >= 60 && y <= 160) {
        if (x >= 570 && x <= 645 && y >= 65 && y <= 150) return true;
      }

      // 6. Europe
      if (x >= 530 && x <= 720 && y >= 150 && y <= 240) {
        // Iberian Peninsula
        if (x >= 500 && x <= 555 && y >= 190 && y <= 235) return true;
        // Central Europe
        if (x >= 540 && x <= 720 && y >= 150 && y <= 230) {
          if (x >= 590 && x <= 620 && y >= 210 && y <= 250) return true; // Italy
          return true;
        }
      }

      // 7. Africa
      if (x >= 510 && x <= 710 && y >= 225 && y <= 450) {
        if (y >= 225 && y <= 295) return x >= 515 && x <= 700; // North Africa
        if (y > 295 && y <= 360) return x >= 510 && x <= 670; // West & Central
        if (y > 360 && y <= 450) {
          const left = 555 + (y - 360) * 0.28;
          const right = 670 - (y - 360) * 0.7;
          return x >= left && x <= right;
        }
      }

      // Madagascar
      if (x >= 690 && x <= 720 && y >= 380 && y <= 440) {
        return (x - 690) * 1.5 > (y - 380) * 0.4 && (x - 690) < 22;
      }

      // 8. Russia & Northern Asia
      if (x >= 690 && x <= 1100 && y >= 60 && y <= 200) {
        if (y >= 60 && y <= 125) return x >= 700 && x <= 1070;
        if (y > 125 && y <= 200) return x >= 690 && x <= 1090;
      }

      // 9. Middle East
      if (x >= 680 && x <= 850 && y >= 200 && y <= 300) {
        if (x >= 690 && x <= 760 && y >= 250 && y <= 320) return true; // Arabian Peninsula
        if (x >= 700 && x <= 850 && y >= 195 && y <= 275) return true; // Iran / Central Asia
      }

      // 10. South Asia (India, Pakistan, Bangladesh)
      if (x >= 800 && x <= 910 && y >= 250 && y <= 370) {
        if (y >= 250 && y <= 295) return x >= 795 && x <= 910;
        if (y > 295 && y <= 350) {
          const left = 810 + (y - 295) * 0.65;
          const right = 895 - (y - 295) * 0.65;
          return x >= left && x <= right;
        }
        if (x >= 850 && x <= 870 && y >= 350 && y <= 370) return true; // Sri Lanka
      }

      // 11. East Asia (China, Korea, Japan)
      if (x >= 850 && x <= 1050 && y >= 185 && y <= 320) {
        if (x >= 850 && x <= 1010 && y >= 190 && y <= 310) return true; // China
        if (x >= 980 && x <= 1010 && y >= 235 && y <= 275) return true; // Korea
        if (x >= 1010 && x <= 1060 && y >= 205 && y <= 275) {
          return Math.abs((x - 1010) * 0.9 - (y - 205)) < 20; // Japan
        }
      }

      // 12. Southeast Asia (Malaysia, Thailand, Vietnam, Indonesia, Philippines)
      if (x >= 880 && x <= 1040 && y >= 285 && y <= 410) {
        if (x >= 880 && x <= 960 && y >= 285 && y <= 340) return true; // Indochina
        if (x >= 905 && x <= 930 && y >= 335 && y <= 370) return true; // Malaysia Peninsula
        if (x >= 890 && x <= 1030 && y >= 365 && y <= 410) {
          return (x % 14 === 0 || y % 14 === 0) && x >= 910 && x <= 1020; // Indonesia
        }
        if (x >= 980 && x <= 1025 && y >= 310 && y <= 365) return true; // Philippines
      }

      // 13. Australia & New Zealand
      if (x >= 950 && x <= 1140 && y >= 380 && y <= 510) {
        if (x >= 1015 && x <= 1080 && y >= 385 && y <= 415) return true; // Papua New Guinea
        if (x >= 950 && x <= 1110 && y >= 415 && y <= 505) {
          if (x >= 1010 && x <= 1040 && y >= 415 && y <= 440) return false; // Gulf cutout
          if (x >= 995 && x <= 1050 && y >= 485 && y <= 505) return false; // Bight cutout
          return true;
        }
        if (x >= 1065 && x <= 1090 && y >= 508 && y <= 525) return true; // Tasmania
        if (x >= 1110 && x <= 1150 && y >= 470 && y <= 525) {
          return Math.abs((x - 1110) * 1.2 - (y - 470)) < 18; // New Zealand
        }
      }

      return false;
    };

    for (let y = 30; y <= 520; y += step) {
      for (let x = 70; x <= 1160; x += step) {
        if (isContinent(x, y)) {
          points.push([x, y]);
        }
      }
    }

    return points;
  }, []);

  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 540"
        className="w-full h-full object-cover sm:object-contain transition-opacity duration-700 opacity-20 dark:opacity-30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="dottedCleanVignette" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="75%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
          </radialGradient>
          <mask id="dottedCleanMask">
            <rect width="1200" height="540" fill="url(#dottedCleanVignette)" />
          </mask>
        </defs>

        <g mask="url(#dottedCleanMask)">
          {dots.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={1.8}
              className="fill-slate-400 dark:fill-slate-300"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
