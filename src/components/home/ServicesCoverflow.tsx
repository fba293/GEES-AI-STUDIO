/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES 3D Coverflow Services Carousel (20 Services) with Interactive Details
 */

import React, { useState, useEffect, useRef } from 'react';
import { mockServices } from '../../data/mockDatabase.ts';
import { ServiceItem } from '../../types/index.ts';

interface ServicesCoverflowProps {
  onSelectService: (service: ServiceItem) => void;
  onViewAllServices: () => void;
}

export const ServicesCoverflow: React.FC<ServicesCoverflowProps> = ({
  onSelectService,
  onViewAllServices
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to "School Admission" matching screenshot
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const count = mockServices.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const currentService = mockServices[currentIndex];

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#070b19] py-14 sm:py-20 select-none border-t border-slate-100 dark:border-slate-800">
      {/* Brand Header */}
      <div className="w-full text-center flex flex-col items-center mb-6 md:mb-10 px-4">
        <div className="inline-flex items-center justify-center gap-2.5 mb-2.5">
          <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Our
          </span>
          <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight px-4 sm:px-6 py-1.5 bg-[#fbb034] text-slate-950 rounded-2xl shadow-sm leading-none inline-block">
            Services
          </span>
        </div>
        <p className="text-xs sm:text-sm tracking-[0.25em] font-bold text-slate-500 uppercase">
          EVERYTHING YOU NEED, IN ONE PLACE
        </p>
      </div>

      {/* Coverflow Carousel Stage with Nav Buttons */}
      <div className="relative w-full carousel-viewport px-2 sm:px-8 overflow-visible flex items-center justify-center">
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous service"
          className="absolute left-2 sm:left-6 md:left-12 z-40 w-11 h-11 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">chevron_left</span>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next service"
          className="absolute right-2 sm:right-6 md:right-12 z-40 w-11 h-11 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">chevron_right</span>
        </button>

        {/* 3D Scene */}
        <div className="carousel-scene relative w-full h-[360px] sm:h-[430px] flex items-center justify-center select-none">
          {mockServices.map((service, idx) => {
            let diff = (idx - currentIndex) % count;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const absDiff = Math.abs(diff);
            const sign = Math.sign(diff);

            // Hide cards that are far away
            if (absDiff > 4.5) return null;

            let tx = 0;
            let tz = 0;
            let rotY = 0;
            let scale = 1;
            let zIndex = 50 - Math.round(absDiff * 10);

            if (absDiff < 0.1) {
              tx = 0;
              tz = 80;
              rotY = 0;
              scale = 1.1;
            } else {
              const stepOffset = 140 + (absDiff - 1) * 110;
              tx = sign * stepOffset;
              tz = -absDiff * 60;
              rotY = -sign * 36;
              scale = Math.max(0.78, 1.02 - absDiff * 0.06);
            }

            return (
              <div
                key={service.id}
                onClick={() => {
                  if (absDiff < 0.1) {
                    setSelectedServiceModal(service);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] md:w-[320px] aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none"
                style={{
                  transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
                  zIndex,
                  backgroundColor: service.bgColor
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-3.5 left-0 right-0 text-center font-bold text-white drop-shadow-md text-xs sm:text-base px-2">
                    {service.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Active Title */}
      <div className="w-full text-center relative z-20 mt-4 sm:mt-6 mb-3">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white transition-all">
          {currentService?.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto px-4 mt-1 line-clamp-1">
          {currentService?.desc}
        </p>
      </div>

      {/* Pagination Dots Bar with active elongated pill */}
      <div className="flex items-center justify-center gap-1.5 mb-6 max-w-full overflow-hidden px-4 relative z-20">
        {mockServices.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to service ${i + 1}`}
            className={`transition-all duration-300 rounded-full h-2 ${
              i === currentIndex
                ? 'w-7 sm:w-8 bg-[#fbb034]'
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* CTA Button: View all services */}
      <div className="flex items-center justify-center relative z-20">
        <button
          onClick={onViewAllServices}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#fbb034] hover:bg-[#f59e0b] text-slate-950 font-bold text-sm sm:text-base shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>View all services</span>
          <span className="material-symbols-outlined text-[19px] font-bold">arrow_forward</span>
        </button>
      </div>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:text-slate-900"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: selectedServiceModal.bgColor }}
              >
                <span className="material-symbols-outlined text-2xl">{selectedServiceModal.iconName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                  {selectedServiceModal.category} • {selectedServiceModal.badge || 'Premium Service'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedServiceModal.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
              {selectedServiceModal.desc}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-2 mb-6 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                <span>Included with GEES Complete Mentorship</span>
              </div>
              <p className="text-slate-500">
                Full documentation review, verified submission channels, and dedicated support coordinator.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onSelectService(selectedServiceModal);
                  setSelectedServiceModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-blue-600 text-center transition-colors"
              >
                Apply for this Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
