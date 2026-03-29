// ─── typeof ile Narrowing ──────────────────────────────────────────────────
// TypeScript, typeof kontrolünden sonra tipi otomatik olarak daraltır.

function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript bilir: string
  }
  return value.toFixed(2); // TypeScript bilir: number
}

console.log(processValue("merhaba")); // "MERHABA"
console.log(processValue(3.14159));   // "3.14"


// ─── instanceof ile Narrowing ─────────────────────────────────────────────
// Sınıf örneklerini ayırt etmek için kullanılır.

class Cat {
  meow(): string { return "Miyav!"; }
}

class Dog {
  bark(): string { return "Hav!"; }
}

function makeSound(animal: Cat | Dog): string {
  if (animal instanceof Cat) {
    return animal.meow(); // TypeScript bilir: Cat
  }
  return animal.bark(); // TypeScript bilir: Dog
}


// ─── Discriminated Union (Ayrıştırılmış Birlik) ───────────────────────────
// Her varyant bir "type" (veya benzeri) alanı taşır.
// TypeScript bu ortak alana bakarak hangi dalda ne var olduğunu bilir.

type Square    = { type: "square"; side: number };
type Rectangle = { type: "rectangle"; width: number; height: number };
type Shape     = Square | Rectangle;

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case "square":
      return shape.side ** 2;       // TypeScript bilir: Square
    case "rectangle":
      return shape.width * shape.height; // TypeScript bilir: Rectangle
  }
}

console.log(calculateArea({ type: "square", side: 5 }));           // 25
console.log(calculateArea({ type: "rectangle", width: 4, height: 6 })); // 24


// ─── in Operatörü ─────────────────────────────────────────────────────────
// Nesnede belirli bir özellik var mı diye kontrol eder.

type Swimmer = { swim(): void };
type Cyclist = { pedal(): void };

function athlete(person: Swimmer | Cyclist): void {
  if ("swim" in person) {
    person.swim(); // TypeScript bilir: Swimmer
  } else {
    person.pedal(); // TypeScript bilir: Cyclist
  }
}


// ─── QuizBox'ta Bu Konu ────────────────────────────────────────────────────
// quizbox/types.ts — QuizEvent discriminated union:
//   type QuizEvent =
//     | { type: "answer"; questionId: number; answerIndex: number }
//     | { type: "complete"; finalScore: number };
//
// quizbox/engine.ts — processEvent() metodu QuizEvent üzerinde switch kullanır:
//   processEvent(event: QuizEvent): void { switch (event.type) { ... } }
//
// quizbox/engine.ts — getCurrentQuestion() null narrowing:
//   getCurrentQuestion(): Question | null
//   Kullanırken: if (question !== null) { question.text } // ✅


// ─── Kendi Projen: Form Doğrulayıcı ──────────────────────────────────────
// Aşağıdaki kodu çalıştırarak discriminated union'ı pratik et.
// UI yok — sadece TypeScript mantığı.

type ValidationSuccess = { status: "ok"; value: string };
type ValidationError   = { status: "error"; message: string };
type ValidationResult  = ValidationSuccess | ValidationError;

function validateEmail(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { status: "error", message: "E-posta string olmalı" };
  }
  if (!input.includes("@")) {
    return { status: "error", message: "Geçersiz e-posta formatı" };
  }
  return { status: "ok", value: input };
}

const result = validateEmail("kullanici@ornek.com");
if (result.status === "ok") {
  console.log("Geçerli:", result.value); // TypeScript bilir: value var
} else {
  console.log("Hata:", result.message);  // TypeScript bilir: message var
}
