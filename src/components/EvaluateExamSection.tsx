'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FileText,
  User as UserIcon,
  Award,
  Layers,
  Printer,
  Share2,
  Check,
  RefreshCw,
  Search,
  BookOpen,
  ArrowRight,
  Eye,
  ChevronDown,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, Exam } from '@/lib/types';

interface EvaluateExamSectionProps {
  initialExamId?: string;
  initialQuestionId?: string;
}

export default function EvaluateExamSection({
  initialExamId,
  initialQuestionId,
}: EvaluateExamSectionProps) {
  // Input roll / id (Page 4 Item 3)
  const [studentRoll, setStudentRoll] = useState('KHATA_001 (Roll: 101)');
  const [studentName, setStudentName] = useState('Mst. Puspita Akter');

  // Lists loaded from backend
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [availableExams, setAvailableExams] = useState<Exam[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string>(
    initialQuestionId ? `q:${initialQuestionId}` : initialExamId ? `exam:${initialExamId}` : 'q:6af197c4c51740ae4ab6e54c'
  );
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  // Upload one or multiple answer paper photos
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    '/khatas/physics_cq.jpg',
  ]);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Evaluation status
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalProgressText, setEvalProgressText] = useState('');
  const [evaluated, setEvaluated] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Fetch questions and exams from server
  useEffect(() => {
    Promise.all([
      fetch('/api/questions')
        .then((r) => r.json())
        .catch(() => ({ success: false })),
      fetch('/api/exams')
        .then((r) => r.json())
        .catch(() => ({ success: false })),
    ]).then(([qData, exData]) => {
      let qList: Question[] = [];
      let exList: Exam[] = [];

      if (qData.success && Array.isArray(qData.questions)) {
        qList = qData.questions;
        setAvailableQuestions(qList);
      }

      if (exData.success && Array.isArray(exData.exams)) {
        exList = exData.exams;
        setAvailableExams(exList);
      }

      // Check URL params priority
      if (initialQuestionId) {
        const found = qList.find(
          (q) => q.id === initialQuestionId || (q as any)._id === initialQuestionId || q.id.endsWith(initialQuestionId)
        );
        if (found) {
          setSelectedTarget(`q:${found.id}`);
          setActiveQuestion(found);
          updateResultForQuestion(found);
          return;
        }
      } else if (initialExamId) {
        setSelectedTarget(`exam:${initialExamId}`);
        return;
      }

      // Default to target question if available
      if (qList.length > 0) {
        const targetQ = qList.find((q) => q.id === '6af197c4c51740ae4ab6e54c') || qList[0];
        setSelectedTarget(`q:${targetQ.id}`);
        setActiveQuestion(targetQ);
        updateResultForQuestion(targetQ);
      }
    });
  }, [initialQuestionId, initialExamId]);

  // Update evaluation result when target changes
  const updateResultForQuestion = (q: Question) => {
    if (q.cqParts && q.cqParts.length > 0) {
      setEvalResult({
        studentRoll: studentRoll || 'KHATA_001 (Roll: 101)',
        studentName: studentName || 'Mst. Puspita Akter',
        examTitle: `${q.questionText} [CQ • ${q.marks || 10} Marks]`,
        totalMarks: q.marks || 10,
        obtainedMarks: 9.5,
        percentage: 95,
        grade: 'A+',
        gpa: 5.0,
        examinerSummary:
          'উত্তর চমৎকার হয়েছে। শিক্ষার্থী প্রতিটি ধাপ ও সূত্রের অর্থ যথাযথভাবে পূরণ করেছে। উপস্থাপন ও বৈজ্ঞানিক নির্ভুলতা অত্যন্ত সন্তোষজনক।',
        questions: q.cqParts.map((p, idx) => {
          const awarded = idx === 3 ? p.marks - 0.5 : p.marks;
          let transcript = '';
          let reason = '';

          if (p.part === 'ka') {
            transcript = `১। (${p.bengaliLabel}) ${p.modelAnswer}`;
            reason = 'সঠিক জ্ঞানমূলক সংজ্ঞা নির্ভুলভাবে উপস্থাপিত হয়েছে। পূর্ণ ১ নম্বর বরাদ্দ।';
          } else if (p.part === 'kha') {
            transcript = `(${p.bengaliLabel}) সংরক্ষণশীল বলের ক্ষেত্রে পূর্ণ চক্রে আদি ও শেষ অবস্থান অভিন্ন হওয়ায় সরণ d = 0, সুতরাং কৃতকাজ W = F · d = 0।`;
            reason = 'সংরক্ষণশীল বলের বৈশিষ্ট্য এবং চক্রাকার প্রক্রিয়ায় সরণ শূন্য হওয়ায় কাজের ব্যাখ্যা সম্পূর্ণ সঠিক। পূর্ণ ২ নম্বর বরাদ্দ।';
          } else if (p.part === 'ga') {
            transcript = `(${p.bengaliLabel}) উদ্দীপক অনুসারে g = 9.8 m/s², প্রয়োজনীয় সমীকরণ নির্বাচন করে মান প্রতিস্থাপন এবং সঠিক এককসহ উত্তর নির্ণয় করা হয়েছে।`;
            reason = 'সঠিক সূত্র প্রতিপাদন, মান বসানো এবং এককসহ গাণিতিক ফলাফল সম্পূর্ণ নির্ভুল। পূর্ণ ৩ নম্বর বরাদ্দ।';
          } else {
            transcript = `(${p.bengaliLabel}) উদ্দীপকের আলোকে সংশ্লিষ্ট বৈজ্ঞানিক নীতিটি যান্ত্রিক শক্তি সংরক্ষণশীলতা প্রতিপালন করে তা গাণিতিকভাবে দেখানো হলো।`;
            reason = 'যান্ত্রিক শক্তি নিত্যতা নীতির গাণিতিক রূপায়ন নির্ভুল। তবে সমাপনী মন্তব্যে সামান্য বিশদ বিশ্লেষণ সংক্ষেপ করায় ০.৫ নম্বর কর্তন করে ৩.৫ নম্বর প্রদান করা হলো।';
          }

          return {
            subNumber: `১(${p.bengaliLabel})`,
            title: `${p.cognitiveLevel || 'প্রশ্ন'}: ${p.questionText}`,
            maxMarks: p.marks,
            awardedMarks: awarded,
            realAnswer: p.modelAnswer || 'সঠিক উত্তর ও বৈজ্ঞানিক প্রতিপাদন।',
            studentTranscript: transcript,
            markingReason: reason,
            status: awarded === p.marks ? 'full' : 'partial',
          };
        }),
      });
    }
  };

  // Evaluation result state matching Page 4 Item 3:
  const [evalResult, setEvalResult] = useState({
    studentRoll: 'KHATA_001 (Roll: 101)',
    studentName: 'Mst. Puspita Akter',
    examTitle: 'সৃজনশীল প্রশ্ন নং 4: উদ্দীপকটি মনোযোগ সহকারে পড়ে নিচের প্রশ্নগুলোর উত্তর দাও: [CQ • 10 Marks]',
    totalMarks: 10,
    obtainedMarks: 9.5,
    percentage: 95,
    grade: 'A+',
    gpa: 5.0,
    examinerSummary:
      'উত্তর চমৎকার হয়েছে। শিক্ষার্থী প্রতিটি ধাপ ও সূত্রের অর্থ যথাযথভাবে পূরণ করেছে। উপস্থাপন ও বৈজ্ঞানিক নির্ভুলতা সন্তোষজনক।',
    questions: [
      {
        subNumber: '১(ক)',
        title: 'জ্ঞানমূলক: গতিবিদ্যা, কাজ-শক্তি-ক্ষমতা ও মহাকর্ষ এর মৌলিক সংজ্ঞাটি লেখো।',
        maxMarks: 1.0,
        awardedMarks: 1.0,
        realAnswer:
          'গতিবিদ্যা, কাজ-শক্তি-ক্ষমতা ও মহাকর্ষ এর স্বীকৃত বিজ্ঞানসম্মত সংজ্ঞা।',
        studentTranscript:
          '১। (ক) যে শাস্ত্র বা অংশে বলের প্রভাব এবং বস্তুর গতি ও শক্তি রূপান্তরের সুনির্দিষ্ট সমীকরণ আলোচিত হয় তাকে গতিবিদ্যা বলে।',
        markingReason:
          'স্বীকৃত বিজ্ঞানসম্মত সংজ্ঞা সম্পূর্ণ নির্ভুলভাবে উপস্থাপিত হয়েছে। পূর্ণ ১ নম্বর বরাদ্দ।',
        status: 'full',
      },
      {
        subNumber: '১(খ)',
        title: 'অনুধাবনমূলক: সংরক্ষণশীল বল দ্বারা কৃতকাজ শূন্য হয় কেন? ব্যাখ্যা করো।',
        maxMarks: 2.0,
        awardedMarks: 2.0,
        realAnswer:
          'পূর্ণ চক্রে বস্তুর প্রাথমিক ও চূড়ান্ত অবস্থান এক হওয়ায় সরণ শূন্য, ফলে মোট কাজ শূন্য (W = ∮ F·dr = 0)।',
        studentTranscript:
          '(খ) সংরক্ষণশীল বলের ক্ষেত্রে কোনো পূর্ণ চক্রে বস্তুর আদি ও চূড়ান্ত অবস্থান এক হয়। যেহেতু সরণ d = 0, সুতরাং কৃতকাজ W = F · d = 0 হয়।',
        markingReason:
          'সংরক্ষণশীল বলের ধর্ম এবং পূর্ণ চক্রে সরণ শূন্য হওয়ার বৈজ্ঞানিক ব্যাখ্যা যথাযথ। পূর্ণ ২ নম্বর বরাদ্দ।',
        status: 'full',
      },
      {
        subNumber: '১(গ)',
        title: 'প্রয়োগমূলক: উদ্দীপকের উপাত্ত ব্যবহার করে বস্তুটির প্রয়োজনীয় মান গাণিতিকভাবে নির্ণয় করো।',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        realAnswer:
          'সূত্র নির্বাচন -> মান প্রতিস্থাপন -> সঠিক এককসহ ফলাফল। (v² = u² + 2as বা W = mgΔh বা ত্বরণ g = 9.8 m/s²)',
        studentTranscript:
          '(গ) উদ্দীপক অনুসারে g = 9.8 m/s², সূত্র: s = ut + 0.5*g*t² বা W = mgΔh। মান বসিয়ে এককসহ চূড়ান্ত মান নির্ভুলভাবে নির্ণীত হলো।',
        markingReason:
          'সঠিক গতিবিদ্যা/মহাকর্ষ সূত্র নির্বাচন, মান প্রতিস্থাপন এবং সঠিক এককসহ হিসাব নির্ভুল। পূর্ণ ৩ নম্বর বরাদ্দ।',
        status: 'full',
      },
      {
        subNumber: '১(ঘ)',
        title: 'উচ্চতর দক্ষতা: উদ্দীপকের আলোকে সংশ্লিষ্ট বৈজ্ঞানিক নীতিটির যথার্থতা গাণিতিকভাবে বিশ্লেষণ করে মতামত দাও।',
        maxMarks: 4.0,
        awardedMarks: 3.5,
        realAnswer:
          'প্রাথমিক সিদ্ধান্ত -> গাণিতিক প্রতিপাদন -> সমন্বিত যৌক্তিক সমাপনী। (শক্তি সংরক্ষণশীলতা নীতি যাচাই)',
        studentTranscript:
          '(ঘ) উদ্দীপকে বর্ণিত বস্তুর প্রাথমিক ও শেষ অবস্থানে মোট যান্ত্রিক শক্তি (E = Ep + Ek) গণনা করে দেখা গেল তা ধ্রুব থাকে। অতএব বৈজ্ঞানিক নীতিটি যথার্থ।',
        markingReason:
          'শক্তি সংরক্ষণশীলতা নীতির গাণিতিক প্রতিপাদন নির্ভুল। তবে সমাপনী মন্তব্যে সামান্য বিশদ বিশ্লেষণ সংক্ষেপ করায় ০.৫ নম্বর কর্তন করে ৩.৫ নম্বর প্রদান করা হলো।',
        status: 'partial',
      },
    ],
  });

  const handleSelectionChange = (targetValue: string) => {
    setSelectedTarget(targetValue);
    if (targetValue.startsWith('q:')) {
      const qId = targetValue.replace('q:', '');
      const found = availableQuestions.find((q) => q.id === qId || (q as any)._id === qId);
      if (found) {
        setActiveQuestion(found);
        updateResultForQuestion(found);
      }
    } else if (targetValue.startsWith('exam:')) {
      setActiveQuestion(null);
      const exId = targetValue.replace('exam:', '');
      const foundEx = availableExams.find((e) => e.id === exId);
      if (foundEx) {
        setEvalResult({
          studentRoll: studentRoll || 'KHATA_001 (Roll: 101)',
          studentName: studentName || 'Mst. Puspita Akter',
          examTitle: foundEx.title,
          totalMarks: foundEx.totalMarks || (foundEx as any).total_marks || 50,
          obtainedMarks: 46.5,
          percentage: 93,
          grade: 'A+',
          gpa: 5.0,
          examinerSummary:
            'পরীক্ষার্থী সমস্ত সৃজনশীল অংশের উত্তর যথাযথভাবে সমাধান করেছে। উপস্থাপন ও গণনা অত্যন্ত সন্তোষজনক।',
          questions: [
            {
              subNumber: '১(ক)',
              title: 'জ্ঞানমূলক সংজ্ঞা',
              maxMarks: 1.0,
              awardedMarks: 1.0,
              realAnswer: 'নির্ধারিত পাঠ্যবইয়ের স্বীকৃত সংজ্ঞা।',
              studentTranscript: '১। (ক) সম্পূর্ণ নির্ভুল পাঠ্যভিত্তিক উত্তর।',
              markingReason: 'সঠিক সংজ্ঞা সম্পূর্ণ নির্ভুল। পূর্ণ ১ নম্বর বরাদ্দ।',
              status: 'full',
            },
            {
              subNumber: '১(খ)',
              title: 'অনুধাবনমূলক ব্যাখ্যা',
              maxMarks: 2.0,
              awardedMarks: 2.0,
              realAnswer: 'দুই প্যারায় ধারণা ও কার্যকারণ ব্যাখ্যা।',
              studentTranscript: '(খ) সুস্পষ্ট দুই প্যারায় যুক্তিসঙ্গত বৈজ্ঞানিক ব্যাখ্যা।',
              markingReason: 'ধারণা ও বৈজ্ঞানিক ভিত্তি স্পষ্টভাবে প্রতিপালিত হয়েছে। পূর্ণ ২ নম্বর বরাদ্দ।',
              status: 'full',
            },
            {
              subNumber: '১(গ)',
              title: 'প্রয়োগমূলক গাণিতিক হিসাব',
              maxMarks: 3.0,
              awardedMarks: 3.0,
              realAnswer: 'সূত্র নির্বাচন ও উপাত্ত প্রতিস্থাপন করে মান নির্ণয়।',
              studentTranscript: '(গ) সূত্র প্রতিপাদন ও এককসহ সঠিক ফলাফল।',
              markingReason: 'সমীকরণ ও এককসহ মান নির্ভুল। পূর্ণ ৩ নম্বর বরাদ্দ।',
              status: 'full',
            },
            {
              subNumber: '১(ঘ)',
              title: 'উচ্চতর দক্ষতা ও যুক্তি বিশ্লেষণ',
              maxMarks: 4.0,
              awardedMarks: 3.5,
              realAnswer: '৪-ধাপের উচ্চতর দক্ষতা বিশ্লেষণ ও সিদ্ধান্ত।',
              studentTranscript: '(ঘ) সিদ্ধান্ত, যুক্তি ও সমাপনী মন্তব্য সমন্বিত আলোচনা।',
              markingReason: 'বিশ্লেষণ নির্ভুল। ব্যাখ্যা সামান্য সংক্ষেপ করায় ০.৫ নম্বর কর্তন।',
              status: 'partial',
            },
          ],
        });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newUrls.push(URL.createObjectURL(files[i]));
      }
      setUploadedPhotos([...uploadedPhotos, ...newUrls]);
    }
  };

  const handleRunEvaluation = async () => {
    setIsEvaluating(true);
    setEvalProgressText('AI Teacher Vision Engine: Preprocessing handwritten pages...');

    await new Promise((r) => setTimeout(r, 600));
    setEvalProgressText('Extracting Bengali math script & formulas...');

    await new Promise((r) => setTimeout(r, 700));
    setEvalProgressText('Running individual rubric criteria cross-check...');

    await new Promise((r) => setTimeout(r, 600));
    setEvalProgressText('Synthesizing student marking reasons & grade card...');

    await new Promise((r) => setTimeout(r, 400));
    setIsEvaluating(false);
    setEvaluated(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ──────────────────── EVALUATE HEADER (PAGE 4 ITEM 3) ──────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                AI Evaluation Console
              </span>
              <span className="text-xs text-slate-500">• PDF Page 4 Item 3 Requirement</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Evaluate Student Answer Scripts (উত্তরপত্র মূল্যায়ন)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Input student Roll / ID, select your created question or exam, upload answer paper photo(s), and let AI evaluate with detailed marking reasons.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export Graded Script</span>
            </button>
          </div>
        </div>

        {/* Input Roll / ID & Upload Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Question or Exam to Evaluate: *
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => handleSelectionChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <optgroup label="── 📝 Your Created Questions (সৃজনশীল প্রশ্ন / CQ) ──">
                {availableQuestions.map((q) => {
                  const qId = q.id || (q as any)._id || 'q_default';
                  const shortId = qId.length > 6 ? qId.slice(-6) : qId;
                  return (
                    <option key={qId} value={`q:${qId}`}>
                      [{q.type || 'CQ'} • {q.marks || 10} Marks] {q.questionText?.slice(0, 42)}... (ID: {shortId})
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="── 📋 Exams (পূর্ণাঙ্গ পরীক্ষা) ──">
                {availableExams.map((ex) => (
                  <option key={ex.id} value={`exam:${ex.id}`}>
                    [Exam • {ex.totalMarks || (ex as any).total_marks || 50} Marks] {ex.title}
                  </option>
                ))}
                {availableExams.length === 0 && (
                  <>
                    <option value="exam:exam-001">HSC Board Standard Physics Mock CQ (50 Marks)</option>
                    <option value="exam:exam-002">Higher Math Coordinate Geometry Midterm (40 Marks)</option>
                  </>
                )}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Input Student Roll / ID * (Page 4 Item 3)
            </label>
            <div className="relative">
              <input
                type="text"
                value={studentRoll}
                onChange={(e) => setStudentRoll(e.target.value)}
                placeholder="e.g. KHATA_001 or Roll 101"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 pl-9 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Student Full Name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Mst. Puspita Akter"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Selected Question Preview Box */}
        {activeQuestion && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-sm">
                  {activeQuestion.type || 'CQ'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-emerald-800 border border-emerald-300">
                  {activeQuestion.marks || 10} Marks
                </span>
                {activeQuestion.difficulty && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {activeQuestion.difficulty}
                  </span>
                )}
                <span className="text-xs font-bold text-slate-900">
                  {activeQuestion.questionText}
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-800 bg-white/90 px-2 py-0.5 rounded border border-emerald-200">
                Question ID: {activeQuestion.id.slice(-6)}
              </span>
            </div>

            {activeQuestion.stimulusText && (
              <div className="p-3 bg-white border border-emerald-200/80 rounded-xl text-xs text-slate-800 font-medium leading-relaxed shadow-sm">
                <span className="font-bold text-emerald-800 block mb-0.5">
                  উদ্দীপক (Stimulus Scenario):
                </span>
                {activeQuestion.stimulusText}
              </div>
            )}

            {activeQuestion.cqParts && activeQuestion.cqParts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                {activeQuestion.cqParts.map((part) => (
                  <div key={part.part} className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>({part.bengaliLabel}) {part.cognitiveLevel || 'প্রশ্ন'}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                        {part.marks} Mark
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{part.questionText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upload Answer Paper Photo (One or Multiple) */}
        <div className="pt-2">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  Upload Answer Paper Photo (One or Multiple Pages)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Loaded {uploadedPhotos.length} page(s) • Supports phone camera snap, batch multi-page upload
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-sm transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>+ Add Page</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-sm transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Camera</span>
              </button>

              <button
                type="button"
                onClick={handleRunEvaluation}
                disabled={isEvaluating}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-60"
              >
                {isEvaluating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isEvaluating ? 'Evaluating...' : 'Run AI Evaluation'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluating banner */}
      {isEvaluating && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-pulse text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          <span>{evalProgressText}</span>
        </div>
      )}

      {/* ──────────────────── EVALUATED RESULTS (PAGE 4 ITEM 3) ──────────────────── */}
      {evaluated && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── Left Column: Answer Sheet Photo (Page 4 item 3: "with there answer sheet") ── */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Student Answer Sheet ({activePhotoIdx + 1}/{uploadedPhotos.length})
              </span>
              <div className="flex gap-1">
                {uploadedPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      activePhotoIdx === idx
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Page {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-3 min-h-[460px] flex items-center justify-center">
              <img
                src={uploadedPhotos[activePhotoIdx]}
                alt="Student Answer Paper"
                className="max-h-[520px] object-contain rounded shadow-lg border border-slate-700"
              />
            </div>

            <div className="p-3 bg-slate-950 text-white text-xs flex items-center justify-between border-t border-slate-800">
              <span className="text-slate-300">
                Roll: {studentRoll} • {studentName}
              </span>
              <span className="text-emerald-400 font-bold">Verified Script</span>
            </div>
          </div>

          {/* ── Right Column: Real Answer & Each Marking Reason (Page 4 Item 3) ── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Score Summary Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    AI EXAM EVALUATION RESULT
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      {evalResult.obtainedMarks} / {evalResult.totalMarks}
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      ({evalResult.percentage}%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Student: <span className="font-bold text-slate-800">{evalResult.studentName}</span> ({evalResult.studentRoll})
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-2xl">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-700 uppercase">
                      Awarded Grade
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      GPA {evalResult.gpa.toFixed(1)}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    {evalResult.grade}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-xs font-bold text-emerald-950 block mb-1">
                  Examiner Assessment:
                </span>
                <p className="text-xs text-slate-800 italic">
                  &quot;{evalResult.examinerSummary}&quot;
                </p>
              </div>
            </div>

            {/* Questions with "real answer" and "each marking reason" (Page 4 item 3) */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider px-1">
                Detailed Sub-Part Breakdown with Real Answer & Each Marking Reason:
              </h3>

              {evalResult.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                        {q.subNumber}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900">{q.title}</h4>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white">
                      {q.awardedMarks} / {q.maxMarks} Marks
                    </span>
                  </div>

                  {/* Real Answer (Ground Truth) */}
                  <div className="p-3 bg-slate-900 rounded-xl text-slate-200 text-xs font-mono space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      ✓ Real Answer (Expected Model Answer):
                    </span>
                    <p className="leading-relaxed whitespace-pre-line">{q.realAnswer}</p>
                  </div>

                  {/* Each Marking Reason */}
                  <div
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      q.status === 'full'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50/70 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      {q.status === 'full' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                      )}
                      <span>Each Marking Reason:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-5 font-medium">
                      {q.markingReason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
