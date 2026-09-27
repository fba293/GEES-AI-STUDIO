/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Choose your Destination" Infinite Looping Interactive Gallery
 * Features:
 * - Big, bold typographic header matching "Our Services" and "6 Steps to Your Goal"
 * - Automated continuous right-to-left loop with seamless infinite reset
 * - Soft white shade gradient fade masks on both left and right sides
 * - Smooth desktop mouse drag-to-scroll (cursor-grab / cursor-grabbing)
 * - Mobile & tablet responsive touch swipe with momentum
 * - Interactive modal with university counts, intake dates, tuition, and PR/visa rights
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { mockDestinations } from '../../data/mockDatabase.ts';
import { DestinationCountry } from '../../types/index.ts';

interface DestinationsGalleryProps {
  onNavigateToCountry: (countryName: string) => void;
  onOpenConsultation: (counselor?: string) => void;
}

export const DestinationsGallery: React.FC<DestinationsGalleryProps> = ({
  onNavigateToCountry,
  onOpenConsultation
}) => {
  const [selectedCountry, setSelectedCountry] = useState<DestinationCountry | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number>(0);
  const scrollStartRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Triple destinations for seamless infinite scroll loop
  const infiniteDestinations = [...mockDestinations, ...mockDestinations, ...mockDestinations];

  // Set initial scroll offset to middle set on mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      if (el && el.scrollWidth > 0) {
        el.scrollLeft = el.scrollWidth / 3;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Continuous right-to-left smooth auto-scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollSpeed = 0.75; // Pixels per frame (~45-50px/sec at 60fps)

    const loop = () => {
      if (!isPaused && !isDragging && el) {
        el.scrollLeft += scrollSpeed;

        const oneSetWidth = el.scrollWidth / 3;
        // Seamless wrap around when reaching the end of the second set
        if (el.scrollLeft >= oneSetWidth * 2) {
          el.scrollLeft -= oneSetWidth;
        } else if (el.scrollLeft <= 5) {
          el.scrollLeft += oneSetWidth;
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isDragging]);

  const scheduleResume = useCallback((delayMs: number = 1800) => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, delayMs);
  }, []);

  // --- Mouse Drag to Scroll Handling ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    setIsDragging(true);
    setIsPaused(true);
    hasDraggedRef.current = false;
    dragStartXRef.current = e.pageX;
    scrollStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;

    const deltaX = e.pageX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }

    el.scrollLeft = scrollStartRef.current - deltaX;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      scheduleResume(1600);
    }
  };

  // --- Mobile & Tablet Touch Gestures ---
  const handleTouchStart = (e: React.TouchEvent) => {
    const el = containerRef.current;
    if (!el) return;

    setIsPaused(true);
    hasDraggedRef.current = false;
    dragStartXRef.current = e.touches[0].clientX;
    scrollStartRef.current = el.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const el = containerRef.current;
    if (!el) return;

    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 8) {
      hasDraggedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    scheduleResume(2000);
  };

  // Quick slide arrow buttons
  const slideBy = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    setIsPaused(true);
    const amount = direction === 'left' ? -380 : 380;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    scheduleResume(2400);
  };

  return (
    <section className="relative w-full bg-white dark:bg-[#070b19] py-16 sm:py-24 overflow-hidden border-t border-slate-100 dark:border-slate-800 select-none">
      {/* Header - Big, Bold, and Centered matching other major sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3 flex-wrap mb-4">
          <span>Choose your</span>
          <span className="bg-[#fbbf24] text-slate-950 px-5 sm:px-6 py-1.5 rounded-2xl sm:rounded-[22px] font-black tracking-tight leading-none shadow-sm hover:scale-105 transition-transform inline-block">
            Destination
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-6">
          Explore premier study destinations with top-tier universities, generous post-study work rights, and high visa approval rates.
        </p>

        {/* View All CTA Pill */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigateToCountry('all')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-[#fbbf24] hover:text-slate-950 dark:hover:bg-[#fbbf24] dark:hover:text-slate-950 transition-all shadow-xs group cursor-pointer"
          >
            <span>Explore All Destinations</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Gallery Carousel Container with White Shades, Arrows, and Drag/Touch Support */}
      <div className="relative w-full overflow-hidden">
        {/* Left White / Dark Vignette Shade Overlay */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 lg:w-48 z-20 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#070b19] dark:via-[#070b19]/80 dark:to-transparent"
          aria-hidden="true"
        />

        {/* Right White / Dark Vignette Shade Overlay */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 lg:w-48 z-20 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#070b19] dark:via-[#070b19]/80 dark:to-transparent"
          aria-hidden="true"
        />

        {/* Left Navigation Arrow */}
        <button
          onClick={() => slideBy('left')}
          aria-label="Previous destination"
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs hover:bg-[#fbbf24] hover:text-slate-950 dark:hover:bg-[#fbbf24] dark:hover:text-slate-950"
        >
          <span className="material-symbols-outlined text-2xl font-bold">chevron_left</span>
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={() => slideBy('right')}
          aria-label="Next destination"
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs hover:bg-[#fbbf24] hover:text-slate-950 dark:hover:bg-[#fbbf24] dark:hover:text-slate-950"
        >
          <span className="material-symbols-outlined text-2xl font-bold">chevron_right</span>
        </button>

        {/* Scrollable Track - supports Mouse Drag and Touch Gestures */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsPaused(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`relative w-full overflow-x-auto no-scrollbar py-6 px-6 sm:px-12 touch-pan-x ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          <div className="flex gap-5 sm:gap-6 w-max">
            {infiniteDestinations.map((dest, index) => (
              <div
                key={`${dest.code}-${index}`}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    setSelectedCountry(dest);
                  }
                }}
                className="group relative w-[280px] sm:w-[310px] md:w-[330px] h-[440px] sm:h-[470px] rounded-3xl overflow-hidden shrink-0 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 select-none border border-slate-200/80 dark:border-slate-800 bg-slate-900"
              >
                {/* Background City Skyline Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.bgImageUrl})` }}
                />

                {/* Scrim Gradients for Readable Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/60 to-transparent" />

                {/* Top Badge Row */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-3xl sm:text-4xl leading-none drop-shadow-md select-none">
                    {dest.flagEmoji}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                    {dest.unisCountText}
                  </span>
                </div>

                {/* Bottom Info Area */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase mb-1">
                    STUDY IN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                    {dest.name}
                  </h3>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <span className="material-symbols-outlined text-[16px] text-amber-400">groups</span>
                      <span>{dest.studentsCountText}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!hasDraggedRef.current) {
                          setSelectedCountry(dest);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#fbbf24] text-slate-950 font-bold text-xs hover:brightness-105 shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Explore</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Quick Info Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <span className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl shadow-xs">
                {selectedCountry.flagEmoji}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {selectedCountry.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase">
                    {selectedCountry.unisCountText}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {selectedCountry.studentsCountText} enrolled annually
                </p>
              </div>
            </div>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {selectedCountry.overview}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Intake Windows
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {selectedCountry.intakeText}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Avg. Tuition Range
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {selectedCountry.avgTuitionText}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 col-span-2">
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">
                  Post-Study Work Rights
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {selectedCountry.pswText}
                </p>
              </div>
            </div>

            {/* Popular Cities */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase text-slate-500 block mb-2">
                Prime Student Cities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCountry.citiesText.split(',').map((city, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    {city.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onNavigateToCountry(selectedCountry.name);
                  setSelectedCountry(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center transition-colors shadow-sm cursor-pointer"
              >
                Browse Universities in {selectedCountry.name}
              </button>
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  onOpenConsultation(selectedCountry.name);
                }}
                className="py-3 px-5 rounded-xl bg-[#fbbf24] hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-colors cursor-pointer"
              >
                Book Advisory
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DestinationsGallery;
