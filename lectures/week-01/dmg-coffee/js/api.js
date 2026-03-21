import { shopState, wait } from "./state.js";
import {
  applyFiltersAndRender,
  clearError,
  ensureVisibleResults,
  showError,
} from "./render.js";
import { saveLocalState } from "./storage.js";

const COFFEE_ENDPOINT =
  "https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/coffees";
const CART_ENDPOINT =
  "https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/cart";

function isValidItem(item) {
  // Konu: Optional chaining ve nullish coalescing ile esnek alan okuma.
  const displayName = item?.title ?? item?.name;
  return (
    item &&
    typeof displayName === "string" &&
    !displayName.toLowerCase().includes("invalid faker")
  );
}

function normalizeCoffeeItem(item, index = 0) {
  const title = item.title ?? item.name ?? "İsimsiz Kahve";
  const description = item.description ?? item.desc ?? "Açıklama yok";
  const image = item.image ?? item.image_url ?? item.img ?? "";
  const resolvedId = item.id ?? item._id ?? index + 1;
  const roast = item.roast ?? item.type ?? "Medium";
  const numericPrice = Number(item.price);
  const numericRating = Number(item.rating ?? NaN);

  return {
    id: `${roast}-${String(resolvedId)}`,
    type: roast,
    roast,
    title,
    description,
    origin: item.origin ?? "",
    category: item.category ?? "Coffee",
    ingredients: item.ingredients ?? [],
    image,
    rating: Number.isFinite(numericRating)
      ? Math.min(5, Math.max(1, Number(numericRating.toFixed(1))))
      : Number((3 + Math.random() * 2).toFixed(1)),
    price:
      Number.isFinite(numericPrice) && numericPrice > 0
        ? Number(numericPrice.toFixed(2))
        : Number((180 + Math.random() * 80).toFixed(2)),
  };
}
function extractCoffeeArray(payload) {
  // Konu: API formatı değişirse fallback alanlardan dizi seçimi.
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
}

function buildCartPayload() {
  // Konu: Object.entries ile obje -> [key, value] listesi, ardından map/filter zinciri.
  return Object.entries(shopState.cart)
    .map(([productId, quantity], index) => {
      // Konu: find ile id'si eşleşen ilk ürünü bulur.
      const coffee = shopState.coffees.find((item) => item.id === productId);

      if (!coffee || quantity <= 0) {
        return null;
      }

      return {
        productId: coffee.id,
        name: coffee.title,
        price: coffee.price,
        image: coffee.image,
        quantity,
        id: `${Date.now()}-${index + 1}`,
      };
    })
    .filter(Boolean);
}

function buildCartItemFromState(productId) {
  const quantity = Number(shopState.cart[productId] ?? 0);
  const coffee = shopState.coffees.find((item) => item.id === productId);

  if (!coffee || quantity <= 0) {
    return null;
  }

  return {
    productId: coffee.id,
    name: coffee.title,
    price: coffee.price,
    image: coffee.image,
    quantity,
  };
}

async function sendCartItem(url, method, item) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  console.log("sepet ödeme response", response);

  if (!response.ok) {
    throw new Error(`Sepet isteği başarısız: HTTP ${response.status}`);
  }

  return response.json();
}

async function deleteCartItem(url) {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Sepet isteği başarısız: HTTP ${response.status}`);
  }

  return response.json();
}

function normalizeServerCartItem(item) {
  return {
    id: String(item?.id ?? "").trim(),
    productId: String(item?.productId ?? "").trim(),
    name: String(item?.name ?? "").trim(),
    image: String(item?.image ?? "").trim(),
    price: Number(item?.price ?? 0),
    quantity: Number(item?.quantity ?? 0),
  };
}

export async function fetchCartOrders() {
  // Konu: Sepet kayıtlarını endpoint'ten GET methodu ile çeker.
  const response = await fetch(CART_ENDPOINT, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Sepet getirilemedi: HTTP ${response.status}`);
  }

  const raw = await response.json();
  const list = Array.isArray(raw) ? raw : [];

  return list
    .map(normalizeServerCartItem)
    .filter((item) => item.id && item.productId && item.quantity > 0);
}

export async function hydrateCartFromServer() {
  const serverCart = await fetchCartOrders();

  shopState.cart = Object.fromEntries(
    serverCart.map((item) => [item.productId, item.quantity]),
  );
  shopState.cartServerIds = Object.fromEntries(
    serverCart.map((item) => [item.productId, item.id]),
  );
  saveLocalState();
  applyFiltersAndRender();

  return serverCart;
}

export async function fetchCoffeeData() {
  clearError();

  try {
    // Konu: Kahve listesini endpoint'ten GET methodu ile çeker.
    const response = await fetch(COFFEE_ENDPOINT, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Konu: response.json() Promise döner; await ile çözüp JSON veriyi alır.
    // Konu: JSON.stringify + JSON.parse ile payload'ın kopyası alınır (JSON clone yaklaşımı).
    const raw = JSON.parse(JSON.stringify(await response.json()));
    const list = extractCoffeeArray(raw).filter(isValidItem);
    console.log("Endpointten gelen kahve datası:", list);

    if (!list.length) {
      throw new Error("Veri listesi boş");
    }

    shopState.coffees = list.map((item, index) =>
      normalizeCoffeeItem(item, index),
    );
    shopState.lastLoadedAt = new Date();

    applyFiltersAndRender();
    ensureVisibleResults();
  } catch (error) {
    console.warn("Veri yükleme hatası:", error?.message ?? error);
    shopState.coffees = [];
    applyFiltersAndRender();
    showError("Veri yüklenemedi. Lütfen tekrar deneyin.");
  }
}

export async function submitCartOrder() {
  // Konu: Local sepet ile server sepetini GET, POST, PUT ve DELETE akışıyla senkronlar.
  const payload = buildCartPayload();

  const serverCart = await fetchCartOrders();
  const serverByProductId = new Map(
    serverCart.map((item) => [item.productId, item]),
  );
  const localByProductId = new Map(
    payload.map((item) => [item.productId, item]),
  );

  const results = {
    created: [],
    updated: [],
    deleted: [],
  };

  // Konu: for...of ile asenkron işlemleri sırayla çalıştırıp await ile bekler.
  for (const item of payload) {
    const existing = serverByProductId.get(item.productId);

    if (!existing) {
      results.created.push(await sendCartItem(CART_ENDPOINT, "POST", item));
      continue;
    }

    const shouldUpdate =
      existing.quantity !== item.quantity ||
      existing.price !== item.price ||
      existing.name !== item.name ||
      existing.image !== item.image;

    if (shouldUpdate) {
      results.updated.push(
        await sendCartItem(`${CART_ENDPOINT}/${existing.id}`, "PUT", item),
      );
    }
  }

  for (const item of serverCart) {
    if (localByProductId.has(item.productId)) {
      continue;
    }

    results.deleted.push(await deleteCartItem(`${CART_ENDPOINT}/${item.id}`));
  }

  return results;
}

export async function updateCartOrder(serverCartId, item) {
  // Konu: Sepetteki mevcut bir kaydı endpoint'e PUT methodu ile günceller.
  const safeCartId = String(serverCartId ?? "").trim();

  if (!safeCartId) {
    throw new Error("Güncellenecek sepet kaydı bulunamadı.");
  }

  if (!item || typeof item !== "object") {
    throw new Error("Güncellenecek sepet verisi bulunamadı.");
  }

  return sendCartItem(`${CART_ENDPOINT}/${safeCartId}`, "PUT", item);
}

export async function deleteCartOrder(serverCartId) {
  // Konu: Sepetteki mevcut bir kaydı endpoint'ten DELETE methodu ile siler.
  const safeCartId = String(serverCartId ?? "").trim();

  if (!safeCartId) {
    throw new Error("Silinecek sepet kaydı bulunamadı.");
  }

  return deleteCartItem(`${CART_ENDPOINT}/${safeCartId}`);
}

export async function syncCartItem(productId) {
  const safeProductId = String(productId ?? "").trim();
  const serverCartId = shopState.cartServerIds[safeProductId];
  const item = buildCartItemFromState(safeProductId);

  if (!safeProductId) {
    throw new Error("Senkronlanacak ürün bulunamadı.");
  }

  if (!item) {
    if (serverCartId) {
      await deleteCartOrder(serverCartId);
      delete shopState.cartServerIds[safeProductId];
    }

    return null;
  }

  if (serverCartId) {
    // Konu: async/await akışında Promise dönen PUT isteği tamamlanana kadar beklenir.
    const updated = await updateCartOrder(serverCartId, item);
    shopState.cartServerIds[safeProductId] = String(
      updated?.id ?? serverCartId,
    );
    return updated;
  }

  const created = await sendCartItem(CART_ENDPOINT, "POST", item);
  shopState.cartServerIds[safeProductId] = String(created?.id ?? "");
  return created;
}

export { wait };
