/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES B2B Agent & Partner Portal - Commission Tracking & Referrals
 */

import React, { useState } from 'react';
import { mockAgents, mockCommissions } from '../../data/mockDatabase.ts';
import { Agent, Commission } from '../../types/index.ts';

export const AgentPortalView: React.FC = () => {
  const currentAgent: Agent = mockAgents[0]; // Apex EduCare Global
  const [commissions, setCommissions] = useState<Commission[]>(mockCommissions);
  const [showReferModal, setShowReferModal] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Referral state
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [targetCountry, setTargetCountry] = useState('Canada');

  const handleReferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! Student "${studentName}" has been logged under ${currentAgent.agencyName}. Your commission rate is locked at ${currentAgent.commissionRatePct}%.`);
    setShowReferModal(false);
    setStudentName('');
    setStudentEmail('');
    setStudentPhone('');
  };

  const handleRequestPayout = () => {
    setPayoutSuccess(true);
    setTimeout(() => setPayoutSuccess(false), 3500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Agent Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase">
              {currentAgent.tier} Partner
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Commission Rate: {currentAgent.commissionRatePct}%</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {currentAgent.agencyName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Partner Representative: {currentAgent.contactPerson} • {currentAgent.city}, {currentAgent.country}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowReferModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#fbb034] hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            + Refer New Student
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Referred</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {currentAgent.totalStudentsReferred}
          </div>
          <span className="text-[11px] text-blue-600 font-semibold">{currentAgent.activeApplicationsCount} Active Files</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Commissions</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            ${currentAgent.totalCommissionsEarnedUSD.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Cumulative USD</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Pending Payout</span>
          <div className="text-3xl font-black text-amber-500 mt-1">
            ${currentAgent.pendingCommissionsUSD.toLocaleString()}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">Available for transfer</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Partner Tier</span>
          <div className="text-3xl font-black text-purple-600 mt-1">
            {currentAgent.tier}
          </div>
          <span className="text-[11px] text-slate-400">Next tier: Diamond (18%)</span>
        </div>
      </div>

      {payoutSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-between border border-emerald-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>Payout request of ${currentAgent.pendingCommissionsUSD.toLocaleString()} initiated to your registered bank account. Wire reference: GEES-PAY-9821.</span>
          </div>
        </div>
      )}

      {/* Commissions Invoicing Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 mb-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Commission Ledger & Invoices
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated calculation per student enrollment</p>
          </div>

          <button
            onClick={handleRequestPayout}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Request Payout
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Student & University</th>
                <th className="py-3 px-4">Tuition Fee Paid</th>
                <th className="py-3 px-4">Rate (%)</th>
                <th className="py-3 px-4">Commission (USD)</th>
                <th className="py-3 px-4">Invoice Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {commissions.map((comm) => (
                <tr key={comm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">
                      {comm.studentName}
                    </span>
                    <span className="text-slate-500">{comm.universityName}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold">
                    ${comm.tuitionFeePaidUSD.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-blue-600">
                    {comm.commissionPct}%
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white text-sm">
                    ${comm.amountUSD.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">
                    {comm.invoiceDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        comm.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : comm.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {comm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refer Student Modal */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Refer Student for Enrollment
              </h3>
              <button
                onClick={() => setShowReferModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleReferSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakib Al Hasan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
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
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1XXXXXXXXX"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Destination
                </label>
                <select
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
                >
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="USA">USA</option>
                  <option value="Malaysia">Malaysia</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReferModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Submit Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
