import { submitCartOrder, syncCartItem } from "./api.js";
import { defaultFilters, elements, shopState } from "./state.js";
import { saveLocalState } from "./storage.js";
import { logoutLocalUser } from "./storage.js";
import {
  addToCart,
  applyFiltersAndRender,
  clearCart,
  closeDetailModal,
  openDetailModal,
  readFiltersFromForm,
  renderCart,
  renderAuthState,
  showToast,
  syncFormFromState,
  updateCartQuantity,
} from "./render.js";

function restoreCartSnapshot(productId, previousQuantity, previousServerId) {
  if (previousQuantity > 0) {
    shopState.cart[productId] = previousQuantity;
  } else {
    delete shopState.cart[productId];
  }

  if (previousServerId) {
    shopState.cartServerIds[productId] = previousServerId;
  } else {
    delete shopState.cartServerIds[productId];
  }

  saveLocalState();
  renderCart();
}

export function bindEventListeners() {
  if (elements.userMenuBtn && elements.userMenuPanel) {
    const closeUserMenu = () => {
      elements.userMenuPanel.classList.remove("open");
      elements.userMenuPanel.setAttribute("aria-hidden", "true");
      elements.userMenuBtn.setAttribute("aria-expanded", "false");
    };

    const openUserMenu = () => {
      elements.userMenuPanel.classList.add("open");
      elements.userMenuPanel.setAttribute("aria-hidden", "false");
      elements.userMenuBtn.setAttribute("aria-expanded", "true");
    };

    elements.userMenuBtn.addEventListener("click", () => {
      // Konu: classList.contains ile sınıf durumuna göre aç/kapat karar verilir.
      const isOpen = elements.userMenuPanel.classList.contains("open");

      if (isOpen) {
        closeUserMenu();
      } else {
        openUserMenu();
      }
    });

    document.addEventListener("click", (event) => {
      // Konu: Event object içindeki target, tıklanan gerçek DOM düğümünü verir.
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest(".user-menu")) {
        return;
      }

      closeUserMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeUserMenu();
      }
    });
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", () => {
      logoutLocalUser();

      if (elements.authMessage) {
        elements.authMessage.textContent = "Oturum kapatıldı.";
      }

      renderAuthState();
      showToast("Çıkış yapıldı.");
    });
  }

  elements.form.addEventListener("submit", (event) => {
    // Konu: preventDefault formun tarayıcıdaki varsayılan submit davranışını durdurur.
    event.preventDefault();
    shopState.filters = readFiltersFromForm(event);
    applyFiltersAndRender();
  });

  elements.resetBtn.addEventListener("click", () => {
    shopState.filters = { ...defaultFilters };
    syncFormFromState();
    applyFiltersAndRender();
    showToast("Filtreler sıfırlandı.");
  });

  elements.coffeeGrid.addEventListener("click", (event) => {
    // Konu: Event delegation - tek listener ile grid içindeki butonlar yönetilir.
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    // Konu: getAttribute ile data-* attribute değerleri okunur.
    const dataId = target.getAttribute("data-id");

    if (target.classList.contains("fav-btn") && dataId) {
      if (shopState.favorites.has(dataId)) {
        shopState.favorites.delete(dataId);
        showToast("Favoriden çıkarıldı.");
      } else {
        shopState.favorites.add(dataId);
        showToast("Favorilere eklendi.");
      }

      applyFiltersAndRender();
    }

    if (target.classList.contains("detail-btn") && dataId) {
      const picked = shopState.coffees.find((coffee) => coffee.id === dataId);

      if (picked) {
        shopState.viewedIds.add(picked.id);
        openDetailModal(picked);
      }
    }

    if (target.classList.contains("cart-btn") && dataId) {
      const previousQuantity = Number(shopState.cart[dataId] ?? 0);
      const previousServerId = shopState.cartServerIds[dataId] ?? "";

      addToCart(dataId);

      syncCartItem(dataId)
        // Konu: Promise chaining - then başarı, catch hata akışını yönetir.
        .then(() => {
          showToast("Ürün sepete eklendi.");
        })
        .catch((error) => {
          console.warn("Sepet ekleme hatası:", error?.message ?? error);
          restoreCartSnapshot(dataId, previousQuantity, previousServerId);
          showToast("Ürün sepete eklenemedi.");
        });
    }
  });

  elements.favoritesList.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const removeId = target.getAttribute("data-remove-id");

    if (removeId) {
      shopState.favorites.delete(removeId);
      applyFiltersAndRender();
    }
  });

  elements.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      showToast("Enter yerine Uygula butonu ile filtreyi gönderebilirsin.");
    }
  });

  elements.cartList.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    // Konu: Event target üstünden attribute okuyarak hangi satırın değiştiği bulunur.
    const cartId = target.getAttribute("data-id");
    const cartAction = target.getAttribute("data-cart-action");

    if (cartId && cartAction) {
      const previousQuantity = Number(shopState.cart[cartId] ?? 0);
      const previousServerId = shopState.cartServerIds[cartId] ?? "";

      updateCartQuantity(cartId, cartAction);

      syncCartItem(cartId)
        // Konu: Promise zinciriyle UI geri bildirimi ağ sonucuna bağlanır.
        .then(() => {
          if (cartAction === "remove") {
            showToast("Ürün sepetten silindi.");
            return;
          }

          showToast("Sepet güncellendi.");
        })
        .catch((error) => {
          console.warn("Sepet güncelleme hatası:", error?.message ?? error);
          restoreCartSnapshot(cartId, previousQuantity, previousServerId);
          showToast("Sepet güncellenemedi.");
        });
    }
  });

  elements.cartForm.addEventListener("submit", async (event) => {
    // Konu: Event object üzerinden varsayılan form gönderimini iptal eder.
    event.preventDefault();

    // Konu: Object.values ve map ile sepetteki adetleri sayı listesine çevirir.
    const quantities = Object.values(shopState.cart).map((qty) => Number(qty));

    if (!quantities.length) {
      showToast("Sepet boş.");
      return;
    }

    // Konu: every ile tüm adetlerin geçerli ve pozitif olmasını zorunlu kılar.
    const hasOnlyPositiveQuantities = quantities.every(
      (qty) => Number.isFinite(qty) && qty > 0,
    );

    if (!hasOnlyPositiveQuantities) {
      showToast("Sepette geçersiz adet bulundu.");
      return;
    }

    try {
      shopState.isSubmittingOrder = true;
      renderCart();
      await submitCartOrder();
      clearCart();
      shopState.cartServerIds = {};
      await submitCartOrder();
      showToast("Ödeme alındı.");
    } catch (error) {
      console.warn("Sepet gönderim hatası:", error?.message ?? error);
      showToast("Ödeme gönderilemedi.");
    } finally {
      shopState.isSubmittingOrder = false;
      renderCart();
    }
  });

  elements.modalCloseBtn.addEventListener("click", () => {
    closeDetailModal();
  });

  elements.detailModal.addEventListener("click", (event) => {
    if (event.target === elements.detailModal) {
      closeDetailModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      elements.detailModal.classList.contains("open")
    ) {
      closeDetailModal();
    }
  });
}
