// ============================================
// MODÜL YAPISI — types.ts
// ============================================

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Role = "admin" | "user" | "guest";

export interface Product {
  id: number;
  name: string;
  price: number;
}
