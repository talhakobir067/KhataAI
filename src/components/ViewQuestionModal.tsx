'use client';

import React from 'react';
import { X, BookOpen, CheckCircle, Award, FileText } from 'lucide-react';
import { MockQuestionItem } from '../lib/mockData';

interface ViewQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mockItem: MockQuestionItem;
}

export default function ViewQuestionModal({
  isOpen,
  onClose,
  mockItem,
}: ViewQuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{mockItem.label} — Official Question Paper</h3>
              <p className="text-xs text-emerald-100">{mockItem.examTitle} • {mockItem.institution}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* Stimulus / Question Paragraph */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>উদ্দীপক / Question Stimulus Paragraph</span>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {mockItem.questionStimulus}
            </p>
          </div>

          {/* Subquestions and Rubrics */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Sub-questions, Marks & Evaluation Rubric Scheme</span>
            </h4>

            {mockItem.breakdown.map((sq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      {sq.subquestionId}
                    </span>
                    <span>{sq.subquestionTitle}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    {sq.maxMarks} Mark(s)
                  </span>
                </div>

                <div className="mt-2 space-y-1.5 pl-8">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">
                    Mark-by-Mark Scoring Criteria:
                  </p>
                  {sq.criteria.map((crit, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-start gap-2 text-xs bg-white p-2 rounded-lg border border-slate-200/80"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold text-slate-700">[{crit.marks} pt] </span>
                        <span className="text-slate-600">{crit.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Model Answer Preview */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Official Expected Model Answer
            </h4>
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono whitespace-pre-line leading-relaxed border border-slate-800">
              {mockItem.modelAnswer}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Close Marks Scheme
          </button>
        </div>
      </div>
    </div>
  );
}
