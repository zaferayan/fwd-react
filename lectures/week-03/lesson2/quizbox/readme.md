# QuizBox — Çözüm

Ders 2'nin tamamlanmış QuizBox projesi. Dersin başında bu klasörü açarak "bunu inşa edeceğiz" diyebilirsin. Canlı kodlama `../quizbox/` klasöründe yapılır.

## Yapı

```
quizbox-cozum/
├── types.ts        ← tüm tip tanımları + utility type türetimleri
├── questions.ts    ← soru verisi + sorgu fonksiyonları
├── engine.ts       ← QuizEngine class'ı + generic utility'ler
├── ui.ts           ← DOM entegrasyonu (QuizUI class'ı)
└── index.html      ← tarayıcıda açılabilen quiz uygulaması
```

## Kurulum ve Çalıştırma

```bash
# Bu klasörde, ilk seferinde:
npm install

# Geliştirme sunucusu başlat (değişiklikleri izler, otomatik derler):
npm run dev
# → http://localhost:8000 adresini tarayıcıda aç

# Ya da sadece derle:
npm run build
# → dist/index.js üretir, sonra index.html'i tarayıcıda aç
```

`npm run dev` çalışırken `.ts` dosyalarını kaydetmen yeterli — sunucu açık kalır, `dist/index.js` otomatik güncellenir.

---

## İleri Okuma

- [TypeScript Exercises](https://typescript-exercises.github.io/) — interaktif tip egzersizleri, artan zorluk seviyeli
- [Type Challenges](https://github.com/type-challenges/type-challenges) — tip sistemi bulmacaları (easy'den extreme'e)
