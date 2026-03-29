// ============================================
// QUIZBOX FINAL — index.ts (Ana Giriş Noktası)
// ============================================

import { QuizEngine } from "./engine";
import { QuizUI } from "./ui";
import { Category } from "./types";

function isCategory(value: string | undefined): value is Category {
  return value === "tarih" || value === "bilim" || value === "cografya" || value === "spor";
}

function startQuiz(category?: Category): void {
  const engine = category
    ? QuizEngine.createFromCategory(category)
    : QuizEngine.createRandom(5);
  const ui = new QuizUI("quiz-container", engine);
  ui.render();
}

document.addEventListener("DOMContentLoaded", () => {
  startQuiz();

  document.querySelectorAll(".category-button").forEach(button => {
    button.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLButtonElement)) return;
      const category = e.target.dataset.category;
      startQuiz(isCategory(category) ? category : undefined);
    });
  });
});
