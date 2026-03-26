# Temel Tipler & Fonksiyonlarda Tipler

## Bölüm 1: Temel Tipler

### Primitive Tipler
`string`, `number`, `boolean` — TypeScript'in temel yapı taşları.

### any vs unknown
| | `any` | `unknown` |
|---|---|---|
| Tip denetimi | Kapalı | Açık |
| Güvenlik | Tehlikeli | Güvenli |
| Kullanım | Kaçının | Kontrol sonrası kullanın |

`unknown` kullanmak için önce `typeof` ile tip kontrolü yapılmalı.

### null & undefined
- `null` — kasıtlı boş değer
- `undefined` — atanmamış değer

### never
Asla ulaşılmaması gereken noktaları işaretler. Genellikle her zaman hata fırlatan fonksiyonlarda kullanılır.

### Arrays
```typescript
let sayilar: number[] = [1, 2, 3];
let isimler: Array<string> = ["Ali", "Veli"];
```

### Tuple
Sabit uzunluklu ve her elemanın tipi belli olan dizi.
```typescript
let kullanici: [string, number] = ["Ahmet", 25];
```

---

## Bölüm 2: Fonksiyonlarda Tipler

### void
Geriye değer dönmeyen fonksiyonlar için kullanılır.

### Optional Parametre
`?` ile işaretlenen parametreler isteğe bağlıdır.

### Default Parametre
Değer verilmezse kullanılacak varsayılan değer tanımlanır.

### Fonksiyon Tipi
`type` ile fonksiyon imzası tanımlanabilir ve birden fazla fonksiyon bu imzayı uygulayabilir.
