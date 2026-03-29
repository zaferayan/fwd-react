// ============================================
// QUIZBOX — engine.ts
// Quiz mantığını yöneten sınıf ve yardımcı fonksiyonlar.
// ============================================

import { Question, QuizResult, QuizState, Category, QuizEvent, ReadonlyQuestion } from "./types";
import { questions, getQuestionsByCategory } from "./questions";

// ─── Ders 02: Generic Yardımcı Fonksiyonlar ─────────────────────────────────

// Diziden rastgele bir eleman seçer. T[] → T | undefined
// number[], string[], Question[] — hepsi için çalışır.
export function getRandomItem<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

// Diziden rastgele count kadar eleman seçer. T[] → T[]
export function takeRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

// ─── Ana Sınıf ───────────────────────────────────────────────────────────────

export class QuizEngine {
  private questions: Question[];
  private state: QuizState;

  constructor(selectedQuestions: Question[]) {
    this.questions = selectedQuestions;
    this.state = {
      currentQuestionIndex: 0,
      answers: new Array(selectedQuestions.length).fill(null),
      timeStarted: new Date(),
    };
  }

  // Belirli bir kategoriden quiz oluşturur
  static createFromCategory(category: Category): QuizEngine {
    const categoryQuestions = getQuestionsByCategory(category);
    return new QuizEngine(categoryQuestions);
  }

  // Tüm sorulardan rastgele count kadar soru seçer
  // takeRandom<T> generic fonksiyonunu kullanır — Ders 02
  static createRandom(count: number): QuizEngine {
    const selected = takeRandom(questions, count);
    return new QuizEngine(selected);
  }

  // Mevcut soruyu döndürür. Quiz bitmişse null döner.
  // ReadonlyQuestion döner — UI soruyu yanlışlıkla değiştiremez. (Ders 03)
  // null kontrolü Ders 01'deki type narrowing ile yapılır.
  getCurrentQuestion(): ReadonlyQuestion | null {
    if (this.state.currentQuestionIndex >= this.questions.length) {
      return null;
    }
    return this.questions[this.state.currentQuestionIndex];
  }

  // Soruyu cevaplar ve bir sonraki soruya geçer
  answerQuestion(answerIndex: number): boolean {
    if (this.state.currentQuestionIndex >= this.questions.length) {
      return false;
    }
    this.state.answers[this.state.currentQuestionIndex] = answerIndex;
    this.state.currentQuestionIndex++;
    return true;
  }

  // Ders 01: Discriminated Union ile olay işleme
  // QuizEvent'in "type" alanı, TypeScript'in hangi dalda ne var olduğunu bilmesini sağlar.
  processEvent(event: QuizEvent): void {
    switch (event.type) {
      case "answer":
        // TypeScript bilir: event.questionId ve event.answerIndex var
        this.answerQuestion(event.answerIndex);
        break;
      case "complete":
        // TypeScript bilir: event.finalScore var
        console.log(`Quiz tamamlandı. Puan: ${event.finalScore}`);
        break;
    }
  }

  isComplete(): boolean {
    return this.state.currentQuestionIndex >= this.questions.length;
  }

  calculateResult(): QuizResult {
    this.state.timeEnded = new Date();

    let correctAnswers = 0;
    // Record<Category, {...}> — Ders 04'teki Record<K, V> kullanımı
    const categoryBreakdown: Record<Category, { correct: number; total: number }> = {
      tarih: { correct: 0, total: 0 },
      bilim: { correct: 0, total: 0 },
      cografya: { correct: 0, total: 0 },
      spor: { correct: 0, total: 0 },
    };

    this.questions.forEach((question, index) => {
      const userAnswer = this.state.answers[index];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctAnswers++;

      categoryBreakdown[question.category].total++;
      if (isCorrect) {
        categoryBreakdown[question.category].correct++;
      }
    });

    const score = Math.round((correctAnswers / this.questions.length) * 100);

    return {
      totalQuestions: this.questions.length,
      correctAnswers,
      score,
      categoryBreakdown,
    };
  }

  reset(): void {
    this.state = {
      currentQuestionIndex: 0,
      answers: new Array(this.questions.length).fill(null),
      timeStarted: new Date(),
    };
  }

  get progress(): { current: number; total: number } {
    return {
      current: this.state.currentQuestionIndex,
      total: this.questions.length,
    };
  }
}
