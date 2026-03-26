# QuizBox — Canlı Kodlama

Bu bölümde ders boyunca öğrendiklerimizi bir araya getirip adım adım bir quiz motoru yazıyoruz.

## Çalıştırma

```bash
# Tek seferlik kurulum (global yoksa)
npm install -g tsx typescript

# Çalıştır
tsx index.ts

# Sadece tip kontrolü (çıktı üretmeden)
npx tsc --noEmit --strict index.ts
```

## Adımlar

### 1. Category tipi
```typescript
type Category = "tarih" | "bilim" | "cografya" | "spor"
```

### 2. Question interface'i
```typescript
interface Question {
  id: number
  category: Category
  text: string
  options: string[]
  correctAnswer: number  // options dizisinin index'i
}
```

### 3. Soru verisi
`questions: Question[]` dizisi — en az 3 farklı kategoriden soru.

### 4. Filtre fonksiyonu
```typescript
function filterByCategory(questions: Question[], category: Category): Question[]
```

### 5. TypeScript koruması — canlı hata demosu
- Geçersiz kategori ver → derleme hatası
- `correctAnswer`'a string ver → derleme hatası
- Zorunlu alan eksik bırak → derleme hatası

---

Çözüm: `../09-quizbox-cozum/index.ts`
