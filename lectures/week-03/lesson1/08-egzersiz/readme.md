# Egzersiz #3 — Orta Seviye Tipler

## Görev 1
Bir `Medya` type'ı tanımla. `"video"`, `"muzik"` veya `"podcast"` değerlerini alabilsin.

## Görev 2
Aşağıdaki fonksiyona doğru tipleri ekle.

- `sure` parametresi `number` veya `string` olabilsin
- `number` gelirse → `"X saniye"` dönsün
- `string` gelirse → direkt dönsün

```typescript
function sureyiFormatla(sure) {
  if (typeof sure === "number") {
    return `${sure} saniye`;
  }
  return sure;
}
```

## Görev 3
Bir `IcerikKarti` type'ı tanımla. Şu alanları içersin:

- `baslik` (string) ve `tur` (Medya) — içerik bilgileri
- `sure` (number) ve `boyut` (number) — teknik bilgiler
