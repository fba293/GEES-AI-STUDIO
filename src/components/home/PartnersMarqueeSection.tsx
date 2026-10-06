/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Our Partners Infinite Marquee Section
 */

import React from 'react';
import { InteractiveHoverButton } from '../ui/interactive-hover-button.tsx';

interface PartnersMarqueeSectionProps {
  onNavigate?: (view: string, payload?: any) => void;
}

export const PartnersMarqueeSection: React.FC<PartnersMarqueeSectionProps> = ({ onNavigate }) => {
  return (
    <section className="w-full bg-white dark:bg-[#0B1329] py-20 lg:py-28 overflow-hidden relative transition-colors" data-purpose="partners-showcase">
      {/* Ambient Blur Accents */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-1/2 right-12 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18" data-purpose="section-header">
          {/* Main Heading with Golden Pill Badge */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span>Our</span>
            <span className="inline-block bg-[#FBB034] text-[#111827] px-6 sm:px-8 py-1.5 sm:py-2 rounded-2xl shadow-sm tracking-tight">
              Partners
            </span>
          </h2>
          {/* Supporting Subtext */}
          <p className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Connecting you to 150+ top universities across the globe
          </p>
        </div>
      </div>

      {/* Marquee Showcase Container */}
      <div className="relative w-full max-w-[100vw] overflow-hidden marquee-wrapper py-3" data-purpose="marquee-container">
        {/* Subtle side gradient fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-white dark:from-[#0B1329] via-white/80 dark:via-[#0B1329]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-white dark:from-[#0B1329] via-white/80 dark:via-[#0B1329]/80 to-transparent z-20" />

        <div className="marquee-mask flex flex-col gap-5 sm:gap-6">
          {/* ROW 1: Auto-Scroll (Forward Marquee) */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-forward flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
              {/* Set 1 */}
              {/* 1. University of Alberta */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Alberta" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <svg className="w-10 h-10 flex-shrink-0" fill="none" viewBox="0 0 40 40">
                    <rect fill="#007C41" height="40" rx="10" width="40" />
                    <path d="M12 28V12h4.5l4 8.5 4-8.5H29v16h-3.5v-9.5l-3.5 7.5h-2l-3.5-7.5V28H12z" fill="#FBBF24" />
                  </svg>
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-[0.24em] font-extrabold text-slate-500 dark:text-slate-400 block leading-tight">University of</span>
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-[#007C41]">ALBERTA</span>
                  </div>
                </div>
              </div>

              {/* 2. UBC (University of British Columbia) */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of British Columbia" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#002145] p-2 flex flex-col justify-between items-center text-white shadow-sm flex-shrink-0">
                    <div className="w-full flex justify-between px-0.5"><span className="w-2 h-2 bg-[#FBBF24] rounded-full" /><span className="w-2 h-2 bg-[#FBBF24] rounded-full" /></div>
                    <span className="text-[11px] font-black tracking-widest leading-none text-white">UBC</span>
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400">The University of</div>
                    <div className="text-base sm:text-lg font-black text-[#002145] dark:text-blue-300 tracking-tight">BRITISH COLUMBIA</div>
                  </div>
                </div>
              </div>

              {/* 3. Dalhousie University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Dalhousie University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <svg className="w-10 h-10 flex-shrink-0 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 36 36">
                    <path d="M18 3L4 9v7c0 8.5 6 16.5 14 17 8-0.5 14-8.5 14-17V9L18 3zm0 4.5l9 3.8v4.7c0 6-4.2 11.6-9 12-4.8-0.4-9-6-9-12v-4.7l9-3.8z" fill="#000" />
                    <path d="M14 16h8v2h-8zM14 20h8v2h-8z" fill="#FBB034" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white block">DALHOUSIE</span>
                    <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#111] bg-[#FBB034] px-2 py-0.5 rounded inline-block mt-0.5">UNIVERSITY</span>
                  </div>
                </div>
              </div>

              {/* 4. York University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="York University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black tracking-tighter text-[#E31837] font-sans">YORK</span>
                  <div className="h-8 w-[2px] bg-slate-300 dark:bg-slate-700" />
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 leading-tight">UNIVERSITÉ<br />UNIVERSITY</div>
                </div>
              </div>

              {/* 5. Thompson Rivers University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Thompson Rivers University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#003E51] text-[#FBB034] font-black flex items-center justify-center text-sm shadow-sm flex-shrink-0">TRU</div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">THOMPSON RIVERS</span>
                    <span className="text-base sm:text-lg font-black text-[#003E51] dark:text-teal-400 tracking-tight">UNIVERSITY</span>
                  </div>
                </div>
              </div>

              {/* 6. Brock University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Brock University" onClick={() => onNavigate?.('universities')}>
                <div className="text-center">
                  <span className="text-3xl font-black text-[#CC0000] tracking-wider block leading-none font-sans">Brock</span>
                  <span className="text-[9px] uppercase tracking-[0.35em] font-extrabold text-slate-600 dark:text-slate-400 mt-1 block">University</span>
                </div>
              </div>

              {/* 7. Algoma University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Algoma University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E51B24] flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">A</div>
                  <div className="text-left leading-none">
                    <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight block">ALGOMA</span>
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-widest mt-1">university</span>
                  </div>
                </div>
              </div>

              {/* 8. Fairleigh Dickinson University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Fairleigh Dickinson University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-tight">
                  <span className="text-sm font-black font-serif text-[#0F2A4A] dark:text-blue-300 uppercase tracking-wider block">FAIRLEIGH DICKINSON</span>
                  <span className="text-[9px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.26em] block mt-0.5">U N I V E R S I T Y</span>
                </div>
              </div>

              {/* 9. Algonquin College */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Algonquin College" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-9 bg-[#00703C] rounded-sm flex items-center justify-center">
                    <div className="w-2.5 h-6 bg-white/20 rounded-xs" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-base sm:text-lg font-black text-[#00703C] tracking-tight block">ALGONQUIN</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">COLLEGE</span>
                  </div>
                </div>
              </div>

              {/* 10. UCOL New Zealand */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="UCOL New Zealand" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-[#00828A] tracking-tight">ucol</span>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-snug">New Zealand<br /><span className="font-extrabold text-slate-900 dark:text-white">Te Pūkenga</span></span>
                </div>
              </div>

              {/* 11. Georgian College */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Georgian College" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-2xl font-black text-[#003B71] dark:text-blue-400 tracking-tight block">Georgian</span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mt-1 block">College • Canada</span>
                </div>
              </div>

              {/* 12. University of Manitoba */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Manitoba" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5B3413] text-[#F3AE1B] font-serif font-black flex items-center justify-center text-base shadow-sm">M</div>
                  <div className="text-left leading-tight">
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase block">University of</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">Manitoba</span>
                  </div>
                </div>
              </div>

              {/* 13. Western Sydney University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Western Sydney University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-sm font-serif font-black text-[#960018] tracking-widest block">WESTERN SYDNEY</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-extrabold text-slate-800 dark:text-slate-200 mt-1.5 block">UNIVERSITY</span>
                </div>
              </div>

              {/* 14. La Trobe University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="La Trobe University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left font-serif leading-none">
                  <span className="text-xl font-black text-[#D92938] block tracking-wide">LA TROBE</span>
                  <span className="text-[8.5px] font-sans uppercase tracking-[0.24em] font-bold text-slate-600 dark:text-slate-400 mt-1 block">UNIVERSITY</span>
                </div>
              </div>

              {/* DUPLICATE SET 1 FOR SEAMLESS 100% INFINITE LOOP */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Alberta" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <svg className="w-10 h-10 flex-shrink-0" fill="none" viewBox="0 0 40 40">
                    <rect fill="#007C41" height="40" rx="10" width="40" />
                    <path d="M12 28V12h4.5l4 8.5 4-8.5H29v16h-3.5v-9.5l-3.5 7.5h-2l-3.5-7.5V28H12z" fill="#FBBF24" />
                  </svg>
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-[0.24em] font-extrabold text-slate-500 dark:text-slate-400 block leading-tight">University of</span>
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-[#007C41]">ALBERTA</span>
                  </div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of British Columbia" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#002145] p-2 flex flex-col justify-between items-center text-white shadow-sm flex-shrink-0">
                    <div className="w-full flex justify-between px-0.5"><span className="w-2 h-2 bg-[#FBBF24] rounded-full" /><span className="w-2 h-2 bg-[#FBBF24] rounded-full" /></div>
                    <span className="text-[11px] font-black tracking-widest leading-none text-white">UBC</span>
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400">The University of</div>
                    <div className="text-base sm:text-lg font-black text-[#002145] dark:text-blue-300 tracking-tight">BRITISH COLUMBIA</div>
                  </div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Dalhousie University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <svg className="w-10 h-10 flex-shrink-0 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 36 36">
                    <path d="M18 3L4 9v7c0 8.5 6 16.5 14 17 8-0.5 14-8.5 14-17V9L18 3zm0 4.5l9 3.8v4.7c0 6-4.2 11.6-9 12-4.8-0.4-9-6-9-12v-4.7l9-3.8z" fill="#000" />
                    <path d="M14 16h8v2h-8zM14 20h8v2h-8z" fill="#FBB034" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white block">DALHOUSIE</span>
                    <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#111] bg-[#FBB034] px-2 py-0.5 rounded inline-block mt-0.5">UNIVERSITY</span>
                  </div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="York University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black tracking-tighter text-[#E31837] font-sans">YORK</span>
                  <div className="h-8 w-[2px] bg-slate-300 dark:bg-slate-700" />
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 leading-tight">UNIVERSITÉ<br />UNIVERSITY</div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Thompson Rivers University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#003E51] text-[#FBB034] font-black flex items-center justify-center text-sm shadow-sm flex-shrink-0">TRU</div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">THOMPSON RIVERS</span>
                    <span className="text-base sm:text-lg font-black text-[#003E51] dark:text-teal-400 tracking-tight">UNIVERSITY</span>
                  </div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Brock University" onClick={() => onNavigate?.('universities')}>
                <div className="text-center">
                  <span className="text-3xl font-black text-[#CC0000] tracking-wider block leading-none font-sans">Brock</span>
                  <span className="text-[9px] uppercase tracking-[0.35em] font-extrabold text-slate-600 dark:text-slate-400 mt-1 block">University</span>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Algoma University" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E51B24] flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">A</div>
                  <div className="text-left leading-none">
                    <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight block">ALGOMA</span>
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-widest mt-1">university</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: Reverse Marquee Track */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-reverse flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
              {/* Set 2 */}
              {/* 1. Wilfrid Laurier University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Wilfrid Laurier University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-2xl font-serif font-black text-[#5B2C6F] dark:text-purple-300 block tracking-wide">LAURIER</span>
                  <span className="text-[9px] uppercase font-sans tracking-[0.28em] font-extrabold text-amber-600 dark:text-amber-400 mt-1.5 block">Inspiring Lives.</span>
                </div>
              </div>

              {/* 2. ULaw (The University of Law) */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="The University of Law" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#001D3D] text-white flex items-center justify-center font-serif font-black text-sm shadow-sm flex-shrink-0">UL</div>
                  <div className="text-left leading-tight">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">The University of</span>
                    <span className="text-xl font-black text-[#001D3D] dark:text-blue-300 tracking-tight">LAW</span>
                  </div>
                </div>
              </div>

              {/* 3. University of Toronto */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Toronto" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-11 border-2 border-[#002A5C] dark:border-blue-400 rounded-t-sm rounded-b-lg flex flex-col items-center justify-center p-0.5 flex-shrink-0">
                    <div className="w-4 h-1 bg-[#002A5C] dark:bg-blue-400 mb-1" />
                    <span className="text-[8px] font-black text-[#002A5C] dark:text-blue-400">UT</span>
                  </div>
                  <div className="text-left font-serif leading-tight">
                    <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 font-bold block">University of</span>
                    <span className="text-lg sm:text-xl font-bold text-[#002A5C] dark:text-blue-300">TORONTO</span>
                  </div>
                </div>
              </div>

              {/* 4. Trent University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Trent University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-2xl font-black tracking-tight text-[#004731] dark:text-emerald-400 block">TRENT</span>
                  <span className="text-[9px] uppercase font-sans tracking-[0.28em] font-extrabold text-slate-600 dark:text-slate-400 mt-1 block">UNIVERSITY</span>
                </div>
              </div>

              {/* 5. Yorkville University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Yorkville University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight block">YORKVILLE</span>
                  <span className="text-[9px] uppercase tracking-[0.24em] font-extrabold text-[#D32F2F] mt-1 block">UNIVERSITY</span>
                </div>
              </div>

              {/* 6. University Canada West */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University Canada West" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E2231A] text-white flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0">UCW</div>
                  <div className="text-left leading-tight">
                    <span className="text-sm font-black text-slate-900 dark:text-white block">UNIVERSITY</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">CANADA WEST</span>
                  </div>
                </div>
              </div>

              {/* 7. University of Regina */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Regina" onClick={() => onNavigate?.('universities')}>
                <div className="text-center leading-tight">
                  <span className="text-[9px] uppercase tracking-widest text-[#006A4E] dark:text-emerald-400 font-bold block">University of</span>
                  <span className="text-2xl font-serif font-black text-[#006A4E] dark:text-emerald-300">Regina</span>
                </div>
              </div>

              {/* 8. Centennial College */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Centennial College" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-lg font-black text-[#006747] dark:text-emerald-400 tracking-tight block">CENTENNIAL</span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-extrabold mt-1 block">COLLEGE</span>
                </div>
              </div>

              {/* 9. University of Windsor */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Windsor" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 block font-bold">University of</span>
                  <span className="text-2xl font-black text-[#005596] dark:text-blue-300 tracking-tight mt-0.5 block">Windsor</span>
                </div>
              </div>

              {/* 10. Capilano University */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Capilano University" onClick={() => onNavigate?.('universities')}>
                <div className="text-center leading-tight">
                  <span className="text-base font-black text-[#007FA3] dark:text-cyan-300 uppercase tracking-wider block">CAPILANO</span>
                  <span className="text-[9px] uppercase tracking-[0.28em] font-bold text-slate-600 dark:text-slate-400">UNIVERSITY</span>
                </div>
              </div>

              {/* 11. Fanshawe College */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Fanshawe College" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E31837] flex items-center justify-center text-white text-sm font-black">F</div>
                  <div className="text-left leading-none">
                    <span className="text-base font-black text-[#E31837] tracking-tight block">FANSHAWE</span>
                    <span className="text-[8.5px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 mt-1 block">COLLEGE</span>
                  </div>
                </div>
              </div>

              {/* 12. Herzing College */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Herzing College" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#003865] flex items-center justify-center text-[#FBB034] font-black text-sm">H</div>
                  <div className="text-left leading-none">
                    <span className="text-base font-black text-[#003865] dark:text-blue-300 block">HERZING</span>
                    <span className="text-[8.5px] uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400 mt-1 block">COLLEGE</span>
                  </div>
                </div>
              </div>

              {/* DUPLICATE SET 2 FOR SEAMLESS 100% INFINITE LOOP */}
              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Wilfrid Laurier University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-2xl font-serif font-black text-[#5B2C6F] dark:text-purple-300 block tracking-wide">LAURIER</span>
                  <span className="text-[9px] uppercase font-sans tracking-[0.28em] font-extrabold text-amber-600 dark:text-amber-400 mt-1.5 block">Inspiring Lives.</span>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="The University of Law" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#001D3D] text-white flex items-center justify-center font-serif font-black text-sm shadow-sm flex-shrink-0">UL</div>
                  <div className="text-left leading-tight">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">The University of</span>
                    <span className="text-xl font-black text-[#001D3D] dark:text-blue-300 tracking-tight">LAW</span>
                  </div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University of Toronto" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-11 border-2 border-[#002A5C] dark:border-blue-400 rounded-t-sm rounded-b-lg flex flex-col items-center justify-center p-0.5 flex-shrink-0">
                    <div className="w-4 h-1 bg-[#002A5C] dark:bg-blue-400 mb-1" />
                    <span className="text-[8px] font-black text-[#002A5C] dark:text-blue-400">UT</span>
                  </div>
                  <div className="text-left font-serif leading-tight">
                    <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 font-bold block">University of</span>
                    <span className="text-lg sm:text-xl font-bold text-[#002A5C] dark:text-blue-300">TORONTO</span>
                  </div>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Trent University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-2xl font-black tracking-tight text-[#004731] dark:text-emerald-400 block">TRENT</span>
                  <span className="text-[9px] uppercase font-sans tracking-[0.28em] font-extrabold text-slate-600 dark:text-slate-400 mt-1 block">UNIVERSITY</span>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="Yorkville University" onClick={() => onNavigate?.('universities')}>
                <div className="text-left leading-none">
                  <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight block">YORKVILLE</span>
                  <span className="text-[9px] uppercase tracking-[0.24em] font-extrabold text-[#D32F2F] mt-1 block">UNIVERSITY</span>
                </div>
              </div>

              <div className="partner-card flex-shrink-0 min-w-[260px] sm:min-w-[280px] h-20 sm:h-24 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-6 py-3.5 flex items-center justify-center cursor-pointer" title="University Canada West" onClick={() => onNavigate?.('universities')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E2231A] text-white flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0">UCW</div>
                  <div className="text-left leading-tight">
                    <span className="text-sm font-black text-slate-900 dark:text-white block">UNIVERSITY</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">CANADA WEST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="mt-14 sm:mt-18 flex justify-center px-4" data-purpose="cta-container">
        <InteractiveHoverButton
          type="button"
          text="View all university partners"
          onClick={() => onNavigate?.('universities')}
          className="px-8 py-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-sm sm:text-base shadow-md"
        />
      </div>
    </section>
  );
};
