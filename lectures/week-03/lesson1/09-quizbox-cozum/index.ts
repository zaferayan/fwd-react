// ============================================
// QUIZBOX — ÇÖZÜM (ADIM ADIM)
// ============================================

// ─── ADIM 1: Kategori tipi ───────────────────
// Literal union: sadece bu 4 string geçerli
type Category = "tarih" | "bilim" | "cografya" | "spor"


// ─── ADIM 2: Soru interface'i ────────────────
interface Question {
  id: number
  category: Category       // Category tipini kullanıyoruz
  text: string
  options: string[]
  correctAnswer: number       // options dizisinin index'i (0, 1, 2...)
}


// ─── ADIM 3: İlk 3 soru ──────────────────────
const questions: Question[] = [
  {
    "id": 1,
    "category": "tarih",
    "text": "Türkiye Cumhuriyeti hangi tarihte ilan edildi?",
    "options": ["23 Nisan 1920", "29 Ekim 1923", "30 Ağustos 1922", "24 Temmuz 1923"],
    "correctAnswer": 1
  },
  {
    id: 2,
    category: "bilim",
    text: "Işığın boşluktaki hızı yaklaşık kaç km/s'dir?",
    options: ["150.000", "300.000", "450.000", "600.000"],
    correctAnswer: 1  // "300.000"
  },
  {
    id: 3,
    category: "cografya",
    text: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "İzmir", "Ankara", "Bursa"],
    correctAnswer: 2  // "Ankara"
  }
]


// ─── ADIM 4: Kategoriye göre filtreleme ──────
function filterByCategory(questions: Question[], category: Category): Question[] {
  return questions.filter(q => q.category === category)
}

const historyQuestions = filterByCategory(questions, "tarih")
console.log("Tarih soruları:", historyQuestions)
console.log("Soru sayısı:", historyQuestions.length)


// ─── ADIM 5: TS bizi nasıl koruyor? ──────────
// Aşağıdaki satırları aktif edip hataları IDE'de göster

// ❌ Hata 1: Geçersiz kategori
// const wrongQuestion: Question = {
//   id: 4,
//   category: "muzik",   // ERROR: Type '"muzik"' is not assignable to type 'Category'
//   text: "Test sorusu",
//   options: ["A", "B"],
//   correctAnswer: 0
// }

// ❌ Hata 2: correctAnswer string olamaz
// const wrongAnswer: Question = {
//   id: 5,
//   category: "bilim",
//   text: "Test sorusu",
//   options: ["A", "B"],
//   correctAnswer: "B"    // ERROR: Type 'string' is not assignable to type 'number'
// }

// ❌ Hata 3: Zorunlu alan eksik
// const missingField: Question = {
//   id: 6,
//   category: "spor",
//   options: ["A"],
//   correctAnswer: 0
//   // ERROR: Property 'text' is missing in type
// }
