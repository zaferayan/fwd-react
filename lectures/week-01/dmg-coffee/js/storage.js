import { defaultFilters, shopState } from "./state.js";

const LOCAL_STATE_KEY = "dmgCoffeeState";
const USERS_STORAGE_KEY = "dmgCoffeeUsers";
const CURRENT_USER_KEY = "dmgCoffeeCurrentUser";

function normalizeEmail(value) {
  // Konu: ?? ile null veya undefined girdiyi güvenli stringe çevirir.
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function readUsers() {
  try {
    // Konu: LocalStorage ve JSON.parse ile kayıtlı kullanıcı listesini geri alır.
    const raw = localStorage.getItem(USERS_STORAGE_KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  // Konu: JSON.stringify ile kullanıcı verisini saklar.
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function saveLocalState() {
  // Konu: Object.entries + filter ile sadece pozitif adetli sepet satırları tutulur.
  const cartEntries = Object.entries(shopState.cart).filter(
    ([, qty]) => qty > 0,
  );

  const payload = {
    favorites: [...shopState.favorites],
    filters: shopState.filters,
    // Konu: Object.fromEntries ile [id, qty] çiftlerinden yeniden obje üretilir.
    cart: Object.fromEntries(cartEntries),
  };

  localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(payload));
}

export function loadLocalState() {
  try {
    const raw = localStorage.getItem(LOCAL_STATE_KEY) ?? "{}";
    const parsed = JSON.parse(raw);
    const savedFilters = {
      ...defaultFilters,
      ...(parsed?.filters ?? {}),
    };
    const validTypes = new Set(["all", "Light", "Medium", "Dark"]);
    const validSorts = new Set(["name", "priceAsc", "priceDesc", "ratingDesc"]);

    shopState.favorites = new Set(parsed?.favorites ?? []);
    shopState.filters = {
      search: String(savedFilters.search ?? "").trim(),
      type: validTypes.has(savedFilters.type)
        ? savedFilters.type
        : defaultFilters.type,
      sortBy: validSorts.has(savedFilters.sortBy)
        ? savedFilters.sortBy
        : defaultFilters.sortBy,
      maxPrice: Number.isFinite(Number(savedFilters.maxPrice))
        ? Math.min(500, Math.max(100, Number(savedFilters.maxPrice)))
        : defaultFilters.maxPrice,
      minRating: Number.isFinite(Number(savedFilters.minRating))
        ? Math.min(5, Math.max(1, Number(savedFilters.minRating)))
        : defaultFilters.minRating,
    };
    shopState.cart = parsed?.cart ?? {};
  } catch (error) {
    console.error("Local state parse hatası:", error);
    shopState.filters = { ...defaultFilters };
    shopState.favorites = new Set();
    shopState.cart = {};
  }
}

export function incrementSessionVisits() {
  // Konu: SessionStorage ile sekme bazlı ziyaret sayısı tutar.
  const previous = Number(sessionStorage.getItem("visitCount") ?? 0);
  const next = previous + 1;
  sessionStorage.setItem("visitCount", String(next));
  return next;
}

export function registerLocalUser({ name, email, password }) {
  const safeName = String(name ?? "").trim();
  const safeEmail = normalizeEmail(email);
  const safePassword = String(password ?? "").trim();

  if (safeName.length < 2) {
    throw new Error("Ad en az 2 karakter olmalı.");
  }

  if (!safeEmail.includes("@")) {
    throw new Error("Gecerli bir e-posta gir.");
  }

  if (safePassword.length < 6) {
    throw new Error("Şifre en az 6 karakter olmalı.");
  }

  const users = readUsers();
  // Konu: some ile listede en az bir eşleşme olup olmadığı kontrol edilir.
  const alreadyExists = users.some((user) => user.email === safeEmail);

  if (alreadyExists) {
    throw new Error("Bu e-posta zaten kayıtlı.");
  }

  const newUser = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: safeName,
    email: safeEmail,
    password: safePassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

export function loginLocalUser({ email, password }) {
  const safeEmail = normalizeEmail(email);
  const safePassword = String(password ?? "").trim();
  const users = readUsers();
  // Konu: find ile koşulu sağlayan ilk kullanıcı bulunur.
  const matched = users.find(
    (user) => user.email === safeEmail && user.password === safePassword,
  );

  if (!matched) {
    throw new Error("E-posta veya şifre hatalı.");
  }

  const sessionUser = {
    id: matched.id,
    name: matched.name,
    email: matched.email,
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  shopState.currentUser = sessionUser;

  return sessionUser;
}

export function loadCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);

    if (!raw) {
      shopState.currentUser = null;
      return null;
    }

    const parsed = JSON.parse(raw);

    if (!parsed?.email) {
      shopState.currentUser = null;
      return null;
    }

    const sessionUser = {
      id: parsed.id,
      name: parsed.name,
      email: normalizeEmail(parsed.email),
    };

    shopState.currentUser = sessionUser;
    return sessionUser;
  } catch {
    shopState.currentUser = null;
    return null;
  }
}

export function logoutLocalUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  shopState.currentUser = null;
}
