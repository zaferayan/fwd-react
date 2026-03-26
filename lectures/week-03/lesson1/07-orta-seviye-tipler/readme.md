# Orta Seviye Tipler

## Bölüm 1: Union Types (`|`)
Bir değişkenin birden fazla tipten biri olabileceğini belirtir.

```typescript
type StringVeyaNumber = string | number;
```

Gerçek dünya kullanımı: API yanıtları, form alanları, nullable değerler.

## Bölüm 2: Intersection Types (`&`)
İki tipin **tüm** alanlarını birleştirir. Her iki tipin özelliklerini taşıyan yeni bir tip üretir.

```typescript
type TamProfil = KisiselBilgi & AdresBilgisi;
```

## Bölüm 3: Literal Types
Belirli string veya number değerlerini tip olarak kullanmak. Geçersiz değerler derleme anında yakalanır.

```typescript
type Yon = "kuzey" | "guney" | "dogu" | "bati";
type ZarSonucu = 1 | 2 | 3 | 4 | 5 | 6;
```

## Bölüm 4: Enum
İsimlendirilmiş sabitler kümesi. Numerik (varsayılan) veya string enum olabilir.

```typescript
// Numerik enum — 0'dan başlar
enum HaftaninGunleri { Pazartesi, Sali, ... }

// String enum — daha okunaklı
enum Durum { Aktif = "AKTIF", Pasif = "PASIF" }
```

> **Not:** Modern TypeScript'te literal union tipler (`"AKTIF" | "PASIF"`) enum'a çoğunlukla tercih edilir — daha az kod üretir ve tree-shaking dostu.
