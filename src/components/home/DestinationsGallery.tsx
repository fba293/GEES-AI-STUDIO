/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Choose your destination" Draggable Card Gallery with Interactive Modal
 */

import React, { useState } from 'react';
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

  return (
    <section className="relative w-full bg-white dark:bg-[#070b19] py-14 sm:py-20 overflow-hidden border-t border-slate-100 dark:border-slate-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span>Choose your</span>
              <span className="bg-[#fbbf24] text-slate-950 px-4 py-1 rounded-2xl shadow-xs font-black">
                destination
              </span>
            </h2>
          </div>

          <button
            onClick={() => onNavigateToCountry('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors group cursor-pointer"
          >
            <span>View All Destinations</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Gallery Carousel Container */}
      <div className="relative w-full overflow-x-auto no-scrollbar py-3 px-4 sm:px-8">
        <div className="flex gap-5 sm:gap-6 w-max mx-auto">
          {mockDestinations.map((dest) => (
            <div
              key={dest.code}
              onClick={() => setSelectedCountry(dest)}
              className="group relative w-[280px] sm:w-[310px] md:w-[325px] h-[440px] sm:h-[460px] rounded-3xl overflow-hidden shrink-0 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 select-none border border-slate-200/80 dark:border-slate-800 bg-slate-900"
            >
              {/* Background City Skyline Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${dest.bgImageUrl})` }}
              />

              {/* Scrim Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/60 to-transparent" />

              {/* Top Badge Row */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-3xl leading-none drop-shadow-md select-none">
                  {dest.flagEmoji}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-[11px] uppercase tracking-wider shadow-sm">
                  {dest.unisCountText}
                </span>
              </div>

              {/* Bottom Info Area */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                  STUDY IN
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                  {dest.name}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <div className="flex items-center gap-1.5 text-xs text-slate-200">
                    <span className="material-symbols-outlined text-[16px] text-amber-400">groups</span>
                    <span>{dest.studentsCountText}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCountry(dest);
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#fbbf24] text-slate-950 font-bold text-xs hover:brightness-105 shadow-sm transition-transform active:scale-95"
                  >
                    <span>Explore</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Quick Info Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <span className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl shadow-xs">
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
                <span className="text-[10px] font-bold uppercase text-blue-600 block mb-1">
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
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center transition-colors shadow-sm"
              >
                Browse Universities in {selectedCountry.name}
              </button>
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  onOpenConsultation(selectedCountry.name);
                }}
                className="py-3 px-5 rounded-xl bg-[#fbbf24] hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-colors"
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
