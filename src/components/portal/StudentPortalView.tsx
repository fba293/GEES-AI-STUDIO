/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Student Portal & Application Progress Tracker
 */

import React, { useState } from 'react';
import { mockApplications, mockCounselors } from '../../data/mockDatabase.ts';
import { Application, StudentDocument } from '../../types/index.ts';

export const StudentPortalView: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<Application>(mockApplications[0]);
  const [docs, setDocs] = useState<StudentDocument[]>(selectedApp.documents);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleSimulateUpload = (docId: string) => {
    setDocs(prev => prev.map(d => {
      if (d.id === docId) {
        return { ...d, status: 'pending', uploadedAt: new Date().toLocaleDateString() };
      }
      return d;
    }));
    setUploadSuccess('Document uploaded successfully! Our compliance desk will verify it within 24 hours.');
    setTimeout(() => setUploadSuccess(null), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Student Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Student ID: STD-84920</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {selectedApp.studentName}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Tracking your application to <strong className="text-[#fbb034]">{selectedApp.universityName}</strong> ({selectedApp.country})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Current Status</span>
              <span className="text-sm font-black text-emerald-400 uppercase tracking-wide">
                {selectedApp.stage.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Application Timeline & Document Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline Tracker */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Application Timeline
                </h3>
                <span className="text-xs text-slate-500">Ref: {selectedApp.applicationNumber}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs">
                Intake: {selectedApp.intakeTerm}
              </span>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {selectedApp.timeline.map((event, idx) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs transition-colors ${
                      event.completed
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : event.active
                        ? 'bg-[#fbb034] text-slate-950 ring-4 ring-amber-100 animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {event.completed ? '✓' : idx + 1}
                  </div>

                  <div className="flex-1 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {event.title}
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">{event.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Required Documents & Counselor Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Document Verification Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              Document Checklist
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Verified by GEES Compliance Desk for 100% embassy accuracy.
            </p>

            {uploadSuccess && (
              <div className="p-3 mb-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>{uploadSuccess}</span>
              </div>
            )}

            <div className="space-y-3">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      {doc.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        doc.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : doc.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {doc.status}
                    </span>

                    {doc.status !== 'verified' && (
                      <button
                        onClick={() => handleSimulateUpload(doc.id)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px]"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Counselor Support Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fbb034] text-slate-950 font-black flex items-center justify-center text-lg">
                F
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#fbb034] tracking-wider block">
                  Assigned Senior Mentor
                </span>
                <h4 className="text-base font-bold text-white leading-tight">
                  {selectedApp.counselorName}
                </h4>
                <span className="text-xs text-slate-400">Direct Desk Helpline</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5 font-normal">
              Have questions regarding your visa interview appointment or tuition deposit receipt? Contact your counselor directly.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/8801805529578"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+8801805529578"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors"
              >
                Call Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
