# Generics

## QuizBox'a Bu Adımda Ne Ekliyoruz?

**Problem:** `QuizEngine.createRandom()` içinde `[...questions].sort(...)` ile soru karıştırıyoruz — ama aynı mantığı kategori listesi veya başka diziler için de kullanmak istesek ne olacak?

`any[]` kullansak tip güvencesini kaybederiz. Cevap: **generic fonksiyon**.

`../quizbox/engine.ts`'e eklenenler:
- `getRandomItem<T>(arr: T[]): T | undefined` — herhangi bir diziden rastgele eleman
- `takeRandom<T>(arr: T[], count: number): T[]` — herhangi bir diziden rastgele N eleman
- `createRandom()` artık `takeRandom<Question>` kullanıyor

---

Generics, bir fonksiyon veya yapının farklı tiplerle çalışmasını sağlarken tip güvencesini korur. `any` kullanmadan esnek kod yazmanın yolu.

TypeScript generics oldukça güçlüdür:
- [Conway's Game of Life](https://www.hacklewayne.com/is-typescript-turing-complete-not-sure-game-of-life-why-not)
- [Tic Tac Toe](https://www.youtube.com/watch?v=nVGhZZbM6r4)
- [Flappy Bird](https://zackoverflow.dev/writing/flappy-bird-in-type-level-typescript/)

## Bölüm 1: Problem — `any` Kullanmak Zorunda Kalmak
`any` kullanıldığında TypeScript tip bilgisini kaybeder — yanlış metodlar çağrılsa bile hata vermez.

```typescript
function ilkElemanAny(dizi: any[]): any { return dizi[0]; }

ilkElemanAny([1, 2, 3]).toUpperCase() // hata vermez ama yanlış!
```

## Bölüm 2: Generic Fonksiyon
`<T>` bir tip parametresidir — fonksiyon çağrılınca TypeScript tipi otomatik olarak çıkarır.

```typescript
function ilkEleman<T>(dizi: T[]): T { return dizi[0]; }

ilkEleman([1, 2, 3])      // T = number
ilkEleman(["a", "b"])     // T = string
```

## Bölüm 3: Birden Fazla Tip Parametresi
`<T, U>` ile birden fazla bağımsız tip parametresi kullanılabilir.

```typescript
function ikiliSarmal<T, U>(birinci: T, ikinci: U): [T, U] {
  return [birinci, ikinci];
}

ikiliSarmal("Ahmet", 25)  // [string, number]
ikiliSarmal(true, [1, 2]) // [boolean, number[]]
```

## Bölüm 4: Generic Interface
Interface'ler de generic olabilir. Özellikle API yanıt tipleri için çok kullanışlıdır.

```typescript
interface ApiCevabi<T> {
  basarili: boolean;
  veri: T;
  hata: string | null;
}

const cevap: ApiCevabi<Kullanici> = { basarili: true, veri: { ... }, hata: null };
```

## Bölüm 5: Generic Constraint (`extends`)
`T extends { isim: string }` — T'nin belirli bir yapıya sahip olmasını zorunlu kılar.

```typescript
function isimYazdir<T extends { isim: string }>(nesne: T): void {
  console.log(nesne.isim);
}

isimYazdir({ isim: "Ali", yas: 30 }); // ✅
isimYazdir({ yas: 30 });              // 🔴 hata — isim yok
```

## Bölüm 6: `keyof` ile Generic
`K extends keyof T` — yalnızca T'nin gerçek anahtarlarına izin verir. Yanlış alan adı derleme hatası verir.

```typescript
function degerAl<T, K extends keyof T>(nesne: T, anahtar: K): T[K] {
  return nesne[anahtar];
}

degerAl(kullanici, "isim")  // ✅ string döner
degerAl(kullanici, "email") // 🔴 hata — böyle bir alan yok
```

---

## İleri Okuma

- [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — resmi dokümantasyon
- [Total TypeScript — Generics Workshop](https://www.totaltypescript.com/workshops/typescript-generics) — tip seviyesinde ileri generic kalıplar
- [TypeScript Deep Dive — Generics](https://basarat.gitbook.io/typescript/type-system/generics)
