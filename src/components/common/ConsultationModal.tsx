/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Free Consultation & 1-on-1 Academic Counseling Booking Modal
 */

import React, { useState } from 'react';
import { mockCounselors } from '../../data/mockDatabase.ts';
import { InteractiveHoverButton } from '../ui/interactive-hover-button.tsx';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCounselor?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedCounselor
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Canada');
  const [preferredDate, setPreferredDate] = useState('2026-10-05');
  const [counselor, setCounselor] = useState(preselectedCounselor || mockCounselors[0].name);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-[#0f172a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Consultation Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Thank you, <strong>{fullName}</strong>. A confirmation message and Zoom appointment link have been sent to <strong>{phone}</strong> via WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md mb-2">
                1-on-1 Free Session
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Book Your Consultation
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Zero service charge. Complete guidance on university admissions & visas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb034]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb034]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb034]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Destination *
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb034]"
                  >
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb034]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Counselor / Advisor
                </label>
                <select
                  value={counselor}
                  onChange={(e) => setCounselor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb034]"
                >
                  {mockCounselors.map((c) => (
                    <option key={c.id} value={c.name}>{c.name} ({c.role})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3">
                <InteractiveHoverButton
                  type="submit"
                  text="Confirm Free Appointment"
                  className="w-full py-3.5 px-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-slate-300 dark:border-slate-700 font-extrabold text-sm shadow-lg"
                />
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Zero commitment. 100% confidential academic guidance.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
