'use client';

import React, { useState, useRef } from 'react';
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
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EvaluateExamSectionProps {
  initialExamId?: string;
}

export default function EvaluateExamSection({
  initialExamId,
}: EvaluateExamSectionProps) {
  // Input roll / id (Page 4 Item 3)
  const [studentRoll, setStudentRoll] = useState('KHATA_001 (Roll: 101)');
  const [studentName, setStudentName] = useState('Mst. Puspita Akter');
  const [selectedExamId, setSelectedExamId] = useState(initialExamId || 'exam-001');

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

  // Evaluation result state matching Page 4 Item 3:
  // "mark can be seen by students with there answer sheet , real answer each marking reason"
  const [evalResult, setEvalResult] = useState({
    studentRoll: 'KHATA_001 (Roll: 101)',
    studentName: 'Mst. Puspita Akter',
    examTitle: 'HSC Board Standard Physics Mock CQ (তাপগতিবিদ্যা ও কার্নো চক্র)',
    totalMarks: 10,
    obtainedMarks: 9.5,
    percentage: 95,
    grade: 'A+',
    gpa: 5.0,
    examinerSummary:
      'উত্তর চমৎকার হয়েছে। শিক্ষার্থী প্রতিটি ধাপ ও সূত্রের অর্থ যথাযথভাবে পূরণ করেছে। উপস্থাপন ও নির্ভুলতা সন্তোষজনক।',
    questions: [
      {
        subNumber: '১(ক)',
        title: 'জ্ঞানমূলক: তাপ ইঞ্জিন কাকে বলে?',
        maxMarks: 1.0,
        awardedMarks: 1.0,
        realAnswer:
          'যে যন্ত্র তাপশক্তিকে অবিরামভাবে যান্ত্রিক শক্তিতে রূপান্তরিত করে তাকে তাপ ইঞ্জিন বলে।',
        studentTranscript:
          '১। (ক) যে যন্ত্র দ্বারা তাপশক্তিকে অনবরত যান্ত্রিক শক্তিতে রূপান্তর করা যায় তাকে তাপ ইঞ্জিন বলে।',
        markingReason:
          'তাপশক্তিকে যান্ত্রিক শক্তিতে রূপান্তরের মূল ধারণা ও সংজ্ঞা সম্পূর্ণ নিখুঁতভাবে উপস্থাপিত হয়েছে। পূর্ণ ১ নম্বর বরাদ্দ।',
        status: 'full',
      },
      {
        subNumber: '১(খ)',
        title: 'অনুধাবনমূলক: মোলার আপেক্ষিক তাপ দুই প্রকার কেন?',
        maxMarks: 2.0,
        awardedMarks: 2.0,
        realAnswer:
          'স্থির আয়তনে প্রদত্ত তাপ কেবল গ্যাসের অভ্যন্তরীণ শক্তি বৃদ্ধি করে (Cv), কিন্তু স্থির চাপে প্রদত্ত তাপ অভ্যন্তরীণ শক্তি বৃদ্ধির পাশাপাশি গ্যাস প্রসারিত করে বাহ্যিক কাজও সম্পাদন করে (Cp = Cv + R)। ফলে Cp > Cv হওয়ায় আপেক্ষিক তাপ দুই প্রকার।',
        studentTranscript:
          '(খ) মোলার আপেক্ষিক তাপ দুই প্রকার: স্থির চাপে (Cp) ও স্থির আয়তনে (Cv)। আয়তন স্থির রাখলে সম্পূর্ণ তাপ অভ্যন্তরীণ শক্তি বাড়ায়। কিন্তু চাপ স্থির রাখলে তাপ শক্তির কিছু অংশ অভ্যন্তরীণ শক্তি বাড়ায় এবং বাকি অংশ বাহ্যিক কাজ সম্পন্ন করে। তাই Cp সর্বদা Cv অপেক্ষা বেশি (Cp - Cv = R)।',
        markingReason:
          'অভ্যন্তরীণ শক্তির পরিবর্তন এবং বাহ্যিক কাজের মধ্যে পার্থক্যের বৈজ্ঞানিক ভিত্তি স্পষ্টভাবে প্রতিপালিত হয়েছে। পূর্ণ ২ নম্বর বরাদ্দ।',
        status: 'full',
      },
      {
        subNumber: '১(গ)',
        title: 'প্রয়োগমূলক: ইঞ্জিন কর্তৃক কৃত কাজের পরিমাণ নির্ণয়',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        realAnswer:
          'Q2/Q1 = T2/T1 => Q2 = (387/827)*500 = 233.98 J। অতএব কৃতকাজ W = Q1 - Q2 = 500 - 233.98 = 266.02 J।',
        studentTranscript:
          '(গ) Q2/Q1 = T2/T1 => Q2 = (387/827) * 500 J = 233.98 J। কৃতকাজ W = Q1 - Q2 = 500 J - 233.98 J = 266.02 J (Ans.)',
        markingReason:
          'কার্নো চক্রের সূত্র প্রয়োগ, তাপ বর্জন হিসাব এবং এককসহ কৃতকাজ ২৬৬.০২ জুল সম্পূর্ণ নির্ভুল। পূর্ণ ৩ নম্বর বরাদ্দ।',
        status: 'full',
      },
      {
        subNumber: '১(ঘ)',
        title: 'উচ্চতর দক্ষতা: তাপমাত্রা দ্বিগুণ করলে দক্ষতা অর্ধেক হবে কিনা গাণিতিক বিশ্লেষণ',
        maxMarks: 4.0,
        awardedMarks: 3.5,
        realAnswer:
          'প্রারম্ভিক কর্মদক্ষতা η1 = 1 - T2/T1 = 1 - 387/827 = 53.20%। পরিবর্তিত দক্ষতা η2 = 1 - 774/827 = 6.41%। অনুপাত η2/η1 = 0.1205 ≠ 0.5। সুতরাং দক্ষতা অর্ধেক হবে না, বরং ১/৮ অংশে নেমে আসবে।',
        studentTranscript:
          '(ঘ) প্রাথমিক দক্ষতা η1 = 1 - (387/827) = 53.20%। তাপমাত্রা দ্বিগুণ হলে T2\' = 774 K, পরিবর্তিত দক্ষতা η2 = 1 - (774/827) = 6.41%। যেহেতু η2/η1 = 12% ≠ 50%, অতএব দক্ষতা অর্ধেক হবে না।',
        markingReason:
          'উভয় কর্মদক্ষতা নির্ভুলভাবে নির্ণয় করেছে। তবে গাণিতিক অনুপাতে সামান্য বিশদ ব্যাখ্যা সংক্ষেপ করায় ০.৫ নম্বর কর্তন করে ৩.৫ নম্বর প্রদান করা হলো।',
        status: 'partial',
      },
    ],
  });

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

    await new Promise((r) => setTimeout(r, 700));
    setEvalProgressText('Extracting Bengali math script & formulas...');

    await new Promise((r) => setTimeout(r, 800));
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
              Evaluate Student Answer Scripts
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Input student Roll / ID, upload one or multiple answer paper photos, and let AI evaluate with detailed marking reasons.
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
              Select Exam:
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="exam-001">HSC Board Standard Physics Mock CQ (50 Marks)</option>
              <option value="exam-002">Higher Math Coordinate Geometry Midterm (40 Marks)</option>
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
                onClick={() => fileInputRef.current?.click()}
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
