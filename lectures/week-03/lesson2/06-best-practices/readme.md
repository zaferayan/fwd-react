# Best Practices

## QuizBox'a Bu Adımda Ne Ekliyoruz?

**Son adım UI'den önce:** QuizBox motorunu sertleştiriyoruz. `ui.ts` eklemeden önce kodun sağlam olduğundan emin olmalıyız.

Kontrol listesi:
- `any` var mı? → `unknown` + type guard ile değiştir
- Gereksiz tip yazımı var mı? → inference'a bırak
- `as` assertion var mı? → guard fonksiyonu ile değiştir
- `strict` mode açık mı? → `tsconfig.json` kontrol et
- Boolean flag'ler yerine discriminated union var mı? → `QuizEvent` zaten bu şekilde

Bu adımda `../quizbox/engine.ts`'e `isQuestion` type guard eklenir ve mevcut kod incelenir. Büyük değişiklik yoksa — bu iyi bir işaret, önceki adımlarda zaten doğru yazdık.

---

## 1. `any`'den kaçın — `unknown` veya generic kullan
`any` tip denetimini tamamen kapatır. `unknown` kullanarak güvenli tip kontrolü zorunlu kılınabilir.

## 2. Tip çıkarımına güven (inference)
TypeScript değerden tipi otomatik çıkarabildiğinde elle yazmaya gerek yok.

```typescript
// ❌ Gereksiz
const sayi: number = 42;

// ✅ TS zaten biliyor
const sayi = 42;
```

**Ne zaman yazmalısın:** Fonksiyon parametreleri ve dönüş tipleri.

## 3. strict mode açık olsun
`tsconfig.json`'da `"strict": true` şunları açar:

| Kural | Açıklama |
|-------|----------|
| `noImplicitAny` | `any` tipi zorunlu kılar |
| `strictNullChecks` | `null`/`undefined` kontrolü |
| `strictFunctionTypes` | Fonksiyon tip uyumu |
| `strictPropertyInitialization` | Class alanları |

## 4. Union yerine Discriminated Union tercih et
`tur` gibi ortak bir alan ekleyerek TypeScript'in kesin narrowing yapmasını sağla. `basarili: boolean` yerine `tur: "basarili" | "hatali"` kullan.

## 5. Type assertion (`as`) yerine type guard kullan
`as` runtime'da hiçbir şey yapmaz. Type guard fonksiyonu hem güvenli hem okunabilir.

```typescript
function isimliMi(nesne: unknown): nesne is { isim: string } {
  return typeof nesne === "object" && nesne !== null && "isim" in nesne;
}
```

---

## İleri Okuma

- [TypeScript Handbook — Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) — resmi best practices
- [TypeScript Deep Dive — Style Guide](https://basarat.gitbook.io/typescript/styleguide) — gerçek projelerde tip yazım kuralları
- [Total TypeScript — Beginners Tutorial](https://www.totaltypescript.com/tutorials/beginners-typescript) — common mistakes ve çözümleri
