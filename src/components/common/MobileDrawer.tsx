/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Mobile Navigation Drawer with Accordions, Search, and Social Links
 */

import React, { useState } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, payload?: any) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSearch
}) => {
  const [openSection, setOpenSection] = useState<string | null>('contact'); // Default expanded to match Screenshot 1 & 6
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
                  <div className="pl-3 pt-2 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Popular</div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {['🇦🇺 Australia', '🇨🇦 Canada', '🇬🇧 United Kingdom', '🇺🇸 USA', '🇲🇾 Malaysia'].map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleNav('destinations', c.split(' ')[1])}
                            className="text-left px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Europe</div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {['🇩🇪 Germany', '🇮🇪 Ireland', '🇸🇪 Sweden', '🇫🇷 France', '🇳🇱 Netherlands', '🇮🇹 Italy', '🇫🇮 Finland', '🇧🇪 Belgium', '🇨🇾 Cyprus', '🇬🇷 Greece'].map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleNav('destinations', c.split(' ')[1])}
                            className="text-left px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
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
                  <div className="pl-3 pt-2 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {[
                        { title: '🎓 Admission Support', slug: 'admission-support' },
                        { title: '🏫 School Admission', slug: 'school-admission' },
                        { title: '🛂 Student Visa Support', slug: 'student-visa-assistance' },
                        { title: '👨‍👩‍👧 Dependent Visa', slug: 'dependent-visa' },
                        { title: '🛏️ Student Accommodation', slug: 'student-accommodation' },
                        { title: '🎙️ IELTS Prep', slug: 'ielts-preparation' },
                        { title: '🏢 B2B Partners', slug: 'b2b-partnership' }
                      ].map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleNav('services', s.slug)}
                          className="text-left px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
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
                  <div className="pl-3 pt-2 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <button onClick={() => handleNav('student-portal')} className="w-full text-left px-2 py-1.5 text-blue-600 font-bold block">
                      👤 Student Portal & Tracker
                    </button>
                    <button onClick={() => handleNav('crm')} className="w-full text-left px-2 py-1.5 text-slate-700 dark:text-slate-300 font-medium block">
                      🛡️ Counselor CRM Desk
                    </button>
                    <button onClick={() => handleNav('agent-portal')} className="w-full text-left px-2 py-1.5 text-slate-700 dark:text-slate-300 font-medium block">
                      🤝 Agent B2B Portal
                    </button>
                    <button onClick={() => handleNav('analytics')} className="w-full text-left px-2 py-1.5 text-slate-700 dark:text-slate-300 font-medium block">
                      👑 Admin & Analytics
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Accordion (Expanded by default matching Screenshot 1) */}
              <div>
                <button
                  onClick={() => toggleSection('contact')}
                  className="w-full flex items-center justify-between py-1 text-[21px] sm:text-[22px] font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors text-left"
                >
                  <span>Contact</span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSection === 'contact' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openSection === 'contact' && (
                  <div className="pl-3 pt-2 pb-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-2.5 max-h-60 overflow-y-auto no-scrollbar text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Contact</div>
                      <div className="space-y-1">
                        <button onClick={() => handleNav('contact')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span>📞</span> Contact Us
                        </button>
                        <button onClick={() => handleNav('contact', 'language-centers')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span>🌐</span> Language Centers
                        </button>
                        <button onClick={() => handleNav('student-portal')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span>🧭</span> Application Tracker
                        </button>
                        <button onClick={() => handleNav('contact', 'faqs')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span className="text-red-500 font-bold">❓</span> FAQs
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">About Us</div>
                      <div className="space-y-1">
                        <button onClick={() => handleNav('about')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span>ℹ️</span> About Us
                        </button>
                        <button onClick={() => handleNav('counselors')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span>✉️</span> Message from Director
                        </button>
                        <button onClick={() => handleNav('success-stories')} className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium flex items-center gap-2">
                          <span>🏆</span> Success Stories
                        </button>
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
            <div className="flex items-center justify-between gap-1.5 mb-4">
              <a
                href="https://www.facebook.com/globaleduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all text-xs font-bold"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </a>
              <a
                href="https://www.instagram.com/global.eduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/globaleduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
              <a
                href="https://www.tiktok.com/@globaleduexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all"
                aria-label="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
              </a>
              <a
                href="https://wa.me/601112376224"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
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
