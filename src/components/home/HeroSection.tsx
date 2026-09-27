/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Hero Section with Typewriter Country Cycling, Instant Fuzzy Search & Rolling Number Tickers
 */

import React, { useState, useEffect, useRef } from 'react';
import { mockUniversities, mockCourses, mockDestinations, mockServices } from '../../data/mockDatabase.ts';

interface HeroSectionProps {
  onNavigate: (view: string, payload?: any) => void;
  onOpenConsultationModal: (counselorName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenConsultationModal
}) => {
  // 1. Typewriter Animation State
  const countries = [
    'United Kingdom',
    'Australia',
    'USA',
    'Canada',
    'Germany',
    'Malaysia',
    'China',
    'Cyprus'
  ];
  const [countryIndex, setCountryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('United Kingdom');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = countries[countryIndex];

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, 85);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setCountryIndex((prev) => (prev + 1) % countries.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, countryIndex]);

  // 2. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Instant fuzzy matches
  const q = searchQuery.trim().toLowerCase();
  const matchedCountries = q
    ? mockDestinations.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.code.toLowerCase().includes(q)
      )
    : [];

  const matchedServices = q
    ? mockServices.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.desc.toLowerCase().includes(q)
      )
    : [];

  const showDropdown = dropdownOpen && q.length > 0;

  const handleSelectResult = (type: string, name: string) => {
    setSearchQuery(name);
    setDropdownOpen(false);
    showToastNotification(`Selected: ${name}`);
    if (type === 'destination') {
      onNavigate('destinations', name);
    } else {
      onNavigate('services', name);
    }
  };

  const showToastNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleFindPrograms = () => {
    onNavigate('courses', {
      query: searchQuery,
      destination: selectedDestination,
      level: selectedLevel,
      field: fieldOfStudy
    });
  };

  return (
    <section className="relative w-full bg-white dark:bg-[#070b19] pt-8 sm:pt-12 pb-16 lg:pb-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start w-full relative z-10">
        {/* Title + Graduate Graphic Header */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-10 relative">
          <div className="flex flex-col items-start flex-1 relative z-20">
            <h1 className="text-[54px] sm:text-[76px] lg:text-[96px] font-black tracking-tight text-slate-900 dark:text-white leading-[0.95] select-none">
              Study in
            </h1>

            {/* Typewriter Highlight Box */}
            <div className="mt-2 sm:mt-3 inline-block px-5 sm:px-8 py-2 sm:py-3 rounded-2xl sm:rounded-3xl shadow-sm bg-[#fbb034] transition-all duration-300">
              <span className="text-[46px] sm:text-[68px] lg:text-[88px] font-black tracking-tight text-slate-950 leading-none inline-flex items-center min-h-[1.05em]">
                <span>{displayedText}</span>
                <span className="ml-1 inline-block w-[3px] sm:w-[5px] h-[0.75em] bg-slate-950 rounded-sm animate-pulse align-baseline"></span>
              </span>
            </div>

            <p className="mt-4 sm:mt-6 font-bold text-[11px] sm:text-[13px] tracking-[0.22em] uppercase text-slate-500 dark:text-slate-400">
              CONNECTING YOU TO THE WORLD CLASS EDUCATION
            </p>
          </div>

          {/* Graduate Photo Card Visual (From Stitch Screen 4) */}
          <div className="w-full lg:w-auto relative lg:absolute lg:right-0 lg:bottom-0 flex flex-col items-center justify-end shrink-0 pointer-events-none z-10">
            <div className="relative flex items-end justify-center w-full max-w-sm sm:max-w-md">
              <div className="absolute top-16 sm:top-20 w-64 sm:w-80 h-64 sm:h-80 bg-blue-500/15 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
              <div className="absolute top-20 sm:top-24 w-56 sm:w-72 h-56 sm:h-72 bg-[#fbb034]/20 rounded-full blur-2xl pointer-events-none -z-10"></div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3i8ovasBhMoQ1TCIM8b_loTMgx6vCkSvEsw2fJQwFSZyCoNLkXZxKA9EN1sJJ-A3Cwq0yfftq-b7M3savldQvGKkRNTurDSnUnFbValuSkkSZ9I02u8NfOa5w9lnDxukT6Y6TF9d-5czHZTgV_3JN8j9PWYwKKPDtBBm1BDdxTOk3_2wI_1Vk3NYvjoT_o4k9rsKNw4Qh3yZ7iBvQCZmx0L7d8WF5SIdgK6q16NhNSnClDMxmM_jUHniHU-ibe0ndZ6U"
                alt="GEES Successful Graduate Student"
                className="h-56 sm:h-72 lg:h-84 object-contain pointer-events-none transition-transform duration-500 drop-shadow-2xl opacity-90 lg:opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Search & Filter Floating Card */}
        <div className="w-full relative z-20 mt-6 sm:mt-8">
          <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-3 sm:p-4">
            {/* Search Input Bar */}
            <div className="relative flex items-center w-full bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3 border border-slate-200/80 dark:border-slate-700/60 focus-within:border-blue-600 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <span className="material-symbols-outlined text-blue-600 text-[24px] mr-3 shrink-0">search</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search universities, courses, destinations, or scholarships..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none border-0 p-0 pr-3"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Instant Fuzzy Dropdown */}
            {showDropdown && (
              <div className="absolute left-3 right-3 sm:left-4 sm:right-4 top-full mt-2 bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Instant Match Suggestions</span>
                  <span className="text-blue-600">{matchedCountries.length + matchedServices.length} matches</span>
                </div>

                <div className="max-h-72 overflow-y-auto p-2 space-y-2 no-scrollbar">
                  {matchedCountries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleSelectResult('destination', c.name)}
                      className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-xl">{c.flagEmoji}</span>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">{c.name}</span>
                        <span className="text-xs text-slate-400">{c.unisCountText} • {c.avgTuitionText}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600">Explore →</span>
                    </button>
                  ))}

                  {matchedServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectResult('service', s.title)}
                      className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/60 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[16px]">{s.iconName}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">{s.title}</span>
                        <span className="text-xs text-slate-400">{s.category}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-600">View →</span>
                    </button>
                  ))}

                  {matchedCountries.length === 0 && matchedServices.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No exact match for "{searchQuery}". Click "Find Programs" to explore the full directory.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Filter Row: Destination, Level, Field of Study & CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 items-center">
              {/* Destination */}
              <div className="lg:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">public</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-bold text-[9px] tracking-wider uppercase text-slate-400">Destination</span>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer border-0 p-0"
                  >
                    <option value="all">All Destinations</option>
                    <option value="UK">United Kingdom</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                </div>
              </div>

              {/* Level of Study */}
              <div className="lg:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-bold text-[9px] tracking-wider uppercase text-slate-400">Level of Study</span>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer border-0 p-0"
                  >
                    <option value="all">All Levels</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="doctorate">Doctorate / PhD</option>
                    <option value="foundation">Foundation / Pathway</option>
                  </select>
                </div>
              </div>

              {/* Field of Study */}
              <div className="lg:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-bold text-[9px] tracking-wider uppercase text-slate-400">Field of Study</span>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none border-0 p-0"
                  />
                </div>
              </div>

              {/* Find Programs CTA Button */}
              <div className="lg:col-span-3 sm:col-span-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleFindPrograms}
                  className="w-full h-10 px-4 rounded-xl bg-slate-950 dark:bg-white hover:bg-blue-600 text-white dark:text-slate-900 hover:text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">search</span>
                  <span>Find Programs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Nav 4 Gold Action Blocks (From Stitch Screen 4) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5">
            {[
              { label: 'Universities', view: 'universities' },
              { label: 'Courses', view: 'courses' },
              { label: 'IELTS Prep', view: 'services', payload: 'ielts-preparation' },
              { label: 'Blogs & News', view: 'blog' }
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(btn.view, btn.payload)}
                className="py-3.5 px-4 bg-[#fbb034] hover:bg-[#f59e0b] text-slate-950 font-bold text-sm sm:text-base rounded-2xl border-2 border-slate-950 dark:border-slate-700 transition-all shadow-xs text-center active:scale-95 cursor-pointer"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* 4 Animated Number Ticker Counters */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-8 sm:mt-10">
            {[
              { target: '100+', label: 'Students Placed', detail: 'Worldwide Alumni' },
              { target: '20+', label: 'Partner Universities', detail: 'Direct Institution Tie-Ups' },
              { target: '95%', label: 'Visa Success', detail: 'High Approval Rate' },
              { target: '2+', label: 'Global Offices', detail: 'Dhaka & Kuala Lumpur' }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-center items-start shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-none">
                  {stat.target}
                </div>
                <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm mt-2">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Notification Feedback */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#fbb034]"></span>
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
};
