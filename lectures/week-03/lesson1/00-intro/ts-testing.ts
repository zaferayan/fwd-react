// Çalıştır:
//   tsx ts-testing.ts
// Sadece tip kontrolü (çıktı üretmeden):
//   tsc --noEmit ts-testing.ts

// ============================================
// TypeScript — Derleme zamanında hata tespiti
// ============================================

// 1. Tip kontrolü — yanlış tip reddedilir
function add(a: number, b: number): number {
    return a + b;
}
console.log(add(5, 10));    // 15 ✅
// console.log(add("5", 10)); // 🔴 Derleme hatası: string, number'a atanamaz


// 2. null güvenliği — olası crash önceden yakalanır
function getUsername(user: { name: string } | null): string {
    if (!user) return "Misafir";
    return user.name.toUpperCase();
}
console.log(getUsername({ name: "Ali" })); // "ALI" ✅
console.log(getUsername(null));            // "Misafir" ✅ — güvenli


// 3. Interface — obje şekli zorunlu kılınır
interface User {
    name: string;
    age: number;
}
function greet(user: User): string {
    return "Merhaba " + user.name;
}
console.log(greet({ name: "Ayşe", age: 25 }));  // "Merhaba Ayşe" ✅
// console.log(greet({ naam: "Ayşe", age: 25 })); // 🔴 Derleme hatası: 'naam' User'da yok


// 4. Union type — sadece geçerli değerler kabul edilir
type Role = "admin" | "user";
function setRole(role: Role): string {
    if (role === "admin") return "Yönetici";
    return "Kullanıcı";
}
console.log(setRole("admin"));  // "Yönetici" ✅
// console.log(setRole("adminn")); // 🔴 Derleme hatası: '"adminn"' Role tipine atanamaz
