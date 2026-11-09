'use client';

import React, { useState } from 'react';
import { X, Sparkles, Sliders, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (newSettings: AISettings) => void;
}

export interface AISettings {
  model: string;
  temperature: number;
  rubricStrictness: 'strict' | 'balanced' | 'lenient';
  visionOcrConfidence: number;
  enableBengaliFormulaTranslation: boolean;
  doublePassValidation: boolean;
}

export default function AISettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: AISettingsModalProps) {
  const [formData, setFormData] = useState<AISettings>(settings);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">AI Evaluation Engine Settings</h3>
              <p className="text-xs text-emerald-100">Configure Google Gemini 3.8 Flash & OCR Rubric Parameters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Model Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Vision & Reasoning LLM Engine
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'gemini-3.8-flash',
                  name: 'Google Gemini 3.8 Flash (High Recommended)',
                  desc: 'High-speed Bengali vision OCR, diagram understanding, and sub-part rubric fidelity',
                  badge: 'Active & Selected in PDF',
                },
                {
                  id: 'gemini-1.5-pro',
                  name: 'Google Gemini 1.5 Pro',
                  desc: 'Deep multi-page contextual reasoning for long descriptive answers',
                  badge: 'High Precision',
                },
                {
                  id: 'custom-finetuned',
                  name: 'Phase 2 Self-Hosted Fine-Tuned Model',
                  desc: 'Proprietary RUET Bengali handwriting recognition on-premise model',
                  badge: 'Roadmap Target',
                },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setFormData({ ...formData, model: m.id })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.model === m.id
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                      {m.name}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-800">
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rubric Strictness */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Rubric Strictness & Partial Credit Policy
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'strict', label: 'Strict (কঠোর)', desc: 'Full step accuracy required' },
                { key: 'balanced', label: 'Balanced (বোর্ড মান)', desc: 'Bangladesh Board Standard' },
                { key: 'lenient', label: 'Lenient (সহানুভূতিশীল)', desc: 'Rewards effort & partial ideas' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, rubricStrictness: item.key as any })
                  }
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    formData.rubricStrictness === item.key
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className={`text-[10px] mt-0.5 ${formData.rubricStrictness === item.key ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reasoning Temperature */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Evaluation Temperature (Deterministic): {formData.temperature}
              </label>
              <span className="text-[11px] text-slate-500">0.0 = Consistent Grade</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.5"
              step="0.05"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-slate-700 font-medium">
                Dual Bengali & Mathematical LaTeX OCR Cross-Verification
              </span>
              <input
                type="checkbox"
                checked={formData.enableBengaliFormulaTranslation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    enableBengaliFormulaTranslation: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-slate-700 font-medium">
                Ground-Truth Human Examiner Benchmark Parity Verification
              </span>
              <input
                type="checkbox"
                checked={formData.doublePassValidation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    doublePassValidation: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
