"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EvaluateExamSection from "@/components/EvaluateExamSection";

function EvaluateContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("examId") || undefined;
  const questionId = searchParams.get("questionId") || undefined;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
        <Link
          href="/teacher"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Dashboard</span>
        </Link>
        <span className="text-xs text-slate-400 font-mono">
          {questionId ? `Question Mode: ID-${questionId.slice(-6)}` : examId ? `Exam Mode: ${examId}` : "Evaluation Console"}
        </span>
      </div>

      <EvaluateExamSection initialExamId={examId} initialQuestionId={questionId} />
    </div>
  );
}

export default function TeacherEvaluatePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Evaluation Console...</div>}>
      <EvaluateContent />
    </Suspense>
  );
}
