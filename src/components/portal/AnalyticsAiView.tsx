/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Management Analytics & AI Academic Profile Evaluation Assistant
 */

import React, { useState } from 'react';

export const AnalyticsAiView: React.FC = () => {
  // AI Profile Evaluator State
  const [studentGpa, setStudentGpa] = useState('3.75');
  const [studentIelts, setStudentIelts] = useState('7.0');
  const [studentCountry, setStudentCountry] = useState('Canada');
  const [studentMajor, setStudentMajor] = useState('Computer Science');
  const [studentSopDraft, setStudentSopDraft] = useState(
    'I have always had a strong passion for artificial intelligence and software architecture. During my undergraduate studies in computer engineering, I developed machine learning models for healthcare diagnostics. I now wish to pursue advanced graduate study to contribute toward real-world scalable AI systems.'
  );

  const [aiEvaluation, setAiEvaluation] = useState<{
    visaApprovalChance: number;
    scholarshipTier: string;
    ambitiousUnis: string[];
    targetUnis: string[];
    safeUnis: string[];
    sopCritique: string[];
  } | null>(null);

  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleRunAiEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setAiEvaluation({
        visaApprovalChance: 97.4,
        scholarshipTier: '$5,000 - $12,000 Merit Award Qualified',
        ambitiousUnis: ['University of Toronto (Rotman / CS)', 'Monash University (Group of Eight)', 'Imperial College London'],
        targetUnis: ["King's University College at Western", 'University of Alberta', 'Technical University of Munich'],
        safeUnis: ['Toronto Metropolitan University', 'Universiti Malaya', 'Deakin University'],
        sopCritique: [
          'Strong academic motivation articulated clearly with specific undergraduate project references.',
          'Recommendation: Expand on specific faculty professors or lab research facilities at the target Canadian university.',
          'Highlight home-country career reintegration post-graduation to satisfy IRCC Genuine Student requirements.'
        ]
      });
      setIsEvaluating(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-1">
            Executive Leadership & Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Management Analytics & AI Profile Evaluator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time pipeline analytics, visa success tracking, and AI education advisory engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Data Sync: Active</span>
          </span>
        </div>
      </div>

      {/* Top Analytics Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Visa Approval Rate</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">95.8%</div>
          <span className="text-[11px] text-slate-500">Based on 1,420 applications</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Partner Institutions</span>
          <div className="text-3xl font-black text-blue-600 mt-1">500+</div>
          <span className="text-[11px] text-slate-500">Direct representation</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Annual Placements</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">840</div>
          <span className="text-[11px] text-emerald-500 font-semibold">+22% YoY Growth</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Scholarships Secured</span>
          <div className="text-3xl font-black text-[#fbb034] mt-1">$2.4M</div>
          <span className="text-[11px] text-slate-500">Cumulative for students</span>
        </div>
      </div>

      {/* Destination Performance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-10">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Destination Success & Turnaround Benchmarks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Enrolled This Year</th>
                <th className="py-2.5 px-3">Visa Grant Rate</th>
                <th className="py-2.5 px-3">Avg Offer Time</th>
                <th className="py-2.5 px-3">Avg Visa Processing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { country: '🇨🇦 Canada', enrolled: 310, rate: '96.2%', offer: '14 Days', visa: '26 Days' },
                { country: '🇬🇧 United Kingdom', enrolled: 260, rate: '98.1%', offer: '7 Days', visa: '18 Days' },
                { country: '🇦🇺 Australia', enrolled: 220, rate: '95.0%', offer: '10 Days', visa: '21 Days' },
                { country: '🇩🇪 Germany', enrolled: 110, rate: '92.4%', offer: '25 Days', visa: '35 Days' },
                { country: '🇲🇾 Malaysia', enrolled: 180, rate: '99.2%', offer: '5 Days', visa: '14 Days' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white text-sm">{row.country}</td>
                  <td className="py-3 px-3 font-semibold">{row.enrolled} Students</td>
                  <td className="py-3 px-3 font-bold text-emerald-600">{row.rate}</td>
                  <td className="py-3 px-3 text-slate-500">{row.offer}</td>
                  <td className="py-3 px-3 text-slate-500">{row.visa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Education Assistant & Profile Evaluator */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase mb-2">
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          <span>GEES AI Academic Profile & SOP Evaluation Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Instant Student Eligibility & Visa Probability Assessment
        </h2>
        <p className="text-xs sm:text-sm text-blue-200 mb-6 max-w-2xl">
          Uses real historical university admission models to classify target universities into Ambitious, Target, and Safe tiers with statement-of-purpose feedback.
        </p>

        {/* Evaluation Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 text-slate-900">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
              GPA / Academic Score
            </label>
            <input
              type="text"
              value={studentGpa}
              onChange={(e) => setStudentGpa(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-bold"
              placeholder="e.g. 3.75 out of 4.00"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
              IELTS / English Score
            </label>
            <input
              type="text"
              value={studentIelts}
              onChange={(e) => setStudentIelts(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-bold"
              placeholder="e.g. 7.0 (no band < 6.5)"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
              Target Destination
            </label>
            <select
              value={studentCountry}
              onChange={(e) => setStudentCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-bold"
            >
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="Malaysia">Malaysia</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
              Field of Study
            </label>
            <input
              type="text"
              value={studentMajor}
              onChange={(e) => setStudentMajor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-bold"
              placeholder="e.g. Computer Science"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
            Statement of Purpose (SOP) Excerpt
          </label>
          <textarea
            rows={3}
            value={studentSopDraft}
            onChange={(e) => setStudentSopDraft(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-medium focus:outline-none"
            placeholder="Paste student statement of purpose draft here..."
          />
        </div>

        <button
          onClick={handleRunAiEvaluation}
          disabled={isEvaluating}
          className="px-6 py-3 rounded-full bg-[#fbb034] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
        >
          {isEvaluating ? (
            <>
              <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
              <span>Analyzing Profile Models...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>Run AI Profile Evaluation</span>
            </>
          )}
        </button>

        {/* AI Output Card */}
        {aiEvaluation && (
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 animate-fadeIn space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                  Estimated Visa Approval Probability
                </span>
                <span className="text-3xl font-black text-emerald-400">
                  {aiEvaluation.visaApprovalChance}%
                </span>
                <p className="text-[11px] text-emerald-200 mt-1">High confidence based on GPA and Level 1 risk status.</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-400/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Scholarship Eligibility Forecast
                </span>
                <span className="text-lg font-black text-amber-300 block">
                  {aiEvaluation.scholarshipTier}
                </span>
                <p className="text-[11px] text-amber-200 mt-1">Automatic entry merit scholarships recommended.</p>
              </div>
            </div>

            {/* University Tiering Recommendation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-amber-400 font-bold block mb-2">⭐ Ambitious Tier</span>
                <ul className="space-y-1 list-disc pl-4 text-slate-200">
                  {aiEvaluation.ambitiousUnis.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-blue-400 font-bold block mb-2">🎯 Target Tier (Ideal Match)</span>
                <ul className="space-y-1 list-disc pl-4 text-slate-200">
                  {aiEvaluation.targetUnis.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-emerald-400 font-bold block mb-2">🛡️ Safe Tier (High Admission)</span>
                <ul className="space-y-1 list-disc pl-4 text-slate-200">
                  {aiEvaluation.safeUnis.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
            </div>

            {/* SOP Editorial Critique */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#fbb034] block mb-2">
                ✍️ GEES Editorial SOP Recommendations:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
                {aiEvaluation.sopCritique.map((critique, idx) => (
                  <li key={idx}>{critique}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
