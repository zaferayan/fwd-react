# Objeler, Type Alias & Interface

## Bölüm 1: Type Alias
`type` anahtar kelimesiyle hem primitive tipler için kısa isim, hem de obje şekilleri tanımlanabilir.

## Bölüm 2: Interface
Obje yapısını tanımlamak için kullanılır. `type` ile benzer, ama `extends` ile genişletilebilir.

### Bölüm 2a: Interface Genişletme (extends)
Bir interface başka bir interface'den miras alabilir. Ortak alanları tekrar yazmaya gerek kalmaz.

## Bölüm 3: Type Alias vs Interface — Ne Zaman Ne?

| Özellik | `interface` | `type` |
|---|---|---|
| Nesne şekli tanımlama | ✅ | ✅ |
| Union tipler (`string \| number`) | ❌ | ✅ |
| `extends` ile genişletme | ✅ | ❌ (`&` kullanılır) |
| Declaration Merging (birleştirme) | ✅ | ❌ |
| Class ile kullanım (`implements`) | ✅ | ❌ |
| Primitive tip alias (`type ID = string`) | ❌ | ✅ |

#### Hangisini Kullanmalısın?

Önerilen genel kural şudur:
- Nesne şekilleri ve class'lar için → interface (özellikle kütüphane yazıyorsan)
- Union, conditional, mapped type gibi gelişmiş tipler için → type
- Kararsız kaldığında → type ile başla, extends gerektiğinde interface'e geç


## Bölüm 4: Optional & Readonly Properties
- `?` — opsiyonel alan, olmayabilir
- `readonly` — bir kez atanır, sonradan değiştirilemez


## Bölüm 5: Index Signature
Anahtarları önceden bilinmeyen objeler için kullanılır.

```typescript
interface SkorTablosu {
  [oyuncuIsim: string]: number;
}
```
