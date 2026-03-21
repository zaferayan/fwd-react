# DMG Coffee App

Bu proje, vanilla JavaScript (ES Modules) ile yazılmış bir kahve listeleme ve sepet uygulamasıdır.

## 1) Proje Özeti

Uygulama şu yetenekleri içerir:

- Kahve verisini API'dan çekme ve normalize etme
- Filtreleme, sıralama ve arama
- Favori yönetimi
- Sepet yönetimi ve sepeti endpoint'e gönderme
- LocalStorage tabanlı kayıt/giriş/çıkış
- Login ve register için ayrı sayfalar

### Uygulama Adım Adım Neler İçeriyor?

1. Kullanıcı uygulamayı açar, local state ve oturum bilgisi yüklenir.
2. Kahve verisi MockAPI'dan çekilir ve normalize edilerek ekrana basılır.
3. Kullanıcı arama, kavrum tipi, maksimum fiyat ve minimum puan filtrelerini uygular.
4. Kullanıcı favori ekleyip çıkarabilir; favoriler local state içinde tutulur.
5. Kullanıcı ürün detay modalını açıp ürün bilgisini inceleyebilir.
6. Kullanıcı sepete ürün ekler, adet artırır/azaltır veya ürünü kaldırır.
7. Sepet değişiklikleri anlık olarak MockAPI `cart` endpoint'i ile senkron tutulur.
8. Kullanıcı ödeme adımını gönderdiğinde sepet durumu işlenir ve UI güncellenir.
9. Login/Register sayfalarından oturum işlemleri yapılabilir.
10. Çıkış işlemiyle current user temizlenir, UI misafir moduna döner.

## 2) Dosya Yapısı ve Sorumluluklar

- `index.html`: Ana sayfa, filtreler, kahve listesi, sepet, kullanıcı menü alanı
- `login.html`: Giriş sayfası
- `register.html`: Kayıt sayfası
- `style.css`: Tüm sayfaların stilleri
- `js/state.js`: Ortak DOM referansları, app state, sabitler ve yardımcı fonksiyonlar
- `js/storage.js`: LocalStorage/SessionStorage işlemleri ve auth işlemleri
- `js/api.js`: API çağrıları, veri normalize etme ve sepet payload üretimi
- `js/render.js`: Ekrana çizim (kahve kartları, istatistik, sepet, modal, auth durumu)
- `js/events.js`: Tüm event listener bağlantıları ve event akışları
- `js/app.js`: Uygulama başlangıç akışı (init)
- `js/auth-page.js`: Login/Register sayfası submit ve redirect akışları

## 3) Konulara Göre Nerede Ne Kullanıldı

### Advanced JavaScript ve Asynchronous Programming

- Genel orkestrasyon: `js/app.js`, `js/api.js`, `js/render.js`

### Array Methods

- `forEach`: `js/render.js` (istatistik kartları ve kahve kartları çizimi)
- `map`: `js/api.js` (cart payload), `js/render.js` (visible list/favoriler)
- `filter`: `js/storage.js` (pozitif adetler), `js/render.js` (filtreleme)
- `reduce`: `js/render.js` (ortalama ve sepet toplam hesapları)
- `find`: `js/events.js`, `js/render.js`, `js/api.js`
- `some`: `js/storage.js` (kullanıcı e-posta var mı)
- `every`: `js/events.js` (sepet adetleri geçerlilik kontrolü)
- `sort`: `js/render.js` (isim/fiyat/puan sıralama)

### Method Chaining

- `js/render.js`: `.filter(...).map(...).sort(...)`
- `js/storage.js`: `Object.entries(...).filter(...)`

### Objects

- Object literals: `js/state.js` (`elements`, `defaultFilters`, `shopState`, `coffeeShop`)
- Object methods: `js/state.js` (`formatPrice`, `calculateWithTax`)
- Destructuring: `js/render.js` (`const { search, type, sortBy, maxPrice, minRating } = ...`)
- Shorthand: `js/storage.js` (`filters`, `cart` gibi kısa yazımlar)
- `Object.keys`: `js/events.js`
- `Object.values`: `js/events.js`
- `Object.entries`: `js/storage.js`, `js/render.js`, `js/api.js`

### this Keyword

- `js/state.js`: `coffeeShop` içindeki metotlarda `this.currency`, `this.taxRate`

### DOM Manipulation

- Selectors: `js/state.js`, `js/auth-page.js`
- `createElement`: `js/render.js`
- `innerHTML`: `js/render.js`
- `textContent`: `js/render.js`, `js/auth-page.js`, `js/events.js`
- `classList`: `js/events.js`, `js/render.js`
- Attributes (`setAttribute/getAttribute`): `js/events.js`, `js/render.js`, `js/auth-page.js`

### Event Listeners ve Event Object

- `js/events.js`: click, submit, keydown, modal kapatma, sepet işlemleri
- `js/auth-page.js`: auth form submit ve logout click

### preventDefault

- `js/events.js`: filtre formu ve sepet formu submit
- `js/auth-page.js`: auth form submit

### Asynchronous JavaScript

- `setTimeout`: `js/app.js`, `js/render.js`, `js/auth-page.js`
- `setInterval`: `js/app.js` (oturum senkronu)
- Promises: `js/state.js` (`wait`)
- `async/await`: `js/app.js`, `js/api.js`, `js/events.js`
- Fetch API: `js/api.js` (kahve çekme ve sepet gönderme)

### JSON

- `JSON.parse`: `js/storage.js`, `js/api.js`
- `JSON.stringify`: `js/storage.js`, `js/api.js`

### try/catch

- `js/storage.js`: local state ve current user parse güvenliği
- `js/api.js`: veri çekme/gönderme hata yakalama
- `js/auth-page.js`: login/register submit hata yakalama
- `js/events.js`: sepet gönderim hata yakalama

### LocalStorage / SessionStorage

- LocalStorage key'leri (`js/storage.js`):
  - `dmgCoffeeState`
  - `dmgCoffeeUsers`
  - `dmgCoffeeCurrentUser`
- SessionStorage (`js/storage.js`): `visitCount`

### Optional Chaining (?.)

- `js/api.js`: `item?.title`, `payload?.data` vb.
- `js/storage.js`: `parsed?.filters`, `parsed?.favorites`, `parsed?.email`
- `js/render.js`: `coffee?.ingredients?.length`, `coffee?.price`
- `js/auth-page.js`: `error?.message`

### Nullish Coalescing (??)

- `js/api.js`: fallback title/description/image/id/type
- `js/storage.js`: fallback localStorage stringleri, input güvenli dönüşümleri
- `js/render.js`: form fallback değerleri, modal fallback textleri
- `js/auth-page.js`: submit fallback message ve email

## 4) Uygulama Akışları

### A) App Init Akışı (`js/app.js`)

1. Local state yüklenir
2. Current user yüklenir
3. Form state senkronlanır
4. Auth UI render edilir
5. Event listener'lar bağlanır
6. Session visit artırılır
7. API'dan kahveler çekilir
8. Server sepeti yüklenerek local sepet ile senkronlanır

### B) Auth Akışı (`js/storage.js` + `js/auth-page.js` + `js/render.js`)

1. Register: kullanıcı doğrulanır, users listesine yazılır
2. Login: users listesinde eşleşme aranır, session user yazılır
3. Main page: `renderAuthState` ile login/register linkleri veya logout durumu gösterilir
4. Logout: current user temizlenir

### C) Kahve Listeleme ve Filtreleme (`js/api.js` + `js/render.js`)

1. Veri fetch edilir
2. Cevap farklı formatlara karşı normalize edilir
3. Filtre/sıralama uygulanır
4. Kartlar ve istatistikler çizilir

### D) Sepet Akışı (`js/render.js` + `js/events.js` + `js/api.js`)

1. Uygulama açılırken server sepeti GET ile alınır
2. Kullanıcı bir ürünü ilk kez sepete eklediğinde yeni satır POST edilir
3. Kullanıcı aynı ürünü artırdığında mevcut server kaydı PUT ile güncellenir
4. Kullanıcı ürünü azalttığında mevcut server kaydı PUT ile güncellenir
5. Kullanıcı ürünü tamamen kaldırdığında ilgili server kaydı DELETE ile silinir
6. Ürün adedi azalıp `0` olduğunda işlem DELETE olarak tamamlanır
7. Ara toplam + KDV + genel toplam hesaplanır ve ekrana yansıtılır
8. Ödeme formu gönderildiğinde sepet gönderim/temizleme akışı çalışır ve UI geri bildirim verir

## 5) API Bilgileri

- Kahve listesi endpoint: `https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/coffees`
- Sepet getirme endpoint: `https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/cart` (`GET`)
- Sepet oluşturma endpoint: `https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/cart` (`POST`)
- Sepet güncelleme endpoint: `https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/cart/:id` (`PUT`)
- Sepet silme endpoint: `https://69b70cc6ffbcd0286094755f.mockapi.io/dmg-cafe/cart/:id` (`DELETE`)

## 5.1) MockAPI Kurulumu ve Veri Yapısı

Bu projede backend simülasyonu için MockAPI kullanılır.

Bu endpointleri birebir aynı yapıda kendi MockAPI hesabında da oluşturabilirsin.
Sadece base URL (project id) değişir, resource adları aynı kalır.

Örnek şablon:

- `https://<your-project-id>.mockapi.io/dmg-cafe/coffees`
- `https://<your-project-id>.mockapi.io/dmg-cafe/cart`

Projede endpoint yapısı bu kaynak adlarına göre yazıldığı için `coffees` ve `cart`
isimlerini aynı bırakman önerilir.

1. MockAPI üzerinde `dmg-cafe` isminde bir proje oluştur.
2. Proje içinde iki resource aç:

- `coffees`
- `cart`

3. `coffees` resource'una ürün verilerini düz bir JSON dizi olarak ekle.
4. Her kayıt tek bir obje olmalı; iç içe (nested) dizi ekleme.

Önerilen `coffees` alanları:

- `name` (string)
- `category` (string)
- `origin` (string)
- `roast` (Light/Medium/Dark)
- `price` (number)
- `image` (URL)
- `description` (string)

İstersen `coffees` verisini kendi senaryona göre değiştirebilirsin.
Alan ekleyip çıkarabilirsin; uygulama `name/title`, `roast/type` gibi bazı
alanlarda fallback desteğiyle çalışır.

Önemli not:

- `coffees` endpoint'i 10 ürün gösterecekse, cevap gövdesi 10 adet obje içeren tek seviye bir array olmalı.

`cart` için beklenen temel alanlar:

- `productId` (string)
- `name` (string)
- `price` (number)
- `image` (string)
- `quantity` (number)

## 6) Çalıştırma

Bu proje build step gerektirmez. Basit bir static server yeterlidir.

Örnek adımlar:

1. Proje klasörünü aç
2. VS Code'da Live Server eklentisi ile `index.html` dosyasını aç
3. Uygulama tarayıcıda otomatik olarak çalışır

## 7) Notlar

- Auth mekanizması demo amaçlıdır; parola localStorage'da tutulur.
- Üretim ortamı için sunucu taraflı auth, şifre hashleme ve güvenlik katmanları gerekir.

## 8) Bilinen Sınırlar ve İyileştirme Fikirleri

- Gerçek kullanıcı doğrulama (JWT/session backend) yoktur.
- Parola şifreleme/hashing yoktur (demo amaçlı localStorage kullanımı).
- Otomatik test, lint ve CI pipeline tanımı bu repoda yoktur.
- Üretime geçişte rate limit, input validation ve merkezi hata loglama eklenmelidir.
