// --- Primitive Tipler ---
let name_: string = "Ahmet";
let age: number = 25;
let active: boolean = true;

// --- any: tip denetimini kapatır — KAÇININ ---
let greeting: any = "merhaba";
greeting = 42;

// --- unknown: any'nin güvenli hali ---
let data: unknown = "test";
// data.toUpperCase(); // 🔴 hata — önce tip kontrolü gerekli
if (typeof data === "string") {
  console.log(data.toUpperCase()); // ✅
}

// --- null & undefined ---
let empty: null = null;
let undef: undefined = undefined;

// --- never: hiç ulaşılmaması gereken nokta ---
function throwError(message: string): never {
  throw new Error(message);
}

// --- Arrays ---
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Ali", "Veli"];

// --- Tuple: sabit uzunluk ve sıralı tipler ---
let user: [string, number] = ["Ahmet", 25];
// user = [25, "Ahmet"]; // 🔴 hata


// --- Parametre ve return type ---
function greet(name: string): string {
  return `Merhaba, ${name}!`;
}

// --- void: geriye değer dönmeyen fonksiyon ---
function log(message: string): void {
  console.log(message);
}

// --- Optional parameter ---
function fullName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// --- Default parameter ---
function power(num: number, exponent: number = 2): number {
  return Math.pow(num, exponent);
}

// --- Fonksiyon tipi tanımı ---
type CalculationFn = (a: number, b: number) => number;

const add: CalculationFn = (a, b) => a + b;
const subtract: CalculationFn = (a, b) => a - b;
