# Kurulum & Yapılandırma

## Gereksinimler

- [Node.js](https://nodejs.org/en/download) — JavaScript çalışma ortamı
- [Deno](https://docs.deno.com/runtime/getting_started/installation/) *(opsiyonel)*

## Adım Adım Kurulum

```bash
# 1. Node.js kurulu mu kontrol et
node -v
npm -v

# 2. TypeScript'i global kur
npm install -g typescript

# 3. Versiyon kontrol
tsc -v

# 4. tsx kur — TS dosyalarını direkt çalıştırmak için (ts-node'un modern alternatifi)
npm install -g tsx

# 5. Proje klasörü oluştur ve başlat
mkdir typescript-dersleri && cd typescript-dersleri
npm init -y

# 6. tsconfig oluştur
npx tsc --init
```

## tsconfig.json — Önemli Ayarlar

Daha fazla bilgi https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
Cok daha fazla bilgi https://www.typescriptlang.org/tsconfig/

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "noImplicitAny": true,
    "esModuleInterop": true
  }
}
```

| Ayar | Açıklama |
|---|---|
| `target` | Hangi JS versiyonuna derlensin (ör. `ES5`, `ES2020`) |
| `module` | Modül sistemi (Node için `commonjs`) |
| `rootDir` | TS kaynak dosyaları nerede (ör. `./src`) |
| `outDir` | Derlenen JS nereye gitsin (ör. `./dist`) |
| `strict` | Tüm strict kontrolleri açar (`noImplicitAny`, `strictNullChecks` vb. dahil) — **önemli** |
| `noImplicitAny` | Tip belirtilmemiş değişkenlerde `any` kullanımına izin vermez, açık tip bildirimi zorunlu kılar |
| `esModuleInterop` | CommonJS modüllerini `import` söz dizimi ile kullanmaya olanak tanır |

## Derleme & Çalıştırma

```bash
# Tek dosya derle (JS ciktisi uretir dosya.js)
tsc dosya.ts

# Projeyi derle (tsconfig gerekli)
tsc

# İzleme modunda — kaydet, otomatik derle
tsc --watch

# Tip kontrolü yap ama cikti uretme
tsc --noEmit

# tsx ile direkt çalıştır (geliştirme için)
tsx dosya.ts
```
