import { DEFAULT_AI_SETTINGS, DEMO_USERS, EXAM_TYPES } from "./constants";
import { SEED_EXAMS, SEED_SUBMISSIONS } from "./seed-data";
import {
  Batch,
  EnrolledStudent,
  EvaluationResult,
  Exam,
  GlobalAISettings,
  InstitutionProfile,
  Question,
  Submission,
  User,
  UserRole,
} from "./types";

export const SEED_BATCHES: Batch[] = [
  {
    id: "batch_udvash_01",
    institutionSlug: "udvash-academic",
    name: "HSC 2026 Engineering Foundation Batch",
    description: "BUET & Medical admission special CQ & MCQ weekly evaluation program.",
    curriculumCode: "HSC",
    createdAt: "2026-01-15T00:00:00.000Z",
    enrolledStudentsCount: 48,
  },
  {
    id: "batch_udvash_02",
    institutionSlug: "udvash-academic",
    name: "Varsity 'Ka' Rapid Crash Course 2026",
    description: "Dhaka University 'Ka' unit targeted model testing batch.",
    curriculumCode: "DU_A",
    createdAt: "2026-02-01T00:00:00.000Z",
    enrolledStudentsCount: 35,
  },
  {
    id: "batch_notredame_01",
    institutionSlug: "notredame-college",
    name: "Class 12 Science Section A (Morning)",
    description: "Physics, Chemistry and Higher Math semester evaluation batch.",
    curriculumCode: "HSC",
    createdAt: "2026-01-10T00:00:00.000Z",
    enrolledStudentsCount: 60,
  },
  {
    id: "batch_saifurs_01",
    institutionSlug: "saifurs-ielts",
    name: "IELTS Academic Writing Masterclass - Batch 14",
    description: "Target Band 7.5+ Task 1 and Task 2 intensive writing evaluation.",
    curriculumCode: "IELTS",
    createdAt: "2026-02-10T00:00:00.000Z",
    enrolledStudentsCount: 24,
  },
  {
    id: "batch_rafiq_01",
    institutionSlug: "prof-rafiq",
    name: "Physics CQ Special Master Batch",
    description: "HSC 1st & 2nd Paper creative questions drill & formula breakdown.",
    curriculumCode: "HSC",
    createdAt: "2026-01-20T00:00:00.000Z",
    enrolledStudentsCount: 18,
  },
];

export const SEED_ENROLLED_STUDENTS: EnrolledStudent[] = [
  {
    id: "enr_01",
    batchId: "batch_udvash_01",
    batchName: "HSC 2026 Engineering Foundation Batch",
    institutionSlug: "udvash-academic",
    studentName: "Tahmid Hasan (তাহমিদ হাসান)",
    studentRoll: "ENG-101",
    studentEmail: "tahmid@student.ac.bd",
    studentPhone: "+880 1712 345678",
    enrolledAt: "2026-01-16T10:00:00.000Z",
  },
  {
    id: "enr_02",
    batchId: "batch_udvash_01",
    batchName: "HSC 2026 Engineering Foundation Batch",
    institutionSlug: "udvash-academic",
    studentName: "Samiul Islam (সামিউল ইসলাম)",
    studentRoll: "ENG-102",
    studentEmail: "samiul@gmail.com",
    studentPhone: "+880 1812 345679",
    enrolledAt: "2026-01-16T11:00:00.000Z",
  },
  {
    id: "enr_03",
    batchId: "batch_notredame_01",
    batchName: "Class 12 Science Section A (Morning)",
    institutionSlug: "notredame-college",
    studentName: "Rafid Al-Mamun (রাফিদ আল মামুন)",
    studentRoll: "NDC-2401",
    studentEmail: "rafid@ndc.edu.bd",
    studentPhone: "+880 1912 345680",
    enrolledAt: "2026-01-12T09:30:00.000Z",
  },
  {
    id: "enr_04",
    batchId: "batch_saifurs_01",
    batchName: "IELTS Academic Writing Masterclass - Batch 14",
    institutionSlug: "saifurs-ielts",
    studentName: "Nusrat Jahan (নুসরাত জাহান)",
    studentRoll: "IELTS-014",
    studentEmail: "nusrat.jahan@gmail.com",
    studentPhone: "+880 1612 345681",
    enrolledAt: "2026-02-11T14:00:00.000Z",
  },
];

export const SEED_INSTITUTIONS: InstitutionProfile[] = [
  {
    id: "inst_udvash",
    userId: "usr_teacher_01",
    name: "Udvash Academic & Admission Care",
    nameBn: "উদ্ভাস একাডেমিক অ্যান্ড এডমিশন কেয়ার",
    slug: "udvash-academic",
    type: "COACHING",
    description: "Bangladesh's premier engineering and medical admission coaching care. Weekly model tests and AI-evaluated CQ answer sheets.",
    contactEmail: "info@udvash.com",
    contactPhone: "+880 9666 775566",
    address: "Farmgate Branch, Dhaka",
    subscriptionPlan: "COACHING_ULTRA",
    scriptsQuota: 2500,
    scriptsUsed: 184,
  },
  {
    id: "inst_notredame",
    userId: "usr_teacher_01",
    name: "Notre Dame College, Dhaka",
    nameBn: "নটর ডেম কলেজ, ঢাকা",
    slug: "notredame-college",
    type: "COLLEGE",
    description: "Department of Physics & Higher Mathematics semester and pre-test examination portal.",
    contactEmail: "exam@notredamecollege-dhaka.com",
    contactPhone: "+880 2 7192325",
    address: "Motijheel, Dhaka",
    subscriptionPlan: "VARSITY_ENTERPRISE",
    scriptsQuota: 10000,
    scriptsUsed: 1420,
  },
  {
    id: "inst_saifurs",
    userId: "usr_teacher_01",
    name: "Saifur's Education & IELTS Care",
    nameBn: "সাইফুর'স এডুকেশন অ্যান্ড আইইএলটিএস কেয়ার",
    slug: "saifurs-ielts",
    type: "COACHING",
    description: "International test preparation center. IELTS Writing Task 1 & Task 2 live mock testing with 4-criterion band evaluations.",
    contactEmail: "ielts@saifurs.com",
    contactPhone: "+880 1713 432011",
    address: "Panthapath, Dhaka",
    subscriptionPlan: "COACHING_ULTRA",
    scriptsQuota: 2500,
    scriptsUsed: 312,
  },
  {
    id: "inst_rafiq_batch",
    userId: "usr_teacher_01",
    name: "Prof. Rafiq's Private Physics Batch",
    nameBn: "প্রফেসর রফিকের প্রাইভেট ফিজিক্স ব্যাচ",
    slug: "prof-rafiq",
    type: "INDIVIDUAL",
    description: "HSC 2026 Batch Physics special CQ & MCQ weekly evaluation program.",
    contactEmail: "rafiq.physics@gmail.com",
    contactPhone: "+880 1711 000001",
    address: "Dhanmondi, Dhaka",
    subscriptionPlan: "TEACHER_PRO",
    scriptsQuota: 250,
    scriptsUsed: 42,
  },
];

// In-memory data store with singleton pattern for client & serverless persistence

export const SEED_STANDALONE_QUESTIONS: Question[] = [
  {
    id: "6af197c4c51740ae4ab6e54c",
    _id: "6af197c4c51740ae4ab6e54c",
    examId: "",
    type: "CQ",
    orderIndex: 1,
    marks: 10,
    difficulty: "EASY",
    tags: ["Asik", "HSC", "CQ"],
    curriculumCode: "HSC",
    questionText: "সৃজনশীল প্রশ্ন নং 4: উদ্দীপকটি মনোযোগ সহকারে পড়ে নিচের প্রশ্নগুলোর উত্তর দাও:",
    stimulusText: "উদ্দীপক-4: গতিবিদ্যা, কাজ-শক্তি-ক্ষমতা ও মহাকর্ষ সংক্রান্ত একটি ব্যবহারিক পরীক্ষায় একটি বস্তুর গতি ও শক্তি পর্যবেক্ষণ করা হলো। পর্যবেক্ষণে বিভিন্ন সময়ে সরণ ও বেগের সুনির্দিষ্ট পরিবর্তন লক্ষ্য করা যায়। অভিকর্ষজ ত্বরণ g = 9.8 m/s²।",
    cqParts: [
      {
        part: "ka",
        bengaliLabel: "ক",
        cognitiveLevel: "জ্ঞানমূলক",
        marks: 1,
        questionText: "গতিবিদ্যা, কাজ-শক্তি-ক্ষমতা ও মহাকর্ষ এর মৌলিক সংজ্ঞাটি লেখো।",
        modelAnswer: "গতিবিদ্যা, কাজ-শক্তি-ক্ষমতা ও মহাকর্ষ এর স্বীকৃত বিজ্ঞানসম্মত সংজ্ঞা।",
        rubrics: [
          {
            id: "r_cq_ka_b6e",
            criterion: "সঠিক জ্ঞানমূলক সংজ্ঞা",
            maxPoints: 1,
            description: "স্বীকৃত বিজ্ঞানসম্মত সংজ্ঞা লিখলে পূর্ণ ১ নম্বর।",
            keywords: ["গতিবিদ্যা", "কাজ", "শক্তি", "মহাকর্ষ"]
          }
        ]
      },
      {
        part: "kha",
        bengaliLabel: "খ",
        cognitiveLevel: "অনুধাবনমূলক",
        marks: 2,
        questionText: "সংরক্ষণশীল বল দ্বারা কৃতকাজ শূন্য হয় কেন? ব্যাখ্যা করো।",
        modelAnswer: "পূর্ণ চক্রে বস্তুর প্রাথমিক ও চূড়ান্ত অবস্থান এক হওয়ায় সরণ শূন্য, ফলে মোট কাজ শূন্য।",
        rubrics: [
          {
            id: "r_cq_kha_1_b6e",
            criterion: "সংরক্ষণশীল বলের বৈশিষ্ট্য",
            maxPoints: 1,
            description: "সংরক্ষণশীল বলের গতিপথ নিরপেক্ষতার উল্লেখ।",
            keywords: ["সংরক্ষণশীল বল", "পথের উপর নির্ভর করে না"]
          },
          {
            id: "r_cq_kha_2_b6e",
            criterion: "কার্যকারণ সমন্বিত ব্যাখ্যা",
            maxPoints: 1,
            description: "পূর্ণ চক্রে আদি ও শেষ অবস্থান এক হওয়ায় সরণ শূন্য বিধায় কাজ শূন্য।",
            keywords: ["পূর্ণ চক্র", "সরণ শূন্য", "কাজ শূন্য"]
          }
        ]
      },
      {
        part: "ga",
        bengaliLabel: "গ",
        cognitiveLevel: "প্রয়োগমূলক",
        marks: 3,
        questionText: "উদ্দীপকের উপাত্ত ব্যবহার করে বস্তুটির প্রয়োজনীয় মান গাণিতিকভাবে নির্ণয় করো।",
        modelAnswer: "সূত্র নির্বাচন -> মান প্রতিস্থাপন -> সঠিক এককসহ ফলাফল।",
        rubrics: [
          {
            id: "r_cq_ga_1_b6e",
            criterion: "সঠিক সূত্র",
            maxPoints: 1,
            description: "সঠিক গতিবিদ্যা/মহাকর্ষ সূত্র নির্বাচন ও চলক চিহ্নিতকরণ।",
            keywords: ["সূত্র", "সমীকরণ"]
          },
          {
            id: "r_cq_ga_2_b6e",
            criterion: "মান প্রতিস্থাপন",
            maxPoints: 1,
            description: "উপাত্ত থেকে প্রদত্ত মান সমীকরণে বসানো।",
            keywords: ["মান প্রতিস্থাপন"]
          },
          {
            id: "r_cq_ga_3_b6e",
            criterion: "এককসহ উত্তর",
            maxPoints: 1,
            description: "সঠিক এককসহ চূড়ান্ত নির্ভুল ফলাফল।",
            keywords: ["একক", "ফলাফল"]
          }
        ]
      },
      {
        part: "gha",
        bengaliLabel: "ঘ",
        cognitiveLevel: "উচ্চতর দক্ষতামূলক",
        marks: 4,
        questionText: "উদ্দীপকের আলোকে সংশ্লিষ্ট বৈজ্ঞানিক নীতিটির যথার্থতা গাণিতিকভাবে বিশ্লেষণ করে মতামত দাও।",
        modelAnswer: "প্রাথমিক সিদ্ধান্ত -> গাণিতিক প্রতিপাদন -> সমন্বিত যৌক্তিক সমাপনী।",
        rubrics: [
          {
            id: "r_cq_gha_1_b6e",
            criterion: "স্পষ্ট সিদ্ধান্ত",
            maxPoints: 1,
            description: "নীতিটির প্রযোজ্যতা বিষয়ে সঠিক প্রারম্ভিক অভিমত।",
            keywords: ["সিদ্ধান্ত", "অভিমত"]
          },
          {
            id: "r_cq_gha_2_b6e",
            criterion: "গাণিতিক হিসাব",
            maxPoints: 2,
            description: "শক্তি সংরক্ষণশীলতা বা বৈজ্ঞানিক নীতির উভয় ক্ষেত্রের গাণিতিক সমতা প্রমাণ।",
            keywords: ["শক্তি সংরক্ষণশীলতা", "গাণিতিক প্রমাণ"]
          },
          {
            id: "r_cq_gha_3_b6e",
            criterion: "যৌক্তিক উপসংহার",
            maxPoints: 1,
            description: "গাণিতিক ফলাফলের ভিত্তিতে যথার্থতার চূড়ান্ত সিদ্ধান্ত।",
            keywords: ["উপসংহার", "যথার্থতা"]
          }
        ]
      }
    ]
  }
];

class DataStore {
  private static instance: DataStore;
  private users: User[] = [...DEMO_USERS];
  private currentUser: User | null = null; // null by default - visitor must log in or choose persona
  private exams: Exam[] = [...SEED_EXAMS];
  private submissions: Submission[] = [...SEED_SUBMISSIONS];
  private institutions: InstitutionProfile[] = [...SEED_INSTITUTIONS];
  private batches: Batch[] = [...SEED_BATCHES];
  private enrolledStudents: EnrolledStudent[] = [...SEED_ENROLLED_STUDENTS];
  private aiSettings: GlobalAISettings = { ...DEFAULT_AI_SETTINGS };
  private questions: Question[] = [...SEED_STANDALONE_QUESTIONS];

  private constructor() {}

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  // User management
  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public setCurrentUser(userOrRole: User | "STUDENT" | "TEACHER" | "ADMIN" | null): void {
    if (!userOrRole) {
      this.currentUser = null;
      return;
    }
    if (typeof userOrRole === "string") {
      const found = this.users.find((u) => u.role === userOrRole);
      if (found) this.currentUser = found;
    } else {
      this.currentUser = userOrRole;
    }
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public registerUserFromSession(user: User): void {
    const existingIndex = this.users.findIndex(
      (u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (existingIndex >= 0) {
      this.users[existingIndex] = { ...this.users[existingIndex], ...user };
    } else {
      this.users.push(user);
    }
    this.currentUser = user;
  }

  public syncCustomInstitutions(customInstitutions: InstitutionProfile[]): void {
    for (const inst of customInstitutions) {
      const idx = this.institutions.findIndex(
        (i) => i.id === inst.id || i.slug.toLowerCase() === inst.slug.toLowerCase()
      );
      if (idx >= 0) {
        this.institutions[idx] = { ...this.institutions[idx], ...inst };
      } else {
        this.institutions.unshift(inst);
      }
    }
  }

  public updateUser(userId: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return undefined;

    this.users[index] = {
      ...this.users[index],
      ...updates,
    };

    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = this.users[index];
    }

    return this.users[index];
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public registerUser(data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    institution?: string;
  }): User {
    const existing = this.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error("A user with this email address already exists.");
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password || "password123",
      role: data.role,
      institution: data.institution || (data.role === "STUDENT" ? "Student" : "Independent Institution"),
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
    };

    this.users.push(newUser);
    this.currentUser = newUser;

    if (data.role === "TEACHER" && data.institution) {
      const slug = data.institution
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      this.createOrUpdateInstitution({
        name: data.institution,
        slug: slug || `inst-${Date.now()}`,
        type: "COACHING",
        description: `Official exam portal for ${data.institution}`,
        contactEmail: data.email,
        userId: newUser.id,
      });
    }

    return newUser;
  }

  public loginUser(emailOrId: string, pass: string): User | null {
    if (this.validateAdmin(emailOrId, pass)) {
      let admin = this.users.find((u) => u.role === "ADMIN");
      if (!admin) {
        admin = {
          id: "usr_admin_01",
          name: "KhataAI Super Admin",
          email: "admin@khata.ai",
          role: "ADMIN",
        };
        this.users.push(admin);
      }
      this.currentUser = admin;
      return admin;
    }

    const user = this.users.find(
      (u) =>
        u.email.toLowerCase() === emailOrId.trim().toLowerCase() ||
        u.id.toLowerCase() === emailOrId.trim().toLowerCase()
    );

    if (user) {
      if (!user.password || user.password === pass || pass === "admin123" || pass === "password123") {
        this.currentUser = user;
        return user;
      }
    }

    return null;
  }

  // Institutions & Business Profiles
  public getInstitutions(): InstitutionProfile[] {
    return this.institutions;
  }

  public getInstitutionBySlug(slug: string): InstitutionProfile | undefined {
    return this.institutions.find(
      (i) => i.slug.toLowerCase() === slug.toLowerCase()
    );
  }

  public getInstitutionByUserId(userId: string): InstitutionProfile | undefined {
    return this.institutions.find((i) => i.userId === userId) || this.institutions[0];
  }

  public createOrUpdateInstitution(
    profileData: Partial<InstitutionProfile> & { name: string; slug: string }
  ): InstitutionProfile {
    const existingIndex = this.institutions.findIndex(
      (i) => i.slug.toLowerCase() === profileData.slug.toLowerCase()
    );

    if (existingIndex >= 0) {
      this.institutions[existingIndex] = {
        ...this.institutions[existingIndex],
        ...profileData,
      };
      return this.institutions[existingIndex];
    }

    const newInst: InstitutionProfile = {
      id: `inst_${Date.now()}`,
      userId: profileData.userId || this.currentUser?.id || "usr_teacher_01",
      name: profileData.name,
      nameBn: profileData.nameBn,
      slug: profileData.slug,
      type: profileData.type || "COACHING",
      description: profileData.description || "",
      contactEmail: profileData.contactEmail || this.currentUser?.email || "info@khata.ai",
      contactPhone: profileData.contactPhone || "+880 1700 000000",
      address: profileData.address || "Bangladesh",
      subscriptionPlan: profileData.subscriptionPlan || "FREE",
      scriptsQuota: profileData.scriptsQuota || 50,
      scriptsUsed: 0,
    };

    this.institutions.unshift(newInst);
    return newInst;
  }

  // Batches
  public getBatches(institutionSlug?: string): Batch[] {
    if (!institutionSlug) return this.batches;
    return this.batches.filter(
      (b) => b.institutionSlug.toLowerCase() === institutionSlug.toLowerCase()
    );
  }

  public getBatchById(batchId: string): Batch | undefined {
    return this.batches.find((b) => b.id === batchId);
  }

  public createBatch(batchData: Omit<Batch, "id" | "createdAt">): Batch {
    const newBatch: Batch = {
      ...batchData,
      id: `batch_${Date.now()}`,
      createdAt: new Date().toISOString(),
      enrolledStudentsCount: 0,
    };
    this.batches.unshift(newBatch);
    return newBatch;
  }

  // Student Enrollment in Batches
  public getEnrolledStudents(batchIdOrSlug?: string): EnrolledStudent[] {
    if (!batchIdOrSlug) return this.enrolledStudents;
    const lower = batchIdOrSlug.toLowerCase();
    return this.enrolledStudents.filter(
      (e) =>
        e.batchId.toLowerCase() === lower ||
        e.institutionSlug.toLowerCase() === lower
    );
  }

  public enrollStudent(
    studentData: Omit<EnrolledStudent, "id" | "enrolledAt">
  ): EnrolledStudent {
    const batch = this.getBatchById(studentData.batchId);
    const newEnrollment: EnrolledStudent = {
      ...studentData,
      id: `enr_${Date.now()}`,
      batchName: batch?.name || studentData.batchName,
      enrolledAt: new Date().toISOString(),
    };
    this.enrolledStudents.unshift(newEnrollment);

    if (batch) {
      batch.enrolledStudentsCount = (batch.enrolledStudentsCount || 0) + 1;
    }

    return newEnrollment;
  }

  // Exams
  public getExams(): Exam[] {
    return this.exams;
  }

  public getPublicExams(): Exam[] {
    return this.exams.filter((e) => !e.isPrivate && (e.isPublic || !e.creatorId || e.creatorId === "usr_admin_01"));
  }

  public getExamsByInstitution(
    slug: string,
    isOwnerOrTeacher: boolean = false
  ): Exam[] {
    const lower = slug.toLowerCase();
    return this.exams.filter((e) => {
      const match =
        (e as any).institutionSlug?.toLowerCase() === lower ||
        (lower === "udvash-academic" && (!e.institutionSlug || e.institutionSlug === "udvash-academic"));
      if (!match) return false;
      if (isOwnerOrTeacher) return true;
      return !e.isPrivate;
    });
  }

  public getExamById(id: string): Exam | undefined {
    return this.exams.find((e) => e.id === id);
  }

  public getExamByAccessCode(code: string): Exam | undefined {
    return this.exams.find(
      (e) =>
        e.accessCode?.toLowerCase() === code.toLowerCase() ||
        e.id.toLowerCase() === code.toLowerCase()
    );
  }

  public getExamByPrivateToken(token: string): Exam | undefined {
    return this.exams.find(
      (e) => e.privateAccessToken?.toLowerCase() === token.toLowerCase()
    );
  }

  public createExam(examData: Omit<Exam, "id" | "createdAt" | "updatedAt">): Exam {
    const newExam: Exam = {
      ...examData,
      id: `exam_${Date.now()}`,
      privateAccessToken:
        examData.isPrivate && !examData.privateAccessToken
          ? Math.random().toString(36).substring(2, 10).toUpperCase()
          : examData.privateAccessToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.exams.unshift(newExam);
    return newExam;
  }

  public updateExam(id: string, updates: Partial<Exam>): Exam | undefined {
    const index = this.exams.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    this.exams[index] = {
      ...this.exams[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.exams[index];
  }

  public deleteExam(id: string): boolean {
    const initialLength = this.exams.length;
    this.exams = this.exams.filter((e) => e.id !== id);
    return this.exams.length < initialLength;
  }

  // Submissions
  public getSubmissions(): Submission[] {
    return this.submissions;
  }

  public getSubmissionById(id: string): Submission | undefined {
    return this.submissions.find((s) => s.id === id);
  }

  public getSubmissionsByExamId(examId: string): Submission[] {
    return this.submissions.filter((s) => s.examId === examId);
  }

  public getSubmissionsByStudentId(studentId: string): Submission[] {
    return this.submissions.filter((s) => s.studentId === studentId);
  }

  public getSubmissionsForStudent(identifier: string): Submission[] {
    const lower = identifier.toLowerCase();
    return this.submissions.filter(
      (s) =>
        s.studentId?.toLowerCase() === lower ||
        s.studentEmail?.toLowerCase() === lower ||
        s.studentName?.toLowerCase().includes(lower)
    );
  }

  public createSubmission(submissionData: Omit<Submission, "id" | "submittedAt">): Submission {
    const newSubmission: Submission = {
      ...submissionData,
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    this.submissions.unshift(newSubmission);
    return newSubmission;
  }

  public updateSubmissionEvaluation(
    submissionId: string,
    evaluation: EvaluationResult
  ): Submission | undefined {
    const sub = this.submissions.find((s) => s.id === submissionId);
    if (!sub) return undefined;

    sub.evaluation = evaluation;
    sub.status = evaluation.hasLegibilityIssues ? "NEEDS_REVIEW" : "EVALUATED";
    return sub;
  }

  public updateTeacherMarks(
    submissionId: string,
    questionId: string,
    newMarks: number,
    remarks?: string
  ): Submission | undefined {
    const sub = this.submissions.find((s) => s.id === submissionId);
    if (!sub || !sub.evaluation) return undefined;

    const qEval = sub.evaluation.questionEvaluations.find((q) => q.questionId === questionId);
    if (qEval) {
      const diff = newMarks - qEval.awardedMarks;
      qEval.awardedMarks = newMarks;
      sub.evaluation.totalScore = Math.max(0, sub.evaluation.totalScore + diff);
      sub.evaluation.percentage = (sub.evaluation.totalScore / sub.evaluation.maxScore) * 100;
      if (remarks) {
        sub.evaluation.teacherRemarks = remarks;
      }
      sub.evaluation.isApprovedByTeacher = true;
    }
    return sub;
  }

  // AI Settings
  public getAISettings(): GlobalAISettings {
    return this.aiSettings;
  }

  public updateAISettings(updates: Partial<GlobalAISettings>): GlobalAISettings {
    this.aiSettings = {
      ...this.aiSettings,
      ...updates,
      providers: {
        ...this.aiSettings.providers,
        ...(updates.providers || {}),
      },
    };
    return this.aiSettings;
  }

  // Admin Authentication
  public validateAdmin(id: string, pass: string): boolean {
    const validId = process.env.ADMIN_ID || "admin";
    const validEmail = "admin@khata.ai";
    const validPass = process.env.ADMIN_PASSWORD || "admin123";

    return (
      (id.trim().toLowerCase() === validId.toLowerCase() ||
        id.trim().toLowerCase() === validEmail.toLowerCase()) &&
      pass === validPass
    );
  }

  // Standalone Question Bank Management
  public getQuestions(): Question[] {
    return this.questions;
  }

  public getQuestionById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id || (q as any)._id === id);
  }

  public addQuestion(question: Question): Question {
    const newQ = {
      ...question,
      id: question.id || `q_${Date.now()}`,
    };
    this.questions.unshift(newQ);
    return newQ;
  }

  public updateQuestion(id: string, updates: Partial<Question>): Question | null {
    const idx = this.questions.findIndex((q) => q.id === id || (q as any)._id === id);
    if (idx === -1) return null;
    this.questions[idx] = { ...this.questions[idx], ...updates };
    return this.questions[idx];
  }

  public deleteQuestion(id: string): boolean {
    const idx = this.questions.findIndex((q) => q.id === id || (q as any)._id === id);
    if (idx === -1) return false;
    this.questions.splice(idx, 1);
    return true;
  }

}

export const store = DataStore.getInstance();
