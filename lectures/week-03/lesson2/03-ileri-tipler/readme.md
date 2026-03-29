# İleri Tip Operatörleri

## QuizBox'a Bu Adımda Ne Ekliyoruz?

**Problem:** `Question` interface'inden türetilmiş tip bilgisine ihtiyacımız var — ama `Question`'ı kopyalayıp yapıştırmak istemiyoruz.

- `keyof Question` → alanları string literal union olarak almak (`"id" | "category" | "text" | ...`)
- Template literal types → tip güvenli event anahtarları (`"quiz:tarih" | "quiz:bilim" | ...`)
- Mapped types → `ReadonlyQuestion` türetilmiş tipi (dahili olarak `Readonly<T>`'nin nasıl çalıştığını anlıyoruz)
- Conditional types + `infer` → `Question[]`'dan eleman tipini çıkarmak

`../quizbox/` klasörüne eklenenler:
- `types.ts` → `QuizEventKey` template literal tipi, `ReadonlyQuestion` mapped tipi
- `engine.ts` → `getFieldValue<T, K extends keyof T>()` fonksiyonu

---

## Bölüm 1: `keyof`
Bir interface'in tüm alan adlarını literal union olarak üretir.

```typescript
type UrunAlanlari = keyof Urun  // "id" | "isim" | "fiyat"
```

Fonksiyon parametrelerini tip güvenli kısıtlamak için kullanışlıdır.

## Bölüm 2: `typeof` (tip bağlamında)
Var olan bir değişkenin tipini elle yazmak yerine `typeof` ile türet.

```typescript
const ayarlar = { tema: "karanlik", dil: "tr", bildirimler: true };
type Ayarlar = typeof ayarlar
// { tema: string; dil: string; bildirimler: boolean }
```

Özellikle büyük config objelerinde elle tip yazmaktan kurtarır.

## Bölüm 3: `as` (Type Assertion)
TypeScript'in bilemediği durumlarda "ben biliyorum" demek için kullanılır.

```typescript
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

// Çift assertion — tehlikeli ama mümkün
const sayi = "merhaba" as unknown as number;
```

> ⚠️ `as` runtime'da hiçbir şey yapmaz — yalnızca TypeScript'e bir ipucu verir. Yanlış kullanım runtime hatalarına yol açabilir.

## Bölüm 4: `satisfies` Operatörü
`as` ile farkı: tipin uyumluluğunu **kontrol eder** ama değişkenin çıkarılan tipini daraltmaz.

```typescript
const palet = {
  kirmizi: [255, 0, 0],
  yesil: "green",
} satisfies Record<string, Renk>;

palet.kirmizi[0]; // ✅ TS bilir: array (Renk değil)
```

| | `as` | `satisfies` |
|---|---|---|
| Tip kontrolü | ❌ atlıyor | ✅ yapıyor |
| Çıkarılan tip | Zorlanmış | Korunmuş (dar) |
| Ne zaman | "Güven bana" | "Kontrol et ama daraltma" |

## Bölüm 5: Conditional Types
`T extends U ? X : Y` — koşula göre farklı tip döndürür. Union tiplerinde her üyeye ayrı uygulanır (dağılım özelliği).

```typescript
type SayiMi<T> = T extends number ? "evet" : "hayır";
type Sonuc = SayiMi<string>; // "hayır"

// Union dağılımı:
type Dizile<T> = T extends any ? T[] : never;
type Sonuc2 = Dizile<string | number>; // string[] | number[]
```

## Bölüm 6: `infer`
Conditional type içinde **tip çıkarımı** yapar. `infer U` ile iç içe geçmiş tipleri yüzeye çıkarırsın.

```typescript
type PromiseTipi<T> = T extends Promise<infer U> ? U : T;
type Sonuc = PromiseTipi<Promise<string>>; // string

type DiziElemani<T> = T extends (infer U)[] ? U : never;
type Eleman = DiziElemani<number[]>; // number
```

## Bölüm 7: Mapped Types
Var olan bir tipin **her alanına** dönüşüm uygular. `[K in keyof T]` sözdizimi ile çalışır.

```typescript
type OpsiyonelYap<T> = { [K in keyof T]?: T[K] };
type SabitYap<T>     = { readonly [K in keyof T]: T[K] };
type NullableYap<T>  = { [K in keyof T]: T[K] | null };
```

`Partial`, `Required`, `Readonly` gibi utility types aslında birer mapped type'tır.

## Bölüm 8: Template Literal Types
Tip düzeyinde **string birleştirme** yapar. Union tiplerle birlikte kombinasyonlar üretir.

```typescript
type Yon = "sol" | "sag";
type Mesaj = `${Yon}a_git`; // "sola_git" | "saga_git"

type OlayAdi = "click" | "focus";
type Handler = `on${Capitalize<OlayAdi>}`; // "onClick" | "onFocus"
```

---

## İleri Okuma

- [TypeScript Handbook — Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook — Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook — Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [Total TypeScript — Type Transformations](https://www.totaltypescript.com/workshops/type-transformations) — conditional + mapped type kalıpları derinlemesine
