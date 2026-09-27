/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Counselor CRM & Student Lead Management System
 */

import React, { useState } from 'react';
import { mockLeads, mockCounselors } from '../../data/mockDatabase.ts';
import { Lead, LeadStatus } from '../../types/index.ts';

export const CrmView: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadCountry, setNewLeadCountry] = useState('Canada');
  const [newLeadField, setNewLeadField] = useState('Computer Science');
  const [newLeadIelts, setNewLeadIelts] = useState('6.5');
  const [newLeadCounselor, setNewLeadCounselor] = useState(mockCounselors[0].name);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Lead = {
      id: `lead-${Date.now()}`,
      fullName: newLeadName,
      email: newLeadEmail,
      phone: newLeadPhone,
      desiredCountry: newLeadCountry,
      desiredLevel: 'Postgraduate',
      desiredField: newLeadField,
      currentEducation: 'Completed Undergraduate',
      ieltsScore: parseFloat(newLeadIelts) || 6.5,
      source: 'website_form',
      status: 'new',
      assignedCounselorName: newLeadCounselor,
      notes: 'Initial inquiry logged into GEES CRM pipeline.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setLeads([newEntry, ...leads]);
    setShowAddLeadModal(false);
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
  };

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return l;
    }));
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesQuery = searchQuery === '' || 
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.desiredCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top CRM KPIs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Counselor CRM Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Lead Pipeline & Intake CRM
          </h1>
        </div>

        <button
          onClick={() => setShowAddLeadModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Active Leads</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">148</div>
          <span className="text-[11px] text-emerald-500 font-semibold">+18% this month</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">In Counseling</span>
          <div className="text-3xl font-black text-blue-600 mt-1">42</div>
          <span className="text-[11px] text-slate-400">Active sessions</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Applications Lodged</span>
          <div className="text-3xl font-black text-amber-500 mt-1">56</div>
          <span className="text-[11px] text-slate-400">For Fall & Spring intakes</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Conversion Rate</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">28.4%</div>
          <span className="text-[11px] text-emerald-500 font-semibold">Industry leading</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
          <input
            type="text"
            placeholder="Search leads by name, country, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {['all', 'new', 'counseling', 'docs_collecting', 'applied', 'offer_received'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Student Name & Contact</th>
                <th className="py-3.5 px-4">Target Destination & Field</th>
                <th className="py-3.5 px-4">IELTS</th>
                <th className="py-3.5 px-4">Assigned Counselor</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">
                      {lead.fullName}
                    </span>
                    <span className="text-slate-400 block">{lead.email}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{lead.phone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {lead.desiredCountry}
                    </span>
                    <span className="text-slate-500 block">{lead.desiredField}</span>
                    <span className="text-[10px] text-blue-600 font-semibold">{lead.desiredLevel}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                      {lead.ieltsScore || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      {lead.assignedCounselorName || 'Unassigned'}
                    </span>
                    <span className="text-[10px] text-slate-400">Senior Advisory</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold py-1 px-2.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer capitalize"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="counseling">Counseling</option>
                      <option value="docs_collecting">Docs Collecting</option>
                      <option value="applied">Applied</option>
                      <option value="offer_received">Offer Received</option>
                      <option value="visa_processing">Visa Processing</option>
                      <option value="enrolled">Enrolled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Call Student"
                      >
                        <span className="material-symbols-outlined text-sm">call</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Add New Student Lead
              </h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahfuz Rahman"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Desired Country
                  </label>
                  <select
                    value={newLeadCountry}
                    onChange={(e) => setNewLeadCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    IELTS / Test Score
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6.5"
                    value={newLeadIelts}
                    onChange={(e) => setNewLeadIelts(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assign Counselor
                </label>
                <select
                  value={newLeadCounselor}
                  onChange={(e) => setNewLeadCounselor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mockCounselors.map((c) => (
                    <option key={c.id} value={c.name}>{c.name} ({c.role})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
