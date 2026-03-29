// ============================================
// QUIZBOX — types.ts
// Tüm ortak tipler burada tanımlanır.
// ============================================

// Ders 01 — Discriminated Union (Ayrıştırılmış Birlik)
// Quiz sırasında gerçekleşen olayları tip güvenli şekilde temsil eder.
// "type" alanı sayesinde TypeScript hangi olay olduğunu kesin olarak bilir.
export type QuizEvent =
  | { type: "answer"; questionId: number; answerIndex: number }
  | { type: "complete"; finalScore: number };

// Temel tipler
export type Category = "tarih" | "bilim" | "cografya" | "spor";

export interface Question {
  id: number;
  category: Category;
  text: string;
  options: string[];
  correctAnswer: number; // doğru cevabın dizideki sırası
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  categoryBreakdown: Record<Category, { correct: number; total: number }>;
  // Record<Category, ...> — Ders 04'teki Record<K, V> utility type'ın gerçek kullanımı
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  timeStarted: Date;
  timeEnded?: Date;
}

// Ders 03 — Mapped Type
// Question'ın tüm alanlarını readonly (değiştirilemez) yapar.
// getCurrentQuestion() bu tipi döndürür — UI soruyu değiştiremez.
export type ReadonlyQuestion = { readonly [K in keyof Question]: Question[K] };

// Ders 04 — Utility Types ile türetilmiş tipler
// Var olan Question interface'inden yeni tipler üretiyoruz — kod tekrarı olmadan.

// Oyuncuya gösterilecek soru: doğru cevap gizli
export type QuestionForPlayer = Omit<Question, "correctAnswer">;

// Liste görünümü için özet: sadece gerekli alanlar
export type QuestionSummary = Pick<Question, "id" | "category" | "text">;

// Henüz tamamlanmamış soru taslağı: tüm alanlar opsiyonel
export type QuestionDraft = Partial<Question>;
