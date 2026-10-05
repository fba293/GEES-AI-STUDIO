/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Dotted World Map Vector Background Component
 * High-precision dotted particle world map inspired by professional vector infographics.
 * Adapts to both light and dark themes with subtle particle opacity and hover depth.
 */

import React, { useMemo } from 'react';

interface DottedWorldMapProps {
  className?: string;
  dotColor?: string;
  opacity?: number;
}

export const DottedWorldMap: React.FC<DottedWorldMapProps> = ({
  className = "absolute inset-0 w-full h-full pointer-events-none object-cover",
  dotColor,
  opacity
}) => {
  // Generate a high-density matrix of dots representing continental landmasses
  const dots = useMemo(() => {
    // Array of (x, y, radius) or discrete continent dot coordinates on a 1000x480 grid
    const points: [number, number][] = [];
    const step = 8; // Grid resolution

    // Continent landmass boundary check algorithms
    const isLand = (x: number, y: number): boolean => {
      // Scale coordinates to 0..1000 and 0..480
      
      // 1. Greenland
      if (x >= 310 && x <= 410 && y >= 25 && y <= 110) {
        if ((x > 330 && y < 95) || (x < 390 && y > 35)) return true;
      }

      // 2. North America (Alaska, Canada, USA, Mexico)
      if (x >= 60 && x <= 320 && y >= 70 && y <= 270) {
        // Alaska
        if (x >= 60 && x <= 140 && y >= 80 && y <= 150) return true;
        // Canada / Northern US
        if (x >= 140 && x <= 290 && y >= 70 && y <= 180) {
          // Hudson bay cutout
          if (x >= 230 && x <= 270 && y >= 95 && y <= 130) return false;
          return true;
        }
        // Continental USA
        if (x >= 140 && x <= 310 && y >= 170 && y <= 230) {
          if (x > 290 && y > 220) return false; // Gulf cutout
          return true;
        }
        // Mexico & Central America
        if (x >= 160 && x <= 250 && y >= 230 && y <= 275) {
          return x <= (390 - y * 0.55) && x >= (110 + y * 0.25);
        }
      }

      // 3. Caribbean & Islands
      if (x >= 250 && x <= 300 && y >= 225 && y <= 255) {
        if ((x % 16 === 0 && y % 16 === 0)) return true;
      }

      // 4. South America
      if (x >= 240 && x <= 370 && y >= 265 && y <= 450) {
        // Northern SA (Colombia, Venezuela, Brazil)
        if (y >= 265 && y <= 350) {
          return x >= 245 && x <= (270 + (y - 265) * 1.2) && x <= 365;
        }
        // Central & Southern SA (Bolivia, Peru, Argentina, Chile)
        if (y > 350 && y <= 450) {
          const width = Math.max(8, 95 - (y - 350) * 0.9);
          const left = 270 + (y - 350) * 0.15;
          return x >= left && x <= (left + width);
        }
      }

      // 5. United Kingdom & Ireland
      if (x >= 420 && x <= 460 && y >= 115 && y <= 165) {
        if (x <= 435 && y >= 130 && y <= 155) return true; // Ireland
        if (x >= 438 && x <= 458 && y >= 118 && y <= 162) return true; // UK
      }

      // 6. Scandinavia & Iceland
      if (x >= 370 && x <= 400 && y >= 95 && y <= 115) return true; // Iceland
      if (x >= 470 && x <= 560 && y >= 55 && y <= 145) {
        if (x >= 480 && x <= 540 && y >= 60 && y <= 135) return true; // Norway/Sweden/Finland
      }

      // 7. Western, Central & Eastern Europe
      if (x >= 445 && x <= 610 && y >= 140 && y <= 220) {
        // Mediterranean cutout
        if (x >= 470 && x <= 560 && y >= 205 && y <= 220 && (x + y) % 24 === 0) return false;
        // Iberian Peninsula (Spain/Portugal)
        if (x >= 420 && x <= 465 && y >= 175 && y <= 215) return true;
        // France, Germany, Poland, Ukraine, Italy, Balkans
        if (x >= 455 && x <= 610 && y >= 140 && y <= 210) {
          // Italy boot
          if (x >= 495 && x <= 520 && y >= 195 && y <= 235) return true;
          return true;
        }
      }

      // 8. Africa
      if (x >= 425 && x <= 595 && y >= 205 && y <= 400) {
        // North Africa (Morocco, Egypt, etc.)
        if (y >= 205 && y <= 270) {
          return x >= 430 && x <= 590;
        }
        // West Africa bulge
        if (y > 270 && y <= 325) {
          return x >= 425 && x <= 560;
        }
        // Central & South Africa
        if (y > 325 && y <= 400) {
          const left = 465 + (y - 325) * 0.25;
          const right = 560 - (y - 325) * 0.6;
          return x >= left && x <= right;
        }
      }

      // Madagascar
      if (x >= 575 && x <= 600 && y >= 340 && y <= 390) {
        return (x - 575) * 1.5 > (y - 340) * 0.4 && (x - 575) < 20;
      }

      // 9. Russia & Northern Asia
      if (x >= 580 && x <= 920 && y >= 55 && y <= 180) {
        // Northern Siberia
        if (y >= 55 && y <= 110) {
          return x >= 590 && x <= 890;
        }
        // Central Russia
        if (y > 110 && y <= 180) {
          return x >= 580 && x <= 910;
        }
      }

      // 10. Middle East & Central Asia
      if (x >= 570 && x <= 720 && y >= 180 && y <= 270) {
        // Arabian Peninsula
        if (x >= 570 && x <= 630 && y >= 230 && y <= 290) {
          return x >= 575 && x <= (630 - (y - 230) * 0.4);
        }
        // Iran, Central Asian Republics
        if (x >= 580 && x <= 720 && y >= 175 && y <= 245) return true;
      }

      // 11. South Asia (India, Pakistan, Bangladesh, Sri Lanka)
      if (x >= 670 && x <= 765 && y >= 225 && y <= 330) {
        // Pakistan/North India/Bangladesh
        if (y >= 225 && y <= 265) return x >= 665 && x <= 765;
        // Indian Peninsula taper
        if (y > 265 && y <= 315) {
          const left = 680 + (y - 265) * 0.6;
          const right = 750 - (y - 265) * 0.6;
          return x >= left && x <= right;
        }
        // Sri Lanka
        if (x >= 715 && x <= 730 && y >= 315 && y <= 330) return true;
      }

      // 12. East Asia (China, Mongolia, Korea, Japan)
      if (x >= 710 && x <= 880 && y >= 165 && y <= 285) {
        // China / Mongolia
        if (x >= 710 && x <= 845 && y >= 170 && y <= 280) return true;
        // Korean Peninsula
        if (x >= 820 && x <= 845 && y >= 210 && y <= 245) return true;
        // Japan Archipelago
        if (x >= 845 && x <= 885 && y >= 180 && y <= 245) {
          return Math.abs((x - 845) * 0.9 - (y - 180)) < 18;
        }
      }

      // 13. Southeast Asia (Indochina, Malaysia, Indonesia, Philippines)
      if (x >= 735 && x <= 870 && y >= 255 && y <= 365) {
        // Myanmar, Thailand, Vietnam
        if (x >= 735 && x <= 800 && y >= 255 && y <= 305) return true;
        // Malay Peninsula
        if (x >= 755 && x <= 775 && y >= 300 && y <= 330) return true;
        // Indonesia (Sumatra, Java, Borneo)
        if (x >= 745 && x <= 865 && y >= 325 && y <= 365) {
          if ((x + y) % 12 === 0 || (x % 16 === 0)) return true;
          return x >= 760 && x <= 850 && y >= 330 && y <= 355;
        }
        // Philippines
        if (x >= 820 && x <= 855 && y >= 275 && y <= 325) {
          return (y % 16 === 0 || x % 16 === 0);
        }
      }

      // 14. Australia & Papua New Guinea
      if (x >= 790 && x <= 950 && y >= 340 && y <= 455) {
        // Papua New Guinea
        if (x >= 850 && x <= 905 && y >= 345 && y <= 370) return true;
        // Mainland Australia
        if (x >= 795 && x <= 930 && y >= 370 && y <= 450) {
          // Gulf of Carpentaria cutout
          if (x >= 845 && x <= 870 && y >= 370 && y <= 395) return false;
          // Great Australian Bight cutout
          if (x >= 835 && x <= 880 && y >= 435 && y <= 450) return false;
          return true;
        }
        // Tasmania
        if (x >= 890 && x <= 910 && y >= 452 && y <= 468) return true;
        // New Zealand
        if (x >= 925 && x <= 960 && y >= 420 && y <= 470) {
          return Math.abs((x - 925) * 1.2 - (y - 420)) < 15;
        }
      }

      return false;
    };

    // Populate dots
    for (let y = 30; y <= 465; y += step) {
      for (let x = 40; x <= 970; x += step) {
        if (isLand(x, y)) {
          points.push([x, y]);
        }
      }
    }

    return points;
  }, []);

  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 480"
        className="w-full h-full object-cover sm:object-contain transition-opacity duration-700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial mask for gentle edges so map blends seamlessly with footer content */}
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="65%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
          </radialGradient>
          <mask id="mapMask">
            <rect width="1000" height="480" fill="url(#mapVignette)" />
          </mask>
        </defs>

        <g mask="url(#mapMask)">
          {dots.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={1.85}
              className="fill-slate-600/30 dark:fill-slate-400/25 transition-colors duration-500"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
