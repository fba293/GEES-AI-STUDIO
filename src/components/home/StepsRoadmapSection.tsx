/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "6 Steps to Your Goal" Interactive Roadmap Section
 */

import React, { useState } from 'react';

interface StepsRoadmapSectionProps {
  onOpenBooking: () => void;
}

export const StepsRoadmapSection: React.FC<StepsRoadmapSectionProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null); // None open by default until student clicks
  const [deepDiveStep, setDeepDiveStep] = useState<number | null>(null);

  const stepsData = [
    {
      num: '01',
      title: 'Free Consultation',
      summary: 'Review your academic profile, destination goals, study plans, and budget with a dedicated senior GEES counsellor.',
      docs: ['Academic marksheets & transcripts', 'English proficiency test scores (or test targets)', 'Budget & preferred intake term'],
      advisorDelivers: ['Eligibility assessment across 500+ universities', 'Cost comparison (tuition + living + part-time work)', 'Personalized master timeline']
    },
    {
      num: '02',
      title: 'University Shortlisting',
      summary: 'Receive tailored university and course recommendations curated across Ambitious, Target, and Safe tiers.',
      docs: ['Detailed course module preferences', 'Regional location & post-study visa priorities', 'Financial funding capacity'],
      advisorDelivers: ['Curated 5-8 university match list', 'Scholarship odds assessment', 'Direct liaison with university recruitment officers']
    },
    {
      num: '03',
      title: 'Application Preparation',
      summary: 'Prepare documents, academic records, Statement of Purpose (SOP), and submission packets with expert GEES editorial assistance.',
      docs: ['Statement of Purpose (SOP) draft notes', 'Letters of Recommendation (LORs)', 'Updated academic CV & passport copies'],
      advisorDelivers: ['Structural SOP polishing and plagiarism checking', 'Document notarization and credential attestation support', 'Direct portal submission without agency fees']
    },
    {
      num: '04',
      title: 'Offer Letter Support',
      summary: 'Evaluate received offers, negotiate university funding and scholarships, and ensure swift CAS or I-20 issuance.',
      docs: ['Conditional & unconditional offer letters', 'Deposit payment confirmation receipts', 'Meeting academic condition certificates'],
      advisorDelivers: ['Offer evaluation & scholarship grant maximization', 'Expedited CAS (UK) or I-20 (USA) document issuance', 'Tuition deposit wire guidance']
    },
    {
      num: '05',
      title: 'Visa Processing',
      summary: 'Complete documents, submission preparation, financial auditing, and simulated visa mock interviews with our 98% success track record.',
      docs: ['Confirmed CAS / I-20 / CoE document', 'Bank solvency certificates & fund source records', 'Medical assessment slips and police clearance'],
      advisorDelivers: ['100% compliant visa dossier checking', '1-on-1 mock interview training sessions', 'Embassy biometric appointment booking']
    },
    {
      num: '06',
      title: 'Pre-Departure Support',
      summary: 'Prepare for travel, accommodation, flight booking, forex cards, and your new student journey with confidence.',
      docs: ['Approved student visa sticker', 'Flight itinerary & baggage allowance details', 'Accommodation lease agreement'],
      advisorDelivers: ['Verified on-campus & off-campus student accommodation', 'Zero-markup student Forex multi-currency travel cards', 'Pre-departure briefing with alumni network']
    }
  ];

  return (
    <section id="steps-roadmap-section" className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-[#0B1329] border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center justify-center gap-3 mb-3">
            <span>6 Steps to</span>
            <span className="bg-[#fbbf24] text-slate-950 px-5 sm:px-6 py-1 rounded-2xl font-black tracking-tight leading-none shadow-sm">
              Your Goal
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            From your first conversation to confident departure.
          </p>
        </header>

        {/* Process Grid: Left Visual Card & Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Left Column: Counselor session photo with trust pill */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmxWeNh7tryz5Ui6SbdMmMasVp5_mcakVeZkNW8gNg_1gZe6pLxsfqJ-cVa6DhoMo8dyDswM0Bvk51sqpt2_dcePWC8WkmRxGM5ZWvkNM7IV8x0PJ9tG2E7DOIwirLxoErAea2uVmX_N0pFBSj31KKXgVwt499uf26nRiNZ1jC400Vj9ndQVmAJRbyCDHQWWqyxAnb0Mh7atoeoHJSHyN0jFPwKJ2pZJUpg_fP79mwsGDDS0HDlBR_dLXXCz5y-sELihI"
                alt="GEES Counselor advising family"
                className="w-full h-full object-cover object-top"
              />

              {/* Floating Trust Pill */}
              <div className="absolute bottom-5 inset-x-4 flex justify-center z-10">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 sm:py-2.5 rounded-full shadow-lg border border-white/60 dark:border-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  <span>No service charge</span>
                  <span className="text-slate-300 dark:text-slate-600 font-light select-none">|</span>
                  <span>No hidden fees</span>
                  <span className="text-slate-300 dark:text-slate-600 font-light select-none">|</span>
                  <span>No surprises</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 text-center">
              <span className="w-5 h-[2px] bg-[#fbbf24] rounded-full inline-block"></span>
              <span>Guidance for students and families, at every step.</span>
              <span className="w-5 h-[2px] bg-[#fbbf24] rounded-full inline-block"></span>
            </div>
          </div>

          {/* Right Column: 6 Steps Accordion */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            {stepsData.map((step, idx) => {
              const stepNumber = idx + 1;
              const isActive = activeStep === stepNumber;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(isActive ? null : stepNumber)}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isActive
                      ? 'border-[#f59e0b] bg-amber-50/50 dark:bg-slate-800 shadow-md ring-1 ring-amber-400/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="w-full flex items-center justify-between py-3.5 px-4 sm:px-5">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 font-black text-xs sm:text-sm flex items-center justify-center rounded-full transition-all ${
                          isActive
                            ? 'bg-[#f59e0b] text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {step.num}
                      </div>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {step.title}
                      </span>
                    </div>

                    <span className={`material-symbols-outlined text-xl text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-amber-600' : ''}`}>
                      keyboard_arrow_down
                    </span>
                  </div>

                  {/* Expandable Content */}
                  {isActive && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-amber-200/50 dark:border-slate-700/60 space-y-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {step.summary}
                      </p>

                      <div className="pt-1 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeepDiveStep(stepNumber);
                          }}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Explore Step Checklist & Deliverables</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <span>Start with a Free Consultation</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Deep Dive Checklist Modal */}
      {deepDiveStep !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 dark:border-slate-800 animate-fadeIn">
            <button
              onClick={() => setDeepDiveStep(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-[#f59e0b] text-white font-black flex items-center justify-center text-base">
                {stepsData[deepDiveStep - 1].num}
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-amber-600">GEES Roadmap Details</p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  {stepsData[deepDiveStep - 1].title}
                </h4>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
              {stepsData[deepDiveStep - 1].summary}
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 block mb-1.5">
                  📋 Documents Required:
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4 list-disc">
                  {stepsData[deepDiveStep - 1].docs.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block mb-1.5">
                  🎯 What GEES Delivers:
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-4 list-disc">
                  {stepsData[deepDiveStep - 1].advisorDelivers.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">
                Service Charge: <strong className="text-emerald-600">100% Free ($0)</strong>
              </span>
              <button
                onClick={() => {
                  setDeepDiveStep(null);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-md"
              >
                Book This Step
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
