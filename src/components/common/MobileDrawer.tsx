/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Mobile Navigation Drawer with Accordions, Search, and Social Links
 */

import React, { useState } from 'react';
import { mockServices } from '../../data/mockDatabase.ts';
import { UserRole } from '../../types/index.ts';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, payload?: any) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onRoleChange?: (role: UserRole) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSearch,
  onRoleChange
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null); // Collapsed by default
  const [portalTab, setPortalTab] = useState<'signin' | 'signup'>('signin');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLiveSearch, setShowLiveSearch] = useState(false);

  const toggleSection = (sec: string) => {
    setOpenSection(openSection === sec ? null : sec);
  };

  const handleNav = (view: string, payload?: any) => {
    onNavigate(view, payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white dark:bg-[#0B1329] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto no-scrollbar border-l border-slate-200 dark:border-slate-800 transition-transform duration-300">
        <div className="p-6 flex flex-col min-h-full justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800/80 mb-5">
              <button
                onClick={() => handleNav('home')}
                className="flex items-center gap-1.5 focus:outline-none group cursor-pointer"
              >
                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                  GEES
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#fbb034] animate-pulse"></span>
              </button>

              <div className="flex items-center gap-2">
                {/* Search Toggle */}
                <button
                  onClick={() => setShowLiveSearch(!showLiveSearch)}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 transition-colors"
                  title="Search"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={onToggleTheme}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-amber-500 shadow-xs hover:bg-slate-50 transition-colors"
                  title={isDark ? "Light Mode" : "Dark Mode"}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>

                {/* Circular Dark Close Button */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-xs"
                  title="Close Menu"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Live Search Drawer Input */}
            {showLiveSearch && (
              <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 animate-fadeIn">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined text-blue-600 text-[20px] mr-2">search</span>
                  <input
                    type="text"
                    placeholder="Search universities, courses, visas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar">
                  {['Universities', 'Visa', 'Courses', 'Admission', 'Scholarships'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        setSearchQuery(chip);
                        handleNav('search', chip);
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 whitespace-nowrap"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Navigation List */}
            <nav className="space-y-3 font-sans">
              {/* Home */}
              <div>
                <button
                  onClick={() => handleNav('home')}
                  className="w-full text-left py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors"
                >
                  Home
                </button>
              </div>

              {/* Countries Accordion */}
              <div>
                <button
                  onClick={() => toggleSection('countries')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Countries</span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSection === 'countries' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openSection === 'countries' && (
                  <div className="pl-3 pt-2.5 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-3.5 max-h-[380px] sm:max-h-[440px] overflow-y-auto no-scrollbar">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#fbb034]">star</span>
                        <span>Popular Destinations</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {['🇦🇺 Australia', '🇨🇦 Canada', '🇬🇧 United Kingdom', '🇺🇸 USA', '🇲🇾 Malaysia'].map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleNav('destinations', c.split(' ').slice(1).join(' '))}
                            className="text-left px-2.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium active:scale-[0.98] transition-all cursor-pointer truncate"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-blue-500">public</span>
                        <span>Europe</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {['🇩🇪 Germany', '🇮🇪 Ireland', '🇸🇪 Sweden', '🇫🇷 France', '🇳🇱 Netherlands', '🇮🇹 Italy', '🇫🇮 Finland', '🇧🇪 Belgium', '🇨🇾 Cyprus', '🇬🇷 Greece'].map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleNav('destinations', c.split(' ').slice(1).join(' '))}
                            className="text-left px-2.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium active:scale-[0.98] transition-all cursor-pointer truncate"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-emerald-500">travel_explore</span>
                        <span>Asia & More</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {['🇨🇳 China', '🇯🇵 Japan', '🇰🇷 South Korea', '🇦🇪 UAE', '🇳🇿 New Zealand'].map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleNav('destinations', c.split(' ').slice(1).join(' '))}
                            className="text-left px-2.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium active:scale-[0.98] transition-all cursor-pointer truncate"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleNav('destinations')}
                      className="w-full text-center py-2 px-3 mt-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#fbb034] hover:text-slate-950 text-slate-900 dark:text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore All Destinations</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Universities */}
              <div>
                <button
                  onClick={() => handleNav('universities')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <span>Universities</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#f59e0b] border border-amber-200/80">
                      TOP RANKED
                    </span>
                  </span>
                  <span className="material-symbols-outlined text-slate-300 text-[20px]">chevron_right</span>
                </button>
              </div>

              {/* Courses */}
              <div>
                <button
                  onClick={() => handleNav('courses')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Courses</span>
                  <span className="material-symbols-outlined text-slate-300 text-[20px]">chevron_right</span>
                </button>
              </div>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => toggleSection('services')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Services</span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSection === 'services' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openSection === 'services' && (
                  <div className="pl-3 pt-2 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-4 max-h-80 overflow-y-auto no-scrollbar">
                    {[
                      {
                        category: 'Admissions',
                        icon: 'school',
                        items: mockServices.filter(s => s.category === 'Admissions')
                      },
                      {
                        category: 'Immigration & Visas',
                        icon: 'badge',
                        items: mockServices.filter(s => s.category === 'Immigration')
                      },
                      {
                        category: 'Arrival & Housing',
                        icon: 'hotel',
                        items: mockServices.filter(s => s.category === 'Arrival')
                      },
                      {
                        category: 'Living & Travel',
                        icon: 'luggage',
                        items: mockServices.filter(s => s.category === 'Living')
                      },
                      {
                        category: 'Tests & Partners',
                        icon: 'psychology',
                        items: mockServices.filter(s => s.category === 'Tests & Partners')
                      }
                    ].map((group) => (
                      <div key={group.category} className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                          <span className="material-symbols-outlined text-[14px] text-[#fbb034]">{group.icon}</span>
                          <span>{group.category}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          {group.items.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => handleNav('services', s.slug)}
                              className="text-left px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 font-medium active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 truncate"
                            >
                              <span className="material-symbols-outlined text-[15px] text-slate-400 shrink-0">
                                {s.iconName || 'arrow_right'}
                              </span>
                              <span className="truncate">{s.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => handleNav('services')}
                      className="w-full text-center py-2 px-3 mt-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#fbb034] hover:text-slate-950 text-slate-900 dark:text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore All Services</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Blog */}
              <div>
                <button
                  onClick={() => handleNav('blog')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Blog</span>
                  <span className="material-symbols-outlined text-slate-300 text-[20px]">chevron_right</span>
                </button>
              </div>

              {/* Portal Accordion */}
              <div>
                <button
                  onClick={() => toggleSection('portal')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Portal</span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSection === 'portal' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openSection === 'portal' && (
                  <div className="pl-3 pt-2.5 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-3">
                    {/* Sign In / Sign Up Segmented Pill Switcher */}
                    <div className="relative flex items-center p-1 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl shadow-inner select-none">
                      <div
                        className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm transition-transform duration-300 ease-out"
                        style={{
                          transform: portalTab === 'signin' ? 'translateX(0%)' : 'translateX(100%)'
                        }}
                      />
                      <button
                        onClick={() => setPortalTab('signin')}
                        className={`relative flex-1 py-1.5 px-2 flex items-center justify-center gap-1.5 text-center text-xs font-bold transition-all duration-200 z-10 cursor-pointer tracking-wide rounded-lg ${
                          portalTab === 'signin' ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                        }`}
                        type="button"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Sign In</span>
                      </button>
                      <button
                        onClick={() => setPortalTab('signup')}
                        className={`relative flex-1 py-1.5 px-2 flex items-center justify-center gap-1.5 text-center text-xs font-bold transition-all duration-200 z-10 cursor-pointer tracking-wide rounded-lg ${
                          portalTab === 'signup' ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                        }`}
                        type="button"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>Sign Up</span>
                      </button>
                    </div>

                    {/* Tab 1: Sign In Buttons */}
                    {portalTab === 'signin' && (
                      <div className="grid grid-cols-2 gap-1.5 text-xs animate-fadeIn">
                        {/* Student Login */}
                        <button
                          onClick={() => {
                            onRoleChange?.('student');
                            handleNav('student-portal');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">school</span>
                          </div>
                          <span className="font-semibold text-blue-950 dark:text-blue-100 text-xs truncate">
                            Student Login
                          </span>
                        </button>

                        {/* Agent Login */}
                        <button
                          onClick={() => {
                            onRoleChange?.('agent');
                            handleNav('agent-portal');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">handshake</span>
                          </div>
                          <span className="font-semibold text-emerald-950 dark:text-emerald-100 text-xs truncate">
                            Agent Login
                          </span>
                        </button>

                        {/* Staff Login */}
                        <button
                          onClick={() => {
                            onRoleChange?.('counselor');
                            handleNav('crm');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/40 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/40 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">badge</span>
                          </div>
                          <span className="font-semibold text-indigo-950 dark:text-indigo-100 text-xs truncate">
                            Staff Login
                          </span>
                        </button>

                        {/* University Login */}
                        <button
                          onClick={() => {
                            handleNav('universities');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 hover:bg-amber-100/80 dark:hover:bg-amber-900/40 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">account_balance</span>
                          </div>
                          <span className="font-semibold text-amber-950 dark:text-amber-100 text-xs truncate">
                            University
                          </span>
                        </button>

                        {/* Admin Login */}
                        <button
                          onClick={() => {
                            onRoleChange?.('admin');
                            handleNav('analytics');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/40 hover:bg-sky-100/80 dark:hover:bg-sky-900/40 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 col-span-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
                          </div>
                          <span className="font-semibold text-sky-950 dark:text-sky-100 text-xs truncate">
                            Admin & Analytics
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Tab 2: Sign Up Buttons */}
                    {portalTab === 'signup' && (
                      <div className="grid grid-cols-2 gap-1.5 text-xs animate-fadeIn">
                        {/* Student Sign Up */}
                        <button
                          onClick={() => {
                            handleNav('apply');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/40 hover:border-blue-500 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">person_add</span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                              Student
                            </span>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Join free</p>
                          </div>
                        </button>

                        {/* Agent Sign Up */}
                        <button
                          onClick={() => {
                            handleNav('agent-portal');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 hover:border-emerald-500 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">group_add</span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                              Agent
                            </span>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Partner</p>
                          </div>
                        </button>

                        {/* Staff Sign Up */}
                        <button
                          onClick={() => {
                            handleNav('crm');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/40 hover:border-indigo-500 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">contact_emergency</span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                              Staff
                            </span>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Onboarding</p>
                          </div>
                        </button>

                        {/* University Sign Up */}
                        <button
                          onClick={() => {
                            handleNav('universities');
                          }}
                          className="text-left px-2.5 py-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 hover:border-amber-500 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[15px]">domain_add</span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                              University
                            </span>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Rep Portal</p>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Accordion */}
              <div>
                <button
                  onClick={() => toggleSection('contact')}
                  className="w-full flex items-center justify-between py-2 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Contact</span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSection === 'contact' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openSection === 'contact' && (
                  <div className="pl-3 pt-2.5 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-4 max-h-[380px] sm:max-h-[440px] overflow-y-auto no-scrollbar text-xs">
                    {/* Category 1: Contact & Support */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                        <span className="material-symbols-outlined text-[14px] text-[#fbb034]">contact_support</span>
                        <span>Contact & Support</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          { icon: '📞', label: 'Contact Us', action: () => handleNav('apply') },
                          { icon: '🌐', label: 'Language Centers', action: () => handleNav('apply') },
                          { icon: '🧭', label: 'Application Tracker', action: () => { onRoleChange?.('student'); handleNav('student-portal'); } },
                          { icon: '📖', label: 'Students Guide', action: () => handleNav('apply') },
                          { icon: '📁', label: 'Resources', action: () => handleNav('courses') },
                          { icon: '❓', label: 'FAQs', action: () => handleNav('apply') }
                        ].map((btn, i) => (
                          <button
                            key={i}
                            onClick={btn.action}
                            className="text-left px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 truncate"
                          >
                            <span className="text-sm leading-none shrink-0">{btn.icon}</span>
                            <span className="truncate">{btn.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category 2: About GEES */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                        <span className="material-symbols-outlined text-[14px] text-[#fbb034]">info</span>
                        <span>About Us</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          { icon: 'ℹ️', label: 'About Us', action: () => handleNav('home') },
                          { icon: '✉️', label: 'Director Message', action: () => handleNav('home') },
                          { icon: '🏆', label: 'Success Stories', action: () => { handleNav('home'); setTimeout(() => { window.scrollTo({ top: 1800, behavior: 'smooth' }); }, 100); } }
                        ].map((btn, i) => (
                          <button
                            key={i}
                            onClick={btn.action}
                            className="text-left px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 truncate"
                          >
                            <span className="text-sm leading-none shrink-0">{btn.icon}</span>
                            <span className="truncate">{btn.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category 3: News & Updates */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                        <span className="material-symbols-outlined text-[14px] text-[#fbb034]">newspaper</span>
                        <span>News & Updates</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          { icon: '🗓️', label: 'Events', action: () => handleNav('blog') },
                          { icon: '📰', label: 'News & Press', action: () => handleNav('blog') },
                          { icon: '✍️', label: 'Blog & Articles', action: () => handleNav('blog') }
                        ].map((btn, i) => (
                          <button
                            key={i}
                            onClick={btn.action}
                            className="text-left px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 truncate"
                          >
                            <span className="text-sm leading-none shrink-0">{btn.icon}</span>
                            <span className="truncate">{btn.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Drawer Footer (FOLLOW US, Phone, Socials, Apply Now) */}
          <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                FOLLOW US:
              </span>
              <a
                href="tel:+8801805529578"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="tracking-tight font-medium">+880 1805–529578</span>
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex items-center justify-between gap-1 sm:gap-1.5 mb-4 flex-nowrap">
              <a
                href="https://www.facebook.com/globaleduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all text-xs font-bold shrink-0"
                aria-label="Facebook"
                title="Facebook Page"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </a>
              <a
                href="https://www.instagram.com/global.eduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all shrink-0"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/globaleduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all shrink-0"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
              <a
                href="https://www.tiktok.com/@globaleduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all shrink-0"
                aria-label="TikTok"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
              </a>
              <a
                href="https://wa.me/601112376224"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-all shrink-0"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
              </a>
              <a
                href="https://www.facebook.com/groups/bsim.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-500 transition-all shrink-0"
                aria-label="Facebook Group"
                title="Facebook Group (BSIM Official)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.34-1.63.92-2.24C9.64 13.9 9.3 13 9 13z"></path></svg>
              </a>
              <a
                href="https://www.facebook.com/messages/t/globaleduexpert/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:border-blue-400 transition-all shrink-0"
                aria-label="Messenger"
                title="Facebook Messenger"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.093.303 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z"></path></svg>
              </a>
            </div>

            {/* Apply Now Button */}
            <button
              onClick={() => handleNav('apply')}
              className="w-full py-3 px-5 rounded-full bg-[#fbb034] hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Apply Now</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
