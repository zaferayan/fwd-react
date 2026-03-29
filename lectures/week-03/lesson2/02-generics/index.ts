// ─── Problem: any Kullanmak ───────────────────────────────────────────────
// any ile yazdığında TypeScript tüm tip kontrolünü kapatır.
// Hata, derleme sırasında değil çalışma zamanında ortaya çıkar.

function firstElementAny(arr: any[]): any {
  return arr[0];
}
// firstElementAny([1, 2, 3]).toUpperCase() → derlenir ama çalışırken çöker!


// ─── Generic Fonksiyon ────────────────────────────────────────────────────
// <T> ile "ne gelirse o tip" deriz. TypeScript tipi kullanım yerinden çıkarır.

function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const num  = firstElement([1, 2, 3]);        // T = number
const text = firstElement(["a", "b", "c"]); // T = string
// num.toUpperCase();  // 🔴 hata — number üzerinde string metodu yok
// text.toFixed(2);    // 🔴 hata — string üzerinde number metodu yok


// ─── Birden Fazla Tip Parametresi ─────────────────────────────────────────
// Farklı tipte iki değeri birlikte döndürmek için <T, U> kullanılır.

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const duo   = pair("Ahmet", 25);     // [string, number]
const other = pair(true, [1, 2]);    // [boolean, number[]]


// ─── Generic Interface ────────────────────────────────────────────────────
// API'den dönen her tür veriyi sarmalamak için tek bir interface.

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Ayşe" },
  error: null,
};

const listResponse: ApiResponse<string[]> = {
  success: true,
  data: ["elma", "armut"],
  error: null,
};


// ─── Constraint (extends ile Kısıtlama) ───────────────────────────────────
// T'nin belirli bir yapıya sahip olmasını zorunlu kılmak için extends kullanılır.

function printName<T extends { name: string }>(obj: T): void {
  console.log(obj.name);
}

printName({ name: "Ali", age: 30 }); // ✅ — name alanı var
// printName({ age: 30 });           // 🔴 hata — name alanı eksik


// ─── keyof ile Generic ────────────────────────────────────────────────────
// K extends keyof T → K, T'nin var olan alanlarından biri olmak zorunda.

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Veli", age: 28 };
const name2 = getValue(user, "name"); // string
const age2  = getValue(user, "age");  // number
// getValue(user, "email");           // 🔴 hata — "email" alanı yok


// ─── QuizBox'ta Bu Konu ────────────────────────────────────────────────────
// quizbox/engine.ts içindeki generic yardımcı fonksiyonlar:
//
//   getRandomItem<T>(arr: T[]): T | undefined
//   → Diziden rastgele bir eleman seçer. Question[], string[] için çalışır.
//
//   takeRandom<T>(arr: T[], count: number): T[]
//   → createRandom() içinde Question[] üzerinde kullanılır.
//
//   getFieldValue<T, K extends keyof T>(obj: T, field: K): T[K]
//   → Var olmayan bir alan girilirse TypeScript derleme hatası verir.


// ─── Kendi Projen: Generic Stack ─────────────────────────────────────────
// UI olmadan çalışabilen, tip güvenli bir veri yapısı.

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const wordStack = new Stack<string>();
wordStack.push("TypeScript");
wordStack.push("Generics");
console.log(wordStack.peek()); // "Generics"
