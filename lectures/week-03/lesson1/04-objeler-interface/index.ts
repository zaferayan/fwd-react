// --- Bölüm 1: Type Alias ---
type ID = number;
type Name = string;

let userId: ID = 1;
let userName: Name = "Ahmet";

type User = {
  id: number;
  name: string;
  age: number;
};

const user: User = { id: 1, name: "Ahmet", age: 25 };
// user.email = "test@test.com"; // 🔴 hata — User tipinde email yok


// --- Bölüm 2: Interface ---
interface Product {
  id: number;
  name: string;
  price: number;
}

const product: Product = { id: 1, name: "Klavye", price: 750 };


// --- Bölüm 2a: Interface Genişletme (extends) ---
interface Employee {
  id: number;
  name: string;
}

interface Manager extends Employee {
  department: string;
  salary: number;
}

const manager: Manager = { id: 1, name: "Ayşe", department: "Mühendislik", salary: 25000 };


// --- Bölüm 3: Type Alias vs Interface ---

// interface → declaration merging destekler (aynı isim iki kez tanımlanabilir)
interface Animal {
  name: string;
}
interface Animal {
  sound: string; // TypeScript bunları otomatik birleştirir
}
const cat: Animal = { name: "Tekir", sound: "miyav" };

// type → union tipler için kullanılır (interface bunu desteklemez)
type Result = "success" | "failure" | "pending";
let operationResult: Result = "success";

// type → intersection ile genişletme (&)
type BasicInfo = { id: number; name: string };
type Address = { city: string; country: string };
type PersonProfile = BasicInfo & Address;

const profile: PersonProfile = { id: 1, name: "Can", city: "İstanbul", country: "Türkiye" };

// interface → class ile implements kullanılabilir
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(5, 3);
console.log(rectangle.area()); // 15


// --- Bölüm 4: Optional & Readonly Properties ---
interface Customer {
  id: number;
  name: string;
  email?: string;        // opsiyonel — olmayabilir
  readonly registrationDate: Date; // readonly — sonradan değiştirilemez
}

const customer: Customer = { id: 1, name: "Veli", registrationDate: new Date() };
// customer.registrationDate = new Date(); // 🔴 hata — readonly


// --- Bölüm 5: Index Signature ---
interface Scoreboard {
  [playerName: string]: number;
}

const scores: Scoreboard = { Ali: 100, Veli: 85, Ayşe: 92 };
