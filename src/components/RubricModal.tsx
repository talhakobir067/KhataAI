'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, Award, FileText, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { RubricCriterion } from '../lib/types';

interface RubricModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionNumber: number | string;
  questionType: 'written' | 'mcq';
  questionTitle: string;
  initialFullMarks: number;
  initialAnswer: string;
  initialAdditionalInfo: string;
  initialCriteria: RubricCriterion[];
  onSaveRubric: (data: {
    fullMarks: number;
    modelAnswer: string;
    additionalInfo: string;
    criteria: RubricCriterion[];
  }) => void;
}

export default function RubricModal({
  isOpen,
  onClose,
  questionNumber,
  questionType,
  questionTitle,
  initialFullMarks,
  initialAnswer,
  initialAdditionalInfo,
  initialCriteria,
  onSaveRubric,
}: RubricModalProps) {
  const [fullMarks, setFullMarks] = useState<number>(initialFullMarks || 3);
  const [modelAnswer, setModelAnswer] = useState<string>(initialAnswer || '');
  const [additionalInfo, setAdditionalInfo] = useState<string>(initialAdditionalInfo || '');
  const [criteria, setCriteria] = useState<RubricCriterion[]>(
    initialCriteria && initialCriteria.length > 0
      ? initialCriteria
      : [
          {
            id: 'rc-1',
            description: 'ধাপ ১: সূত্র স্থাপন ও চলকের মান নির্ভুলভাবে উল্লেখ করা',
            marks: 1.0,
          },
          {
            id: 'rc-2',
            description: 'ধাপ ২: গাণিতিক সমীকরণ সমাধান ও গণনা সঠিক রাখা',
            marks: 1.0,
          },
          {
            id: 'rc-3',
            description: 'ধাপ ৩: সঠিক এককসহ চূড়ান্ত ফলাফল উপস্থাপন',
            marks: 1.0,
          },
        ]
  );

  if (!isOpen) return null;

  const handleAddCriterion = () => {
    const nextMark = 1.0;
    setCriteria([
      ...criteria,
      {
        id: `rc-${Date.now()}`,
        description: `ধাপ ${criteria.length + 1}: প্রয়োজনীয় নির্দিষ্ট পয়েন্ট বা যুক্তি`,
        marks: nextMark,
      },
    ]);
  };

  const handleRemoveCriterion = (index: number) => {
    setCriteria(criteria.filter((_, idx) => idx !== index));
  };

  const handleUpdateCriterion = (index: number, field: keyof RubricCriterion, value: any) => {
    const updated = [...criteria];
    updated[index] = { ...updated[index], [field]: value };
    setCriteria(updated);
  };

  const totalCriteriaMarks = criteria.reduce((sum, c) => sum + (Number(c.marks) || 0), 0);

  const handleSave = () => {
    onSaveRubric({
      fullMarks,
      modelAnswer,
      additionalInfo,
      criteria,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header matching PDF Page 4 requirements */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">
                  RUBRIC Configuration
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wide">
                  {questionType.toUpperCase()} Question {questionNumber}
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                PDF Specification: Full Mark, Expected Answer & Mark-by-Mark AI Rubric Points
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Header Banner */}
        <div className="px-6 py-2.5 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-emerald-900 truncate max-w-md">
            Question: {questionTitle || `Question ${questionNumber}`}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Sum of Rubrics:</span>
            <span className={`font-bold px-2 py-0.5 rounded ${
              totalCriteriaMarks === fullMarks ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
            }`}>
              {totalCriteriaMarks} / {fullMarks} Marks
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {/* 1. Full Mark & Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Mark of Question *
              </label>
              <input
                type="number"
                min="1"
                max="50"
                step="0.5"
                value={fullMarks}
                onChange={(e) => setFullMarks(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">e.g. 1 (জ্ঞান), 2 (অনুধাবন), 3 (প্রয়োগ), 4 (উচ্চতর)</p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Additional Information (for AI to understand)
              </label>
              <input
                type="text"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="e.g. Allow +/- 0.5% calculation tolerance, accept both SI and CGS"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">Specific formulas accepted, grading notes</p>
            </div>
          </div>

          {/* 2. Expected Model Answer of Question */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Expected Model Answer of that Question *</span>
              <span className="text-[11px] text-emerald-700 font-semibold normal-case">
                AI uses this as textbook ground-truth
              </span>
            </label>
            <textarea
              rows={3}
              value={modelAnswer}
              onChange={(e) => setModelAnswer(e.target.value)}
              placeholder="Enter complete step-by-step textbook standard answer or key phrases..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* 3. Mark-by-Mark Scoring Criteria */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Marking Rubric for each mark (1 or 2 or 3... points needed in answer) *
                </label>
                <p className="text-[11px] text-slate-500">
                  Explicitly specify which point in student's answer grants how much mark so AI knows exact marks to award.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddCriterion}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Rubric Point</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {criteria.map((crit, idx) => (
                <div
                  key={crit.id || idx}
                  className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                >
                  <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                    {idx + 1}
                  </span>

                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={crit.description}
                      onChange={(e) =>
                        handleUpdateCriterion(idx, 'description', e.target.value)
                      }
                      placeholder="Specific point that must be present in student answer..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="w-24 shrink-0">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0.5"
                        max="20"
                        step="0.5"
                        value={crit.marks}
                        onChange={(e) =>
                          handleUpdateCriterion(
                            idx,
                            'marks',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-14 px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-right text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <span className="text-xs font-bold text-slate-600">Pts</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCriterion(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors mt-0.5"
                    title="Delete criterion"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Examiner will score each point individually based on this rubric.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
            >
              Save Rubric Scheme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
