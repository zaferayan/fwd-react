# Egzersiz #2 — Objeler & Interface

## Görev 1
Bir `Kitap` interface'i tanımla. Şu alanları olsun:

| Alan | Tip | Zorunlu? |
|------|-----|----------|
| `id` | `number` | ✅ |
| `baslik` | `string` | ✅ |
| `yazar` | `string` | ✅ |
| `yayinYili` | `number` | ✅ |
| `ozet` | `string` | opsiyonel |

## Görev 2
`Kitap` interface'ini extend eden bir `EKitap` interface'i tanımla. Ek olarak şu alanları olsun:

| Alan | Tip |
|------|-----|
| `dosyaBoyutu` | `number` |
| `format` | `"pdf" \| "epub" \| "mobi"` (literal union) |

## Görev 3
Bir `kutuphane` dizisi oluştur — tipi `Kitap[]` olsun. İçine 2 adet `Kitap` nesnesi ekle.
Birinin `ozet` alanını boş bırak — TypeScript'in buna izin verdiğini gözlemle.
