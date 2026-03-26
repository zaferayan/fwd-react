// --- Union Types ---
type StringOrNumber = string | number;

let value: StringOrNumber = "merhaba";
value = 42; // ✅
// value = true; // 🔴 hata

function print(value: string | number): void {
  console.log(value);
}

type ApiResponse = {
  data: string[] | null;
  error: string | null;
};


// --- Intersection Types ---
type AddressInfo = { city: string; country: string };
type PersonalInfo = { name: string; age: number };
type FullProfile = PersonalInfo & AddressInfo;

const profile: FullProfile = { name: "Ahmet", age: 25, city: "İstanbul", country: "Türkiye" };


// --- Literal Types ---
type Direction = "north" | "south" | "east" | "west";
type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;

let heading: Direction = "north";
// heading = "up"; // 🔴 hata

function rollDice(): DiceResult {
  return (Math.floor(Math.random() * 6) + 1) as DiceResult;
}


// --- Enum ---
enum DaysOfWeek {
  Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,
}

console.log(DaysOfWeek.Monday); // 0
console.log(DaysOfWeek[0]);        // "Monday"

enum StatusEnum {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

let userStatus: StatusEnum = StatusEnum.Active;
