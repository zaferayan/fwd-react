# Class ve OOP

## Bölüm 1: Temel Class
TypeScript class'ları JavaScript class'larının üzerine tip güvencesi ekler. `constructor`, alanlar ve metodlar için tipler zorunlu olabilir.

## Bölüm 2: Access Modifiers (Erişim Belirteçleri)

| Belirteç | Erişim |
|----------|--------|
| `public` | Her yerden (varsayılan) |
| `private` | Sadece class içinden |
| `protected` | Class ve alt sınıflardan |

## Bölüm 3: Constructor Shorthand
`constructor` parametrelerine `public`/`private`/`protected` eklemek, hem alan tanımı hem atamasını tek satırda yapar.

```typescript
// Uzun yol:
class Foo {
  private x: number;
  constructor(x: number) { this.x = x; }
}

// Kısa yol:
class Foo {
  constructor(private x: number) {}
}
```

## Bölüm 4: Inheritance (Kalıtım)
`extends` ile bir class başka bir class'ın özelliklerini miras alır. `super()` ile üst sınıfın constructor'ı çağrılır.

## Bölüm 5: Interface ile implements
Bir class birden fazla interface'i `implements` edebilir. Bu, class'ın belirli metodları içermesini zorunlu kılar — bir kontrat gibi.

---

## Egzersiz

### Görev 1
Bir `Calisan` class'ı tanımla. Şu alanlara sahip olsun:

| Alan | Erişim | Tip |
|------|--------|-----|
| `ad` | `public` | `string` |
| `maas` | `private` | `number` |
| `departman` | `protected` | `string` |

Constructor shorthand kullan. `tanitim()` metodu `"Ali — Mühendislik"` formatında bir string döndürsün.

### Görev 2
`Calisan`'ı extend eden bir `Mudur` class'ı tanımla. Ek olarak `takimBuyuklugu: number` alanı olsun. `tanitim()` metodunu override et — çıktıya takım büyüklüğünü de ekle.

### Görev 3
`rapor(): string` metodunu tanımlayan bir `Raporlanabilir` interface'i yaz. `Mudur` class'ını bu interface'i `implements` edecek şekilde güncelle ve metodu uygula.
