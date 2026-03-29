# Ders 2 — Giriş & Proje Tanıtımı

Bu derste her konuyu izole örneklerle değil, **gerçek bir proje inşa ederek** öğreneceğiz.

## Ne İnşa Edeceğiz?

**QuizBox** — kategori bazlı çoktan seçmeli soru motoru.

Tamamlanmış proje: **`../quizbox/`** 

Her ders konusu, QuizBox içindeki ilgili dosyalara referans verir. Konuyu öğrendikten sonra o dosyaya bakarak gerçek kullanımı inceleyebilirsin.

```
quizbox/
├── types.ts       ← tip tanımları (Question, Category, QuizEvent, türetilmiş tipler)
├── questions.ts   ← soru veritabanı
├── engine.ts      ← QuizEngine + generic yardımcılar + type guard
├── ui.ts          ← DOM entegrasyonu
└── index.ts       ← giriş noktası
```

Her konu, QuizBox'un hangi parçasıyla ilgili:

| Konu | QuizBox'ta İlgili Yer |
|------|----------------------|
| Type Narrowing | `engine.ts` — `processEvent()`, `getCurrentQuestion()` |
| Generics | `engine.ts` — `getRandomItem<T>()`, `takeRandom<T>()`, `getFieldValue<T,K>()` |
| İleri Tip Operatörleri | `types.ts` — `QuizEventKey`, `ReadonlyQuestion` |
| Utility Types | `types.ts` — `QuestionForPlayer`, `QuestionDraft`, `QuestionSummary` |
| Modül Yapısı | Mimari kavram — quizbox örnek değil, 05-modul-yapisi klasörü |
| Best Practices | `engine.ts` — `isQuestion()`, `index.ts` — `isCategory()` |

---

## Başlangıç Noktası — Ders 1'den Devraldıklarımız

`quizbox/types.ts` ve `quizbox/questions.ts` dosyaları Ders 1'deki QuizBox'tan geliyor.

### Hızlı Özet

- ✅ Temel tipler: `string`, `number`, `boolean`, `any`, `unknown`, `never`
- ✅ Arrays ve Tuple
- ✅ Fonksiyonlarda tip: parametre, return type, `void`, optional
- ✅ Type alias ve Interface
- ✅ Optional (`?`), Readonly, `extends`
- ✅ Class: constructor, access modifiers, inheritance, `implements`
- ✅ Union (`|`), Intersection (`&`), Literal types, Enum
- ✅ QuizBox: `Question` interface'i ve `Category` tipi hazır
