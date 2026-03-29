// ============================================
// MODÜL YAPISI — utils.ts
// ============================================

import { User, Role } from "./types";

export function checkUserRole(user: User, requiredRole: Role): boolean {
  return requiredRole === "user"; // örnek
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function randomId(): number {
  return Math.floor(Math.random() * 1000);
}
