"use client";

import LiveDemoSection from "../LiveDemoSection";

export function LiveDemoSandbox() {
  return (
    <section id="demo" className="py-12 bg-slate-50/50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Interactive Live Demo & Benchmark Studio
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Experience AI Exam Evaluation Live
        </h2>
        <p className="text-xs text-slate-600 max-w-xl mx-auto mt-1">
          Toggle between pre-loaded board mock evaluations and creating your own custom questions with step-by-step rubrics.
        </p>
      </div>
      <LiveDemoSection />
    </section>
  );
}
