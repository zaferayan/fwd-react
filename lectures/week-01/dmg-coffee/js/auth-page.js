import {
  loadCurrentUser,
  loginLocalUser,
  logoutLocalUser,
  registerLocalUser,
} from "./storage.js";

// Konu: DOM selector'lar ile auth sayfasının temel eleman referansları.
const authForm = document.querySelector("#authForm");
const authPageStatus = document.querySelector("#authPageStatus");
const currentAuthInfo = document.querySelector("#currentAuthInfo");
const authPageLogout = document.querySelector("#authPageLogout");
const mode = document.body.getAttribute("data-auth-mode");

const query = new URLSearchParams(window.location.search);
const redirectTarget = query.get("redirect") || "./index.html";

function setStatus(message) {
  if (authPageStatus) {
    authPageStatus.textContent = message;
  }
}

function renderCurrentUser() {
  const user = loadCurrentUser();

  if (!currentAuthInfo || !authPageLogout) {
    return;
  }

  if (!user) {
    currentAuthInfo.textContent = "Aktif oturum yok.";
    authPageLogout.style.display = "none";
    return;
  }

  currentAuthInfo.textContent = `${user.name}`;
  authPageLogout.style.display = "inline-flex";
}

if (authPageLogout) {
  // Konu: Event Listener ile çıkış butonu tıklanınca oturum temizlenir.
  authPageLogout.addEventListener("click", () => {
    logoutLocalUser();
    renderCurrentUser();
    setStatus("Oturum kapatıldı.");
  });
}

if (authForm) {
  authForm.addEventListener("submit", (event) => {
    // Konu: preventDefault ile sayfa yenilenmesini durdurup JS akışını sürdürür.
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Konu: try/catch ile register/login hatalarını kullanıcıya mesaj olarak yansıtır.
    try {
      if (mode === "register") {
        registerLocalUser({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        });

        // Konu: ?? ile boş veya undefined email değerine güvenli fallback verir.
        const email = encodeURIComponent(String(formData.get("email") ?? ""));
        setStatus("Kayıt başarılı. Giriş sayfasına yönlendiriliyorsun...");
        // Konu: setTimeout ile kısa bilgilendirme sonrası yönlendirme yapar.
        setTimeout(() => {
          window.location.href = `./login.html?email=${email}&redirect=${encodeURIComponent(redirectTarget)}`;
        }, 500);
        return;
      }

      loginLocalUser({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      setStatus("Giriş başarılı. Yönlendiriliyorsun...");
      // Konu: setTimeout ile geri bildirim görünsün diye gecikmeli redirect.
      setTimeout(() => {
        window.location.href = redirectTarget;
      }, 450);
    } catch (error) {
      setStatus(error?.message ?? "İşlem başarısız.");
    }
  });
}

if (mode === "login") {
  const emailInput = document.querySelector("#authEmail");
  const prefillEmail = query.get("email");

  if (emailInput && prefillEmail) {
    emailInput.value = prefillEmail;
  }
}

renderCurrentUser();
