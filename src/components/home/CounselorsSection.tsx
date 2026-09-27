/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Meet Our Counselors" Section with Bidirectional Photo Sync & 1-on-1 Booking
 */

import React, { useState } from 'react';
import { mockCounselors } from '../../data/mockDatabase.ts';
import { Counselor } from '../../types/index.ts';

interface CounselorsSectionProps {
  onOpenBooking: (counselorName?: string, roleTitle?: string) => void;
}

export const CounselorsSection: React.FC<CounselorsSectionProps> = ({ onOpenBooking }) => {
  const [activeDepartment, setActiveDepartment] = useState<'all' | 'leadership' | 'counseling' | 'growth'>('all');
  const [hoveredCounselorId, setHoveredCounselorId] = useState<string | null>(null);

  const filteredCounselors = activeDepartment === 'all'
    ? mockCounselors
    : mockCounselors.filter(c => c.department === activeDepartment);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white dark:bg-[#070b19] border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center justify-center gap-3">
            <span>Meet Our</span>
            <span className="bg-[#fbb034] text-slate-950 px-6 py-1 rounded-2xl tracking-tight">
              Counselors
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
            Personalized attention from industry experts.
          </p>

          {/* Department Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'All Experts', key: 'all' },
              { label: 'Leadership', key: 'leadership' },
              { label: 'Admissions & Visas', key: 'counseling' },
              { label: 'Global Outreach', key: 'growth' }
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveDepartment(tab.key as any)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeDepartment === tab.key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Showcase: Left Staggered Photo Grid & Right Member List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Staggered 3-Column Photo Grid */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3.5 sm:gap-4 pt-2">
            {/* Col 1 */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {filteredCounselors.slice(0, 2).map((c) => {
                const isHovered = hoveredCounselorId === c.id;
                return (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredCounselorId(c.id)}
                    onMouseLeave={() => setHoveredCounselorId(null)}
                    onClick={() => onOpenBooking(c.name, c.role)}
                    className={`relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-slate-900 cursor-pointer shadow-md transition-all duration-300 ${
                      isHovered ? 'ring-4 ring-[#fbb034] scale-105 z-20 shadow-2xl' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-300 block mb-0.5">
                        {c.role}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold leading-snug">{c.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Col 2 (Shifted down) */}
            <div className="flex flex-col gap-3.5 sm:gap-4 mt-8 sm:mt-12">
              {filteredCounselors.slice(2, 4).map((c) => {
                const isHovered = hoveredCounselorId === c.id;
                return (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredCounselorId(c.id)}
                    onMouseLeave={() => setHoveredCounselorId(null)}
                    onClick={() => onOpenBooking(c.name, c.role)}
                    className={`relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-slate-900 cursor-pointer shadow-md transition-all duration-300 ${
                      isHovered ? 'ring-4 ring-[#fbb034] scale-105 z-20 shadow-2xl' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-300 block mb-0.5">
                        {c.role}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold leading-snug">{c.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Col 3 (Shifted down slightly) */}
            <div className="flex flex-col gap-3.5 sm:gap-4 mt-4 sm:mt-6">
              {filteredCounselors.slice(4, 6).map((c) => {
                const isHovered = hoveredCounselorId === c.id;
                return (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredCounselorId(c.id)}
                    onMouseLeave={() => setHoveredCounselorId(null)}
                    onClick={() => onOpenBooking(c.name, c.role)}
                    className={`relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-slate-900 cursor-pointer shadow-md transition-all duration-300 ${
                      isHovered ? 'ring-4 ring-[#fbb034] scale-105 z-20 shadow-2xl' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-300 block mb-0.5">
                        {c.role}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold leading-snug">{c.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Member List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Advisory Board</div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Available Today
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 flex flex-col">
              {filteredCounselors.map((counselor) => {
                const isHovered = hoveredCounselorId === counselor.id;
                return (
                  <div
                    key={counselor.id}
                    onMouseEnter={() => setHoveredCounselorId(counselor.id)}
                    onMouseLeave={() => setHoveredCounselorId(null)}
                    onClick={() => onOpenBooking(counselor.name, counselor.role)}
                    className={`py-3.5 sm:py-4 px-3 rounded-2xl cursor-pointer transition-all ${
                      isHovered ? 'bg-slate-50 dark:bg-slate-800/80 shadow-xs' : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Active Indicator Bar */}
                        <span
                          className={`w-1.5 h-9 rounded-full transition-all duration-300 ${
                            isHovered ? 'bg-[#fbb034] scale-y-100' : 'bg-slate-200 dark:bg-slate-700 scale-y-75'
                          }`}
                        />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                            {counselor.role}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            {counselor.name}
                          </h3>
                        </div>
                      </div>

                      {/* Social Actions + Direct Book Button */}
                      <div className="flex items-center gap-1.5">
                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/${counselor.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center hover:scale-110 transition-transform"
                          title="Chat on WhatsApp"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href={counselor.linkedInUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 flex items-center justify-center hover:scale-110 transition-transform"
                          title="LinkedIn Profile"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                        </a>

                        {/* Book CTA */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(counselor.name, counselor.role);
                          }}
                          className="ml-1 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 text-xs font-bold transition-all shadow-xs hover:scale-105 cursor-pointer"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fast-Track Immediate Consultation Block */}
            <div className="pt-2">
              <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#fbb034]">Fast-Track Processing</p>
                  <h5 className="text-sm font-bold mt-0.5">Need immediate advice today?</h5>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBooking('Express Desk Advisor', 'Admissions Desk')}
                  className="px-4 py-2 bg-[#fbb034] hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Connect Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-14 sm:mt-16 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Need a profile evaluation before booking?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Get assessed based on your academic transcripts, IELTS/TOEFL scores, and preferred countries.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Profile Assessment Team', 'Senior Advisory')}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#fbb034] hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
          >
            Start Free Profile Assessment
          </button>
        </div>
      </div>
    </section>
  );
};
