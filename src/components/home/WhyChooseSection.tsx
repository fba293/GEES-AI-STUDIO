/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Why Choose GEES" Section with Interactive Feature Tabs & Destination Modal
 */

import React, { useState } from 'react';

interface WhyChooseSectionProps {
  onSelectCountry: (countryName: string) => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onSelectCountry }) => {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalCountry, setSelectedModalCountry] = useState('Europe');

  const destinations = [
    { name: 'USA', flag: '🇺🇸', code: 'USA' },
    { name: 'UK', flag: '🇬🇧', code: 'UK' },
    { name: 'Ireland', flag: '🇮🇪', code: 'Ireland' },
    { name: 'Australia', flag: '🇦🇺', code: 'Australia' },
    { name: 'Canada', flag: '🇨🇦', code: 'Canada' },
    { name: 'Malaysia', flag: '🇲🇾', code: 'Malaysia' },
    { name: 'New Zealand', flag: '🇳🇿', code: 'New Zealand' },
    { name: 'Europe', flag: '🇪🇺', code: 'Europe' }
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white dark:bg-[#070b19]">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="inline-flex items-center justify-center flex-wrap gap-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          <span>Why Choose</span>
          <span className="bg-[#F6BE48] text-slate-900 px-4 py-1 sm:px-5 sm:py-1.5 rounded-[18px] inline-block font-black tracking-tight shadow-xs hover:-rotate-1 transition-transform">
            GEES
          </span>
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
          Trusted guidance. Transparent support. Hassle-free study abroad.
        </p>
      </div>

      {/* Grid: 3 Features on Left & Counselor Visual with Stats on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Interactive 01, 02, 03 features */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          {/* Feature 01 */}
          <div
            onClick={() => setActiveFeature(1)}
            className={`p-5 rounded-2xl cursor-pointer transition-all border-l-4 ${
              activeFeature === 1
                ? 'border-[#F6BE48] bg-slate-50 dark:bg-slate-800/80 shadow-sm'
                : 'border-transparent hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-start gap-5">
              <span className={`text-3xl sm:text-4xl font-black select-none ${activeFeature === 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                01
              </span>
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  No Service Charge. No Hidden Fees.
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                  Clear guidance and complete mentorship support without surprise consultancy charges or fees.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 02 */}
          <div
            onClick={() => setActiveFeature(2)}
            className={`p-5 rounded-2xl cursor-pointer transition-all border-l-4 ${
              activeFeature === 2
                ? 'border-[#F6BE48] bg-slate-50 dark:bg-slate-800/80 shadow-sm'
                : 'border-transparent hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-start gap-5">
              <span className={`text-3xl sm:text-4xl font-black select-none ${activeFeature === 2 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                02
              </span>
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  A–Z Guidelines
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                  Support from course shortlisting and SOP reviews to applications, scholarships, and preparation.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 03 */}
          <div
            onClick={() => setActiveFeature(3)}
            className={`p-5 rounded-2xl cursor-pointer transition-all border-l-4 ${
              activeFeature === 3
                ? 'border-[#F6BE48] bg-slate-50 dark:bg-slate-800/80 shadow-sm'
                : 'border-transparent hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-start gap-5">
              <span className={`text-3xl sm:text-4xl font-black select-none ${activeFeature === 3 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                03
              </span>
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  Hassle-Free Visa Processing
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                  Precision document checklists, mock visa interview training, and structured embassy support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual with Admission 2027 Badge and Floating Stats */}
        <div className="lg:col-span-7 relative">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-800 h-[420px] sm:h-[480px] border border-white dark:border-slate-700">
            {/* Live Status Pill in Header */}
            <div className="absolute top-5 right-5 z-20">
              <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-md text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Admission on for 2027</span>
              </div>
            </div>

            {/* Photo from Stitch Screenshot 2 */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFUG3LimCmQdFr1k1-wNK5zT18LimOcioRecatV_qZg4szgdi5Ix8xIvlJ4Q7J8YmCDAvemCEjGNIDpGh2KWrFc7XFraLsXflSPATEL6Al2PwyPU5x1RkoLaoKeE2T8_uF1xN7vXihk-zpG_tJwt6W-zYs6xlGwaXZXEgT6lZwp-f8tCo5vNklh45dzRpmetB0jwHwbqh2lkMwOfurbWkTsgixGDUJzk1KOJ5hRIqEZaAc6bEXXq3BPyZ5wXzkn8D2lV_yNf2dKtJWWmE"
              alt="GEES Educational Counselor advising students"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient shadow for card */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none"></div>

            {/* Floating Stats Block */}
            <div className="absolute bottom-5 inset-x-4 sm:inset-x-8 z-20">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl py-3.5 px-4 sm:px-6 shadow-xl border border-white/80 dark:border-slate-800">
                <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 text-center items-center">
                  <div className="px-2">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">20+</div>
                    <div className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Partner Universities</div>
                  </div>
                  <div className="px-2">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100+</div>
                    <div className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Students Placed</div>
                  </div>
                  <div className="px-2">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">95%</div>
                    <div className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">Visa Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Destinations Trigger */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-950 hover:text-white dark:hover:bg-blue-600 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <span>Explore Destinations</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Modal: Select a Destination (From Stitch Screen 2) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Select a Destination
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Destinations Grid (8 Country Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5">
              {destinations.map((d) => (
                <button
                  key={d.name}
                  onClick={() => setSelectedModalCountry(d.name)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center cursor-pointer ${
                    selectedModalCountry === d.name
                      ? 'ring-2 ring-blue-600 bg-blue-50/70 dark:bg-blue-950/40 border-blue-500'
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/40'
                  }`}
                >
                  <span className="text-4xl select-none mb-2">{d.flag}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {d.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Selected: <strong className="text-blue-600">{selectedModalCountry}</strong>
              </span>
              <button
                onClick={() => {
                  onSelectCountry(selectedModalCountry);
                  setIsModalOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                View Universities in {selectedModalCountry}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
