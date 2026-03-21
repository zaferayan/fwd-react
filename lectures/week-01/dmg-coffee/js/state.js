// Konu: Uygulama boyunca tekrar kullanılacak DOM referansları.
export const elements = {
  userMenuBtn: document.querySelector("#userMenuBtn"),
  userMenuPanel: document.querySelector("#userMenuPanel"),
  loginLink: document.querySelector("#loginLink"),
  registerLink: document.querySelector("#registerLink"),
  authStatus: document.querySelector("#authStatus"),
  authMessage: document.querySelector("#authMessage"),
  logoutBtn: document.querySelector("#logoutBtn"),
  form: document.querySelector("#filterForm"),
  searchInput: document.querySelector("#searchInput"),
  typeSelect: document.querySelector("#typeSelect"),
  sortSelect: document.querySelector("#sortSelect"),
  maxPriceInput: document.querySelector("#maxPriceInput"),
  minRatingInput: document.querySelector("#minRatingInput"),
  resetBtn: document.querySelector("#resetBtn"),
  coffeeGrid: document.querySelector("#coffeeGrid"),
  resultInfo: document.querySelector("#resultInfo"),
  favoritesList: document.querySelector("#favoritesList"),
  statsGrid: document.querySelector("#statsGrid"),
  errorBox: document.querySelector("#errorBox"),
  toast: document.querySelector("#toast"),
  cartForm: document.querySelector("#cartForm"),
  cartList: document.querySelector("#cartList"),
  cartSummary: document.querySelector("#cartSummary"),
  checkoutBtn: document.querySelector("#checkoutBtn"),
  detailModal: document.querySelector("#detailModal"),
  modalImage: document.querySelector("#modalImage"),
  modalTitle: document.querySelector("#modalTitle"),
  modalDesc: document.querySelector("#modalDesc"),
  modalIngredients: document.querySelector("#modalIngredients"),
  modalMeta: document.querySelector("#modalMeta"),
  modalCloseBtn: document.querySelector("#modalCloseBtn"),
};

// Konu: Filtre formunun başlangıç değerleri (object literal).
export const defaultFilters = {
  search: "",
  type: "all",
  sortBy: "name",
  maxPrice: 500,
  minRating: 1,
};

// Konu: Merkez state içinde kahveler, filtreler, favoriler ve sepet tutulur.
export const shopState = {
  coffees: [],
  visibleCoffees: [],
  currentUser: null,
  filters: { ...defaultFilters },
  favorites: new Set(),
  cart: {},
  cartServerIds: {},
  isSubmittingOrder: false,
  modalCoffeeId: null,
  viewedIds: new Set(),
  lastLoadedAt: null,
};

// Konu: Obje metotları içinde this kullanımı örneği.
export const coffeeShop = {
  name: "DMG Cafe",
  currency: "TL",
  taxRate: 0.08,

  formatPrice(amount) {
    return `${amount.toFixed(2)} ${this.currency}`;
  },

  calculateWithTax(amount) {
    return amount * (1 + this.taxRate);
  },
};

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
