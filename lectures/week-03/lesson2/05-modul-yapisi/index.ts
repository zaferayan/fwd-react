// ─── Modül Yapısı ─────────────────────────────────────────────────────────
// Bu klasör birden fazla dosyadan oluşur. Her dosyanın tek bir sorumluluğu var.
//
// Yapı:
//   types.ts  → interface ve type tanımları
//   utils.ts  → saf (side-effect'siz) yardımcı fonksiyonlar
//   index.ts  → barrel export (dışarıya tek bir giriş noktası)
//
// Neden bu yapı?
//   • Her dosyada ne olduğunu bulmak kolaylaşır
//   • Testler daha kolay yazılır (utils'i bağımsız test edersin)
//   • Büyüyen projelerde dosya karmaşası olmaz

// ─── Barrel Export ────────────────────────────────────────────────────────
// Barrel: birden fazla dosyayı tek noktadan dışa aktaran index.ts
//
// Barrel OLMADAN (kullanıcı her dosya yolunu bilmek zorunda):
//   import { User } from "./types";
//   import { isEmailValid } from "./utils";
//
// Barrel İLE (tek satır yeterli):
//   import { User, isEmailValid } from ".";   ← index.ts otomatik bulunur

export * from "./types";
export * from "./utils";


// ─── Declaration Files (.d.ts) ────────────────────────────────────────────
// TypeScript tipleri olmayan üçüncü parti kütüphaneler için yazılır.
// Asıl JS kütüphaneyi değiştirmeden ona tip bilgisi ekler.
//
// external.d.ts dosyasına bak — bir dış kütüphane için örnek tanım var.
//
// Gerçek hayatta bunu nadiren kendin yazarsın:
//   npm install --save-dev @types/lodash  ← hazır tip paketleri var
// Ama .d.ts'in ne olduğunu bilmek projeyi anlamak için önemli.


// ─── QuizBox ile İlişki ────────────────────────────────────────────────────
// quizbox/ tek klasörde çalışır, dolayısıyla modül yapısına ihtiyaç duymaz.
// Ama gerçek bir projede şöyle bölünürdü:
//
//   src/
//   ├── types/    → Question, QuizEvent, Category...
//   ├── data/     → questions.ts
//   ├── engine/   → QuizEngine ve yardımcı fonksiyonlar
//   └── ui/       → QuizUI
//
// index.ts tüm bunları barrel ile dışarıya açardı.


// ─── Kendi Projen: Kitaplık Modülü ────────────────────────────────────────
// Bu klasördeki dosyaları model alarak şu yapıyı dene:
//
//   src/
//   ├── types.ts  → Book interface'ini tanımla (id, title, author, available)
//   ├── utils.ts  → formatTitle(), isAvailable() gibi yardımcı fonksiyonlar
//   └── index.ts  → hepsini barrel ile dışarıya aç
//
// Sonra tek bir import ile kullan:
//   import { Book, formatTitle } from "./src";
