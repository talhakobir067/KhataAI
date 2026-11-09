// ============================================================
// Khata AI — Comprehensive Mock & Benchmark Datasets
// Built from real evaluations & OCR datasets for Gemini 3.8 Flash
// ============================================================

import { Exam, Question, EvaluationResult, Batch, Subject, Institution, User } from './types';

export interface MockQuestionItem {
  id: string;
  categoryKey: 'physics' | 'math' | 'chemistry' | 'english';
  label: string;
  examTitle: string;
  subject: string;
  institution: string;
  fullMarks: number;
  khataImage: string;
  khataCaption: string;
  badgeText: string;
  overallScore: number;
  percentage: number;
  grade: string;
  gpa: number;
  aiExaminerSummary: string;
  questionStimulus: string;
  modelAnswer: string;
  ocrText: string;
  breakdown: Array<{
    subquestionId: string;
    subquestionTitle: string;
    type: string;
    maxMarks: number;
    awardedMarks: number;
    teacherMarks: number;
    criteria: Array<{
      criterionId: string;
      description: string;
      marks: number;
      awarded: number;
      fulfilled: boolean;
      justification: string;
    }>;
  }>;
}

export const MOCK_QUESTIONS: Record<string, MockQuestionItem> = {
  physics: {
    id: 'mock-phys-1',
    categoryKey: 'physics',
    label: 'HSC Physics CQ',
    examTitle: 'Physics 2nd Paper (Complete Syllabus)',
    subject: 'Physics',
    institution: 'MOTTALEB Physics & Math Care',
    fullMarks: 10,
    khataImage: '/khatas/physics_cq.jpg',
    khataCaption: 'Bengali HSC Physics CQ script (Board Level) — Roll: 101 / Mst. Puspita Akter',
    badgeText: 'Handwritten Script',
    overallScore: 9.5,
    percentage: 95,
    grade: 'A+',
    gpa: 5.0,
    aiExaminerSummary: 'উত্তর চমৎকার হয়েছে। শিক্ষার্থী প্রতিটি ধাপ ও সূত্রের অর্থ যথাযথভাবে পূরণ করেছে। উপস্থাপন ও নির্ভুলতা সন্তোষজনক।',
    questionStimulus: 'P-V লেখচিত্রে একটি কার্নো ইঞ্জিন প্রদর্শিত হলো: উৎসের তাপমাত্রা T1 = 827 K, গৃহীত তাপ Q1 = 500 J এবং তাপগ্রাহকের তাপমাত্রা T2 = 387 K। ইঞ্জিনটি চারটি ধাপে পরিচালিত হয়।',
    modelAnswer: `(ক) যে যন্ত্র তাপশক্তিকে অবিরামভাবে যান্ত্রিক শক্তিতে রূপান্তরিত করে তাকে তাপ ইঞ্জিন বলে।
(খ) গ্যাসে তাপ প্রয়োগ করলে এর চাপ ও আয়তন উভয়ই পরিবর্তিত হতে পারে। স্থির আয়তনে প্রদত্ত তাপ কেবল গ্যাসের অভ্যন্তরীণ শক্তি বৃদ্ধি করে (Cv), কিন্তু স্থির চাপে প্রদত্ত তাপ অভ্যন্তরীণ শক্তি বৃদ্ধির পাশাপাশি গ্যাস প্রসারিত করে বাহ্যিক কাজও সম্পাদন করে (Cp = Cv + R)। ফলে Cp > Cv হওয়ায় গ্যাসের মোলার আপেক্ষিক তাপ দুই প্রকার।
(গ) আমরা জানি, Q2 / Q1 = T2 / T1 => Q2 = (387 / 827) * 500 J = 233.98 J। অতএব কৃতকাজ W = Q1 - Q2 = 500 - 233.98 = 266.02 J (বা 266.03 J)।
(ঘ) প্রারম্ভিক কর্মদক্ষতা η1 = 1 - T2/T1 = 1 - 387/827 = 0.5320 = 53.20%। তাপগ্রাহকের তাপমাত্রা দ্বিগুণ করলে T2' = 2 * 387 = 774 K। পরিবর্তিত দক্ষতা η2 = 1 - 774/827 = 0.0641 = 6.41%। অনুপাত η2 / η1 = 6.41 / 53.20 = 0.1205 ≠ 0.5। সুতরাং কর্মদক্ষতা অর্ধেক হবে না, বরং প্রায় ১/৮ অংশে নেমে আসবে।`,
    ocrText: `[Vision OCR Recognized Text — Bengali Script & Formulas]
১। (ক) যে যন্ত্র দ্বারা তাপশক্তিকে অনবরত যান্ত্রিক শক্তিতে রূপান্তর করা যায় তাকে তাপ ইঞ্জিন বলে।

(খ) মোলার আপেক্ষিক তাপ দুই প্রকার: স্থির চাপে (Cp) ও স্থির আয়তনে (Cv)। আয়তন স্থির রাখলে সম্পূর্ণ তাপ অভ্যন্তরীণ শক্তি বৃদ্ধিতে ব্যয় হয়। কিন্তু চাপ স্থির রাখলে তাপ শক্তির কিছু অংশ অভ্যন্তরীণ শক্তি বাড়ায় এবং বাকি অংশ বাহ্যিক কাজ সম্পন্ন করে। তাই Cp সর্বদা Cv অপেক্ষা বেশি (Cp - Cv = R)। এজন্য মোলার আপেক্ষিক তাপ ২ প্রকার।

(গ) আমরা জানি,
Q2 / Q1 = T2 / T1
=> Q2 = (T2 / T1) * Q1
=> Q2 = (387 / 827) * 500 J = 233.98 J
কৃতকাজ W = Q1 - Q2
=> W = 500 J - 233.98 J = 266.02 J (Ans.)

(ঘ) প্রাথমিক দক্ষতা η1 = 1 - (T2 / T1) = 1 - (387 / 827) = 53.20%
তাপগ্রাহকের তাপমাত্রা দ্বিগুণ হলে T2' = 2 * 387 = 774 K
পরিবর্তিত দক্ষতা η2 = 1 - (774 / 827) = 0.0641 = 6.41%
যেহেতু η2 / η1 = 6.41 / 53.20 = 0.12 = 12% ≠ 50%,
অতএব দক্ষতা অর্ধেক হবে না, হ্রাস পেয়ে ১/৮ অংশ হবে।`,
    breakdown: [
      {
        subquestionId: '১(ক)',
        subquestionTitle: 'জ্ঞানমূলক: তাপ ইঞ্জিনের সংজ্ঞা',
        type: 'Knowledge (জ্ঞানমূলক)',
        maxMarks: 1.0,
        awardedMarks: 1.0,
        teacherMarks: 1.0,
        criteria: [
          {
            criterionId: 'R1.1',
            description: 'তাপশক্তিকে অবিরামভাবে যান্ত্রিক শক্তিতে রূপান্তরকারী যন্ত্র হিসেবে উল্লেখ করা',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'সম্পূর্ণ নির্ভুল সংজ্ঞা লিখেছে। কোনো ত্রুটি নেই।',
          },
        ],
      },
      {
        subquestionId: '১(খ)',
        subquestionTitle: 'অনুধাবনমূলক: মোলার আপেক্ষিক তাপের প্রকারভেদ ব্যাখ্যা',
        type: 'Comprehension (অনুধাবনমূলক)',
        maxMarks: 2.0,
        awardedMarks: 2.0,
        teacherMarks: 2.0,
        criteria: [
          {
            criterionId: 'R1.2a',
            description: 'চাপ ও আয়তন উভয় চলকের পরিবর্তনশীলতা এবং Cp ও Cv এর পার্থক্য উল্লেখ',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'স্থির চাপ এবং স্থির আয়তনের মৌলিক পার্থক্য স্পষ্টভাবে উপস্থাপন করেছে।',
          },
          {
            criterionId: 'R1.2b',
            description: 'Cp তে বাহ্যিক কাজের কারণে অতিরিক্ত তাপের প্রয়োজনীয়তা (Cp > Cv) ব্যাখ্যা',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'গ্যাস প্রসারণে বাহ্যিক কাজের কারণে অতিরিক্ত তাপ লাগার কারণ সঠিক ব্যাখ্যা করেছে।',
          },
        ],
      },
      {
        subquestionId: '১(গ)',
        subquestionTitle: 'প্রয়োগমূলক: ইঞ্জিন কর্তৃক কৃত কাজের পরিমাণ নির্ণয়',
        type: 'Application (প্রয়োগমূলক)',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'R1.3a',
            description: 'কার্নো চক্রের তাপ ও পরম তাপমাত্রার সমানুপাতিক সম্পর্ক সূত্র স্থাপন (Q2/Q1 = T2/T1)',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'সূত্র সঠিকভাবে লিখিত।',
          },
          {
            criterionId: 'R1.3b',
            description: 'বর্জিত তাপ Q2 এর মান সঠিকভাবে গণনা করা (233.98 J)',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'বর্জিত তাপ গণনা সম্পূর্ণ নির্ভুল।',
          },
          {
            criterionId: 'R1.3c',
            description: 'কৃতকাজ W = Q1 - Q2 সূত্রের মাধ্যমে এককসহ সঠিক ফলাফল (266.02 J) নির্ণয়',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'এককসহ উত্তর 266.02 J সঠিকভাবে নির্ণীত হয়েছে।',
          },
        ],
      },
      {
        subquestionId: '১(ঘ)',
        subquestionTitle: 'উচ্চতর দক্ষতা: তাপমাত্রা পরিবর্তনে দক্ষতার তুলনামূলক বিশ্লেষণ',
        type: 'Higher Ability (উচ্চতর দক্ষতা)',
        maxMarks: 4.0,
        awardedMarks: 3.5,
        teacherMarks: 3.5,
        criteria: [
          {
            criterionId: 'R1.4a',
            description: 'প্রারম্ভিক কর্মদক্ষতা η1 এর নির্ভুল গণনা (53.20%)',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'প্রারম্ভিক কর্মদক্ষতা ৫৩.২০% সঠিকভাবে বের করেছে।',
          },
          {
            criterionId: 'R1.4b',
            description: 'দ্বিগুণ তাপমাত্রায় T2\' = 774 K ধরে পরিবর্তিত দক্ষতা η2 গণনা (6.41%)',
            marks: 1.5,
            awarded: 1.5,
            fulfilled: true,
            justification: 'নতুন তাপমাত্রা ও পরিবর্তিত দক্ষতা ৬.৪১% সঠিক।',
          },
          {
            criterionId: 'R1.4c',
            description: 'উভয় দক্ষতার গাণিতিক তুলনা (η2/η1 = 0.12) ও সুনির্দিষ্ট সিদ্ধান্ত প্রদান',
            marks: 1.5,
            awarded: 1.0,
            fulfilled: false,
            justification: 'সিদ্ধান্ত সঠিক হলেও তুলনামূলক গাণিতিক অনুপাতে সামান্য ব্যাখ্যা সংক্ষেপ করা হয়েছে (০.৫ নম্বর কর্তন)।',
          },
        ],
      },
    ],
  },
  math: {
    id: 'mock-math-1',
    categoryKey: 'math',
    label: 'SSC Higher Math CQ',
    examTitle: 'Higher Mathematics - Coordinate Geometry & Calculus',
    subject: 'Higher Math',
    institution: 'Ideal School & College',
    fullMarks: 10,
    khataImage: '/khatas/math_cq.jpg',
    khataCaption: 'Bengali SSC Higher Math CQ script — Board Standard Evaluation',
    badgeText: 'Handwritten Script',
    overallScore: 9.0,
    percentage: 90,
    grade: 'A+',
    gpa: 5.0,
    aiExaminerSummary: 'সমাধানের প্রতিটি ধাপ জ্যামিতিক বিশ্লেষণ অনুযায়ী সঠিক। গ্রাফ অঙ্কন পরিচ্ছন্ন এবং একক উল্লেখ নির্ভুল।',
    questionStimulus: 'A(2, 5), B(-1, 1) এবং C(5, -1) একটি ত্রিভুজের তিনটি শীর্ষবিন্দু। AD মধ্যমার দৈর্ঘ্য এবং ত্রিভুজের ক্ষেত্রফল সংক্রান্ত বিশ্লেষণ করো।',
    modelAnswer: `(ক) BC বাহুর মধ্যবিন্দু D = ((-1 + 5)/2, (1 - 1)/2) = (2, 0)।
(খ) AD মধ্যমার দৈর্ঘ্য = sqrt((2 - 2)^2 + (5 - 0)^2) = 5 একক।
(গ) ত্রিভুজ ABC এর ক্ষেত্রফল = 1/2 | 2(1 - (-1)) + (-1)(-1 - 5) + 5(5 - 1) | = 1/2 | 4 + 6 + 20 | = 15 বর্গ একক।
(ঘ) A বিন্দু হতে BC বাহুর লম্বদূরত্ব h = 2 * ক্ষেত্রফল / BC = 30 / sqrt(36 + 4) = 4.74 একক।`,
    ocrText: `[Vision OCR Recognized Text — Mathematical Script]
(ক) D বিন্দুর স্থানাঙ্ক = ((-1 + 5)/2, (1 - 1)/2) = (2, 0)
(খ) AD = √{(2-2)² + (5-0)²} = 5 একক
(গ) ক্ষেত্রফল = 1/2 | x1(y2-y3) + x2(y3-y1) + x3(y1-y2) | = 15 বর্গ একক
(ঘ) লম্বদূরত্ব h = 4.74 একক`,
    breakdown: [
      {
        subquestionId: '১(ক)',
        subquestionTitle: 'মধ্যবিন্দুর স্থানাঙ্ক নির্ণয়',
        type: 'Knowledge',
        maxMarks: 2.0,
        awardedMarks: 2.0,
        teacherMarks: 2.0,
        criteria: [
          {
            criterionId: 'M1.1',
            description: 'মধ্যবিন্দু সূত্র প্রয়োগ ও সঠিক মান (2, 0) নির্ণয়',
            marks: 2.0,
            awarded: 2.0,
            fulfilled: true,
            justification: 'মধ্যবিন্দুর স্থানাঙ্ক সম্পূর্ণ নির্ভুল।',
          },
        ],
      },
      {
        subquestionId: '১(খ)',
        subquestionTitle: 'মধ্যমার দৈর্ঘ্য নির্ণয়',
        type: 'Application',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'M1.2',
            description: 'দূরত্ব সূত্র প্রয়োগ ও এককসহ সঠিক ফলাফল ৫ একক নির্ণয়',
            marks: 3.0,
            awarded: 3.0,
            fulfilled: true,
            justification: 'দূরত্ব সূত্র ও গণনা সঠিক।',
          },
        ],
      },
      {
        subquestionId: '১(গ)',
        subquestionTitle: 'ত্রিভুজ ক্ষেত্রের ক্ষেত্রফল নির্ণয়',
        type: 'Application',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'M1.3',
            description: 'শীর্ষবিন্দুর স্থানাঙ্ক ভিত্তিক ক্ষেত্রফল সূত্র ও ১৫ বর্গ একক গণনা',
            marks: 3.0,
            awarded: 3.0,
            fulfilled: true,
            justification: 'ক্ষেত্রফল নির্ণয় নিখুঁত।',
          },
        ],
      },
      {
        subquestionId: '১(ঘ)',
        subquestionTitle: 'লম্বদূরত্ব ও জ্যামিতিক যাচাই',
        type: 'Higher Ability',
        maxMarks: 2.0,
        awardedMarks: 1.0,
        teacherMarks: 1.0,
        criteria: [
          {
            criterionId: 'M1.4',
            description: 'লম্বদূরত্ব সূত্রে মান স্থাপন ও দশমিক ২ ঘর পর্যন্ত মান (4.74) প্রদর্শন',
            marks: 2.0,
            awarded: 1.0,
            fulfilled: false,
            justification: 'সূত্রে মান সঠিক বসালেও ক্যালকুলেশনের পূর্ণ ধাপ দেখানো হয়নি (১ নম্বর কর্তন)।',
          },
        ],
      },
    ],
  },
  chemistry: {
    id: 'mock-chem-1',
    categoryKey: 'chemistry',
    label: 'HSC Chemistry CQ',
    examTitle: 'Chemistry 1st Paper — Chemical Equilibrium & pH',
    subject: 'Chemistry',
    institution: 'Notre Dame College',
    fullMarks: 10,
    khataImage: '/khatas/chemistry_cq.jpg',
    khataCaption: 'Bengali HSC Chemistry CQ script — Buffer Solution & pH Calculation',
    badgeText: 'Handwritten Script',
    overallScore: 8.5,
    percentage: 85,
    grade: 'A',
    gpa: 4.0,
    aiExaminerSummary: 'রাসায়নিক সমীকরণ ও বাফার দ্রবণের মূলনীতি সঠিকভাবে আলোচিত হয়েছে। হ্যান্ডারসন-হেসেলবাল্ক সমীকরণ নির্ভুলভাবে প্রয়োগ করা হয়েছে।',
    questionStimulus: 'পাত্র A: 50 mL 0.1 M CH3COOH দ্রবণ (Ka = 1.8 × 10^-5)। পাত্র B: 25 mL 0.1 M NaOH দ্রবণ। উভয় দ্রবণ মিশ্রিত করা হলো।',
    modelAnswer: `(ক) অসওয়াল্ডের লঘুকরণ সূত্রটি লেখো।
(খ) খাঁটি পানির চেয়ে সমুদ্রের পানির বিদ্যুৎ পরিবাহিতা বেশি কেন?
(গ) মিশ্রণের পূর্বে পাত্র A এর দ্রবণের pH নির্ণয় করো: [H+] = sqrt(Ka * C) = sqrt(1.8e-5 * 0.1) = 1.34e-3 M => pH = -log[H+] = 2.87।
(ঘ) মিশ্রিত দ্রবণের প্রকৃতি বাফার কিনা এবং এর pH গণনার মাধ্যমে যাচাই করো: অবশিষ্ট এসিড = 2.5 mmol, উৎপন্ন লবণ = 2.5 mmol => pH = pKa + log(লবণ/এসিড) = 4.74।`,
    ocrText: `[Vision OCR Recognized Text — Chemistry Formula Script]
(ক) অসওয়াল্ড লঘুকরণ সূত্র: নির্দিষ্ট তাপমাত্রায় মৃদু তড়িৎ বিশ্লেষ্যের বিয়োজন মাত্রা দ্রবণের মোলার ঘনমাত্রার বর্গমূলের ব্যস্তানুপাতিক।
(খ) সমুদ্রের পানিতে প্রচুর অজৈব আয়ন (Na+, Cl-, Mg2+) থাকায় পরিবাহিতা বেশি।
(গ) [H+] = √(Ka × C) = 1.34 × 10⁻³ M, pH = 2.87
(ঘ) CH3COOH + NaOH -> CH3COONa + H2O
pH = pKa + log([লবণ]/[এসিড]) = 4.74 (বাফার দ্রবণ গঠিত হয়)`,
    breakdown: [
      {
        subquestionId: '১(ক)',
        subquestionTitle: 'জ্ঞানমূলক: অসওয়াল্ডের লঘুকরণ সূত্র',
        type: 'Knowledge',
        maxMarks: 1.0,
        awardedMarks: 1.0,
        teacherMarks: 1.0,
        criteria: [
          {
            criterionId: 'C1.1',
            description: 'লঘুকরণ সূত্রের সঠিক বিবৃতি প্রদান',
            marks: 1.0,
            awarded: 1.0,
            fulfilled: true,
            justification: 'সংজ্ঞা ও সূত্র সঠিক।',
          },
        ],
      },
      {
        subquestionId: '১(খ)',
        subquestionTitle: 'অনুধাবনমূলক: সমুদ্রের পানির পরিবাহিতা',
        type: 'Comprehension',
        maxMarks: 2.0,
        awardedMarks: 2.0,
        teacherMarks: 2.0,
        criteria: [
          {
            criterionId: 'C1.2',
            description: 'খনিজ লবণ ও মুক্ত আয়নের উপস্থিতি উল্লেখ করে পরিবাহিতা ব্যাখ্যা',
            marks: 2.0,
            awarded: 2.0,
            fulfilled: true,
            justification: 'আয়নীয় পরিবাহিতার ব্যাখ্যা যথাযথ।',
          },
        ],
      },
      {
        subquestionId: '১(গ)',
        subquestionTitle: 'প্রয়োগমূলক: মৃদু এসিডের pH গণনা',
        type: 'Application',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'C1.3',
            description: 'Ka ও C সূত্রে বসিয়ে [H+] ও pH = 2.87 নির্ণয়',
            marks: 3.0,
            awarded: 3.0,
            fulfilled: true,
            justification: 'pH গণনা সম্পূর্ণ সঠিক।',
          },
        ],
      },
      {
        subquestionId: '১(ঘ)',
        subquestionTitle: 'উচ্চতর দক্ষতা: বাফার দ্রবণের pH ও ক্রিয়াকৌশল',
        type: 'Higher Ability',
        maxMarks: 4.0,
        awardedMarks: 2.5,
        teacherMarks: 2.5,
        criteria: [
          {
            criterionId: 'C1.4a',
            description: 'বিক্রিয়া সমীকরণ ও অবশিষ্ট এসিড ও লবণের পরিমাণ গণনা',
            marks: 2.0,
            awarded: 2.0,
            fulfilled: true,
            justification: 'বিক্রিয়া ও মোল গণনা সঠিক।',
          },
          {
            criterionId: 'C1.4b',
            description: 'হ্যান্ডারসন-হেসেলবাল্ক সমীকরণে বাফার ক্রিয়াকৌশল বিশদ আলোচনা',
            marks: 2.0,
            awarded: 0.5,
            fulfilled: false,
            justification: 'pH মান ৪.৭৪ নির্ণয় করলেও বাফার রোধক ক্রিয়াকৌশলের বিস্তারিত ব্যাখ্যার অভাব (১.৫ নম্বর কর্তন)।',
          },
        ],
      },
    ],
  },
  english: {
    id: 'mock-eng-1',
    categoryKey: 'english',
    label: 'HSC English 1st Paper',
    examTitle: 'English 1st Paper — Reading Comprehension & Writing',
    subject: 'English',
    institution: 'Rajshahi College',
    fullMarks: 10,
    khataImage: '/khatas/english_cq.jpg',
    khataCaption: 'Handwritten English Script — Comprehension and Critical Analysis',
    badgeText: 'Handwritten Script',
    overallScore: 9.0,
    percentage: 90,
    grade: 'A+',
    gpa: 5.0,
    aiExaminerSummary: 'Exemplary sentence structure, precise vocabulary, and insightful answers following the passage stimulus. Grammar and spelling are well maintained.',
    questionStimulus: 'Read the passage about Nelson Mandela and answer the questions with textual evidence and personal analysis.',
    modelAnswer: `1. Mandela was imprisoned for 27 years fighting against apartheid.
2. The term "emancipation" signifies liberation from social, economic, and political bondage.
3. Mandela bridged racial divides through reconciliation, forgiveness, and establishing democratic ideals.`,
    ocrText: `[Vision OCR Recognized Text — English Script]
1. Nelson Mandela struggled against apartheid in South Africa for nearly three decades, enduring 27 years of imprisonment.
2. Emancipation refers to the political and human freedom from discrimination and racial tyranny.
3. Through restorative justice, forgiveness, and truth reconciliation, he united divided factions.`,
    breakdown: [
      {
        subquestionId: 'Q1',
        subquestionTitle: 'Direct Context Question',
        type: 'Comprehension',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'E1.1',
            description: 'Accurately citing years of imprisonment and core fight against apartheid',
            marks: 3.0,
            awarded: 3.0,
            fulfilled: true,
            justification: 'Fully satisfied with factual accuracy.',
          },
        ],
      },
      {
        subquestionId: 'Q2',
        subquestionTitle: 'Vocabulary & Contextual Meaning',
        type: 'Analysis',
        maxMarks: 3.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'E1.2',
            description: 'Contextual explanation of political emancipation',
            marks: 3.0,
            awarded: 3.0,
            fulfilled: true,
            justification: 'Precise and expressive English vocabulary.',
          },
        ],
      },
      {
        subquestionId: 'Q3',
        subquestionTitle: 'Thematic Synthesis',
        type: 'Synthesis',
        maxMarks: 4.0,
        awardedMarks: 3.0,
        teacherMarks: 3.0,
        criteria: [
          {
            criterionId: 'E1.3',
            description: 'Comprehensive analysis of reconciliation and leadership',
            marks: 4.0,
            awarded: 3.0,
            fulfilled: true,
            justification: 'Well structured response, slight elaboration on constitutional democracy would grant full 4 marks.',
          },
        ],
      },
    ],
  },
};

// Default Custom Question & Points matching PDF Page 2 Screenshot 2
export const DEFAULT_CUSTOM_EVALUATION = {
  examTitle: 'Physics Final: গতিবিদ্যা ও বল সংক্রান্ত গাণিতিক সমস্যা',
  subjectMarkLabel: 'পূর্ণমান/সময়: ১০ নম্বর',
  questionStatement: `(উদ্দীপক/প্রশ্ন) ১। প্রথমে ৮ সেকেন্ডে গাড়িটি শেষ বেগ অর্জন করে। (২) সম্পূর্ণ যাত্রায় মোট অতিক্রান্ত দূরত্ব হিসাব করো এবং বেগ-সময় লেখচিত্রের প্রকৃতি বিশ্লেষণ করো। স্থির অবস্থান থেকে যাত্রা শুরু করে ২.৫ m/s² সুষম ত্বরণে চলে। পরবর্তী ১০ সেকেন্ড সমবেগে চলে।`,
  expectedModelAnswer: `১. ত্বরণকাল দূরত্ব: s1 = ut + 1/2at² = 0 + 1/2(2.5)(64) = 80 m।
২. সমবেগে দূরত্ব: শেষ বেগ v = u + at = 0 + (2.5)(8) = 20 m/s। সমবেগে অতিক্রান্ত দূরত্ব s2 = vt = 20 * 10 = 200 m।
৩. মোট দূরত্ব = s1 + s2 = 80 + 200 = 280 m।
৪. বেগ-সময় লেখচিত্র: প্রথম ৮ সেকেন্ড মূলবিন্দুগামী সরলরেখা (সুষম ত্বরণ) এবং পরবর্তী ১০ সেকেন্ড সময় অক্ষের সমান্তরাল সরলরেখা (সমবেগ) নির্দেশ করে।`,
  criteria: [
    {
      id: 'crit-1',
      description: 'ধাপ ১: স্থির অবস্থান ও ত্বরণসূত্র প্রয়োগ করে শেষ বেগ ২০ m/s নির্ণয়',
      marks: 2,
    },
    {
      id: 'crit-2',
      description: 'ধাপ ২: ত্বরণকালীন অতিক্রান্ত দূরত্ব s1 = ৮০ মিটার হিসাব',
      marks: 3,
    },
    {
      id: 'crit-3',
      description: 'ধাপ ৩: সমবেগ ও মোট অতিক্রান্ত দূরত্ব (২৮০ m) হিসাব',
      marks: 3,
    },
    {
      id: 'crit-4',
      description: 'ধাপ ৪: বেগ-সময় লেখচিত্রের প্রকৃতি বিশ্লেষণ',
      marks: 2,
    },
  ],
};

// Initial Institutions, Batches, Subjects, and Exams for the Institution Portal
export const INITIAL_INSTITUTION: Institution = {
  id: 'inst-001',
  name: 'Apex Coaching Center & Model College',
  owner_id: 'usr-admin-1',
  logo_url: '',
  created_at: new Date().toISOString(),
};

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-001',
    name: 'HSC 2026 Engineering Batch',
    institution_id: 'inst-001',
    institutionSlug: 'apex-coaching',
    createdAt: new Date().toISOString(),
    description: 'Target BUET, RUET, CUET, KUET admission preparation',
    created_at: new Date().toISOString(),
  },
  {
    id: 'batch-002',
    name: 'Medical & Dental Admission 2026',
    institution_id: 'inst-001',
    institutionSlug: 'apex-coaching',
    createdAt: new Date().toISOString(),
    description: 'Specialized biology, chemistry and physics preparation',
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'subj-001',
    name: 'Physics 2nd Paper',
    code: 'PHY-202',
    batch_id: 'batch-001',
    description: 'Thermodynamics, Modern Physics, Nuclear Physics & Circuits',
    created_at: new Date().toISOString(),
  },
  {
    id: 'subj-002',
    name: 'Higher Mathematics 1st Paper',
    code: 'MATH-101',
    batch_id: 'batch-001',
    description: 'Matrix, Vector, Straight Lines, Calculus',
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-001',
    title: 'HSC Board Standard Physics Mock CQ',
    subject: 'Physics 2nd Paper',
    curriculumCode: 'HSC',
    creatorId: 'usr-admin-1',
    creatorName: 'Khata AI Examiner',
    totalMarks: 50,
    durationMinutes: 90,
    isOnline: true,
    isPublished: true,
    negativeMarkingRate: 0,
    passMarkPercentage: 40,
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subject_id: 'subj-001',
    subject_name: 'Physics 2nd Paper',
    batchName: 'HSC 2026 Engineering Batch',
    description: 'Creative questions on Thermodynamics and Electricity with AI Step Rubrics',
    total_marks: 50,
    duration_minutes: 90,
    status: 'published',
    isPublic: true,
    join_code: 'PHY2026',
    created_by: 'usr-admin-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    question_count: 5,
  },
  {
    id: 'exam-002',
    title: 'Higher Math Coordinate Geometry Midterm',
    subject: 'Higher Mathematics 1st Paper',
    curriculumCode: 'HSC',
    creatorId: 'usr-admin-1',
    creatorName: 'Khata AI Examiner',
    totalMarks: 40,
    durationMinutes: 60,
    isOnline: true,
    isPublished: true,
    negativeMarkingRate: 0,
    passMarkPercentage: 40,
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subject_id: 'subj-002',
    subject_name: 'Higher Mathematics 1st Paper',
    batchName: 'HSC 2026 Engineering Batch',
    description: 'Straight lines, triangles, and locus problems with rubric grading',
    total_marks: 40,
    duration_minutes: 60,
    status: 'published',
    isPublic: false,
    join_code: 'MATH789',
    created_by: 'usr-admin-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    question_count: 4,
  },
];
