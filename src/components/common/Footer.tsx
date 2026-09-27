/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Global Education Expert Services - Master Footer
 */

import React from 'react';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Brand & Global Offices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-black tracking-tight text-white">GEES</span>
              <span className="w-2 h-2 rounded-full bg-[#fbb034]"></span>
            </div>
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              Global Education Expert Services (GEES) is a premier international education consultancy connecting students to world-class universities across the UK, USA, Canada, Australia, Europe, and Asia.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Official University Representative
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Study Destinations</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('destinations', 'United Kingdom')} className="hover:text-amber-400 transition-colors">Study in United Kingdom 🇬🇧</button></li>
              <li><button onClick={() => onNavigate('destinations', 'Canada')} className="hover:text-amber-400 transition-colors">Study in Canada 🇨🇦</button></li>
              <li><button onClick={() => onNavigate('destinations', 'Australia')} className="hover:text-amber-400 transition-colors">Study in Australia 🇦🇺</button></li>
              <li><button onClick={() => onNavigate('destinations', 'United States')} className="hover:text-amber-400 transition-colors">Study in United States 🇺🇸</button></li>
              <li><button onClick={() => onNavigate('destinations', 'Germany')} className="hover:text-amber-400 transition-colors">Study in Germany 🇩🇪</button></li>
              <li><button onClick={() => onNavigate('destinations', 'Malaysia')} className="hover:text-amber-400 transition-colors">Study in Malaysia 🇲🇾</button></li>
            </ul>
          </div>

          {/* Services & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Core Services</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('services', 'admission-support')} className="hover:text-amber-400 transition-colors">Free Admission Support</button></li>
              <li><button onClick={() => onNavigate('services', 'student-visa-assistance')} className="hover:text-amber-400 transition-colors">Student Visa Guidance</button></li>
              <li><button onClick={() => onNavigate('services', 'ielts-preparation')} className="hover:text-amber-400 transition-colors">IELTS & PTE Prep</button></li>
              <li><button onClick={() => onNavigate('services', 'student-accommodation')} className="hover:text-amber-400 transition-colors">Student Accommodation</button></li>
              <li><button onClick={() => onNavigate('services', 'flight-ticketing')} className="hover:text-amber-400 transition-colors">Flight & Travel Assistance</button></li>
              <li><button onClick={() => onNavigate('services', 'b2b-partnership')} className="hover:text-amber-400 transition-colors">B2B Agent Partnership</button></li>
            </ul>
          </div>

          {/* Global Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Global Offices</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <strong className="text-white block">Headquarters (Dhaka)</strong>
                <span>Banani C/A, Road 11, Dhaka, Bangladesh</span>
                <span className="block text-emerald-400 mt-0.5">📞 +880 1805–529578</span>
              </div>
              <div>
                <strong className="text-white block">Malaysia Liaison Office</strong>
                <span>Megan Avenue II, Jalan Yap Kwan Seng, Kuala Lumpur</span>
                <span className="block text-emerald-400 mt-0.5">📞 +60 11-1237 6224</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Global Education Expert Services (GEES). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#compliance" className="hover:text-white transition-colors">Accreditation & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
