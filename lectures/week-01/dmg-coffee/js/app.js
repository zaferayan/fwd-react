import { fetchCoffeeData, hydrateCartFromServer, wait } from "./api.js";
import { bindEventListeners } from "./events.js";
import {
  loadCurrentUser,
  loadLocalState,
  incrementSessionVisits,
} from "./storage.js";
import { renderAuthState, showToast, syncFormFromState } from "./render.js";

async function init() {
  // Konu: LocalStorage'dan filtre/favori/sepet durumunu yükler.
  loadLocalState();
  // Konu: Kullanıcı oturumunu LocalStorage'dan alır ve UI ile senkronlar.
  loadCurrentUser();
  syncFormFromState();
  renderAuthState();
  bindEventListeners();

  // Konu: setInterval ile başka sekmelerdeki oturum değişimini periyodik yansıtır.
  setInterval(() => {
    loadCurrentUser();
    renderAuthState();
  }, 15000);

  incrementSessionVisits();

  // Konu: Promise tabanlı bekleme ve async/await akışının birlikte kullanımı.
  await wait(220);
  // Konu: Fetch API ile asenkron veri çekimi.
  await fetchCoffeeData();

  try {
    await hydrateCartFromServer();
  } catch (error) {
    console.warn("Sepet yükleme hatası:", error?.message ?? error);
  }
}

init();
