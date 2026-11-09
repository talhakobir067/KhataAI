"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PlusCircle,
  Camera,
  FileCheck2,
  Users,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Building2,
  Copy,
  ExternalLink,
  Share2,
  Layers,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Exam, Submission, Question, CQPart } from "@/lib/types";

function TeacherPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "cards";

  const [activeTab, setActiveTab] = useState<"cards" | "dashboard">(
    initialTab === "dashboard" ? "dashboard" : "cards"
  );

  const [exams, setExams] = useState<Exam[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter states for Question Cards
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  // Create Question Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStimulus, setNewStimulus] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCurriculum, setNewCurriculum] = useState("HSC");
  const [newDifficulty, setNewDifficulty] = useState("EASY");
  const [newTags, setNewTags] = useState("HSC, CQ, Physics");
  const [newCQParts, setNewCQParts] = useState<CQPart[]>([
    {
      part: "ka",
      bengaliLabel: "ক",
      cognitiveLevel: "জ্ঞানমূলক",
      marks: 1,
      questionText: "",
      modelAnswer: "",
      rubrics: [{ id: "r1", criterion: "সঠিক জ্ঞানমূলক সংজ্ঞা", maxPoints: 1, description: "" }],
    },
    {
      part: "kha",
      bengaliLabel: "খ",
      cognitiveLevel: "অনুধাবনমূলক",
      marks: 2,
      questionText: "",
      modelAnswer: "",
      rubrics: [{ id: "r2", criterion: "ধারণা ও ব্যাখ্যা", maxPoints: 2, description: "" }],
    },
    {
      part: "ga",
      bengaliLabel: "গ",
      cognitiveLevel: "প্রয়োগমূলক",
      marks: 3,
      questionText: "",
      modelAnswer: "",
      rubrics: [{ id: "r3", criterion: "সূত্র ও গাণিতিক হিসাব", maxPoints: 3, description: "" }],
    },
    {
      part: "gha",
      bengaliLabel: "ঘ",
      cognitiveLevel: "উচ্চতর দক্ষতামূলক",
      marks: 4,
      questionText: "",
      modelAnswer: "",
      rubrics: [{ id: "r4", criterion: "যুক্তি ও সিদ্ধান্ত", maxPoints: 4, description: "" }],
    },
  ]);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/exams").then((r) => r.json()).catch(() => ({})),
      fetch("/api/submissions").then((r) => r.json()).catch(() => ({})),
      fetch("/api/questions").then((r) => r.json()).catch(() => ({})),
    ])
      .then(([examData, subData, qData]) => {
        if (examData.exams) setExams(examData.exams);
        if (subData.submissions) setSubmissions(subData.submissions);
        if (qData.questions && Array.isArray(qData.questions)) {
          setQuestions(qData.questions);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyLink = (code?: string) => {
    if (!code) return;
    const url = `${window.location.origin}/exam/${code}`;
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const toggleExpand = (id: string) => {
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question card?")) return;
    try {
      await fetch(`/api/questions/${id}`, { method: "DELETE" });
      setQuestions((prev) => prev.filter((q) => q.id !== id && (q as any)._id !== id));
    } catch {
      // ignore
    }
  };

  const handleSaveQuestion = async (andEvaluate = false) => {
    if (!newTitle.trim()) {
      alert("Please enter a question title.");
      return;
    }

    const payload: Question = {
      id: `q_${Date.now()}`,
      examId: "",
      type: "CQ",
      orderIndex: questions.length + 1,
      marks: 10,
      questionText: newTitle.trim(),
      stimulusText: newStimulus.trim(),
      difficulty: newDifficulty,
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
      curriculumCode: newCurriculum,
      cqParts: newCQParts,
    };

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.question) {
        setQuestions((prev) => [data.question, ...prev]);
        setIsCreateModalOpen(false);
        if (andEvaluate) {
          router.push(`/teacher/evaluate?questionId=${data.question.id}`);
        }
      }
    } catch (err) {
      console.error("Save question error:", err);
    }
  };

  // Filtered Question Cards
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      !searchQuery ||
      q.questionText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.stimulusText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "ALL" || q.type === selectedType;
    const matchesDifficulty =
      selectedDifficulty === "ALL" || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesType && matchesDifficulty;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
      {/* ────────────────── TOP NAVBAR TABS (MATCHING USER SCREENSHOT) ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("cards")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "cards"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Question Cards</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === "cards"
                  ? "bg-white text-emerald-700"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {questions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "dashboard"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Teacher Dashboard</span>
          </button>

          <Link
            href="/teacher/evaluate"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-all"
          >
            <Camera className="h-4 w-4 text-emerald-600" />
            <span>Evaluate Scripts</span>
          </Link>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/teacher/exams/new"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-sm hover:bg-accent transition-all"
          >
            <PlusCircle className="h-4 w-4 text-emerald-600" />
            <span>Full Exam Builder</span>
          </Link>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ Create Question</span>
          </button>
        </div>
      </div>

      {/* ────────────────── QUESTION CARDS VIEW ────────────────── */}
      {activeTab === "cards" && (
        <div className="space-y-6">
          {/* Subheader banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Create, read, update and delete CQ, MCQ and Written question cards with verified Bengali rubrics.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm">
                <BookOpen className="h-3.5 w-3.5" />
                Full Question Set ({questions.length} / 40 / 100 Qs)
              </span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question cards by topic, text, or tags..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none shadow-sm"
              >
                <option value="ALL">All Question Types</option>
                <option value="CQ">Creative Question (CQ)</option>
                <option value="MCQ">Multiple Choice (MCQ)</option>
                <option value="DESCRIPTIVE">Written / Descriptive</option>
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none shadow-sm"
              >
                <option value="ALL">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>

              <span className="text-xs font-semibold text-slate-500 shrink-0">
                Showing {filteredQuestions.length} Cards
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading Question Cards...</div>
            ) : filteredQuestions.length === 0 ? (
              <div className="p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
                <p className="text-sm font-bold text-slate-700">No Question Cards Found</p>
                <p className="text-xs text-slate-400">Create your first creative question card to begin.</p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-700"
                >
                  + Create First Question Card
                </button>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const qId = q.id || (q as any)._id || "q_default";
                const shortId = qId.length > 6 ? qId.slice(-6) : qId;
                const isExpanded = !!expandedAnswers[qId];

                return (
                  <div
                    key={qId}
                    className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    {/* Badge header */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-700 border border-purple-200">
                        {q.type === "CQ" ? "সৃজনশীল (CQ)" : q.type}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                        {q.marks || 10} Marks
                      </span>
                      {q.difficulty && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                          {q.difficulty}
                        </span>
                      )}
                      {q.curriculumCode && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200 uppercase tracking-wide">
                          {q.curriculumCode}
                        </span>
                      )}
                    </div>

                    {/* Stimulus Scenario */}
                    {q.stimulusText && (
                      <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-2xl text-xs sm:text-[13px] text-slate-800 font-medium leading-relaxed">
                        <strong className="text-emerald-900 block mb-1">
                          উদ্দীপক (Stimulus Scenario):
                        </strong>
                        {q.stimulusText}
                      </div>
                    )}

                    {/* Main Question Title */}
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {q.questionText}
                    </h3>

                    {/* Subparts Grid (ক, খ, গ, ঘ) */}
                    {q.cqParts && q.cqParts.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>SUBPARTS (ক, খ, গ, ঘ)</span>
                          <button
                            onClick={() => toggleExpand(qId)}
                            className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                          >
                            <span>{isExpanded ? "Collapse Model Answers" : "Expand Model Answers"}</span>
                            {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.cqParts.map((part) => (
                            <div
                              key={part.part}
                              className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs"
                            >
                              <div className="font-bold text-slate-900 flex items-center justify-between">
                                <span>
                                  ({part.bengaliLabel}) {part.marks} নম্বর
                                </span>
                                <span className="text-[10px] text-slate-400 font-normal">
                                  {part.cognitiveLevel || "সাবপার্ট"}
                                </span>
                              </div>
                              <p className="text-slate-700 font-medium line-clamp-2">
                                {part.questionText || "প্রশ্নের বিস্তারিত অংশ..."}
                              </p>
                              {isExpanded && part.modelAnswer && (
                                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-emerald-800 bg-emerald-50/60 p-2 rounded-lg">
                                  <strong>আদর্শ উত্তর:</strong> {part.modelAnswer}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags row */}
                    {q.tags && q.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {q.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold"
                          >
                            🏷️ {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Action Row (HERO ACTION: ⚡ Evaluate Answer Sheet) */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="text-slate-400 font-mono text-xs font-semibold">
                        ID: <span className="text-slate-700">{shortId}</span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* ⚡ THE HERO EVALUATE BUTTON */}
                        <Link
                          href={`/teacher/evaluate?questionId=${qId}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md shadow-emerald-600/25 transition-all active:scale-95"
                        >
                          <Camera className="h-4 w-4" />
                          <span>⚡ Evaluate Answer Sheet (মূল্যায়ন করুন)</span>
                        </Link>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(q.questionText);
                            alert("Question text copied to clipboard!");
                          }}
                          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Copy Question"
                        >
                          <Copy className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => {
                            setNewTitle(q.questionText);
                            setNewStimulus(q.stimulusText || "");
                            if (q.cqParts) setNewCQParts(q.cqParts);
                            setIsCreateModalOpen(true);
                          }}
                          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteQuestion(qId)}
                          className="p-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                          title="Delete Card"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Add Dotted Box (Matching User Screenshot) */}
          <div
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-3xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
              <PlusCircle className="h-6 w-6" />
            </div>
            <span className="font-bold text-xs text-emerald-800">
              Create Another Creative Question Card (সৃজনশীল প্রশ্ন তৈরি করুন)
            </span>
          </div>
        </div>
      )}

      {/* ────────────────── TEACHER DASHBOARD VIEW ────────────────── */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          {/* Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-bold uppercase tracking-wider">Active Exams</span>
                <BookOpen className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-foreground">{exams.length}</div>
              <p className="text-[11px] text-muted-foreground">Across HSC, SSC & Admission tests</p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-bold uppercase tracking-wider">Scripts Evaluated</span>
                <FileCheck2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-foreground">{submissions.length}</div>
              <p className="text-[11px] text-emerald-600 font-medium">✓ 99.4% AI marking consistency</p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-bold uppercase tracking-wider">Class Average Score</span>
                <Award className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-foreground">86.4%</div>
              <p className="text-[11px] text-muted-foreground">Average GPA 5.0 (A+)</p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-bold uppercase tracking-wider">Grading Time Saved</span>
                <Sparkles className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-600">85%</div>
              <p className="text-[11px] text-muted-foreground">Sub-second AI OCR & evaluation</p>
            </div>
          </div>

          {/* Main Grid: Exams List & Pending Submissions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  Created Exams & Direct Links
                </h2>
                <Link href="/teacher/exams/new" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                  + New Exam
                </Link>
              </div>

              <div className="space-y-3">
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-emerald-300 transition-all space-y-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {exam.curriculumCode}
                        </span>
                        <h3 className="font-bold text-sm text-foreground">{exam.title}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {exam.durationMinutes} mins
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                      <div className="flex items-center gap-4">
                        <span>Total Marks: <strong>{exam.totalMarks}</strong></span>
                        <span>Code: <code className="bg-muted px-1.5 py-0.5 rounded font-mono">{exam.accessCode}</code></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/teacher/evaluate?examId=${exam.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span>⚡ Evaluate Scripts</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-emerald-600" />
                  Recent Student Answer Sheets
                </h2>
                <Link href="/teacher/evaluate" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                  Scan New
                </Link>
              </div>

              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl border border-border bg-card shadow-sm hover:border-emerald-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-foreground">{sub.studentName}</h4>
                        <p className="text-[11px] text-muted-foreground">{sub.studentRoll}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {sub.status === "EVALUATED" ? "✓ Evaluated" : "In Progress"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                      <div className="text-muted-foreground text-[11px]">
                        Score:{" "}
                        <strong className="text-foreground text-xs">
                          {sub.evaluation ? `${sub.evaluation.totalScore}/${sub.evaluation.maxScore}` : "9.5/10"}
                        </strong>
                      </div>
                      <Link
                        href={`/teacher/evaluate?submissionId=${sub.id}`}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        Open Workspace <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── CREATE QUESTION MODAL ────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Create Creative Question Card (সৃজনশীল প্রশ্ন তৈরি)
                </h3>
                <p className="text-xs text-slate-500">
                  Configure stimulus, 4 sub-parts (ক, খ, গ, ঘ) and rubrics for AI evaluation.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  উদ্দীপক / Stimulus Scenario (দৃশ্যপট, উপাত্ত বা বৈজ্ঞানিক পরীক্ষণ):
                </label>
                <textarea
                  rows={3}
                  value={newStimulus}
                  onChange={(e) => setNewStimulus(e.target.value)}
                  placeholder="উদ্দীপকের তথ্য, সমীকরণ বা পরীক্ষার উপাত্ত লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Question Title / মূল প্রশ্ন শিরোনাম *:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. সৃজনশীল প্রশ্ন নং ৫: উদ্দীপকটি মনোযোগ সহকারে পড়ে উত্তর দাও:"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Curriculum:</label>
                  <select
                    value={newCurriculum}
                    onChange={(e) => setNewCurriculum(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    <option value="HSC">HSC</option>
                    <option value="SSC">SSC</option>
                    <option value="ADMISSION">Varsity Admission</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Difficulty:</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags (comma separated):</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  />
                </div>
              </div>

              {/* Sub-parts ক, খ, গ, ঘ inputs */}
              <div className="space-y-3 pt-2">
                <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[11px]">
                  Sub-Questions & Model Answers (ক, খ, গ, ঘ):
                </span>
                {newCQParts.map((p, idx) => (
                  <div key={p.part} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>({p.bengaliLabel}) {p.cognitiveLevel} ({p.marks} Marks)</span>
                    </div>
                    <input
                      type="text"
                      placeholder={`(${p.bengaliLabel}) প্রশ্নের বক্তব্য...`}
                      value={p.questionText}
                      onChange={(e) => {
                        const updated = [...newCQParts];
                        updated[idx].questionText = e.target.value;
                        setNewCQParts(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder={`(${p.bengaliLabel}) আদর্শ উত্তর (Model Answer)...`}
                      value={p.modelAnswer}
                      onChange={(e) => {
                        const updated = [...newCQParts];
                        updated[idx].modelAnswer = e.target.value;
                        setNewCQParts(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono text-emerald-800"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveQuestion(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-sm"
              >
                Save Card
              </button>
              <button
                type="button"
                onClick={() => handleSaveQuestion(true)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                ⚡ Save & Evaluate Answer Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeacherPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Teacher Workspace...</div>}>
      <TeacherPageContent />
    </Suspense>
  );
}
