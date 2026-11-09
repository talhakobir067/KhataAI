'use client';

import React, { useState } from 'react';
import {
  Building2,
  Users,
  FolderPlus,
  BookPlus,
  PlusCircle,
  FileCheck2,
  ChevronRight,
  Sparkles,
  Layers,
  GraduationCap,
  Plus,
  Trash2,
  Share2,
  CheckCircle,
} from 'lucide-react';
import {
  Batch,
  Subject,
  Exam,
  User,
} from '../lib/types';
import {
  INITIAL_INSTITUTION,
  INITIAL_BATCHES,
  INITIAL_SUBJECTS,
  INITIAL_EXAMS,
} from '../lib/mockData';

interface InstitutionPortalProps {
  currentUser: User | null;
  onNavigateToBuilder: () => void;
  onNavigateToEvaluate: (examId: string) => void;
}

export default function InstitutionPortal({
  currentUser,
  onNavigateToBuilder,
  onNavigateToEvaluate,
}: InstitutionPortalProps) {
  // Batches, Subjects, Exams
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);

  // Active selections (Batch -> Subject -> Exam hierarchy)
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subjects.find((s) => s.batch_id === selectedBatchId)?.id || subjects[0]?.id || ''
  );

  // Creation Modals / Inline Inputs
  const [newBatchName, setNewBatchName] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);

  // Student Joined Roster (Page 3 item a: "student can join by giving , name , id or roll , or other info")
  const [joinedStudents, setJoinedStudents] = useState<
    Array<{
      id: string;
      name: string;
      roll: string;
      college: string;
      email: string;
      joinedDate: string;
    }>
  >([
    {
      id: 'st-01',
      name: 'Mst. Puspita Akter',
      roll: 'KHATA_001 (Roll: 101)',
      college: 'VCR Model College',
      email: 'puspita@student.bd',
      joinedDate: '2026-10-18',
    },
    {
      id: 'st-02',
      name: 'Tanvir Hossain Fahim',
      roll: 'KHATA_002 (Roll: 102)',
      college: 'Rajshahi College',
      email: 'tanvir@student.bd',
      joinedDate: '2026-10-19',
    },
    {
      id: 'st-03',
      name: 'Nusrat Jahan Mim',
      roll: 'KHATA_003 (Roll: 103)',
      college: 'Ideal School & College',
      email: 'mim@student.bd',
      joinedDate: '2026-10-20',
    },
  ]);

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');
  const [newStudentCollege, setNewStudentCollege] = useState('');

  // Handle Add Batch (Page 3 item b)
  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      name: newBatchName,
      institution_id: INITIAL_INSTITUTION.id,
      institutionSlug: 'apex-coaching',
      createdAt: new Date().toISOString(),
      description: 'Custom academic batch',
      created_at: new Date().toISOString(),
    };

    setBatches([...batches, newBatch]);
    setSelectedBatchId(newBatch.id);
    setNewBatchName('');
    setIsAddingBatch(false);
  };

  // Handle Add Subject inside Batch (Page 3 item b)
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;

    const newSubj: Subject = {
      id: `subj-${Date.now()}`,
      name: newSubjectName,
      code: newSubjectCode || 'SUBJ-101',
      batch_id: selectedBatchId,
      description: 'Curriculum subject',
      created_at: new Date().toISOString(),
    };

    setSubjects([...subjects, newSubj]);
    setSelectedSubjectId(newSubj.id);
    setNewSubjectName('');
    setNewSubjectCode('');
    setIsAddingSubject(false);
  };

  // Handle Student Join (Page 3 item a)
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentRoll.trim()) return;

    setJoinedStudents([
      ...joinedStudents,
      {
        id: `st-${Date.now()}`,
        name: newStudentName,
        roll: newStudentRoll,
        college: newStudentCollege || 'Apex Model College',
        email: `${newStudentRoll.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.bd`,
        joinedDate: new Date().toISOString().split('T')[0],
      },
    ]);

    setNewStudentName('');
    setNewStudentRoll('');
    setNewStudentCollege('');
  };

  const filteredSubjects = subjects.filter((s) => s.batch_id === selectedBatchId);
  const filteredExams = exams.filter((e) => e.subject_id === selectedSubjectId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ──────────────────── INSTITUTION PORTAL BANNER (PAGE 3) ──────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {currentUser?.institution_name || INITIAL_INSTITUTION.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Institution Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Admin Hierarchy: Batch ➜ Subject ➜ Exam (PDF Page 3 Specification)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToBuilder}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Exam</span>
            </button>
          </div>
        </div>

        {/* ──────────────────── HIERARCHY PILLS: BATCH -> SUBJECT -> EXAM (PAGE 3 ITEM B) ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* 1. BATCHES */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>1. Batches ({batches.length})</span>
              </span>
              <button
                onClick={() => setIsAddingBatch(!isAddingBatch)}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                + Add Batch
              </button>
            </div>

            {isAddingBatch && (
              <form onSubmit={handleAddBatch} className="p-2.5 bg-white rounded-xl border border-emerald-300 space-y-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. HSC 2026 Medical Batch"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                />
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingBatch(false)}
                    className="px-2 py-1 text-[11px] text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-600 rounded-md"
                  >
                    Save Batch
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-1.5">
              {batches.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBatchId(b.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                    selectedBatchId === b.id
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="truncate">{b.name}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${selectedBatchId === b.id ? 'text-white' : 'text-slate-400'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* 2. SUBJECTS (Inside Batch) */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookPlus className="w-4 h-4 text-emerald-600" />
                <span>2. Subjects ({filteredSubjects.length})</span>
              </span>
              <button
                onClick={() => setIsAddingSubject(!isAddingSubject)}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                + Add Subject
              </button>
            </div>

            {isAddingSubject && (
              <form onSubmit={handleAddSubject} className="p-2.5 bg-white rounded-xl border border-emerald-300 space-y-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Chemistry 1st Paper"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Code e.g. CHEM-101"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                />
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingSubject(false)}
                    className="px-2 py-1 text-[11px] text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-600 rounded-md"
                  >
                    Save Subject
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-1.5">
              {filteredSubjects.length === 0 ? (
                <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-400">
                  No subjects in this batch yet.
                </div>
              ) : (
                filteredSubjects.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSubjectId(s.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                      selectedSubjectId === s.id
                        ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="truncate">{s.name}</div>
                      <div className={`text-[10px] ${selectedSubjectId === s.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {s.code}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${selectedSubjectId === s.id ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. EXAMS (Inside Subject) */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>3. Exams ({filteredExams.length})</span>
              </span>
              <button
                onClick={onNavigateToBuilder}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                + New Exam
              </button>
            </div>

            <div className="space-y-2">
              {filteredExams.length === 0 ? (
                <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-400">
                  No exams under this subject yet.
                </div>
              ) : (
                filteredExams.map((e) => (
                  <div
                    key={e.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-slate-900 leading-snug">{e.title}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {e.total_marks} Marks
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Code: <strong className="text-slate-800 font-mono">{e.join_code}</strong></span>
                      <button
                        onClick={() => onNavigateToEvaluate(e.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] shadow-sm transition-colors"
                      >
                        ⚡ Evaluate
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────── STUDENT ROSTER: STUDENTS JOIN (PAGE 3 ITEM A) ──────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Joined Students Roster</span>
            </h3>
            <p className="text-xs text-slate-500">
              Page 3 Requirement: Students can join by providing Name, ID / Roll, and College info.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {joinedStudents.length} Active Students
          </span>
        </div>

        {/* Add Student Form */}
        <form
          onSubmit={handleAddStudent}
          className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
        >
          <input
            type="text"
            required
            placeholder="Student Name *"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <input
            type="text"
            required
            placeholder="Student Roll / ID *"
            value={newStudentRoll}
            onChange={(e) => setNewStudentRoll(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="College / School Name"
            value={newStudentCollege}
            onChange={(e) => setNewStudentCollege(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <button
            type="submit"
            className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all text-xs flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Join Student</span>
          </button>
        </form>

        {/* Students Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Roll / ID</th>
                <th className="py-3 px-4">College / Institution</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {joinedStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{st.name}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-700">{st.roll}</td>
                  <td className="py-3 px-4">{st.college}</td>
                  <td className="py-3 px-4 text-slate-500">{st.email}</td>
                  <td className="py-3 px-4 text-slate-500">{st.joinedDate}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigateToEvaluate('exam-001')}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition-colors"
                    >
                      Grade Khata
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
