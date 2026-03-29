// ============================================
// QUIZBOX FINAL — questions.ts
// ============================================

import { Question, Category } from "./types";

export const questions: Question[] = [
  {
    id: 1,
    category: "tarih",
    text: "Türkiye Cumhuriyeti hangi yılda kurulmuştur?",
    options: ["1920", "1923", "1925", "1930"],
    correctAnswer: 1,
  },
  {
    id: 2,
    category: "bilim",
    text: "H2O'nun kimyasal adı nedir?",
    options: ["Hidrojen Peroksit", "Su", "Hidrojen Oksit", "Oksijen Hidrit"],
    correctAnswer: 1,
  },
  {
    id: 3,
    category: "cografya",
    text: "Dünyanın en büyük okyanusu hangisidir?",
    options: ["Atlas Okyanusu", "Hint Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu"],
    correctAnswer: 2,
  },
  {
    id: 4,
    category: "spor",
    text: "2020 Tokyo Olimpiyatları hangi yılda gerçekleşmiştir?",
    options: ["2019", "2020", "2021", "2022"],
    correctAnswer: 2,
  },
  {
    id: 5,
    category: "tarih",
    text: "Mustafa Kemal Atatürk hangi şehirde doğmuştur?",
    options: ["İstanbul", "Ankara", "Selanik", "İzmir"],
    correctAnswer: 2,
  },
  {
    id: 6,
    category: "bilim",
    text: "Işık hızı saniyede yaklaşık kaç kilometre yol alır?",
    options: ["300.000", "150.000", "450.000", "600.000"],
    correctAnswer: 0,
  },
  {
    id: 7,
    category: "cografya",
    text: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "İzmir", "Ankara", "Antalya"],
    correctAnswer: 2,
  },
  {
    id: 8,
    category: "spor",
    text: "FIFA Dünya Kupası kaç yılda bir düzenlenir?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
  },
];

export function getQuestionsByCategory(category: Category): Question[] {
  return questions.filter(q => q.category === category);
}
