/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Dynamic University & Course Explorer with /universities/[slug] details
 */

import React, { useState } from 'react';
import { mockUniversities, mockCourses } from '../../data/mockDatabase.ts';
import { University } from '../../types/index.ts';

interface UniversityExplorerViewProps {
  initialSlug?: string;
  onApply: (uniName: string) => void;
}

export const UniversityExplorerView: React.FC<UniversityExplorerViewProps> = ({
  initialSlug,
  onApply
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniSlug, setSelectedUniSlug] = useState<string | null>(initialSlug || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'campuses' | 'admissions'>('overview');

  const filteredUnis = mockUniversities.filter(u => {
    const matchesCountry = selectedCountry === 'all' || u.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.popularPrograms.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  const activeUniversity = selectedUniSlug
    ? mockUniversities.find(u => u.slug === selectedUniSlug)
    : null;

  const universityCourses = activeUniversity
    ? mockCourses.filter(c => c.universityId === activeUniversity.id)
    : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Global Database & Partner Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore 500+ Partner Universities & Campuses
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse verified entry requirements, tuition fees, and scholarship criteria with direct application representation.
          </p>
        </div>

        {selectedUniSlug && (
          <button
            onClick={() => setSelectedUniSlug(null)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to All Universities</span>
          </button>
        )}
      </div>

      {/* VIEW A: Single University Profile [slug] */}
      {activeUniversity ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-fadeIn">
          {/* Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={activeUniversity.bannerUrl}
              alt={activeUniversity.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{activeUniversity.flagEmoji}</span>
                  <span className="px-3 py-0.5 rounded-full bg-blue-600 text-white font-bold text-xs uppercase">
                    World Rank #{activeUniversity.rankingWorld}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
                    {activeUniversity.country}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {activeUniversity.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{activeUniversity.tagline}</p>
              </div>

              <button
                onClick={() => onApply(activeUniversity.name)}
                className="px-6 py-3 rounded-full bg-[#fbb034] hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
              >
                Apply to this University →
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 sm:px-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Highlights' },
              { id: 'programs', label: `Available Programs (${universityCourses.length || 3})` },
              { id: 'campuses', label: `Campuses (${activeUniversity.campuses.length})` },
              { id: 'admissions', label: 'Entry Requirements & Fees' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {activeUniversity.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Avg Tuition</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      ${activeUniversity.avgTuitionAnnualUSD.toLocaleString()} / yr
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Min IELTS</span>
                    <span className="text-lg font-black text-blue-600">
                      Band {activeUniversity.minIeltsScore}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Acceptance Rate</span>
                    <span className="text-lg font-black text-emerald-600">
                      {activeUniversity.acceptanceRatePct}%
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Intakes</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {activeUniversity.intakes.join(' & ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Popular Faculties & Disciplines</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeUniversity.popularPrograms.map((prog, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="space-y-4">
                {universityCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-500 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase text-slate-700 dark:text-slate-300">
                          {c.level}
                        </span>
                        <span className="text-xs text-slate-400">• Duration: {c.durationMonths} Months</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {c.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{c.department}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-base font-black text-slate-900 dark:text-white block">
                        {c.tuitionFeeLocal}
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold block mb-2">
                        IELTS Req: {c.ieltsRequirement}
                      </span>
                      <button
                        onClick={() => onApply(`${activeUniversity.name} - ${c.title}`)}
                        className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                      >
                        Apply for Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'campuses' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeUniversity.campuses.map((campus) => (
                  <div key={campus.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="material-symbols-outlined text-blue-600 text-2xl mb-1">location_city</span>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{campus.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{campus.city}, {campus.stateOrProvince ? `${campus.stateOrProvince}, ` : ''}{campus.country}</p>
                    {campus.isMainCampus && (
                      <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Main Research Campus
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'admissions' && (
              <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1">Scholarship Consideration</h4>
                  <p>International applicants through GEES are automatically considered for merit entrance scholarships ranging up to CAD $10,000.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <strong className="text-slate-900 dark:text-white block">Undergraduate Requirements:</strong>
                  <p>HSC / A-Levels with minimum 65-75% overall average. IELTS Academic 6.5 with no band less than 6.0.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* VIEW B: Universities Faceted Directory */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
              <input
                type="text"
                placeholder="Search by university name, program or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {['all', 'Canada', 'Australia', 'United Kingdom', 'Germany', 'Malaysia'].map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCountry === c
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {c === 'all' ? 'All Countries' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Universities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnis.map((uni) => (
              <div
                key={uni.id}
                onClick={() => setSelectedUniSlug(uni.slug)}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img src={uni.bannerUrl} alt={uni.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-2xl drop-shadow">{uni.flagEmoji}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                        Rank #{uni.rankingWorld}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold text-amber-300">{uni.city}, {uni.country}</span>
                      <h3 className="text-lg font-bold leading-snug line-clamp-1">{uni.name}</h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {uni.tagline}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Tuition</span>
                        <strong className="text-slate-900 dark:text-white">${uni.avgTuitionAnnualUSD.toLocaleString()} / yr</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Min IELTS</span>
                        <strong className="text-blue-600">Band {uni.minIeltsScore}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>View Details & Programs</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
