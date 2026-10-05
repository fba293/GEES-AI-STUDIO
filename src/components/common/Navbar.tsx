/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Universal Floating Pill Header
 * Replaces the header with the universal floating pill header from index.html:
 * - Fixed floating rounded-full navbar with backdrop blur and border shadow
 * - "GEES" Serif typography logo with golden accent dot
 * - Mega-menus: Countries (Popular, Europe, Asia & More), Services (Admissions, Immigration, Arrival, Living, Prep & B2B), and Contact
 * - Direct links: Universities & Courses
 * - Action buttons: Search trigger, Light/Dark theme toggle, Portals popover with sliding Sign In / Sign Up tabs, Apply CTA, and Mobile menu toggle
 */

import React, { useState, useRef } from 'react';
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
  const portalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <header className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5">
      <div className="pointer-events-auto max-w-7xl mx-auto bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-800 shadow-xl px-6 lg:px-8 h-20 flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group shrink-0 focus:outline-none cursor-pointer"
        >
          <span
            className="text-[32px] font-extrabold tracking-tight text-slate-900 dark:text-white"
            style={{ fontFamily: '"ITC Benguiat", "Benguiat", serif', fontWeight: 700 }}
          >
            GEES
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></span>
        </button>

        {/* Universal Desktop Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-7 lg:gap-8 text-sm font-semibold text-slate-900 dark:text-slate-200">
          {/* 1. Countries Mega-Menu */}
          <div className="relative group cursor-pointer py-6">
            <button
              type="button"
              className={`flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer ${
                currentView === 'destinations' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              <span>Countries</span>
              <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>

            {/* Countries Mega Dropdown Panel */}
            <div className="absolute top-[calc(100%-6px)] -left-20 w-[680px] bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="grid grid-cols-3 gap-6">
                {/* Popular */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">star</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Popular
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { flag: '🇦🇺', name: 'Australia' },
                      { flag: '🇨🇦', name: 'Canada' },
                      { flag: '🇬🇧', name: 'United Kingdom' },
                      { flag: '🇺🇸', name: 'USA' },
                      { flag: '🇲🇾', name: 'Malaysia' }
                    ].map((c) => (
                      <li key={c.name}>
                        <button
                          onClick={() => onNavigate('destinations', c.name)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-lg leading-none">{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Europe */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">euro_symbol</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Europe
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {[
                      { flag: '🇮🇹', name: 'Italy' },
                      { flag: '🇫🇮', name: 'Finland' },
                      { flag: '🇧🇪', name: 'Belgium' },
                      { flag: '🇨🇾', name: 'Cyprus' },
                      { flag: '🇬🇷', name: 'Greece' }
                    ].map((c) => (
                      <li key={c.name}>
                        <button
                          onClick={() => onNavigate('destinations', c.name)}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-lg leading-none">{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Asia & More */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">travel_explore</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Asia & More
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { flag: '🇲🇺', name: 'Mauritius' },
                      { flag: '🇨🇳', name: 'China' },
                      { flag: '🇯🇵', name: 'Japan' },
                      { flag: '🇹🇷', name: 'Turkey' },
                      { flag: '🇳🇿', name: 'New Zealand' }
                    ].map((c) => (
                      <li key={c.name}>
                        <button
                          onClick={() => onNavigate('destinations', c.name)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-lg leading-none">{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom footer link */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Explore 50+ study destinations worldwide.
                </span>
                <button
                  onClick={() => onNavigate('destinations', 'all')}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-[13px] font-bold hover:underline cursor-pointer"
                >
                  <span>View All Countries</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Universities */}
          <button
            onClick={() => onNavigate('universities')}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${
              currentView === 'universities' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Universities
          </button>

          {/* 3. Courses */}
          <button
            onClick={() => onNavigate('courses')}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${
              currentView === 'courses' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Courses
          </button>

          {/* 4. Services Mega-Menu */}
          <div className="relative group cursor-pointer py-6">
            <button
              type="button"
              className={`flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer ${
                currentView === 'services' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              <span>Services</span>
              <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>

            {/* Services 5-Column Mega Dropdown Panel */}
            <div className="absolute top-[calc(100%-6px)] -left-60 w-[840px] bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="grid grid-cols-5 gap-5">
                {/* Admissions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">school</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Admissions
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { icon: '🎓', label: 'Admission', slug: 'admission-support' },
                      { icon: '🏫', label: 'School Adm.', slug: 'school-admission' },
                      { icon: '🤝', label: 'Referral', slug: 'b2b-partnership' }
                    ].map((s) => (
                      <li key={s.label}>
                        <button
                          onClick={() => onNavigate('services', s.slug)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-base leading-none">{s.icon}</span>
                          <span>{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Immigration */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">badge</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Immigration
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { icon: '🛂', label: 'Student Visa', slug: 'student-visa-assistance' },
                      { icon: '👨‍👩‍👧', label: 'Dependent', slug: 'student-visa-assistance' },
                      { icon: '✈️', label: 'Tourist Visa', slug: 'student-visa-assistance' },
                      { icon: '🏡', label: 'MM2H', slug: 'student-visa-assistance' }
                    ].map((s) => (
                      <li key={s.label}>
                        <button
                          onClick={() => onNavigate('services', s.slug)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-base leading-none">{s.icon}</span>
                          <span>{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrival */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">flight_takeoff</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Arrival
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { icon: '🛏️', label: 'Accommodation', slug: 'student-accommodation' },
                      { icon: '❤️', label: 'Insurance', slug: 'student-accommodation' },
                      { icon: '🎫', label: 'Flights', slug: 'flight-ticketing' },
                      { icon: '🚕', label: 'Airport Pickup', slug: 'flight-ticketing' },
                      { icon: '🧳', label: 'Tours', slug: 'flight-ticketing' },
                      { icon: '🚗', label: 'Car Rental', slug: 'flight-ticketing' }
                    ].map((s) => (
                      <li key={s.label}>
                        <button
                          onClick={() => onNavigate('services', s.slug)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-base leading-none">{s.icon}</span>
                          <span>{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Living */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">home_pin</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Living
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { icon: '📦', label: 'Courier', slug: 'student-accommodation' },
                      { icon: '🏠', label: 'Airbnb', slug: 'student-accommodation' },
                      { icon: '💸', label: 'MoneyTransfer', slug: 'student-accommodation' }
                    ].map((s) => (
                      <li key={s.label}>
                        <button
                          onClick={() => onNavigate('services', s.slug)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-base leading-none">{s.icon}</span>
                          <span>{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prep & B2B */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">history_edu</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                      Prep & B2B
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { icon: '🎙️', label: 'IELTS', slug: 'ielts-preparation' },
                      { icon: '🗣️', label: 'PTE', slug: 'ielts-preparation' },
                      { icon: '📘', label: 'Linguaskill', slug: 'ielts-preparation' },
                      { icon: '🏢', label: 'B2B Partners', slug: 'b2b-partnership' }
                    ].map((s) => (
                      <li key={s.label}>
                        <button
                          onClick={() => onNavigate('services', s.slug)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                        >
                          <span className="text-base leading-none">{s.icon}</span>
                          <span>{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom footer link */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  From admission to arrival, all services in one place.
                </span>
                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-[13px] font-bold hover:underline cursor-pointer"
                >
                  <span>View All Services</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Contact Mega-Menu */}
          <div className="relative group cursor-pointer py-6">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer"
            >
              <span>Contact</span>
              <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>

            {/* Contact Dropdown Panel */}
            <div className="absolute top-[calc(100%-6px)] right-0 w-[620px] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-3 gap-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              {/* Column 1: Contact */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">contact_support</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                    Contact
                  </span>
                </div>
                <ul className="space-y-1">
                  {[
                    { icon: '📞', label: 'Contact Us', action: () => onNavigate('apply') },
                    { icon: '🌐', label: 'Language Centers', action: () => onNavigate('apply') },
                    { icon: '🧭', label: 'Application Tracker', action: () => { onRoleChange('student'); onNavigate('student-portal'); } },
                    { icon: '📖', label: 'Students Guide', action: () => onNavigate('apply') },
                    { icon: '📁', label: 'Resources', action: () => onNavigate('courses') },
                    { icon: '❓', label: 'FAQs', action: () => onNavigate('apply') }
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                      >
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: About Us */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">info</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                    About Us
                  </span>
                </div>
                <ul className="space-y-1">
                  {[
                    { icon: 'ℹ️', label: 'About Us', action: () => onNavigate('home') },
                    { icon: '✉️', label: 'Message from Director', action: () => onNavigate('home') },
                    { icon: '🏆', label: 'Success Stories', action: () => { onNavigate('home'); setTimeout(() => { window.scrollTo({ top: 1800, behavior: 'smooth' }); }, 100); } }
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                      >
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: News & Updates */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">newspaper</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">
                    News & Updates
                  </span>
                </div>
                <ul className="space-y-1">
                  {[
                    { icon: '🗓️', label: 'Events', action: () => onNavigate('blog') },
                    { icon: '📰', label: 'News', action: () => onNavigate('blog') },
                    { icon: '✍️', label: 'Blog', action: () => onNavigate('blog') }
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-medium text-xs text-left cursor-pointer"
                      >
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger Button */}
          <button
            aria-label="Search Catalog"
            onClick={onOpenSearch}
            className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            aria-label="Toggle Theme"
            onClick={onToggleTheme}
            className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Portal Popover with Sliding Pill Tab Switcher */}
          <div
            className="relative hidden sm:block py-2"
            onMouseEnter={handlePortalEnter}
            onMouseLeave={handlePortalLeave}
          >
            <button
              aria-label="Portal"
              onClick={() => setPortalOpen(!portalOpen)}
              className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
            </button>

            {/* Portal Dropdown Menu */}
            <div
              className={`absolute top-[calc(100%+6px)] right-0 bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 border border-slate-100 dark:border-slate-800 p-3.5 transition-all duration-200 origin-top-right z-50 w-72 ${
                portalOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none invisible'
              }`}
            >
              {/* Compact Sliding Pill Toggle Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-3">
                <div className="relative flex items-center p-1 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50/50 dark:from-slate-800/90 dark:via-indigo-950/40 dark:to-slate-800/90 border border-blue-200/60 dark:border-indigo-500/20 rounded-xl w-full shadow-inner select-none">
                  <div
                    className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md shadow-blue-500/30 transition-transform duration-300 ease-out"
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
              </div>

              {/* Panels Container */}
              <div className="relative overflow-hidden">
                <div
                  className="flex w-[200%] transition-transform duration-300 ease-out"
                  style={{
                    transform: portalTab === 'signin' ? 'translateX(0%)' : 'translateX(-50%)'
                  }}
                >
                  {/* Panel 1: Sign In */}
                  <div className="w-1/2 shrink-0 pr-1">
                    <div className="grid gap-1.5 grid-cols-1">
                      {/* Student Login */}
                      <button
                        onClick={() => {
                          onRoleChange('student');
                          onNavigate('student-portal');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2.5 p-2 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 transition-all shadow-xs text-left cursor-pointer w-full"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[18px]">school</span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="font-semibold text-blue-950 dark:text-blue-100 text-xs truncate">
                            Student Login
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </div>
                      </button>

                      {/* Agent Login */}
                      <button
                        onClick={() => {
                          onRoleChange('agent');
                          onNavigate('agent-portal');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 transition-all shadow-xs text-left cursor-pointer w-full"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[18px]">handshake</span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="font-semibold text-emerald-950 dark:text-emerald-100 text-xs truncate">
                            Agent Login
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </div>
                      </button>

                      {/* Staff Login */}
                      <button
                        onClick={() => {
                          onRoleChange('counselor');
                          onNavigate('crm');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2.5 p-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/40 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/40 transition-all shadow-xs text-left cursor-pointer w-full"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[18px]">badge</span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="font-semibold text-indigo-950 dark:text-indigo-100 text-xs truncate">
                            Staff Login
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </div>
                      </button>

                      {/* University Login */}
                      <button
                        onClick={() => {
                          onNavigate('universities');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2.5 p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 hover:bg-amber-100/80 dark:hover:bg-amber-900/40 transition-all shadow-xs text-left cursor-pointer w-full"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[18px]">account_balance</span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="font-semibold text-amber-950 dark:text-amber-100 text-xs truncate">
                            University Login
                          </span>
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </div>
                      </button>

                      {/* Admin Login */}
                      <button
                        onClick={() => {
                          onNavigate('analytics');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2.5 p-2 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/40 hover:bg-sky-100/80 dark:hover:bg-sky-900/40 transition-all shadow-xs text-left cursor-pointer w-full"
                      >
                        <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="font-semibold text-sky-950 dark:text-sky-100 text-xs truncate">
                            Admin Login
                          </span>
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Panel 2: Sign Up */}
                  <div className="w-1/2 shrink-0 pl-1">
                    <div className="grid grid-cols-2 gap-1.5">
                      {/* Student */}
                      <button
                        onClick={() => {
                          onNavigate('apply');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2 p-2 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 hover:border-blue-600 transition-all text-left cursor-pointer"
                      >
                        <div className="w-6 h-6 text-blue-600 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">person_add</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                            Student
                          </span>
                          <p className="text-[10px] text-slate-500 truncate">Join free</p>
                        </div>
                      </button>

                      {/* Agent */}
                      <button
                        onClick={() => {
                          onNavigate('agent-portal');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all text-left cursor-pointer"
                      >
                        <div className="w-6 h-6 text-blue-600 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">group_add</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                            Agent
                          </span>
                          <p className="text-[10px] text-slate-500 truncate">Partner</p>
                        </div>
                      </button>

                      {/* Staff */}
                      <button
                        onClick={() => {
                          onNavigate('crm');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all text-left cursor-pointer"
                      >
                        <div className="w-6 h-6 text-blue-600 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">contact_emergency</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                            Staff
                          </span>
                          <p className="text-[10px] text-slate-500 truncate">Onboarding</p>
                        </div>
                      </button>

                      {/* University */}
                      <button
                        onClick={() => {
                          onNavigate('universities');
                          setPortalOpen(false);
                        }}
                        className="group relative flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all text-left cursor-pointer"
                      >
                        <div className="w-6 h-6 text-blue-600 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">domain_add</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-900 dark:text-white text-xs truncate block">
                            University
                          </span>
                          <p className="text-[10px] text-slate-500 truncate">Tie-up</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Universal CTA: Apply */}
          <button
            onClick={() => onNavigate('apply')}
            className="h-11 px-6 rounded-full bg-[#FBBF24] hover:bg-amber-400 text-slate-900 font-bold text-sm flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
            <span>Apply</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          {/* Mobile Hamburger Navigation Button */}
          <button
            aria-label="Navigation Menu"
            onClick={onOpenMobileMenu}
            className="xl:hidden w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer shrink-0"
            type="button"
          >
            <svg
              className="w-5 h-5 text-slate-900 dark:text-slate-200 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.3"
              viewBox="0 0 24 24"
            >
              <line x1="11" x2="20.5" y1="6.5" y2="6.5"></line>
              <line x1="3.5" x2="20.5" y1="12" y2="12"></line>
              <line x1="14.5" x2="20.5" y1="17.5" y2="17.5"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
