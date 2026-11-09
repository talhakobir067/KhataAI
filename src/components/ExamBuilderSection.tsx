'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Award,
  FileText,
  HelpCircle,
  CheckCircle2,
  Sliders,
  Copy,
  QrCode,
  Share2,
  Check,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Exam, Question, MCQOption, RubricCriterion } from '../lib/types';
import RubricModal from './RubricModal';

interface ExamBuilderSectionProps {
  onNavigateToEvaluate?: (examId: string) => void;
}

interface QuestionBlock {
  id: string;
  questionNumber: number;
  paragraph?: string;
  additionalInfo?: string;
  items: Array<{
    id: string;
    type: 'mcq' | 'written';
    subNumber: string; // e.g. "১(ক)", "১(খ)", "Q1"
    text: string;
    fullMarks: number;
    modelAnswer: string;
    additionalInfo: string;
    mcqOptions?: MCQOption[];
    rubricCriteria: RubricCriterion[];
  }>;
}

export default function ExamBuilderSection({
  onNavigateToEvaluate,
}: ExamBuilderSectionProps) {
  // Exam metadata
  const [examTitle, setExamTitle] = useState('HSC Board Standard Physics CQ Exam 2026');
  const [subjectName, setSubjectName] = useState('Physics 2nd Paper (তাপগতিবিদ্যা ও আধুনিক পদার্থবিজ্ঞান)');
  const [durationMinutes, setDurationMinutes] = useState(75);
  const [isPublic, setIsPublic] = useState(true);
  const [joinCode, setJoinCode] = useState('PHY-8924');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Question sections list (Page 4 a, e)
  const [questions, setQuestions] = useState<QuestionBlock[]>([
    {
      id: 'qb-1',
      questionNumber: 1,
      paragraph:
        'P-V লেখচিত্রে একটি কার্নো ইঞ্জিন প্রদর্শিত হলো: উৎসের তাপমাত্রা T1 = 827 K, গৃহীত তাপ Q1 = 500 J এবং তাপগ্রাহকের তাপমাত্রা T2 = 387 K। ইঞ্জিনটি চার ধাপে কাজ করে।',
      additionalInfo:
        'AI Grading Rule: Accept calculation within +/- 1 Joule tolerance. Subparts (ক) to (ঘ) follow Bangladesh NCTB Creative Question Rubric.',
      items: [
        {
          id: 'item-1-a',
          type: 'written',
          subNumber: '১(ক)',
          text: 'তাপ ইঞ্জিন কাকে বলে?',
          fullMarks: 1.0,
          modelAnswer:
            'যে যন্ত্র তাপশক্তিকে অবিরামভাবে যান্ত্রিক শক্তিতে রূপান্তরিত করে তাকে তাপ ইঞ্জিন বলে।',
          additionalInfo: 'Do not deduct for minor spelling if definition is clear',
          rubricCriteria: [
            {
              id: 'rc-1.1',
              description: 'তাপশক্তিকে যান্ত্রিক শক্তিতে রূপান্তরকারী যন্ত্র হিসেবে উল্লেখ করা',
              marks: 1.0,
            },
          ],
        },
        {
          id: 'item-1-b',
          type: 'written',
          subNumber: '১(খ)',
          text: 'গ্যাসের মোলার আপেক্ষিক তাপ দুই প্রকার কেন? ব্যাখ্যা কর।',
          fullMarks: 2.0,
          modelAnswer:
            'গ্যাসে তাপ প্রয়োগ করলে চাপ ও আয়তন পরিবর্তিত হয়। স্থির আয়তনে সমস্ত তাপ অভ্যন্তরীণ শক্তিতে ব্যয় হয় (Cv), কিন্তু স্থির চাপে অভ্যন্তরীণ শক্তির সাথে বাহ্যিক কাজও সম্পাদিত হয় (Cp = Cv + R)। ফলে Cp > Cv হওয়ায় আপেক্ষিক তাপ দুই প্রকার।',
          additionalInfo: 'Look for differentiation between Cp and Cv',
          rubricCriteria: [
            {
              id: 'rc-1.2a',
              description: 'চাপ ও আয়তন উভয়ই স্বাধীন চলক এবং তাপ প্রয়োগে উভয়ের পরিবর্তনশীলতা উল্লেখ',
              marks: 1.0,
            },
            {
              id: 'rc-1.2b',
              description: 'Cp তে বাহ্যিক কাজের কারণে অতিরিক্ত তাপের প্রয়োজনীয়তা (Cp > Cv) ব্যাখ্যা',
              marks: 1.0,
            },
          ],
        },
        {
          id: 'item-1-c',
          type: 'written',
          subNumber: '১(গ)',
          text: 'ইঞ্জিন কর্তৃক কৃত কাজের পরিমাণ নির্ণয় কর।',
          fullMarks: 3.0,
          modelAnswer:
            'Q2 / Q1 = T2 / T1 => Q2 = (387 / 827) * 500 = 233.98 J। অতএব কৃতকাজ W = Q1 - Q2 = 500 - 233.98 = 266.02 J।',
          additionalInfo: 'Must have correct Joules unit',
          rubricCriteria: [
            {
              id: 'rc-1.3a',
              description: 'কার্নো চক্রের তাপ ও পরম তাপমাত্রার সমানুপাতিক সম্পর্ক সূত্র স্থাপন (Q2/Q1 = T2/T1)',
              marks: 1.0,
            },
            {
              id: 'rc-1.3b',
              description: 'বর্জিত তাপ Q2 এর মান সঠিকভাবে গণনা করা (233.98 J)',
              marks: 1.0,
            },
            {
              id: 'rc-1.3c',
              description: 'কৃতকাজ W = Q1 - Q2 সূত্রের মাধ্যমে এককসহ সঠিক ফলাফল (266.02 J) নির্ণয়',
              marks: 1.0,
            },
          ],
        },
      ],
    },
  ]);

  // Active question plus dropdown open state
  const [activeDropdownQId, setActiveDropdownQId] = useState<string | null>(null);

  // Rubric Modal State
  const [activeRubricItem, setActiveRubricItem] = useState<{
    qIndex: number;
    itemIndex: number;
  } | null>(null);

  // Handle Add New Question Section (Page 4 item e)
  const handleCreateQuestionSection = () => {
    const nextNum = questions.length + 1;
    const newSection: QuestionBlock = {
      id: `qb-${Date.now()}`,
      questionNumber: nextNum,
      paragraph: '',
      additionalInfo: '',
      items: [],
    };
    setQuestions([...questions, newSection]);
  };

  // Handle Dropdown action for a specific question (Page 4 item a)
  const handleAddQuestionComponent = (
    qIndex: number,
    componentType: 'paragraph' | 'additional' | 'mcq' | 'written'
  ) => {
    const updated = [...questions];
    const q = updated[qIndex];

    if (componentType === 'paragraph') {
      q.paragraph = q.paragraph ? q.paragraph : 'নতুন উদ্দীপক অনুচ্ছেদ এখানে লিখুন...';
    } else if (componentType === 'additional') {
      q.additionalInfo = q.additionalInfo
        ? q.additionalInfo
        : 'এআই মডেলের মূল্যায়নের সহায়তার জন্য বিশেষ তথ্য বা শর্ত...';
    } else if (componentType === 'written') {
      const subLabels = ['(ক)', '(খ)', '(গ)', '(ঘ)'];
      const nextSub = `${q.questionNumber}${subLabels[q.items.length % 4]}`;
      q.items.push({
        id: `item-${Date.now()}`,
        type: 'written',
        subNumber: nextSub,
        text: 'সৃজনশীল বা বর্ণনামূলক প্রশ্ন এখানে লিখুন...',
        fullMarks: q.items.length === 0 ? 1.0 : q.items.length === 1 ? 2.0 : 3.0,
        modelAnswer: 'এই প্রশ্নের প্রত্যাশিত মানসম্মত সমাধান...',
        additionalInfo: 'এই প্রশ্নের জন্য এআই সহায়তাকারী দিকনির্দেশনা...',
        rubricCriteria: [
          {
            id: `rc-${Date.now()}-1`,
            description: 'ধাপ ১: সূত্র বা মূল তত্ত্বের সঠিক উল্লেখ',
            marks: 1.0,
          },
          {
            id: `rc-${Date.now()}-2`,
            description: 'ধাপ ২: নির্ভুল হিসাব ও ফলাফল',
            marks: 1.0,
          },
        ],
      });
    } else if (componentType === 'mcq') {
      q.items.push({
        id: `item-${Date.now()}`,
        type: 'mcq',
        subNumber: `MCQ-${q.items.length + 1}`,
        text: 'বহুনির্বাচনী প্রশ্নটি এখানে লিখুন...',
        fullMarks: 1.0,
        modelAnswer: 'Option A is correct',
        additionalInfo: 'Strict matching on option letter',
        mcqOptions: [
          { id: 'opt-1', label: 'A', text: 'বিকল্প ১', is_correct: true },
          { id: 'opt-2', label: 'B', text: 'বিকল্প ২', is_correct: false },
          { id: 'opt-3', label: 'C', text: 'বিকল্প ৩', is_correct: false },
          { id: 'opt-4', label: 'D', text: 'বিকল্প ৪', is_correct: false },
        ],
        rubricCriteria: [
          {
            id: `rc-${Date.now()}-mcq`,
            description: 'সঠিক বিকল্প নির্বাচন',
            marks: 1.0,
          },
        ],
      });
    }

    setQuestions(updated);
    setActiveDropdownQId(null);
  };

  // Remove component from a question
  const handleRemoveItem = (qIndex: number, itemIndex: number) => {
    const updated = [...questions];
    updated[qIndex].items.splice(itemIndex, 1);
    setQuestions(updated);
  };

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(joinCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePublishExam = async () => {
    if (!examTitle.trim() || !subjectName.trim()) {
      alert("Please provide both an Exam Title and Subject.");
      return;
    }

    setIsPublishing(true);
    setPublishSuccess(null);

    try {
      // 1. Build Question objects matching KhataAI schema
      const mappedQuestions = questions.flatMap((qb) =>
        qb.items.map((item, idx) => ({
          id: item.id || `q_${Date.now()}_${idx}`,
          examId: "",
          type: (item.type === "mcq" ? "MCQ" : "CQ") as "MCQ" | "CQ",
          orderIndex: idx + 1,
          marks: item.fullMarks,
          questionText: item.text,
          stimulusText: qb.paragraph || "",
          modelAnswer: item.modelAnswer,
          tags: ["HSC", "CQ", subjectName.slice(0, 15)],
          curriculumCode: "HSC",
          cqParts: [
            {
              part: item.subNumber,
              bengaliLabel: item.subNumber,
              cognitiveLevel: "জ্ঞানমূলক / প্রয়োগমূলক",
              marks: item.fullMarks,
              questionText: item.text,
              modelAnswer: item.modelAnswer,
              rubrics: (item.rubricCriteria || []).map((rc) => ({
                id: rc.id || `rc_${Math.random().toString(36).substring(2, 7)}`,
                criterion: rc.description,
                maxPoints: rc.marks,
                description: rc.description,
                keywords: [] as string[],
              })),
            },
          ],
        }))
      );

      // 2. POST to /api/exams
      const examPayload = {
        title: examTitle,
        subject: subjectName,
        curriculumCode: "HSC",
        durationMinutes,
        totalMarks: totalExamMarks,
        negativeMarkingRate: 0,
        passMarkPercentage: 33,
        isOnline: true,
        isPublished: true,
        isPublic,
        accessCode: joinCode,
        createdBy: "usr_teacher_01",
        creatorId: "usr_teacher_01",
        creatorName: "Prof. Rafiqul Islam (Teacher)",
        questions: mappedQuestions,
      };

      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish exam");
      }

      // 3. Sync questions to /api/questions for question cards & direct photo evaluation
      await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: mappedQuestions }),
      }).catch(() => {});

      setPublishSuccess(`✓ Exam "${examTitle}" published successfully! Direct Code: ${joinCode}`);

      setTimeout(() => {
        if (onNavigateToEvaluate) {
          onNavigateToEvaluate(data.exam?.id || "exam-001");
        } else {
          window.location.href = "/teacher/evaluate";
        }
      }, 1500);
    } catch (err: any) {
      alert(err.message || "Error publishing exam");
    } finally {
      setIsPublishing(false);
    }
  };

  // Calculate total exam marks dynamically
  const totalExamMarks = questions.reduce(
    (acc, q) => acc + q.items.reduce((iAcc, item) => iAcc + item.fullMarks, 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ──────────────────── EXAM METADATA HEADER (PAGE 4) ──────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Exam Builder & Rubric Studio
              </span>
              <span className="text-xs text-slate-500">• PDF Page 4 Core Specification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              !!! Creating Exam Needs Additional Focus !!!
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Build Questions with Paragraphs, AI Hints, MCQ / Written items, and Step-by-Step Mark Rubrics.
            </p>
          </div>

          {/* Join Code / Share Bar (Page 4 c) */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
              <span className="text-slate-500 font-semibold mr-2">Exam Code:</span>
              <span className="font-mono font-black text-slate-900 text-sm tracking-wider mr-2">
                {joinCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors"
                title="Copy Exam Code"
              >
                {copiedCode ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>QR Code</span>
            </button>

            <button
              type="button"
              onClick={handlePublishExam}
              disabled={isPublishing}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl shadow-sm transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{isPublishing ? "Publishing Exam..." : "Publish Exam"}</span>
            </button>

            <button
              type="button"
              onClick={() => { if (onNavigateToEvaluate) onNavigateToEvaluate('exam-001'); else window.location.href = '/teacher/evaluate'; }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-all"
            >
              <span>⚡ Evaluate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {publishSuccess && (
          <div className="p-3.5 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
            <span>{publishSuccess}</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Redirecting to Evaluation...</span>
          </div>
        )}

        {/* QR Code Popup */}
        {showQR && (
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center font-mono text-[9px] text-center text-slate-500">
                [QR CODE FOR {joinCode}]
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  Instant Student QR Code & Direct Join Link
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Students can scan from mobile camera to instantly access this exam and submit answer scripts.
                </p>
                <div className="text-[11px] font-mono text-emerald-800 font-semibold mt-1">
                  https://khata.ai/exam/{joinCode}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="text-xs text-slate-500 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Exam Title, Subject, Duration, Privacy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Exam Title *
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subject & Paper *
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Duration (Minutes)
            </label>
            <input
              type="number"
              min="10"
              max="240"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Visibility & Total Marks
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`flex-1 py-2 px-3 rounded-xl border font-bold text-center transition-all ${
                  isPublic
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                {isPublic ? 'Public Exam' : 'Private (Portal)'}
              </button>
              <div className="px-3 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-center">
                {totalExamMarks} Pts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────── QUESTIONS LIST (PAGE 4 a, b, c, d, e) ──────────────────── */}
      <div className="space-y-6">
        {questions.map((qb, qIdx) => (
          <div
            key={qb.id}
            className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm p-6 space-y-4 transition-all hover:border-slate-300"
          >
            {/* Question Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  {qb.questionNumber}
                </span>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Question Section #{qb.questionNumber}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Sub-items: {qb.items.length} items • Full Marks:{' '}
                    {qb.items.reduce((s, it) => s + it.fullMarks, 0)} Pts
                  </p>
                </div>
              </div>

              {/* The PLUS BUTTON with 4 options (Page 4 a) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdownQId(activeDropdownQId === qb.id ? null : qb.id)
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Component</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {/* Dropdown with 4 explicit options from PDF Page 4 a:
                    - QuestionParagraph
                    - Additional information (for help of ai to understand)
                    - MCQ
                    - Written question */}
                {activeDropdownQId === qb.id && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-30 space-y-1 animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Add to Question #{qb.questionNumber}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddQuestionComponent(qIdx, 'paragraph')}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">1. QuestionParagraph</div>
                        <div className="text-[10px] text-slate-500">
                          উদ্দীপক / Context stimulus passage
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddQuestionComponent(qIdx, 'additional')}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">2. Additional information</div>
                        <div className="text-[10px] text-slate-500">
                          For help of AI to understand edge-cases
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddQuestionComponent(qIdx, 'mcq')}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">3. MCQ</div>
                        <div className="text-[10px] text-slate-500">
                          Multiple choice options A, B, C, D
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddQuestionComponent(qIdx, 'written')}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">4. Written question</div>
                        <div className="text-[10px] text-slate-500">
                          Creative subparts ক, খ, গ, ঘ
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* QuestionParagraph Block (if exists) */}
            {qb.paragraph !== undefined && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>QuestionParagraph (উদ্দীপক / Stimulus Passage)</span>
                  </div>
                  <button
                    onClick={() => {
                      const updated = [...questions];
                      delete updated[qIdx].paragraph;
                      setQuestions(updated);
                    }}
                    className="text-amber-700 hover:text-rose-600 text-[11px]"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={qb.paragraph}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIdx].paragraph = e.target.value;
                    setQuestions(updated);
                  }}
                  className="w-full p-2.5 bg-white border border-amber-200 rounded-lg text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="Enter stimulus passage, diagram description, or scenario..."
                />
              </div>
            )}

            {/* Additional Information Block (if exists) */}
            {qb.additionalInfo !== undefined && (
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>Additional Information (for help of AI to understand)</span>
                  </div>
                  <button
                    onClick={() => {
                      const updated = [...questions];
                      delete updated[qIdx].additionalInfo;
                      setQuestions(updated);
                    }}
                    className="text-blue-700 hover:text-rose-600 text-[11px]"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={qb.additionalInfo}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIdx].additionalInfo = e.target.value;
                    setQuestions(updated);
                  }}
                  className="w-full p-2 bg-white border border-blue-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Accept both g = 9.8 m/s² and g = 9.81 m/s²; partial marks for diagram"
                />
              </div>
            )}

            {/* List of MCQ or Written Questions inside this Question Section */}
            <div className="space-y-3 pt-2">
              {qb.items.length === 0 ? (
                <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  No subquestions added yet. Click &quot;+ Add Component&quot; to add QuestionParagraph, Additional Information, MCQ, or Written questions.
                </div>
              ) : (
                qb.items.map((item, itemIdx) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-bold shrink-0">
                          {item.subNumber}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {item.type.toUpperCase()}
                        </span>
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[qIdx].items[itemIdx].text = e.target.value;
                            setQuestions(updated);
                          }}
                          className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-w-[200px]"
                        />
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-bold text-slate-600">
                          {item.fullMarks} Pts
                        </span>

                        {/* BESIDE MCQ OR WRITTEN: RUBRIC BUTTON (Page 4 item b) */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveRubricItem({ qIndex: qIdx, itemIndex: itemIdx })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>RUBRIC</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(qIdx, itemIdx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* MCQ Options Display (if MCQ) */}
                    {item.type === 'mcq' && item.mcqOptions && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60">
                        {item.mcqOptions.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                              opt.is_correct
                                ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="font-mono">{opt.label}:</span>
                            <span className="truncate mx-1">{opt.text}</span>
                            {opt.is_correct && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rubric Criteria Summary Pill */}
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="font-semibold text-emerald-800">
                        Rubric Criteria Defined:
                      </span>
                      <span>
                        {item.rubricCriteria.length} point(s) configured for AI mark allocation
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ──────────────────── + CREATE QUESTION BUTTON & PUBLISH BAR ──────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleCreateQuestionSection}
          className="flex items-center gap-2 px-6 py-3 text-sm font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl transition-all shadow-sm hover:shadow"
        >
          <Plus className="w-5 h-5" />
          <span>+ Create Question Section</span>
        </button>

        <button
          type="button"
          onClick={handlePublishExam}
          disabled={isPublishing}
          className="flex items-center gap-2 px-8 py-3 text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 rounded-2xl transition-all shadow-md shadow-emerald-600/20"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isPublishing ? "Publishing Exam..." : "Publish & Save Complete Exam"}</span>
        </button>
      </div>

      {/* Active Rubric Modal (Page 4 b, c, d) */}
      {activeRubricItem && (
        <RubricModal
          isOpen={true}
          onClose={() => setActiveRubricItem(null)}
          questionNumber={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].subNumber
          }
          questionType={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].type
          }
          questionTitle={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].text
          }
          initialFullMarks={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].fullMarks
          }
          initialAnswer={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].modelAnswer
          }
          initialAdditionalInfo={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].additionalInfo
          }
          initialCriteria={
            questions[activeRubricItem.qIndex].items[activeRubricItem.itemIndex].rubricCriteria
          }
          onSaveRubric={(data) => {
            const updated = [...questions];
            const item = updated[activeRubricItem.qIndex].items[activeRubricItem.itemIndex];
            item.fullMarks = data.fullMarks;
            item.modelAnswer = data.modelAnswer;
            item.additionalInfo = data.additionalInfo;
            item.rubricCriteria = data.criteria;
            setQuestions(updated);
          }}
        />
      )}
    </div>
  );
}
