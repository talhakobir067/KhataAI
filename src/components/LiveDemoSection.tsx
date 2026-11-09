'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Settings,
  Eye,
  Play,
  Upload,
  Camera,
  CheckCircle,
  AlertCircle,
  FileText,
  Sparkles,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Edit3,
  Award,
  Layers,
  HelpCircle,
  Check,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  MOCK_QUESTIONS,
  MockQuestionItem,
  DEFAULT_CUSTOM_EVALUATION,
} from '../lib/mockData';
import AISettingsModal, { AISettings } from './AISettingsModal';
import ViewQuestionModal from './ViewQuestionModal';
import confetti from 'canvas-confetti';

interface LiveDemoSectionProps {
  onNavigateToBuilder?: () => void;
}

export default function LiveDemoSection({ onNavigateToBuilder }: LiveDemoSectionProps) {
  // Mode Selection matching PDF Page 2 top tabs
  const [activeMode, setActiveMode] = useState<'mock' | 'custom'>('mock');

  // Selected mock question pill
  const [selectedMockKey, setSelectedMockKey] = useState<string>('physics');
  const activeMock: MockQuestionItem = MOCK_QUESTIONS[selectedMockKey] || MOCK_QUESTIONS.physics;

  // Active right column detail tab
  const [detailTab, setDetailTab] = useState<'breakdown' | 'ocr' | 'model'>('breakdown');

  // Modals
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
  const [isViewQuestionOpen, setIsViewQuestionOpen] = useState(false);

  // AI Settings state
  const [aiSettings, setAiSettings] = useState<AISettings>({
    model: 'gemini-3.8-flash',
    temperature: 0.1,
    rubricStrictness: 'balanced',
    visionOcrConfidence: 0.92,
    enableBengaliFormulaTranslation: true,
    doublePassValidation: true,
  });

  // Zoom & Pan state for image preview
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Evaluation simulation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalProgressText, setEvalProgressText] = useState('');
  const [evalStep, setEvalStep] = useState(0);

  // Custom Mode State (Screenshot 2)
  const [customAnswerType, setCustomAnswerType] = useState<'upload' | 'write'>('upload');
  const [customUploadedImage, setCustomUploadedImage] = useState<string | null>(null);
  const [customWrittenAnswer, setCustomWrittenAnswer] = useState<string>(
    `১। স্থির অবস্থান u = 0, ত্বরণ a = 2.5 m/s² এবং সময় t = 8 sec
শেষ বেগ v = u + at = 0 + (2.5 * 8) = 20 m/s
ত্বরণকালীন দূরত্ব s1 = ut + 1/2 at² = 0 + 1/2 * 2.5 * (8)² = 80 m।
২। সমবেগে অতিক্রান্ত দূরত্ব s2 = vt = 20 * 10 = 200 m।
সম্পূর্ণ যাত্রায় মোট দূরত্ব = s1 + s2 = 80 + 200 = 280 m।
৩। বেগ-সময় লেখচিত্র: প্রথম ৮ সেকেন্ড সময় অক্ষের সাথে আনত সরলরেখা (ত্বরণ) এবং পরবর্তী ১০ সেকেন্ড সময় অক্ষের সমান্তরাল (সমবেগ)।`
  );

  const [customExamTitle, setCustomExamTitle] = useState(DEFAULT_CUSTOM_EVALUATION.examTitle);
  const [customSubjectMarkLabel, setCustomSubjectMarkLabel] = useState(
    DEFAULT_CUSTOM_EVALUATION.subjectMarkLabel
  );
  const [customQuestionStatement, setCustomQuestionStatement] = useState(
    DEFAULT_CUSTOM_EVALUATION.questionStatement
  );
  const [customModelAnswer, setCustomModelAnswer] = useState(
    DEFAULT_CUSTOM_EVALUATION.expectedModelAnswer
  );
  const [customCriteria, setCustomCriteria] = useState(DEFAULT_CUSTOM_EVALUATION.criteria);

  // Custom Evaluation Results
  const [customEvalResult, setCustomEvalResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    grade: string;
    gpa: number;
    summary: string;
    criteriaScores: Array<{
      description: string;
      maxMarks: number;
      awardedMarks: number;
      justification: string;
      satisfied: boolean;
    }>;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Calculate dynamic total marks for custom criteria
  const customTotalMarks = customCriteria.reduce((sum, c) => sum + (Number(c.marks) || 0), 0);

  // Handle Run AI Evaluation
  const handleRunEvaluation = async () => {
    setIsEvaluating(true);
    setEvalStep(1);
    setEvalProgressText('Reading handwriting & pre-processing image...');

    await new Promise((r) => setTimeout(r, 600));
    setEvalStep(2);
    setEvalProgressText('Running Vision OCR on Bengali script & math notation...');

    await new Promise((r) => setTimeout(r, 700));
    setEvalStep(3);
    setEvalProgressText('Matching step-by-step against Rubric Points & Criteria...');

    await new Promise((r) => setTimeout(r, 700));
    setEvalStep(4);
    setEvalProgressText('Finalizing evaluation report & examiner assessment...');

    await new Promise((r) => setTimeout(r, 500));
    setIsEvaluating(false);
    setEvalStep(0);

    // If custom mode, generate evaluation results based on custom criteria
    if (activeMode === 'custom') {
      const awardedTotal = customCriteria.reduce(
        (acc, c) => acc + (c.marks > 2 ? c.marks - 0.5 : c.marks),
        0
      );
      const percentage = Math.round((awardedTotal / (customTotalMarks || 10)) * 100);

      setCustomEvalResult({
        score: awardedTotal,
        total: customTotalMarks,
        percentage,
        grade: percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : 'A-',
        gpa: percentage >= 80 ? 5.0 : 4.0,
        summary:
          'উত্তর চমৎকার হয়েছে। শিক্ষার্থী প্রতিটি ধাপ ও সূত্রের অর্থ যথাযথভাবে পূরণ করেছে। উপস্থাপন ও নির্ভুলতা সন্তোষজনক।',
        criteriaScores: customCriteria.map((c, idx) => ({
          description: c.description,
          maxMarks: c.marks,
          awardedMarks: idx === 1 ? Math.max(1, c.marks - 0.5) : c.marks,
          satisfied: idx !== 1,
          justification:
            idx === 1
              ? 'সূত্রের সঠিক প্রয়োগ হয়েছে, তবে দশমিক ২ ঘর পর্যন্ত গণনার ধাপে সামান্য ব্যাখ্যার স্পষ্টতা দরকার।'
              : 'সম্পূর্ণ নির্ভুল গণনা ও সঠিক একক উপস্থাপনের কারণে পূর্ণ নম্বর প্রদান করা হলো।',
        })),
      });
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  // Handle Custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomUploadedImage(url);
    }
  };

  const handleAddCustomPoint = () => {
    setCustomCriteria([
      ...customCriteria,
      {
        id: `crit-${Date.now()}`,
        description: `ধাপ ${customCriteria.length + 1}: নতুন যাচাইকরণ পয়েন্ট বা সমীকরণ`,
        marks: 2,
      },
    ]);
  };

  const handleRemoveCustomPoint = (id: string) => {
    setCustomCriteria(customCriteria.filter((c) => c.id !== id));
  };

  const handleUpdateCustomPoint = (id: string, field: 'description' | 'marks', value: any) => {
    setCustomCriteria(
      customCriteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ──────────────────── TOP MODE SWITCHER (PDF PAGE 2) ──────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="inline-flex p-1.5 bg-slate-100/80 rounded-xl w-full sm:w-auto">
          {/* Mode 1: Mock Exam Evaluation */}
          <button
            onClick={() => setActiveMode('mock')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'mock'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mock Exam Evaluation (মক মূল্যায়ন)</span>
          </button>

          {/* Mode 2: Create Question & Evaluate */}
          <button
            onClick={() => setActiveMode('custom')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'custom'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>✏️ Create Question & Evaluate (প্রশ্ন তৈরি ও মূল্যায়ন)</span>
          </button>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setIsAISettingsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>AI Settings</span>
          </button>

          {activeMode === 'mock' ? (
            <button
              onClick={() => setIsViewQuestionOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>View Question & Marks Scheme</span>
            </button>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById('custom-points-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            >
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span>Edit Question & Rubric Points</span>
            </button>
          )}

          <button
            onClick={handleRunEvaluation}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-60 rounded-xl shadow-md shadow-emerald-600/30 transition-all"
          >
            {isEvaluating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-white" />
            )}
            <span>{isEvaluating ? 'Evaluating...' : 'Run AI Evaluation'}</span>
          </button>
        </div>
      </div>

      {/* Evaluation Progress Banner */}
      {isEvaluating && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="font-bold text-xs text-emerald-900 uppercase tracking-wide">
                Gemini 3.8 Flash Vision Evaluation Pipeline in Progress
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700">Step {evalStep}/4</span>
          </div>
          <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${evalStep * 25}%` }}
            />
          </div>
          <p className="text-xs text-emerald-800 font-medium">{evalProgressText}</p>
        </div>
      )}

      {/* ════════════════════ MODE 1: MOCK EXAM EVALUATION (SCREENSHOT 1) ════════════════════ */}
      {activeMode === 'mock' && (
        <div className="space-y-4">
          {/* Mock Question Selector Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                SELECT MOCK QUESTION:
              </span>

              {Object.keys(MOCK_QUESTIONS).map((key) => {
                const item = MOCK_QUESTIONS[key];
                const isSelected = selectedMockKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedMockKey(key);
                      setZoomLevel(1);
                      setRotation(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsViewQuestionOpen(true)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>See Question, Stimulus & Sub-parts</span>
            </button>
          </div>

          {/* Two-Column Grid: Left Student Script / Right Evaluated Score */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ── LEFT COLUMN: Student Answer Sheet Photo (5 Cols) ── */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              {/* Photo Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">
                  Student Answer Sheet Photo
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Camera</span>
                  </button>
                </div>
              </div>

              {/* Zoom & Inspect Toolbar */}
              <div className="px-4 py-1.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <span className="text-[11px] font-medium">Pan & Zoom Lens Viewer</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
                    className="p-1 hover:bg-slate-200 rounded text-slate-700"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono px-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                    className="p-1 hover:bg-slate-200 rounded text-slate-700"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-700"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setZoomLevel(1);
                      setRotation(0);
                    }}
                    className="p-1 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-600"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Photo Display Card with zoom & overlay */}
              <div className="relative bg-slate-900 min-h-[460px] max-h-[560px] overflow-auto flex items-center justify-center p-3 select-none">
                <div
                  className="transition-transform duration-200 ease-out origin-center"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src={customUploadedImage || activeMock.khataImage}
                    alt="Handwritten student answer script"
                    className="max-w-full max-h-[520px] object-contain rounded-md shadow-2xl border border-slate-700"
                  />
                </div>

                {/* Laser scan line when evaluating */}
                {isEvaluating && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400/80 animate-scan pointer-events-none" />
                )}
              </div>

              {/* Bottom bar on photo */}
              <div className="p-3 bg-slate-950 text-white flex items-center justify-between text-xs border-t border-slate-800">
                <span className="text-slate-300 truncate max-w-[280px]">
                  {activeMock.khataCaption}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  {activeMock.badgeText}
                </span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Evaluated Score & Performance (7 Cols) ── */}
            <div className="lg:col-span-7 space-y-4">
              {/* Score Header Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                      EVALUATED SCORE & PERFORMANCE
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {activeMock.overallScore} / {activeMock.fullMarks}
                      </span>
                      <span className="text-lg font-bold text-emerald-600">
                        ({activeMock.percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Grade Awarded Circle Badge */}
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200/80 px-4 py-3 rounded-2xl self-start sm:self-auto">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                        Grade Awarded
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        GPA {activeMock.gpa.toFixed(1)}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-emerald-600/30">
                      {activeMock.grade}
                    </div>
                  </div>
                </div>

                {/* AI Examiner Summary & Handwriting Assessment */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/40 border border-emerald-200/70">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-950">
                      AI Examiner Summary & Handwriting Assessment:
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {activeMock.aiExaminerSummary}
                  </p>
                </div>
              </div>

              {/* Tabbed Breakdown: Step-by-Step, OCR, Model Answer */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs bar */}
                <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1 overflow-x-auto">
                  <button
                    onClick={() => setDetailTab('breakdown')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      detailTab === 'breakdown'
                        ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step-by-Step Mark Breakdown</span>
                  </button>

                  <button
                    onClick={() => setDetailTab('ocr')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      detailTab === 'ocr'
                        ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Vision OCR Recognized Text</span>
                  </button>

                  <button
                    onClick={() => setDetailTab('model')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      detailTab === 'model'
                        ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Expected Model Answer</span>
                  </button>
                </div>

                {/* Tab 1: Step-by-Step Mark Breakdown */}
                {detailTab === 'breakdown' && (
                  <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
                    {activeMock.breakdown.map((sq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-bold border border-emerald-300">
                              {sq.subquestionId}
                            </span>
                            <div>
                              <h5 className="font-bold text-xs text-slate-900">
                                {sq.subquestionTitle}
                              </h5>
                              <span className="text-[10px] text-slate-500 font-medium">
                                Type: {sq.type}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white">
                              {sq.awardedMarks} / {sq.maxMarks} Marks
                            </span>
                          </div>
                        </div>

                        {/* Criteria checks for this subquestion */}
                        <div className="mt-3 space-y-2 pl-9">
                          {sq.criteria.map((crit, cIdx) => (
                            <div
                              key={cIdx}
                              className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                                crit.fulfilled
                                  ? 'bg-white border-emerald-200'
                                  : 'bg-amber-50/60 border-amber-200'
                              }`}
                            >
                              {crit.fulfilled ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center justify-between font-semibold text-slate-800">
                                  <span>{crit.description}</span>
                                  <span
                                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                                      crit.fulfilled
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    +{crit.awarded} / {crit.marks} pt
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 mt-0.5">
                                  <span className="font-semibold text-slate-700">AI Reason: </span>
                                  {crit.justification}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 2: Vision OCR Recognized Text */}
                {detailTab === 'ocr' && (
                  <div className="p-5 max-h-[500px] overflow-y-auto">
                    <div className="p-4 bg-slate-900 rounded-xl text-slate-200 font-mono text-xs whitespace-pre-line leading-relaxed border border-slate-800 shadow-inner">
                      {activeMock.ocrText}
                    </div>
                  </div>
                )}

                {/* Tab 3: Expected Model Answer */}
                {detailTab === 'model' && (
                  <div className="p-5 max-h-[500px] overflow-y-auto">
                    <div className="p-4 bg-emerald-950 rounded-xl text-emerald-100 font-mono text-xs whitespace-pre-line leading-relaxed border border-emerald-900 shadow-inner">
                      {activeMock.modelAnswer}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════ MODE 2: CREATE QUESTION & EVALUATE (SCREENSHOT 2) ════════════════════ */}
      {activeMode === 'custom' && (
        <div className="space-y-4">
          {/* Subbar matching Screenshot 2 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 font-extrabold text-sm flex items-center gap-1.5">
                <span>📌</span>
                <span>{customExamTitle} ({customTotalMarks} নম্বর)</span>
              </span>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('custom-points-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customize Question & Points</span>
            </button>
          </div>

          {/* Two-Column Grid: Left Provide Student Answer / Right Create Question & Marking Points */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ── LEFT COLUMN: PROVIDE STUDENT ANSWER (5 Cols) ── */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              {/* Header with Subtabs: Upload Answer Photo vs Write Answer */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  PROVIDE STUDENT ANSWER
                </span>
                <div className="flex p-1 bg-slate-100 rounded-lg text-xs">
                  <button
                    onClick={() => setCustomAnswerType('upload')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      customAnswerType === 'upload'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Upload Answer Photo
                  </button>
                  <button
                    onClick={() => setCustomAnswerType('write')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      customAnswerType === 'write'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Write Answer
                  </button>
                </div>
              </div>

              {/* Upload View */}
              {customAnswerType === 'upload' ? (
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {customUploadedImage ? (
                    <div className="w-full space-y-3">
                      <div className="relative bg-slate-900 rounded-xl overflow-hidden max-h-[360px] flex items-center justify-center p-2">
                        <img
                          src={customUploadedImage}
                          alt="Custom answer preview"
                          className="max-h-[340px] object-contain rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Student script loaded & ready for evaluation</span>
                        </span>
                        <button
                          onClick={() => setCustomUploadedImage(null)}
                          className="text-rose-600 hover:underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full border-2 border-dashed border-emerald-300 rounded-2xl p-8 bg-emerald-50/30 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                        <Upload className="w-7 h-7" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">
                        Upload Student Answer Sheet Photo
                      </h4>
                      <p className="text-xs text-slate-500 max-w-xs mb-5">
                        No default image is loaded. Select a photo of handwritten exam paper from your phone or computer, or snap with camera.
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload Photo</span>
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Camera</span>
                        </button>
                      </div>

                      {/* Fast demo image loader */}
                      <button
                        onClick={() => setCustomUploadedImage('/khatas/physics_cq.jpg')}
                        className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Or click here to load a sample student khata</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Write Answer View */
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Write or paste student&apos;s answer transcript:</span>
                    <span className="font-mono">{customWrittenAnswer.length} chars</span>
                  </div>
                  <textarea
                    rows={12}
                    value={customWrittenAnswer}
                    onChange={(e) => setCustomWrittenAnswer(e.target.value)}
                    placeholder="Enter student handwritten response or transcribed solution here..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {/* If evaluated, show custom evaluation summary card */}
              {customEvalResult && (
                <div className="p-4 bg-emerald-50/70 border-t border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase">
                        AI Score Result
                      </span>
                      <div className="text-2xl font-black text-slate-900">
                        {customEvalResult.score} / {customEvalResult.total}{' '}
                        <span className="text-sm font-bold text-emerald-600">
                          ({customEvalResult.percentage}%)
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white">
                      Grade: {customEvalResult.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    &quot;{customEvalResult.summary}&quot;
                  </p>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: Create Your Exam Question & Marking Points (7 Cols) ── */}
            <div
              id="custom-points-section"
              className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-emerald-600" />
                    <span>Create Your Exam Question & Marking Points</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define your custom question, expected answer, and the exact points for each mark.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
                  Total: {customTotalMarks} Marks
                </span>
              </div>

              {/* Form Fields matching Screenshot 2 */}
              <div className="space-y-4 text-xs">
                {/* 1. Exam Title & Subject */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">
                      Exam Title & Subject:
                    </label>
                    <span className="text-slate-400 font-semibold">{customSubjectMarkLabel}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={customExamTitle}
                      onChange={(e) => setCustomExamTitle(e.target.value)}
                      className="sm:col-span-3 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={customSubjectMarkLabel}
                      onChange={(e) => setCustomSubjectMarkLabel(e.target.value)}
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Question / Problem Statement */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Question / Problem Statement:
                  </label>
                  <textarea
                    rows={3}
                    value={customQuestionStatement}
                    onChange={(e) => setCustomQuestionStatement(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 leading-relaxed font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* 3. Expected Model Answer */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Expected Model Answer:</span>
                    <span className="text-emerald-700 font-semibold normal-case">
                      Ground truth benchmark for Gemini 3.8 Flash
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={customModelAnswer}
                    onChange={(e) => setCustomModelAnswer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 leading-relaxed font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* 4. Marking Points & Criteria (4 Criteria) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">
                      Marking Points & Criteria ({customCriteria.length} Criteria)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddCustomPoint}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Point</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {customCriteria.map((c, idx) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                      >
                        <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>

                        <input
                          type="text"
                          value={c.description}
                          onChange={(e) =>
                            handleUpdateCustomPoint(c.id, 'description', e.target.value)
                          }
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />

                        <div className="flex items-center gap-1 shrink-0">
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={c.marks}
                            onChange={(e) =>
                              handleUpdateCustomPoint(
                                c.id,
                                'marks',
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-12 px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-center text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                          <span className="text-xs font-bold text-slate-600">Marks</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveCustomPoint(c.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete criterion"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-slate-500 text-[11px]">
                    Custom criteria are fed into Gemini 3.8 Flash prompt as structured rubric constraints.
                  </div>
                  <button
                    onClick={handleRunEvaluation}
                    disabled={isEvaluating}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run AI Evaluation Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AISettingsModal
        isOpen={isAISettingsOpen}
        onClose={() => setIsAISettingsOpen(false)}
        settings={aiSettings}
        onSave={(newSettings) => setAiSettings(newSettings)}
      />

      <ViewQuestionModal
        isOpen={isViewQuestionOpen}
        onClose={() => setIsViewQuestionOpen(false)}
        mockItem={activeMock}
      />
    </div>
  );
}
