/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Success Stories" 3D Perspective Card Stack & Staggered Quote Reveal
 */

import React, { useState, useEffect } from 'react';
import { mockTestimonials } from '../../data/mockDatabase.ts';
import { TestimonialStory } from '../../types/index.ts';

export const SuccessStoriesSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'malaysia' | 'australia' | 'canada' | 'uk'>('all');
  const [currentIndex, setCurrentIndex] = useState(2); // Default to Tahmid Rahman matching Screenshot 10

  const filteredStories = selectedFilter === 'all'
    ? mockTestimonials
    : mockTestimonials.filter(t => t.country === selectedFilter);

  const activeStory = filteredStories[currentIndex % filteredStories.length] || mockTestimonials[0];

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % filteredStories.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  return (
    <section className="w-full bg-white dark:bg-[#070b19] py-14 sm:py-20 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Success
          </h2>
          <span className="text-3xl sm:text-5xl font-black text-slate-950 px-4 sm:px-6 py-1 rounded-2xl bg-[#fbb034] inline-flex items-center shadow-xs">
            Stories
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-2xl mb-8">
          Real student experiences with admission, visa and arrival support.
        </p>

        {/* Filter Segmented Tab Bar */}
        <div className="w-full max-w-2xl mb-10 overflow-x-auto no-scrollbar">
          <div className="relative inline-flex items-center p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mx-auto justify-center gap-1">
            {[
              { label: 'All Stories', key: 'all' },
              { label: 'Malaysia 🇲🇾', key: 'malaysia' },
              { label: 'Australia 🇦🇺', key: 'australia' },
              { label: 'Canada 🇨🇦', key: 'canada' },
              { label: 'United Kingdom 🇬🇧', key: 'uk' }
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setSelectedFilter(tab.key as any);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === tab.key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Testimonial Card Container */}
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left 3D Perspective Photo Stack */}
            <div className="md:col-span-5 lg:col-span-6 flex justify-center items-center py-2">
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] mx-auto preserve-3d">
                {filteredStories.map((story, idx) => {
                  let offset = idx - (currentIndex % filteredStories.length);
                  if (offset > filteredStories.length / 2) offset -= filteredStories.length;
                  if (offset < -filteredStories.length / 2) offset += filteredStories.length;

                  let transform = '';
                  let zIndex = 10;
                  let opacity = 0.5;

                  if (offset === 0) {
                    transform = 'translateX(0%) translateY(0px) scale(1)';
                    zIndex = 30;
                    opacity = 1;
                  } else if (offset === 1) {
                    transform = 'translateX(18%) translateY(-10px) scale(0.9)';
                    zIndex = 20;
                    opacity = 0.65;
                  } else if (offset === -1) {
                    transform = 'translateX(-18%) translateY(-10px) scale(0.9)';
                    zIndex = 20;
                    opacity = 0.65;
                  } else {
                    transform = 'translateX(30%) translateY(-20px) scale(0.8)';
                    zIndex = 5;
                    opacity = 0;
                  }

                  return (
                    <div
                      key={story.id}
                      onClick={() => setCurrentIndex(idx)}
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer bg-slate-950"
                      style={{ transform, zIndex, opacity }}
                    >
                      <img
                        src={story.avatarUrl}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Student Details & Staggered Quote Reveal */}
            <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-between h-full py-2">
              <div>
                {/* Location Meta Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-2xs">
                    {activeStory.locationBadge}
                  </span>
                </div>

                {/* Name & Program */}
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {activeStory.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {activeStory.degree}
                </p>

                {/* Quote with opening quote symbol */}
                <div className="mt-5 mb-6 min-h-[100px] flex items-start">
                  <p className="text-base sm:text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    <span className="text-slate-400 text-2xl mr-1 select-none font-serif">“</span>
                    {activeStory.quote}
                    <span className="text-slate-400 text-2xl ml-1 select-none font-serif">”</span>
                  </p>
                </div>
              </div>

              {/* Navigation Controls + Pagination Dots */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800 mt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                    className="w-11 h-11 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#fbb034] hover:text-slate-950 active:scale-95 flex items-center justify-center transition-all shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                    className="w-11 h-11 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#fbb034] hover:text-slate-950 active:scale-95 flex items-center justify-center transition-all shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {filteredStories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === (currentIndex % filteredStories.length)
                          ? 'w-7 sm:w-8 bg-[#fbb034]'
                          : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Proof & Google Reviews CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="https://globaleducationexpert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-98"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
            </svg>
            <span>Read All Reviews on Google</span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">arrow_forward</span>
          </a>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-amber-400 text-sm">★★★★★</span>
            <span className="font-bold text-slate-900 dark:text-white">4.9 / 5.0</span>
            <span className="text-slate-500">• 250+ verified alumni reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};
