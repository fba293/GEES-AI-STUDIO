/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Journey with GEES" Student Video Stories & Reels Showcase
 */

import React, { useState, useRef } from 'react';
import { mockReels } from '../../data/mockDatabase.ts';
import { ReelStory } from '../../types/index.ts';

export const StudentStoriesReels: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'campus' | 'visa' | 'vlogs' | 'grad'>('all');
  const [activeStoryModal, setActiveStoryModal] = useState<ReelStory | null>(null);
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredReels = selectedFilter === 'all'
    ? mockReels
    : mockReels.filter(r => r.category === selectedFilter);

  const handleToggleLike = (id: string) => {
    setLikedStories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden bg-white dark:bg-[#070b19]">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-14 px-2">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-2.5">
          <span>Journey with</span>
          <span className="bg-[#fbb034] text-slate-950 px-4 sm:px-5 py-1 rounded-2xl font-black shadow-sm">
            GEES
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Watch real student vlogs, campus arrivals, visa moments, and university journeys captured in high definition.
        </p>

        {/* Category Filter Pills — Horizontally scrollable on small mobile screens */}
        <div className="w-full max-w-full overflow-x-auto no-scrollbar pt-4 pb-1">
          <div className="inline-flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl sm:rounded-full border border-slate-200 dark:border-slate-700 gap-1 shadow-xs whitespace-nowrap">
            {[
              { label: 'All Stories', key: 'all' },
              { label: 'Campus Life', key: 'campus' },
              { label: 'Visa Arrivals', key: 'visa' },
              { label: 'Student Vlogs', key: 'vlogs' },
              { label: 'Convocation & Graduation', key: 'grad' }
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key as any)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                  selectedFilter === tab.key
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Reels Carousel Horizontal Gallery with Navigation Arrows */}
      <div className="relative w-full group">
        {/* Left Scroll Arrow */}
        <button
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 items-center justify-center hover:bg-[#fbb034] hover:text-slate-950 dark:hover:bg-[#fbb034] dark:hover:text-slate-950 transition-all cursor-pointer backdrop-blur-xs"
        >
          <span className="material-symbols-outlined text-xl font-bold">chevron_left</span>
        </button>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 items-center justify-center hover:bg-[#fbb034] hover:text-slate-950 dark:hover:bg-[#fbb034] dark:hover:text-slate-950 transition-all cursor-pointer backdrop-blur-xs"
        >
          <span className="material-symbols-outlined text-xl font-bold">chevron_right</span>
        </button>

        {/* Horizontal Reel Track Container */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar py-2 touch-pan-x scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex gap-3.5 sm:gap-5 md:gap-6 w-max px-2 sm:px-6">
            {filteredReels.map((reel) => {
              return (
                <article
                  key={reel.id}
                  onClick={() => setActiveStoryModal(reel)}
                  className="shrink-0 w-[210px] xs:w-[240px] sm:w-[260px] md:w-[280px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-lg hover:shadow-2xl border border-slate-200/90 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer bg-slate-950 select-none snap-start"
                >
                  {/* Background Video Poster or Video */}
                  <video
                    src={reel.videoUrl}
                    poster={reel.posterUrl}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />

                  {/* Top Location and Views Glass Pills */}
                  <div className="absolute top-3 sm:top-4 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 sm:gap-1.5 border border-white/20">
                      <span>{reel.flagEmoji}</span>
                      <span>{reel.location}</span>
                    </span>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 border border-white/20">
                      <span className="text-[#fbb034]">▶</span>
                      <span>{reel.viewsText}</span>
                    </span>
                  </div>

                  {/* Center Hover Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">play_arrow</span>
                    </div>
                  </div>

                  {/* Bottom Shadow Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none"></div>

                  {/* Bottom Card Content */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 z-20 text-white flex flex-col justify-end pointer-events-none">
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                      <span className="text-[9px] sm:text-[10px] tracking-wide uppercase px-2 sm:px-2.5 py-0.5 rounded font-black bg-[#fbb034] text-slate-950">
                        {reel.categoryBadge}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-200 flex items-center gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{reel.durationText}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="pr-1 min-w-0">
                        <h3 className="font-bold text-xs sm:text-base leading-snug truncate">
                          {reel.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                          {reel.universityAndCourse}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label="Expand story"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 hover:bg-white/40 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm sm:text-[16px]">fullscreen</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Story Modal Player */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
          {/* Close Modal */}
          <button
            onClick={() => setActiveStoryModal(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50 border border-white/20"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[90vh] sm:max-h-[92vh] bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/15">
            <video
              src={activeStoryModal.videoUrl}
              poster={activeStoryModal.posterUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/95 via-transparent to-black/60"></div>

            {/* Top Bar with Progress, Avatar, and Sound */}
            <div className="relative z-20 pt-4 px-4 space-y-3">
              <div className="flex gap-1">
                <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#fbb034] w-2/3 animate-pulse"></div>
                </div>
                <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
                <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fbb034] text-slate-950 font-black flex items-center justify-center text-sm ring-2 ring-white/50">
                    {activeStoryModal.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight leading-none">
                      {activeStoryModal.name}
                    </h4>
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium mt-0.5">
                      <span>{activeStoryModal.flagEmoji}</span>
                      <span>{activeStoryModal.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                  </button>

                  <a
                    href={activeStoryModal.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white"
                    title="Watch on TikTok"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Floating Actions (Like, Comment, Share) */}
            <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
              <button
                onClick={() => handleToggleLike(activeStoryModal.id)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110 ${likedStories[activeStoryModal.id] ? 'text-red-500' : 'text-white'}`}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                </div>
                <span className="text-[11px] font-bold mt-1">{activeStoryModal.likesCount}</span>
              </button>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                </div>
                <span className="text-[11px] font-bold mt-1">428</span>
              </div>
            </div>

            {/* Bottom Overlay Details */}
            <div className="relative z-20 p-5 pr-14 text-white bg-gradient-to-t from-black via-black/80 to-transparent">
              <span className="px-2 py-0.5 rounded-full bg-[#fbb034] text-slate-950 text-[10px] font-black uppercase tracking-wider inline-block mb-1">
                {activeStoryModal.categoryBadge}
              </span>
              <p className="text-xs font-bold text-[#fbb034] mb-1">
                {activeStoryModal.universityAndCourse}
              </p>
              <p className="text-xs text-slate-200 font-normal leading-relaxed line-clamp-3">
                "{activeStoryModal.quote}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentStoriesReels;
