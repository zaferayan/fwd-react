# TypeScript Eğitim Serisi

Bu repo, YouTube'da yayınlanan **2 derslik TypeScript eğitim serisinin** kaynak kodlarını içermektedir. Tüm içerik Türkçe olarak hazırlanmıştır.

---

## Icerik

### Ders 1 — TypeScript'e Giriş ve Temel Eğitimi

| Adım | Konu |
|------|------|
| 00 | TypeScript nedir? JavaScript ile farkı, neden kullanılır? |
| 01 | Kurulum: `tsc`, `ts-node`, `tsconfig.json` ayarları |
| 02 | Temel tipler (`string`, `number`, `boolean`, `array`, `tuple`, `enum`) ve fonksiyonlarda tip tanımları |
| 03 | **Egzersiz** |
| 04 | Objeler, `type` alias ve `interface` |
| 05 | **Egzersiz** |
| 06 | `class` ve nesne yönelimli programlama (OOP): erişim belirleyiciler, kalıtım, soyut sınıflar |
| 07 | Orta seviye tipler: union (`\|`), intersection (`&`), literal tipler, optional & readonly |
| 08 | **Egzersiz** |
| 09 | 🎯 **QuizBox Başlangıcı** — Canlı kodlama: `Kategori` tipi, `Soru` interface'i, filtreleme fonksiyonu |

### Ders 2 — İleri Seviye TypeScript

| Adım | Konu |
|------|------|
| 00 | Ders 1 özeti ve tekrar |
| 01 | Type narrowing: `typeof`, `instanceof`, discriminated unions |
| 02 | Generics: generic fonksiyonlar, generic interface ve class |
| 03 | **Egzersiz** |
| 04 | İleri tip operatörleri: `keyof`, `typeof`, mapped types, conditional types |
| 05 | Utility Types: `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Parameters`, `ReturnType` |
| 06 | **Egzersiz** |
| 07 | Modül yapısı: import/export, tip-only import, declaration files (`.d.ts`) |
| 09 | Best practices: `strict` modu, `as` kullanımından kaçınma, tip güvenli API çağrıları |
| 10 | **Egzersiz** |
| 11 | 🎯 **QuizBox Final** — Canlı kodlama: `QuizEngine` class'ı, Utility Types ile tip türetme, DOM entegrasyonu |

---

## İleri Okuma

### JavaScript Temelleri
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) — scope, closures, prototype, async; TypeScript'in altındaki JS'i derinlemesine anlamak için

### TypeScript Resmi Kaynaklar
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — resmi referans dokümantasyon
- [TypeScript Playground](https://www.typescriptlang.org/play) — tarayıcıda TS dene, hata ve çıktıları anlık gör

### Kitaplar & Kurslar
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) — ücretsiz, kapsamlı online kitap (Basarat Ali Syed)
- [Total TypeScript](https://www.totaltypescript.com/) — Matt Pocock'un ileri seviye workshop ve makaleleri

### Pratik
- [TypeScript Exercises](https://typescript-exercises.github.io/) — artan zorlukta interaktif egzersizler
- [Type Challenges](https://github.com/type-challenges/type-challenges) — tip sistemi bulmacaları (easy → extreme)

---

## Arastirma Konulari

### Ders 1
- `string` / `String`, `number` / `Number` arasındaki farklar nedir, ne zaman hangisi kullanılır?
- Spread operatöründen sonra değerleri override edebilir miyim?
- EcmaScript nedir? Ne gibi versiyonları vardır, farkları nedir?
- `prototype` nedir, ne işe yarar?
- `method` ile `function` arasındaki fark nedir?
- Type casting nedir? TypeScript'de cast nasıl yapılır?
- `abstract class` ile `interface` arasındaki fark nedir? Hangisini ne zaman tercih edersin?
- `readonly` ile `const` aynı şey midir? Farkları nedir?
- `enum` yerine hangi alternatifler kullanılabilir? Avantajları ve dezavantajları nelerdir?
- TypeScript tip hataları runtime'da da hata verir mi? Neden?

### Ders 2
- `never` tipi ne zaman ortaya çıkar, ne işe yarar?
- Generic constraint (`<T extends ...>`) ne zaman gerekir?
- `keyof` ve `typeof` operatörleri arasındaki fark nedir?
- `Partial<T>` ile `Required<T>` gerçekte nasıl çalışır — yani iç implementasyonu nedir?
- `infer` keyword'ü ne işe yarar, nerede kullanılır?
- Declaration file (`.d.ts`) nedir, neden gerekebilir?
- ÖDEV: TDD (Test Driven Development) nedir, neye yarar?
