/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Reusable SectionDivider component providing smooth SVG wave transitions,
 * layered curves, and subtle ambient gradients between page sections.
 */

import React from 'react';

export type DividerVariant = 'wave' | 'layered-wave' | 'curve' | 'gradient' | 'glow-line';

export interface SectionDividerProps {
  /** Visual style variant */
  variant?: DividerVariant;
  /** Whether to invert/flip the divider vertically */
  flip?: boolean;
  /** Height tier */
  height?: 'xs' | 'sm' | 'md' | 'lg';
  /** Optional custom Tailwind classes */
  className?: string;
  /** Whether to display a subtle ambient warm accent glow matching the GEES golden brand */
  accentGlow?: boolean;
  /** Fill color for SVG path in light mode (Tailwind fill class or hex) */
  fillColorLight?: string;
  /** Fill color for SVG path in dark mode */
  fillColorDark?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  flip = false,
  height = 'md',
  className = '',
  accentGlow = true,
  fillColorLight = 'text-slate-50/70',
  fillColorDark = 'dark:text-[#0a1024]/80'
}) => {
  const heightClasses = {
    xs: 'h-6 sm:h-8',
    sm: 'h-10 sm:h-14',
    md: 'h-14 sm:h-20 md:h-24',
    lg: 'h-20 sm:h-28 md:h-36'
  }[height];

  const transformClass = flip ? 'rotate-180' : '';

  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Optional Ambient Golden/Amber Brand Accent Glow */}
      {accentGlow && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-30 dark:opacity-20 blur-3xl pointer-events-none -z-10">
          <div className="w-3/4 max-w-4xl h-12 bg-gradient-to-r from-transparent via-[#fbb034] to-transparent rounded-full" />
        </div>
      )}

      {variant === 'wave' && (
        <div className={`w-full ${heightClasses} ${transformClass} flex items-center`}>
          <svg
            className={`w-full h-full ${fillColorLight} ${fillColorDark} transition-colors`}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,53.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {variant === 'layered-wave' && (
        <div className={`w-full ${heightClasses} ${transformClass} relative flex items-center`}>
          {/* Back wave with soft brand tint */}
          <svg
            className="absolute inset-0 w-full h-full text-amber-500/10 dark:text-amber-400/5 transition-colors"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="currentColor"
            />
          </svg>
          {/* Foreground wave */}
          <svg
            className={`relative w-full h-full ${fillColorLight} ${fillColorDark} transition-colors`}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,24L48,37.3C96,51,192,77,288,85.3C384,93,480,83,576,69.3C672,56,768,40,864,37.3C960,35,1056,45,1152,58.7C1248,72,1344,88,1392,96L1440,104L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {variant === 'curve' && (
        <div className={`w-full ${heightClasses} ${transformClass} flex items-center`}>
          <svg
            className={`w-full h-full ${fillColorLight} ${fillColorDark} transition-colors`}
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C480,80 960,80 1440,0 L1440,90 L0,90 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {variant === 'gradient' && (
        <div className="w-full py-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-2.5 bg-gradient-to-r from-transparent via-[#fbb034]/40 to-transparent blur-xs" />
          </div>
        </div>
      )}

      {variant === 'glow-line' && (
        <div className="w-full py-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl flex items-center justify-center gap-3 px-6">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400/30 dark:to-amber-400/20" />
            <div className="w-2 h-2 rotate-45 border border-amber-400/60 bg-amber-400/20 rounded-xs" />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400/30 dark:to-amber-400/20" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDivider;
