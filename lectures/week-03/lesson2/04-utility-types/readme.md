# Utility Types

## QuizBox'a Bu Adımda Ne Ekliyoruz?

QuizBox'ta üç ayrı sorun var:

1. **Güvenlik:** Oyuncuya soruyu gösterirken `correctAnswer` alanı gizlenmeli. `Omit<Question, "correctAnswer">` → `QuestionForPlayer`
2. **Hafif liste:** Soru listesini gösterirken `options` ve `correctAnswer` gerekmez. `Pick<Question, "id" | "category" | "text">` → `QuestionSummary`
3. **Taslak kaydetme:** Quiz editörü yarım bırakılan soruyu kaydedebilmeli. `Partial<Question>` → `QuestionDraft`
4. **Sonuç tablosu:** Her kategorinin doğru/toplam sayısını tutmak için `Record<Category, {...}>`

`../quizbox/engine.ts`'e eklenenler:
- `QuestionForPlayer`, `QuestionSummary`, `QuestionDraft` tip takma adları
- `createDraftQuestion()` fonksiyonu

---

TypeScript'in yerleşik tip dönüştürücüleri. Var olan tiplerden yeni tipler türetmek için kullanılır.

## Bölüm 1: `Partial<T>`
Tüm alanları opsiyonel yapar. Güncelleme (PATCH) işlemleri için idealdir.

```typescript
function gorevGuncelle(id: number, guncellemeler: Partial<Gorev>): void { ... }

gorevGuncelle(1, { tamamlandi: true });   // ✅ tek alan yeterli
gorevGuncelle(2, { baslik: "Yeni" });     // ✅
```

## Bölüm 2: `Required<T>`
Tüm opsiyonel alanları zorunlu yapar. `Partial`'ın tersi.

```typescript
interface TaslakGorev { baslik?: string; aciklama?: string; }
type TamamGorev = Required<TaslakGorev>;
// { baslik: string; aciklama: string }
```

## Bölüm 3: `Readonly<T>`
Tüm alanları salt okunur yapar. Nesne oluşturulduktan sonra değiştirilemez.

```typescript
const sabitGorev: Readonly<Gorev> = { id: 1, baslik: "TypeScript öğren", ... };
sabitGorev.tamamlandi = true; // 🔴 hata — readonly
```

## Bölüm 4: `Pick<T, K>`
Sadece istediğin alanları al.

```typescript
type GorevOnizleme = Pick<Gorev, "id" | "baslik" | "tamamlandi">
```

## Bölüm 5: `Omit<T, K>`
İstemediğin alanları çıkar.

```typescript
type YeniGorev = Omit<Gorev, "id" | "olusturmaTarihi">
```

## Bölüm 6: `Record<K, V>`
Anahtar-değer haritası oluşturur.

```typescript
type GunlukPlan = Record<string, Gorev[]>
```

## Bölüm 7: `Parameters<T>`
Fonksiyonun parametre tiplerini tuple olarak alır. Wrapper fonksiyonlarda kullanışlıdır.

```typescript
type GorevOlusturParams = Parameters<typeof gorevOlustur>  // [string, string, number]
```

## Bölüm 8: `ReturnType<T>`
Fonksiyonun dönüş tipini alır. Aynı dönüş tipini başka yerde kullanmak için.

```typescript
type OlusturulanGorev = ReturnType<typeof gorevOlustur>
```

---

## İleri Okuma

- [TypeScript Handbook — Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) — tam liste ve örnekler
- [Total TypeScript — Essentials](https://www.totaltypescript.com/workshops/typescript-pro-essentials) — utility types'ların gerçek projelerdeki kullanımı
