// ============================================
// EGZERSİZ #2 — ÇÖZÜM
// ============================================

// GÖREV 1: Book interface'i
interface Book {
  id: number
  title: string
  author: string
  publicationYear: number
  summary?: string   // opsiyonel alan
}


// GÖREV 2: EBook — Book'u extend eder
interface EBook extends Book {
  fileSize: number
  format: "pdf" | "epub" | "mobi"   // string değil, literal union
}


// GÖREV 3: library dizisi
const library: Book[] = [
  {
    id: 1,
    title: "Tutunamayanlar",
    author: "Oğuz Atay",
    publicationYear: 1971,
    summary: "Türk edebiyatının başyapıtlarından biri."
  },
  {
    id: 2,
    title: "İnce Memed",
    author: "Yaşar Kemal",
    publicationYear: 1955
    // summary yok — opsiyonel olduğu için TS hata vermez ✓
  }
]

console.log("Library:", library)
