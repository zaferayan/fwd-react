# Modül Yapısı & Declaration Files

## QuizBox'a Bu Adımda Ne Ekliyoruz?

**Problem:** Önceki adımlarda `engine.ts` sürekli büyüdü — artık tip tanımlarını, soru verisini ve motor mantığını aynı dosyada tutmak çok zor.

**Çözüm:** Sorumluluklara göre böl.

```
quizbox/
├── types.ts       ← sadece tip tanımları (interface, type)
├── questions.ts   ← sadece veri ve sorgu fonksiyonları
└── engine.ts      ← sadece motor mantığı (types.ts ve questions.ts'i import eder)
```

Sonraki adımda `ui.ts` ve `index.html` eklenecek — o zaman modül yapısının değeri daha da netleşecek.

Bu adımda `../quizbox/`'ı dosyalara böleriz — yapı zaten hazır, importları düzenlemek yeterli.

---

## Klasör Yapısı

Gerçek projelerde tip tanımları, yardımcı fonksiyonlar ve iş mantığı ayrı dosyalara bölünür.

```
07-modul-yapisi/
├── tipler.ts       ← tip tanımları (interface, type)
├── yardimcilar.ts  ← utility fonksiyonlar
├── servis.ts       ← iş mantığı
└── index.ts        ← dışarıya açılanlar (re-export)
```

## index.ts — Barrel Export
`index.ts` tek giriş noktası olarak tüm modülü dışarıya açar. Kullanıcı tek bir import ile her şeye erişir:

```typescript
import { Urun, paraBirimi, urunleriFiltrele } from "./07-modul-yapisi"
```

## Declaration Files (.d.ts)
JavaScript kütüphaneleri için tip tanımları sağlar. Kendin yazmak zorunda değilsin — `@types` paketi var.

```bash
npm install --save-dev @types/node
npm install --save-dev @types/lodash
```

TypeScript ile yazılmış kütüphaneler `.d.ts` dosyasıyla birlikte gelir. `tsc` build sırasında otomatik üretir.

---

## İleri Okuma

- [TypeScript Handbook — Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) — ES modules, CommonJS, isolatedModules
- [TypeScript Handbook — Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) — `.d.ts` yazımı ve `@types` ekosistemi
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) — topluluk tarafından yazılan `@types` paketlerinin kaynak kodu
