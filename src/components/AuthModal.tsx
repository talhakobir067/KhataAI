'use client';

import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Building2,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { User, UserRole } from '../lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'student' | 'institution';
  onLoginSuccess: (user: User) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialRole = 'institution',
  onLoginSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [accountType, setAccountType] = useState<'student' | 'institution'>(initialRole);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields matching Page 3 Screenshot
  const [fullName, setFullName] = useState(
    initialRole === 'institution' ? 'Prof. Rafiqul Islam' : 'Mst. Puspita Akter'
  );
  const [email, setEmail] = useState(
    initialRole === 'institution' ? 'rafiqul.islam@apexcoaching.edu.bd' : 'puspita.student@vcr.edu.bd'
  );
  const [confirmEmail, setConfirmEmail] = useState(
    initialRole === 'institution' ? 'rafiqul.islam@apexcoaching.edu.bd' : 'puspita.student@vcr.edu.bd'
  );
  const [institutionName, setInstitutionName] = useState(
    'Apex Coaching Center / Sunrise Model College'
  );
  const [studentId, setStudentId] = useState('KHATA_001');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (email !== confirmEmail) {
        setError('Email addresses do not match.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }

    const createdUser: User = {
      id: `usr-${Date.now()}`,
      name: fullName,
      email: email,
      role: accountType === 'institution' ? 'institution' : 'student',
      institution: accountType === 'institution' ? institutionName : 'VCR Model College',
      institutionSlug: accountType === 'institution' ? 'apex-coaching' : 'vcr-college',
      institution_name: accountType === 'institution' ? institutionName : 'VCR Model College',
      student_id: accountType === 'student' ? studentId : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onLoginSuccess(createdUser);
    onClose();
  };

  const handleQuickDemoLogin = (role: 'institution' | 'student') => {
    if (role === 'institution') {
      onLoginSuccess({
        id: 'usr-inst-demo',
        name: 'Prof. Rafiqul Islam / Principal Kabir',
        email: 'admin@apexcoaching.edu.bd',
        role: 'institution',
        institution: 'Apex Coaching Center & Model College',
        institutionSlug: 'apex-coaching',
        institution_name: 'Apex Coaching Center & Model College',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } else {
      onLoginSuccess({
        id: 'usr-student-demo',
        name: 'Mst. Puspita Akter',
        email: 'puspita@student.bd',
        role: 'student',
        institution: 'VCR Model College',
        institutionSlug: 'vcr-college',
        student_id: 'KHATA_001 (Roll: 101)',
        institution_name: 'VCR Model College',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header bar */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-center text-xs font-semibold text-emerald-700 tracking-wide uppercase mb-1">
            {mode === 'register' ? 'Official Registration Portal' : 'Welcome Back'}
          </p>
          <h2 className="text-center text-lg sm:text-xl font-bold text-slate-900">
            Join Bangladesh&apos;s premier AI examination and grading ecosystem.
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Quick Demo Switcher */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>One-Click Investor / Evaluator Demo:</span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('institution')}
                className="px-2.5 py-1 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg text-[11px]"
              >
                Log In as Institution
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="px-2.5 py-1 font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-[11px]"
              >
                Log In as Student
              </button>
            </div>
          </div>

          {/* Choose Account Type (Matching Page 3) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose Account Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Card */}
                <div
                  onClick={() => setAccountType('student')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    accountType === 'student'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      accountType === 'student' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-slate-900">Student</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Take public exams, join coaching portals, and view AI graded scripts.
                  </p>
                </div>

                {/* Institution / Educator Card */}
                <div
                  onClick={() => setAccountType('institution')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    accountType === 'institution'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      accountType === 'institution' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-slate-900">Institution / Educator</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Add coaching, school, college or varsity, create exams, and share test links.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Prof. Rafiqul Islam / Principal Kabir"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            )}

            {/* Email Address & Confirm Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Address:</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {mode === 'register' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Confirm Email Address:</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="Re-enter email address"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              ) : null}
            </div>

            {/* Institution / Student Details */}
            {mode === 'register' && accountType === 'institution' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Institution / Coaching Name (Required):</span>
                  </label>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Creates Your Portal
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="e.g. Apex Coaching Center / Sunrise Model College / Paragon Academy"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  An institution portal will be created exclusively for you where only you can create exams and batches.
                </p>
              </div>
            )}

            {mode === 'register' && accountType === 'student' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Student ID / Roll / College:</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. KHATA_001 (Roll: 101, VCR Model College)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            )}

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Password:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {mode === 'register' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Confirm Password:</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              ) : null}
            </div>

            {/* Submit Button matching Page 3 Green CTA */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/30 transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>{mode === 'register' ? 'Create Account & Get Started' : 'Sign In to Your Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between Register and Login */}
          <div className="text-center pt-2">
            {mode === 'register' ? (
              <p className="text-xs text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600">
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
