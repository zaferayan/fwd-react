// ============================================
// QUIZBOX — Canlı Kodlama
// Adımlar: readme.md
// Çalıştır: tsx index.ts
// ============================================


// ─── ADIM 1: Category tipi ───────────────────
// Literal union — sadece bu 4 string değer geçerli
// type Category = ...


// ─── ADIM 2: Question interface'i ─────────────
// id: number, category: Category, text: string,
// options: string[], correctAnswer: number (index)
// interface Question { ... }


// ─── ADIM 3: Soru verisi ──────────────────────
// En az 3 farklı kategoriden soru ekle
// const questions: Question[] = [...]


// ─── ADIM 4: Filtre fonksiyonu ────────────────
// function filterByCategory(questions: Question[], category: Category): Question[]


// ─── ADIM 5: Test et & TypeScript korumasını gör
// filterByCategory'yi çağır, sonucu console.log ile yazdır
// Sonra hata örneklerini dene (readme'deki 3 hata)
