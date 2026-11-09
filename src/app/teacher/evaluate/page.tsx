"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EvaluateExamSection from "@/components/EvaluateExamSection";

export default function TeacherEvaluatePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal</span>
        </Link>
      </div>

      <EvaluateExamSection />
    </div>
  );
}
