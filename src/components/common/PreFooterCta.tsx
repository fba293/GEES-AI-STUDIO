/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Pre-Footer Still Wondering What To Do CTA Section
 */

import React from 'react';

interface PreFooterCtaProps {
  onOpenConsultation?: () => void;
  onNavigate?: (view: string, payload?: any) => void;
}

export const PreFooterCta: React.FC<PreFooterCtaProps> = ({
  onOpenConsultation,
  onNavigate
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0B1329] transition-colors" id="cta-reveal">
      <div className="w-full flex flex-col justify-between overflow-hidden pt-8 pb-12 md:pb-16 bg-white dark:bg-[#0B1329]">
        {/* MAIN CTA CARD STAGE WITH OVERLAPPING "GEES" STYLING */}
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 z-10 my-auto">
          {/* Outer card with gentle ambient border & shadow */}
          <div className="relative bg-white dark:bg-[#0f172a] rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col items-center text-center transition-all duration-300">
            {/* Amber accent bar on top center of the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-36 h-1.5 bg-[#fbb034] rounded-b-full shadow-sm" />

            {/* Eyebrow Pill: Free Consultation */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbb034]/15 border border-[#fbb034]/40 text-slate-800 dark:text-slate-200 mb-8 md:mb-10 shadow-sm">
              <span className="material-symbols-outlined text-sm md:text-base text-[#c58211] dark:text-[#fbb034]">headset_mic</span>
              <span className="text-xs md:text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200">
                Free Consultation · <span className="font-bold text-slate-900 dark:text-white">100% Free</span>
              </span>
            </div>

            {/* Main Headline matching IMAGE_2 */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-x-3 md:gap-x-4 mb-6">
              <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white tracking-tight leading-none shrink-0">
                Still wondering
              </h2>
              <span className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-950 bg-[#fbb034] px-4 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3.5 rounded-2xl md:rounded-3xl inline-flex items-center justify-center tracking-tight leading-none shadow-sm shrink-0">
                what to do?
              </span>
            </div>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-normal">
              Message our experts to start your study abroad journey today
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else if (onNavigate) {
                    onNavigate('apply');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0f172a] dark:bg-white text-white dark:text-slate-900 font-semibold text-sm md:text-base hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md group cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>Book A Free Consultation</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>

              <a
                href="tel:+8801805529578"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm md:text-base hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-lg text-slate-600 dark:text-slate-400">call</span>
                <span>Call Our Office</span>
              </a>
            </div>

            {/* Bottom Trust Row */}
            <div className="w-full pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
              {/* Student Avatars & Count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                  <img
                    alt="Student graduate"
                    className="inline-block h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCScVNi_hPPHRc2Mt1iHB3VM9kyzw_akLg5G5-pzZKfcwYf3Xmcg0ZQSTMg5bDHz6Rq9bzAJAFt6hqNJtY086qvLFjGXrsUnIJ1fk0pabWPS3dfoBkbAx9tlG7AxebAk0sGJL3f0yE71AZPTDUxCFQ79MauEi53d91N64lGrP7eiSnjpStFvwOERr1c7GGTTNja3YOzWQEsAkHEQ1WseJJpHNefdprfyUKm1aDkEo64-yH92_7tFLHb7Q"
                  />
                  <img
                    alt="Student smiling"
                    className="inline-block h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsXyblRn9dO1-tD2-CyeRLJ62K6IWTTqHFxQw4BCU6o1vBvHjcPcF6h2MSy6KgMVuqW54FXoEF_uOWHgwasOS80oHR-e4jQr_WO7G06q05XlTgGF8n8m74wb-gMhX5GxuhTKgOJl6QioNyaxBwLn8lL20YW-IRVOzN-XH8CwQ3NgYL4MdwgKFj3s_M4xcqelyd0DxfyXGhigQ3h3RPGPJDU_QUpAaaxj3MkVvCBoJxzEkyg84pJ2yvzg"
                  />
                  <img
                    alt="Research scholar"
                    className="inline-block h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB40GcWzl3OHPKQ6HWMmMViUmIOmafwEfSo0GFyg82oJosJaXh6ggQNdNkbIvmnLtxpT_etJN1t7aDb7twKYV2WOFKHxpSZgU8i-byHigOvRwGZLymDGpS_DA8vi-qdVrc21V5RI0UO2UJSDG2JfQ8O2uhZQWMXP9jOuVqmCzr0v6p4_BuHjpyWWQREvubkUigxbJBTEcOFOTwqVr0QwsyJ2amHJ261uq26tUlcK3MafMVVBZGPeKgkLw"
                  />
                  <img
                    alt="Business student"
                    className="inline-block h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsv4pvKvVjTBZTxMxPu4dczeS4j7BJpqMcSmtxrk7cQzC9UELlCQA6hYXCI7POaDgKm_IghX6E_SMOaW2ZehguMmXy-ZMWmQa0Qit0WQ-AhigqrIO_Z7PN1_d-1iCR8rbop11UwNAkR2lNSgNVn2KpEoV6zSAA6tFzCYRmjzoe8BABJz7qSdb2KOldF3QHgRIYIlCHj08lZaAO0WtU49ahpFwCvUgO6FnAe6Q9yasPOHgCqLjKeYVGUQ"
                  />
                  <div className="inline-flex h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 items-center justify-center text-xs font-bold font-sans">
                    +2k
                  </div>
                </div>
              </div>

              {/* Trust Proof 1 */}
              <div className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
                <span className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Trusted by <span className="font-bold text-slate-900 dark:text-white">25,000+</span> students
                </span>
              </div>

              {/* Trust Proof 2 */}
              <div className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fbb034] text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                  star
                </span>
                <span className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  <span className="font-bold text-slate-900 dark:text-white">98%</span> visa success rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
