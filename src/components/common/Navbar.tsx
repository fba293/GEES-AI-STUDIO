/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Primary Navigation Header with Mega-Menus & Portal Switcher
 */

import React, { useState, useEffect, useRef } from 'react';
import { UserRole } from '../../types/index.ts';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeRole,
  onRoleChange,
  onOpenMobileMenu,
  onOpenSearch,
  isDark,
  onToggleTheme
}) => {
  const [portalTab, setPortalTab] = useState<'signin' | 'signup'>('signin');
  const [portalOpen, setPortalOpen] = useState(false);
  const portalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePortalEnter = () => {
    if (portalTimeoutRef.current) clearTimeout(portalTimeoutRef.current);
    setPortalOpen(true);
  };

  const handlePortalLeave = () => {
    portalTimeoutRef.current = setTimeout(() => {
      setPortalOpen(false);
    }, 220);
  };

  return (
    <>
      {/* Top Multi-Portal Bar for Evaluator & Staff Switching */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800 z-50 relative select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">GEES Global Education Ecosystem</span>
            <span className="hidden md:inline-block text-slate-500">•</span>
            <span className="hidden md:inline-block text-slate-400">Dhaka · London · Kuala Lumpur · Melbourne</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">
              App Switcher:
            </span>
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentView === 'home'
                  ? 'bg-[#fbb034] text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Public Website
            </button>
            <button
              onClick={() => {
                onRoleChange('student');
                onNavigate('student-portal');
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentView === 'student-portal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => {
                onRoleChange('counselor');
                onNavigate('crm');
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentView === 'crm'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Counselor CRM
            </button>
            <button
              onClick={() => onNavigate('universities')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentView === 'universities'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Unis & Courses
            </button>
            <button
              onClick={() => {
                onRoleChange('agent');
                onNavigate('agent-portal');
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentView === 'agent-portal'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Agent B2B
            </button>
            <button
              onClick={() => {
                onRoleChange('admin');
                onNavigate('analytics');
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentView === 'analytics'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Management & AI
            </button>
          </div>
        </div>
      </div>

      {/* Main Floating Glass Header Navbar */}
      <header className="sticky top-0 left-0 right-0 w-full z-40 px-4 sm:px-6 lg:px-8 py-3 bg-white/90 dark:bg-[#070b19]/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 focus:outline-none group cursor-pointer shrink-0"
          >
            <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              GEES
            </span>
            <span className="w-2 h-2 rounded-full bg-[#fbb034] animate-pulse"></span>
          </button>

          {/* Desktop Mega Navigation */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {/* Countries Mega-Menu */}
            <div className="relative group cursor-pointer py-4">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400"
              >
                <span>Countries</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">
                  expand_more
                </span>
              </button>
              <div className="absolute top-[calc(100%-4px)] -left-20 w-[680px] bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-auto z-50">
                <div className="grid grid-cols-3 gap-6">
                  {/* Popular */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">star</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Popular</span>
                    </div>
                    <ul className="space-y-1">
                      {[
                        { flag: '🇦🇺', name: 'Australia' },
                        { flag: '🇨🇦', name: 'Canada' },
                        { flag: '🇬🇧', name: 'United Kingdom' },
                        { flag: '🇺🇸', name: 'USA' },
                        { flag: '🇲🇾', name: 'Malaysia' }
                      ].map((item, i) => (
                        <li key={i}>
                          <button
                            onClick={() => onNavigate('destinations', item.name)}
                            className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-xs"
                          >
                            <span className="text-base">{item.flag}</span>
                            <span>{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Europe */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">euro_symbol</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Europe</span>
                    </div>
                    <ul className="space-y-1">
                      {[
                        { flag: '🇩🇪', name: 'Germany' },
                        { flag: '🇮🇪', name: 'Ireland' },
                        { flag: '🇸🇪', name: 'Sweden' },
                        { flag: '🇫🇷', name: 'France' },
                        { flag: '🇳🇱', name: 'Netherlands' }
                      ].map((item, i) => (
                        <li key={i}>
                          <button
                            onClick={() => onNavigate('destinations', item.name)}
                            className="w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-xs"
                          >
                            <span className="text-base">{item.flag}</span>
                            <span>{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Asia & More */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">travel_explore</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Asia & More</span>
                    </div>
                    <ul className="space-y-1">
                      {[
                        { flag: '🇲🇺', name: 'Mauritius' },
                        { flag: '🇨🇳', name: 'China' },
                        { flag: '🇯🇵', name: 'Japan' },
                        { flag: '🇹🇷', name: 'Turkey' },
                        { flag: '🇳🇿', name: 'New Zealand' }
                      ].map((item, i) => (
                        <li key={i}>
                          <button
                            onClick={() => onNavigate('destinations', item.name)}
                            className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-xs"
                          >
                            <span className="text-base">{item.flag}</span>
                            <span>{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Explore 50+ study destinations worldwide.
                  </span>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline"
                  >
                    <span>View All Countries</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Universities */}
            <button
              onClick={() => onNavigate('universities')}
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold"
            >
              <span>Universities</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#f59e0b] border border-amber-200/80 dark:border-amber-800/50">
                Top Ranked
              </span>
            </button>

            {/* Courses */}
            <button
              onClick={() => onNavigate('courses')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold"
            >
              Courses
            </button>

            {/* Services Mega-Menu */}
            <div className="relative group cursor-pointer py-4">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400"
              >
                <span>Services</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">
                  expand_more
                </span>
              </button>
              <div className="absolute top-[calc(100%-4px)] -left-60 w-[820px] bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-auto z-50">
                <div className="grid grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Admissions</span>
                    </div>
                    <ul className="space-y-1">
                      <li><button onClick={() => onNavigate('services', 'admission-support')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🎓 Admission Support</button></li>
                      <li><button onClick={() => onNavigate('services', 'school-admission')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🏫 School Admission</button></li>
                      <li><button onClick={() => onNavigate('services', 'student-referral')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🤝 Referral Rewards</button></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Immigration</span>
                    </div>
                    <ul className="space-y-1">
                      <li><button onClick={() => onNavigate('services', 'student-visa-assistance')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🛂 Student Visa</button></li>
                      <li><button onClick={() => onNavigate('services', 'dependent-visa')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">👨‍👩‍👧 Dependent</button></li>
                      <li><button onClick={() => onNavigate('services', 'tourist-visa')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">✈️ Tourist Visa</button></li>
                      <li><button onClick={() => onNavigate('services', 'mm2h-program')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🏡 MM2H</button></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Arrival</span>
                    </div>
                    <ul className="space-y-1">
                      <li><button onClick={() => onNavigate('services', 'student-accommodation')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🛏️ Accommodation</button></li>
                      <li><button onClick={() => onNavigate('services', 'health-insurance')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">❤️ Insurance</button></li>
                      <li><button onClick={() => onNavigate('services', 'flight-ticketing')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🎫 Flight Booking</button></li>
                      <li><button onClick={() => onNavigate('services', 'airport-pickup')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🚕 Airport Pickup</button></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Living</span>
                    </div>
                    <ul className="space-y-1">
                      <li><button onClick={() => onNavigate('services', 'money-transfer')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">💸 Money Wire</button></li>
                      <li><button onClick={() => onNavigate('services', 'airbnb-short-stay')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🏠 Airbnb Stay</button></li>
                      <li><button onClick={() => onNavigate('services', 'courier-services')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">📦 Express Courier</button></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prep & B2B</span>
                    </div>
                    <ul className="space-y-1">
                      <li><button onClick={() => onNavigate('services', 'ielts-preparation')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🎙️ IELTS Prep</button></li>
                      <li><button onClick={() => onNavigate('services', 'pte-preparation')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🗣️ PTE Prep</button></li>
                      <li><button onClick={() => onNavigate('services', 'b2b-partnership')} className="w-full text-left text-xs py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600">🏢 B2B Partners</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog */}
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold"
            >
              Blog
            </button>

            {/* Contact Dropdown */}
            <div className="relative group cursor-pointer py-4">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400"
              >
                <span>Contact</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">
                  expand_more
                </span>
              </button>
              <div className="absolute top-[calc(100%-4px)] right-0 w-[580px] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-3 gap-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-auto">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">Contact</span>
                  <ul className="space-y-1 text-xs">
                    <li><button onClick={() => onNavigate('contact')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">📞 Contact Us</button></li>
                    <li><button onClick={() => onNavigate('contact', 'language-centers')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">🌐 Language Centers</button></li>
                    <li><button onClick={() => onNavigate('student-portal')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">🧭 Application Tracker</button></li>
                    <li><button onClick={() => onNavigate('contact', 'faqs')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">❓ FAQs</button></li>
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">About Us</span>
                  <ul className="space-y-1 text-xs">
                    <li><button onClick={() => onNavigate('about')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">ℹ️ About Us</button></li>
                    <li><button onClick={() => onNavigate('counselors')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">✉️ Director's Message</button></li>
                    <li><button onClick={() => onNavigate('success-stories')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">🏆 Success Stories</button></li>
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">News & Updates</span>
                  <ul className="space-y-1 text-xs">
                    <li><button onClick={() => onNavigate('blog')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">🗓️ Upcoming Events</button></li>
                    <li><button onClick={() => onNavigate('blog')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">📰 Education News</button></li>
                    <li><button onClick={() => onNavigate('blog')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600">🎓 Scholarships 2027</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
              title="Search Universities & Programs"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* User Account / Portal Dropdown (Matching Screenshot 4) */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={handlePortalEnter}
              onMouseLeave={handlePortalLeave}
            >
              <button
                onClick={() => setPortalOpen(!portalOpen)}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                title="Account Portals"
              >
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
              </button>

              {/* Sliding Pill Tabbed Dropdown */}
              <div
                className={`absolute top-[calc(100%+8px)] right-0 bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 border border-slate-100 dark:border-slate-800 p-3.5 transition-all duration-200 origin-top-right z-50 w-72 ${
                  portalOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none invisible'
                }`}
              >
                {/* Sliding Tabs */}
                <div className="relative flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 select-none">
                  <div
                    className="absolute top-1 bottom-1 rounded-lg bg-blue-600 shadow-md transition-transform duration-300 ease-out"
                    style={{
                      left: '4px',
                      width: 'calc(50% - 4px)',
                      transform: portalTab === 'signin' ? 'translateX(0%)' : 'translateX(100%)'
                    }}
                  ></div>
                  <button
                    onClick={() => setPortalTab('signin')}
                    className={`relative flex-1 py-1.5 text-xs font-bold text-center z-10 transition-colors ${
                      portalTab === 'signin' ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setPortalTab('signup')}
                    className={`relative flex-1 py-1.5 text-xs font-bold text-center z-10 transition-colors ${
                      portalTab === 'signup' ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Tab 1: Sign In Portals */}
                {portalTab === 'signin' ? (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => {
                        onRoleChange('student');
                        onNavigate('student-portal');
                        setPortalOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-950 dark:text-blue-100 text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-blue-600 text-[18px]">school</span>
                      <span className="flex-1">Student Login</span>
                      <span className="text-blue-600">→</span>
                    </button>
                    <button
                      onClick={() => {
                        onRoleChange('agent');
                        onNavigate('agent-portal');
                        setPortalOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-950 dark:text-emerald-100 text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-emerald-600 text-[18px]">handshake</span>
                      <span className="flex-1">Agent Login</span>
                      <span className="text-emerald-600">→</span>
                    </button>
                    <button
                      onClick={() => {
                        onRoleChange('counselor');
                        onNavigate('crm');
                        setPortalOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-950 dark:text-indigo-100 text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-indigo-600 text-[18px]">badge</span>
                      <span className="flex-1">Counselor / Staff</span>
                      <span className="text-indigo-600">→</span>
                    </button>
                    <button
                      onClick={() => {
                        onRoleChange('university_rep');
                        onNavigate('universities');
                        setPortalOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-950 dark:text-amber-100 text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-amber-600 text-[18px]">account_balance</span>
                      <span className="flex-1">University Partner</span>
                      <span className="text-amber-600">→</span>
                    </button>
                    <button
                      onClick={() => {
                        onRoleChange('admin');
                        onNavigate('analytics');
                        setPortalOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-950 dark:text-rose-100 text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-rose-600 text-[18px]">verified_user</span>
                      <span className="flex-1">Admin & Management</span>
                      <span className="text-rose-600">→</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button
                      onClick={() => {
                        onNavigate('apply');
                        setPortalOpen(false);
                      }}
                      className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-left hover:bg-blue-100"
                    >
                      <span className="font-bold block text-blue-900 dark:text-blue-200">Student</span>
                      <span className="text-[10px] text-slate-500">Free Account</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('agent-portal');
                        setPortalOpen(false);
                      }}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100"
                    >
                      <span className="font-bold block text-slate-900 dark:text-white">Agent</span>
                      <span className="text-[10px] text-slate-500">Accreditation</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('services', 'b2b-partnership');
                        setPortalOpen(false);
                      }}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100"
                    >
                      <span className="font-bold block text-slate-900 dark:text-white">University</span>
                      <span className="text-[10px] text-slate-500">Tie-up Portal</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('counselors');
                        setPortalOpen(false);
                      }}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100"
                    >
                      <span className="font-bold block text-slate-900 dark:text-white">Counselor</span>
                      <span className="text-[10px] text-slate-500">Certified Mentor</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Apply Now Primary CTA */}
            <button
              onClick={() => onNavigate('apply')}
              className="h-10 sm:h-11 px-5 sm:px-6 rounded-full bg-[#fbb034] hover:bg-[#f59e0b] active:scale-95 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-blue-700 shrink-0"></span>
              <span>Apply</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Staggered Hamburger Navigation Trigger */}
            <button
              onClick={onOpenMobileMenu}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer shrink-0"
              title="Open Navigation Menu"
              aria-label="Navigation Menu"
            >
              <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="10" y1="6.5" x2="20" y2="6.5"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="13" y1="17.5" x2="20" y2="17.5"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
