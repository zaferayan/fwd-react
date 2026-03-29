// ============================================
// QUIZBOX FINAL — ui.ts
// ============================================

import { QuizResult, QuestionForPlayer } from "./types";
import { QuizEngine } from "./engine";

export class QuizUI {
  private quizEngine: QuizEngine;
  private container: HTMLElement;

  constructor(containerId: string, quizEngine: QuizEngine) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with id "${containerId}" not found`);
    }
    this.container = container;
    this.quizEngine = quizEngine;
  }

  render(): void {
    this.container.innerHTML = "";

    if (this.quizEngine.isComplete()) {
      this.renderResult();
    } else {
      this.renderQuestion();
    }
  }

  private renderQuestion(): void {
    // QuestionForPlayer = Omit<Question, "correctAnswer"> — UI'nin doğru cevaba ihtiyacı yok (Ders 04)
    const question: QuestionForPlayer | null = this.quizEngine.getCurrentQuestion();
    if (!question) return;

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const title = document.createElement("h2");
    title.textContent = `Soru ${this.quizEngine.progress.current + 1}`;
    questionDiv.appendChild(title);

    const category = document.createElement("p");
    category.textContent = `Kategori: ${question.category}`;
    category.className = "category";
    questionDiv.appendChild(category);

    const text = document.createElement("p");
    text.textContent = question.text;
    text.className = "question-text";
    questionDiv.appendChild(text);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option-button";
      button.onclick = () => {
        // processEvent + discriminated union — Ders 01
        this.quizEngine.processEvent({ type: "answer", questionId: question.id, answerIndex: index });
        this.render();
      };
      optionsDiv.appendChild(button);
    });

    questionDiv.appendChild(optionsDiv);
    this.container.appendChild(questionDiv);
  }

  private renderResult(): void {
    const result = this.quizEngine.calculateResult();

    const resultDiv = document.createElement("div");
    resultDiv.className = "result";

    const title = document.createElement("h2");
    title.textContent = "Quiz Tamamlandı!";
    resultDiv.appendChild(title);

    const score = document.createElement("p");
    score.textContent = `Skor: ${result.score}/100 (${result.correctAnswers}/${result.totalQuestions} doğru)`;
    score.className = "score";
    resultDiv.appendChild(score);

    const breakdownTitle = document.createElement("h3");
    breakdownTitle.textContent = "Kategori Dağılımı";
    resultDiv.appendChild(breakdownTitle);

    const breakdownList = document.createElement("ul");
    Object.entries(result.categoryBreakdown).forEach(([category, stats]) => {
      if (stats.total > 0) {
        const item = document.createElement("li");
        item.textContent = `${category}: ${stats.correct}/${stats.total} doğru`;
        breakdownList.appendChild(item);
      }
    });
    resultDiv.appendChild(breakdownList);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Tekrar Başla";
    restartButton.className = "restart-button";
    restartButton.onclick = () => {
      this.quizEngine.reset();
      this.render();
    };
    resultDiv.appendChild(restartButton);

    this.container.appendChild(resultDiv);
  }
}

// Utility function for DOM manipulation
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: {
    textContent?: string;
    className?: string;
    onclick?: () => void;
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (options?.textContent) element.textContent = options.textContent;
  if (options?.className) element.className = options.className;
  if (options?.onclick) element.onclick = options.onclick;
  return element;
}