import { coffeeShop, defaultFilters, elements, shopState } from "./state.js";
import { saveLocalState } from "./storage.js";

export function showToast(message) {
  if (!elements.toast) {
    return;
  }

  elements.toast.textContent = message;
  elements.toast.classList.add("visible");

  setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 1700);
}

export function renderAuthState() {
  if (!elements.authStatus || !elements.logoutBtn) {
    return;
  }

  const activeUser = shopState.currentUser;

  if (!activeUser) {
    elements.authStatus.textContent = "Giriş yapılmadı.";
    if (elements.authMessage) {
      elements.authMessage.textContent = "";
    }
    if (elements.loginLink) {
      elements.loginLink.style.display = "inline-flex";
    }
    if (elements.registerLink) {
      elements.registerLink.style.display = "inline-flex";
    }
    elements.logoutBtn.style.display = "none";
    return;
  }

  elements.authStatus.textContent = `${activeUser.name}`;
  if (elements.authMessage) {
    elements.authMessage.textContent = "";
  }
  if (elements.loginLink) {
    elements.loginLink.style.display = "none";
  }
  if (elements.registerLink) {
    elements.registerLink.style.display = "none";
  }
  elements.logoutBtn.style.display = "inline-flex";
}

export function syncFormFromState() {
  const { search, type, sortBy, maxPrice, minRating } = shopState.filters;

  elements.searchInput.value = search;
  elements.typeSelect.value = type;
  elements.sortSelect.value = sortBy;
  elements.maxPriceInput.value = String(maxPrice);
  elements.minRatingInput.value = String(minRating);
}

export function readFiltersFromForm(event) {
  const formData = new FormData(event.currentTarget);
  // Konu: Object.fromEntries ile FormData entries çıktısı düz objeye çevrilir.
  const formObject = Object.fromEntries(formData.entries());

  const search = (formObject.search ?? "").trim();
  const type = formObject.type ?? "all";
  const sortBy = formObject.sortBy ?? "name";
  const maxPrice = Number(formObject.maxPrice ?? 500);
  const minRating = Number(formObject.minRating ?? 1);

  return {
    search,
    type,
    sortBy,
    maxPrice: Math.min(500, Math.max(100, maxPrice)),
    minRating: Math.min(5, Math.max(1, minRating)),
  };
}

function computeStats(data) {
  const total = data.length;
  // Konu: reduce ile listedeki fiyatlar tek toplam değere indirgenir.
  const totalPrice = data.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = total ? totalPrice / total : 0;
  const averageRating = total
    ? data.reduce((sum, item) => sum + item.rating, 0) / total
    : 0;

  const lightCount = data.filter((item) => item.roast === "Light").length;
  const mediumCount = data.filter((item) => item.roast === "Medium").length;
  const darkCount = data.filter((item) => item.roast === "Dark").length;

  return {
    total,
    averagePrice,
    averageRating,
    lightCount,
    mediumCount,
    darkCount,
  };
}

export function renderStats(data) {
  if (!elements.statsGrid) {
    return;
  }

  const stats = computeStats(data);
  const statMap = {
    "Toplam Kahve": String(stats.total),
    "Ortalama Fiyat": coffeeShop.formatPrice(stats.averagePrice),
    "Ortalama Puan": stats.averageRating.toFixed(2),
    "Light / Medium / Dark": `${stats.lightCount} / ${stats.mediumCount} / ${stats.darkCount}`,
  };

  elements.statsGrid.innerHTML = "";

  // Konu: Object.entries + forEach ile obje içeriği dolaşılıp kartlar üretilir.
  Object.entries(statMap).forEach(([label, value]) => {
    // Konu: createElement ile yeni DOM düğümü oluşturulur.
    const card = document.createElement("div");
    card.className = "stat-card";
    // Konu: innerHTML ile kartın iskelet HTML'i tek adımda basılır.
    card.innerHTML = `<div class="stat-label"></div><div class="stat-value"></div>`;
    // Konu: textContent ile kullanıcıya gösterilecek metin güvenli şekilde atanır.
    card.querySelector(".stat-label").textContent = label;
    card.querySelector(".stat-value").textContent = value;
    elements.statsGrid.append(card);
  });
}

function createCoffeeCard(coffee, index) {
  // Konu: createElement + setAttribute ile kartın data-id bilgisi DOM'a yazılır.
  const article = document.createElement("article");
  article.className = "coffee-card";
  article.style.animationDelay = `${index * 40}ms`;
  article.setAttribute("data-id", String(coffee.id));

  const isFav = shopState.favorites.has(coffee.id);
  const originText = coffee.origin ? `${coffee.origin}` : "";

  article.innerHTML = `
    <img src="${coffee.image}" alt="${coffee.title}" loading="lazy" />
    <div class="coffee-body">
      <div class="coffee-top">
        <div class="coffee-name">${coffee.title}</div>
        <span class="tag">${coffee.roast ?? coffee.type}</span>
      </div>
      <p class="coffee-desc">${coffee.description ?? "Açıklama bulunamadı."}</p>
      <p class="coffee-desc" style="font-style:italic;">${originText}</p>
      <div class="coffee-meta">
        <span>${coffeeShop.formatPrice(coffee.price)}</span>
        <span>Puan: ${coffee.rating.toFixed(1)}</span>
      </div>
      <div class="card-actions">
        <button class="fav-btn" data-id="${coffee.id}">${isFav ? "Favoriden Çıkar" : "Favorile"}</button>
        <button class="detail-btn" data-id="${coffee.id}">Detay</button>
        <button class="cart-btn" data-id="${coffee.id}">Sepete Ekle</button>
      </div>
    </div>
  `;

  return article;
}

export function renderCoffees(data) {
  if (!elements.coffeeGrid || !elements.resultInfo) {
    return;
  }

  elements.coffeeGrid.innerHTML = "";

  if (!data.length) {
    elements.resultInfo.textContent = "Filtreye uygun kahve bulunamadı.";
    return;
  }

  elements.resultInfo.textContent = `${data.length} kahve listeleniyor.`;

  // Konu: forEach ile her kahve için tek tek kart oluşturulur.
  data.forEach((coffee, index) => {
    const card = createCoffeeCard(coffee, index);
    elements.coffeeGrid.append(card);
  });
}

export function renderFavorites() {
  if (!elements.favoritesList) {
    return;
  }

  elements.favoritesList.innerHTML = "";

  // Konu: map + find + filter(Boolean) zinciri favori id'lerini gerçek ürünlerle eşler.
  const favoriteItems = [...shopState.favorites]
    .map((id) => shopState.coffees.find((item) => item.id === id))
    .filter(Boolean);

  if (!favoriteItems.length) {
    elements.favoritesList.innerHTML =
      '<li class="muted">Henüz favori yok.</li>';
    return;
  }

  favoriteItems.forEach((coffee) => {
    const item = document.createElement("li");
    item.innerHTML = `<span></span><button data-remove-id="${coffee.id}">Sil</button>`;
    item.querySelector("span").textContent = `${coffee.title} (${coffee.type})`;
    elements.favoritesList.append(item);
  });
}

function getCartItemsWithData() {
  // Konu: Object.entries ile sepet objesi satırlara dönüştürülür.
  return Object.entries(shopState.cart)
    .map(([id, quantity]) => {
      const coffee = shopState.coffees.find((item) => item.id === id);

      if (!coffee || quantity <= 0) {
        return null;
      }

      return {
        coffee,
        quantity,
        lineTotal: coffee.price * quantity,
      };
    })
    .filter(Boolean);
}

export function renderCart() {
  if (!elements.cartList || !elements.cartSummary) {
    return;
  }

  const rows = getCartItemsWithData();
  elements.cartList.innerHTML = "";

  if (!rows.length) {
    elements.cartList.innerHTML = '<li class="muted">Sepetin boş.</li>';
  }

  rows.forEach((row) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="cart-row">
        <strong>${row.coffee.title}</strong>
        <span>${coffeeShop.formatPrice(row.lineTotal)}</span>
      </div>
      <div class="cart-row">
        <span class="muted">Adet: ${row.quantity}</span>
        <div class="cart-actions">
          <button data-cart-action="decrease" data-id="${row.coffee.id}">-</button>
          <button data-cart-action="increase" data-id="${row.coffee.id}">+</button>
          <button data-cart-action="remove" data-id="${row.coffee.id}">Sil</button>
        </div>
      </div>
    `;
    elements.cartList.append(item);
  });

  // Konu: reduce ile satır toplamları tek bir subtotal değerinde birleştirilir.
  const subtotal = rows.reduce((sum, row) => sum + row.lineTotal, 0);
  const tax = subtotal * coffeeShop.taxRate;
  const total = subtotal + tax;

  elements.cartSummary.innerHTML = `
    <div>Ara Toplam: <strong>${coffeeShop.formatPrice(subtotal)}</strong></div>
    <div>KDV (%${(coffeeShop.taxRate * 100).toFixed(0)}): <strong>${coffeeShop.formatPrice(tax)}</strong></div>
    <div>Genel Toplam: <strong>${coffeeShop.formatPrice(total)}</strong></div>
  `;

  if (elements.checkoutBtn) {
    elements.checkoutBtn.disabled = !rows.length || shopState.isSubmittingOrder;
    elements.checkoutBtn.textContent = shopState.isSubmittingOrder
      ? "Gönderiliyor..."
      : "Ödeme Yap";
  }
}

export function addToCart(coffeeId) {
  const current = Number(shopState.cart[coffeeId] ?? 0);
  shopState.cart[coffeeId] = current + 1;
  renderCart();
  saveLocalState();
}

export function clearCart() {
  shopState.cart = {};
  renderCart();
  saveLocalState();
}

export function updateCartQuantity(coffeeId, action) {
  const current = Number(shopState.cart[coffeeId] ?? 0);

  if (action === "remove") {
    delete shopState.cart[coffeeId];
  }

  if (action === "increase") {
    shopState.cart[coffeeId] = current + 1;
  }

  if (action === "decrease") {
    const next = current - 1;

    if (next <= 0) {
      delete shopState.cart[coffeeId];
    } else {
      shopState.cart[coffeeId] = next;
    }
  }

  renderCart();
  saveLocalState();
}

export function closeDetailModal() {
  if (!elements.detailModal) {
    return;
  }

  // Konu: classList ve setAttribute ile modal görünürlüğü/erişilebilirlik durumu güncellenir.
  elements.detailModal.classList.remove("open");
  elements.detailModal.setAttribute("aria-hidden", "true");
  shopState.modalCoffeeId = null;
}

export function openDetailModal(coffee) {
  if (!coffee || !elements.detailModal) {
    return;
  }

  // Konu: Optional chaining (?.) ve nullish coalescing (??) ile güvenli alan okuma.
  const ingredientCount = coffee?.ingredients?.length ?? 0;
  const taxIncluded = coffeeShop.calculateWithTax(coffee?.price ?? 0);

  shopState.modalCoffeeId = coffee.id;
  elements.modalImage.src = coffee.image;
  elements.modalImage.alt = coffee.title;
  elements.modalTitle.textContent = coffee.title;
  elements.modalDesc.textContent = coffee.description ?? "Açıklama bulunamadı.";
  elements.modalIngredients.textContent = coffee.origin
    ? `Menşei: ${coffee.origin} | Kategori: ${coffee.category ?? "Coffee"}${ingredientCount ? " | İçerik sayısı: " + ingredientCount : ""}`
    : `İçerik sayısı: ${ingredientCount}`;
  elements.modalMeta.textContent = `Kavrum: ${coffee.roast ?? coffee.type} | Fiyat: ${coffeeShop.formatPrice(coffee.price)} | KDV dahil: ${coffeeShop.formatPrice(taxIncluded)}`;

  elements.detailModal.classList.add("open");
  elements.detailModal.setAttribute("aria-hidden", "false");
}

export function clearError() {
  if (elements.errorBox) {
    elements.errorBox.textContent = "";
  }
}

export function showError(message) {
  if (!elements.errorBox) {
    return;
  }

  const errorEl = document.createElement("div");
  errorEl.className = "error";
  errorEl.textContent = message;
  elements.errorBox.innerHTML = "";
  elements.errorBox.append(errorEl);
}

export function ensureVisibleResults() {
  if (!shopState.coffees.length || shopState.visibleCoffees.length) {
    return false;
  }

  shopState.filters = { ...defaultFilters };
  syncFormFromState();
  // Konu: Method chaining ile map ve sort kullanarak fallback görünüm listesi hazırlar.
  shopState.visibleCoffees = shopState.coffees
    .map((coffee) => ({
      ...coffee,
      displayName: `${coffee.title} — ${coffee.origin ?? coffee.roast}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "tr"));

  renderCoffees(shopState.visibleCoffees);
  renderStats(shopState.visibleCoffees);
  renderFavorites();
  renderCart();
  saveLocalState();
  showToast("Eski filtreler temizlendi; kahveler yeniden gösterildi.");
  return true;
}

export function applyFiltersAndRender() {
  // Konu: Destructuring ile filtreleri state objesinden tek satırda alır.
  const { search, type, sortBy, maxPrice, minRating } = shopState.filters;

  const sorters = {
    name: (a, b) => a.title.localeCompare(b.title, "tr"),
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    ratingDesc: (a, b) => b.rating - a.rating,
  };

  // Konu: filter, map ve sort zinciriyle görünür liste üretilir.
  shopState.visibleCoffees = shopState.coffees
    .filter((coffee) => {
      const normalized =
        `${coffee.title} ${coffee.description ?? ""}`.toLowerCase();
      const matchesSearch = normalized.includes(search.toLowerCase());
      const matchesType = type === "all" || coffee.type === type;
      const matchesPrice = coffee.price <= maxPrice;
      const matchesRating = coffee.rating >= minRating;
      return matchesSearch && matchesType && matchesPrice && matchesRating;
    })
    .map((coffee) => ({
      ...coffee,
      displayName: `${coffee.title} — ${coffee.origin ?? coffee.roast}`,
    }))
    .sort(sorters[sortBy] ?? sorters.name);

  renderCoffees(shopState.visibleCoffees);
  renderStats(shopState.visibleCoffees);
  renderFavorites();
  renderCart();
  saveLocalState();
}
