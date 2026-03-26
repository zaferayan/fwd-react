// Çalıştırmak için:
//   node lesson1/00-intro/js-testing.js
//   deno lesson1/00-intro/js-testing.js

// ============================================
// JavaScript — Tip güvencesi yok
// ============================================

// 1. Yanlış tip → yanlış sonuç
function add(a, b) {
    return a + b;
}
console.log(add(5, 10));    // 15  ✅
console.log(add("5", 10)); // "510" ❌ — hata yok ama yanlış


// 2. null/undefined → runtime crash
function getUsername(user) {
    return user.name.toUpperCase();
}
console.log(getUsername({ name: "Ali" }));  // "ALI" ✅
console.log(getUsername(null));             // 💥 TypeError: Cannot read properties of null


// 3. Obje şekli — yanlış alan adı fark edilmez
function greet(user) {
    return "Merhaba " + user.name;
}
console.log(greet({ name: "Ayşe" }));     // "Merhaba Ayşe" ✅
console.log(greet({ naam: "Ayşe" }));     // "Merhaba undefined" ❌ — yazım hatası sessizce geçer


// 4. Magic string — geçersiz değer kontrol edilmez
function setRole(role) {
    if (role === "admin") return "Yönetici";
    if (role === "user")  return "Kullanıcı";
    return "Bilinmiyor"; // ❌ "adminn" gibi yazım hataları fark edilmez
}
console.log(setRole("admin"));  // "Yönetici" ✅
console.log(setRole("adminn")); // "Bilinmiyor" ❌ — hata yok
