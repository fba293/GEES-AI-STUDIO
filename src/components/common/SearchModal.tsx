/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Global Search & Intelligent Suggestions Modal
 * Features live text highlighting for universities, courses, and services.
 */

import React, { useState, useEffect } from 'react';
import { mockUniversities, mockCourses, mockDestinations, mockServices } from '../../data/mockDatabase.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: string, id: string, name: string) => void;
}

// Helper to highlight matching characters/words in search results
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>;
  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-300 dark:bg-amber-500/40 text-slate-900 dark:text-amber-200 font-bold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedUnis = q
    ? mockUniversities.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.country.toLowerCase().includes(q) || 
        u.city.toLowerCase().includes(q)
      )
    : mockUniversities.slice(0, 4);

  const matchedCourses = q
    ? mockCourses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.department.toLowerCase().includes(q) || 
        c.universityName.toLowerCase().includes(q)
      )
    : mockCourses.slice(0, 3);

  const matchedServices = q
    ? mockServices.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.desc.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    : mockServices.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-600 text-[26px]">search</span>
          <input
            type="text"
            className="flex-1 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            placeholder="Search 800+ universities, courses, countries, or scholarships..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          {/* Quick Suggestion Chips */}
          {!query && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Master in Data Science',
                  'Canada Student Visa',
                  'Monash University',
                  'King’s University College',
                  'Australia Subclass 500',
                  'Full Scholarships 2027'
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Universities Results with Highlighting */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Universities ({matchedUnis.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {matchedUnis.map((uni) => (
                <button
                  key={uni.id}
                  onClick={() => {
                    onSelectResult('university', uni.id, uni.name);
                    onClose();
                  }}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition-all group cursor-pointer"
                >
                  <span className="text-2xl">{uni.flagEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                      <HighlightText text={uni.name} highlight={query} />
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      <HighlightText text={`${uni.city}, ${uni.country}`} highlight={query} /> • World Rank #{uni.rankingWorld}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-[18px]">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Courses Results with Highlighting */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Programs & Degrees ({matchedCourses.length})
            </span>
            <div className="space-y-1.5">
              {matchedCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectResult('course', c.id, c.title);
                    onClose();
                  }}
                  className="w-full text-left flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition-all group cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                      <HighlightText text={c.title} highlight={query} />
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      <HighlightText text={c.universityName} highlight={query} /> • {c.level} • {c.durationMonths} Months
                    </p>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 shrink-0 ml-3">
                    {c.tuitionFeeLocal || `$${c.annualFeeUSD.toLocaleString()}/yr`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Services Results with Highlighting */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              GEES Expert Services ({matchedServices.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {matchedServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectResult('service', s.id, s.title);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">{s.iconName || 'school'}</span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                      <HighlightText text={s.title} highlight={query} />
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    <HighlightText text={s.desc} highlight={query} />
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
