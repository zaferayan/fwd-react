# Type Narrowing

## QuizBox'a Bu Adımda Ne Ekliyoruz?

**Problem:** Kullanıcı "Sonraki Soru" butonuna bastığında soru bitmişse ne olacak? `getCurrentQuestion()` fonksiyonu `Question | null` döndürmek zorunda — ve bunu kullanmadan önce güvenli biçimde daraltmamız (narrowing) gerekiyor.

**Ayrıca:** Oyun sırasında iki farklı olay olabilir: cevap vermek veya quiz'i tamamlamak. Bunları `QuizEvent` discriminated union ile modelleyip `switch` ile güvenle işleyeceğiz.

Bu adımda `../quizbox/` klasörüne eklenenler:
- `types.ts` → `QuizEvent` discriminated union
- `engine.ts` → `QuizEngine` class'ının iskeleti: `getCurrentQuestion()`, `answerQuestion()`, `isComplete()`, `processEvent()`

---

TypeScript, bir kontrol bloğu içinde tipin ne olduğunu otomatik olarak daraltır (narrowing). Bu sayede union tiplerle güvenli çalışabilirsin.

## Bölüm 1: typeof ile Narrowing
Primitive tipler için. `typeof` ile kontrol edilen blokta TypeScript tipi kesin olarak bilir.

## Bölüm 2: instanceof ile Narrowing
Class örnekleri için. `instanceof` kontrolü sonrası TypeScript hangi class'ın instance'ı olduğunu bilir.

## Bölüm 3: Discriminated Union
Her objeye ortak bir `tur` gibi bir alan ekleyerek TypeScript'in hangi varyantı olduğunu kesin anlamasını sağlar. `switch/case` ile mükemmel uyum sağlar.

```typescript
type Kare = { tur: "kare"; kenar: number }
type Dikdortgen = { tur: "dikdortgen"; genislik: number; yukseklik: number }
type Sekil = Kare | Dikdortgen
```

## Bölüm 4: in Operatörü ile Narrowing
Bir objenin belirli bir alan içerip içermediğini kontrol eder. Interface'lerde `instanceof` yerine kullanılır.

```typescript
if ("yuz" in sporcu) {
  sporcu.yuz(); // TS bilir: Yuzucu
}
```

---

## İleri Okuma

- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — resmi dokümantasyon, tüm narrowing teknikleri
- [TypeScript Deep Dive — Type Guards](https://basarat.gitbook.io/typescript/type-system/typeguard) — user-defined type guard'lar için pratik örnekler
