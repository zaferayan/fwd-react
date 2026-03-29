// ─── keyof ────────────────────────────────────────────────────────────────
// Bir interface'in tüm alan adlarını literal union olarak çıkarır.

interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductFields = keyof Product; // "id" | "name" | "price"

function fieldExists(field: ProductFields): void {
  console.log(`${field} alanı Product'ta mevcut`);
}

fieldExists("name");    // ✅
// fieldExists("color"); // 🔴 hata — "color" Product'ta yok


// ─── typeof (tip bağlamında) ───────────────────────────────────────────────
// Var olan bir değerden tip çıkarır. Aynı tipi iki kez yazmaktan kurtarır.

const settings = {
  theme: "dark",
  language: "tr",
  notifications: true,
};

type Settings = typeof settings;
// { theme: string; language: string; notifications: boolean }

function updateSettings(patch: Partial<typeof settings>): void {
  // ...
}


// ─── as (Type Assertion) ──────────────────────────────────────────────────
// TypeScript'e "ben biliyorum, bu tip bu" demektir.
// Runtime'da hiçbir şey yapmaz — sadece derleyiciye ipucu verir.
// Yanlış kullanırsan çalışma zamanı hatası alırsın.

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

// İlgisiz tipleri as ile dönüştürmek mümkün değil:
// const n = "merhaba" as number; // 🔴 hata
const n = "merhaba" as unknown as number; // ⚠️ zorla geçer, tehlikeli


// ─── satisfies Operatörü ──────────────────────────────────────────────────
// Hem tip kontrolü yapar, hem de TypeScript'in tipi daha dar tutmasını sağlar.
// Tip annotation'dan farkı: tipi genişletmez, sadece uyumluluğu kontrol eder.

type Color = string | [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "green",
  blue: [0, 0, 255],
} satisfies Record<string, Color>;

palette.red[0];   // ✅ TypeScript bilir: red bir dizi (string değil)
palette.green.toUpperCase(); // ✅ TypeScript bilir: green bir string


// ─── Conditional Types ────────────────────────────────────────────────────
// Sözdizimi: T extends U ? X : Y
// "Eğer T, U'yu karşılıyorsa X; karşılamıyorsa Y"

type IsNumber<T> = T extends number ? "yes" : "no";

type R1 = IsNumber<number>;  // "yes"
type R2 = IsNumber<string>;  // "no"

// Pratik kullanım: null/undefined temizleme
type NonNullable2<T> = T extends null | undefined ? never : T;
type CleanType = NonNullable2<string | null | undefined>; // string

// Union dağılımı: conditional type her üyeye ayrı uygulanır
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>; // string[] | number[]


// ─── infer ────────────────────────────────────────────────────────────────
// Conditional type içinde TypeScript'ten bir tipi "tahmin etmesini" isteriz.
//
// Adım adım düşün:
//   1. T bir Promise mi? → T extends Promise<infer U>
//   2. Evetse, içindeki tipi U olarak yakala → U döner
//   3. Hayırsa, T'nin kendisini döndür

type PromiseType<T> = T extends Promise<infer U> ? U : T;

type A = PromiseType<Promise<string>>;  // string
type B = PromiseType<Promise<number>>;  // number
type C = PromiseType<boolean>;          // boolean (Promise değil, T döner)

// ReturnType'ın elle yazılmış hali:
type ReturnTypeCustom<T> = T extends (...args: any[]) => infer R ? R : never;

function greetUser(name: string): string {
  return `Merhaba, ${name}!`;
}

type GreetingReturn = ReturnTypeCustom<typeof greetUser>; // string

// Dizi eleman tipini çıkarma:
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type ElementType = ArrayElement<string[]>; // string


// ─── Mapped Types ─────────────────────────────────────────────────────────
// Var olan bir tipin her alanını dönüştürerek yeni bir tip üretir.
// [K in keyof T] → T'nin her alanı K olsun ve ona bir şey yap

type MakeOptional<T> = {
  [K in keyof T]?: T[K]; // ? ekler → Partial<T>'nin elle yazımı
};

type AllToString<T> = {
  [K in keyof T]: string; // tüm değerleri string yapar
};

type MakeReadonly<T> = {
  readonly [K in keyof T]: T[K]; // readonly ekler
};

interface Product2 {
  id: number;
  name: string;
  price: number;
}

const snapshot: MakeReadonly<Product2> = { id: 1, name: "Kalem", price: 5 };
// snapshot.price = 10; // 🔴 hata — readonly


// ─── Template Literal Types ───────────────────────────────────────────────
// Tip düzeyinde string birleştirme. Union ile birleşince tüm kombinasyonları üretir.

type Direction = "left" | "right" | "up" | "down";
type DirectionMessage = `go_${Direction}`;
// "go_left" | "go_right" | "go_up" | "go_down"

type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"


// ─── QuizBox'ta Bu Konu ────────────────────────────────────────────────────
// quizbox/types.ts — template literal type:
//   type QuizEventKey = `quiz:${Category}`;
//   // "quiz:tarih" | "quiz:bilim" | "quiz:cografya" | "quiz:spor"
//
// quizbox/types.ts — mapped type:
//   type ReadonlyQuestion = { readonly [K in keyof Question]: Question[K] };
//   // Readonly<Question>'ın elle yazılmış hali
//
// quizbox/engine.ts — getFieldValue:
//   getFieldValue<T, K extends keyof T>(obj: T, field: K): T[K]
//   // getFieldValue(soru, "text") → string
//   // getFieldValue(soru, "renk") → 🔴 derleme hatası


// ─── Kendi Projen: Form Şeması ────────────────────────────────────────────
// Template literal + mapped types ile bir form alanlarını tanımla.

interface FormFields {
  username: string;
  email: string;
  age: number;
}

// Her alan için hata mesajı tipi: "username_error" | "email_error" | "age_error"
type FieldError = `${keyof FormFields}_error`;

// Her alan için doğrulama sonucu
type FormErrors = {
  [K in keyof FormFields as `${K}_error`]?: string;
};

const errors: FormErrors = {
  username_error: "Kullanıcı adı 3 karakterden kısa olamaz",
  email_error: "Geçersiz e-posta",
};

console.log(errors.username_error); // "Kullanıcı adı 3 karakterden kısa olamaz"
