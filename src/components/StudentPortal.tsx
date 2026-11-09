'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  KeyRound,
  QrCode,
  FileCheck2,
  CheckCircle,
  Clock,
  Award,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { User, Exam } from '../lib/types';
import { INITIAL_EXAMS } from '../lib/mockData';

interface StudentPortalProps {
  currentUser: User | null;
  onNavigateToEvaluate: (examId: string) => void;
  onOpenAuth: () => void;
}

export default function StudentPortal({
  currentUser,
  onNavigateToEvaluate,
  onOpenAuth,
}: StudentPortalProps) {
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinSuccessMessage, setJoinSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'enrolled' | 'public'>('enrolled');

  // Enrolled Exams list
  const [enrolledExams, setEnrolledExams] = useState<Exam[]>(INITIAL_EXAMS);

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;

    setJoinSuccessMessage(`Successfully joined exam using code "${joinCodeInput.toUpperCase()}"!`);
    setTimeout(() => setJoinSuccessMessage(''), 4000);
    setJoinCodeInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ──────────────────── STUDENT PORTAL BANNER (PAGE 4 C) ──────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Student Examination & Graded Script Portal
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Student View
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Join exams by Exam Code, Direct Link, or QR Code (PDF Page 4c Specification)
              </p>
            </div>
          </div>

          {!currentUser && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all self-start sm:self-auto"
            >
              Sign In as Student
            </button>
          )}
        </div>

        {/* ──────────────────── JOIN EXAM BY CODE / QR (PAGE 4 C) ──────────────────── */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <span>Join an Exam by Exam Code, Link, or QR Code</span>
          </h3>

          <form onSubmit={handleJoinByCode} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value)}
                placeholder="Enter 6 or 7-digit Exam Code (e.g. PHY2026, MATH789)..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Join Exam Now
            </button>
          </form>

          {joinSuccessMessage && (
            <div className="mt-2.5 p-2 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs rounded-lg font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{joinSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* Enrolled vs Public Exams */}
        <div className="pt-2">
          <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`pb-2 transition-all ${
                activeTab === 'enrolled'
                  ? 'border-b-2 border-emerald-600 text-emerald-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              My Enrolled Exams & Graded Khatas ({enrolledExams.length})
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`pb-2 transition-all ${
                activeTab === 'public'
                  ? 'border-b-2 border-emerald-600 text-emerald-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Public Board Mock Exams
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {enrolledExams.map((exam) => (
              <div
                key={exam.id}
                className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {exam.subject_name || 'Physics'}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                      {exam.title}
                    </h4>
                  </div>
                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {exam.total_marks} Marks
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {exam.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{exam.duration_minutes || 60} mins</span>
                  </div>

                  <button
                    onClick={() => onNavigateToEvaluate(exam.id)}
                    className="flex items-center gap-1 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
                  >
                    <span>View Graded Script</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
