# 🔖 Bitirme Projesi: Bookmark Manager

Bootcamp boyunca öğrendiğin tüm teknolojileri kullanarak **Pocket/Raindrop benzeri bir bookmark (yer imi) yönetim uygulaması** geliştireceksin.

Kullanıcılar linkleri kaydedebilir, kategorilere ayırabilir, etiketleyebilir ve koleksiyonlar oluşturabilir.

---

## 🎯 Amaç

Bu proje, bootcamp süresince öğrendiğin aşağıdaki becerileri bir araya getirmeni hedefler:

- Next.js App Router ile sayfa yapısı ve routing
- Server ve Client Component mimarisi
- Server Actions ile veri işlemleri
- NextAuth.js ile kullanıcı kimlik doğrulama
- SQLite ile veritabanı yönetimi ve CRUD işlemleri
- Tailwind CSS / Shadcn UI ile arayüz tasarımı
- Vercel üzerinde deployment

---

## 💡 Projeyi Kendin Yap, Kendine Ait Olsun

Bu proje herkes için aynı konseptten yola çıkıyor — ama aynı noktada bitmek zorunda değil.

Teknik gereksinimler ortak olsa da, **uygulamanın ruhu sana ait olmalı**. Aynı "bookmark manager" fikri, farklı ellerde tamamen farklı ürünlere dönüşebilir. Önemli olan, senin bakış açını ve yaratıcılığını projeye yansıtman.

Kendine şunu sor: *"Ben bu uygulamayı gerçekten kullansaydım, nasıl olmasını isterdim?"*

Birkaç örnek:

- Belki senin için **minimalist bir okuma listesi** mantıklı — sadece link, başlık ve "okundu/okunmadı" durumu yeterli.
- Belki sen **araştırma odaklı** düşünürsün — bookmark'lara not eklemek, highlight yapmak ve bunları dışa aktarmak istersin.
- Belki **görsel odaklı** bir yaklaşım tercih edersin — Pinterest tarzı kartlarla, site screenshot'larıyla zenginleştirilmiş bir deneyim.
- Belki **sosyal bir boyut** eklersin — public koleksiyonlar, paylaşım linkleri, başkalarının koleksiyonlarını keşfetme.
- Belki tamamen farklı bir tema seçersin — bookmark yerine **snippet manager**, **kaynak arşivi** veya **ilham panosu** olarak kurgularsın.

**Tasarım, renk paleti, layout, ek özellikler, kullanıcı deneyimi — bunların hepsi serbest.** Gereksinimler bir iskelet sunuyor; eti, kemiği ve karakteri sen koyacaksın.

Sonuçta bu projeyi portföyüne koyacaksın. Birbirinin kopyası uygulamalar arasında fark edilmek zor — ama kendi fikrini, kendi tasarımını ve kendi çözümünü ortaya koyan bir proje her zaman öne çıkar.

---

## 📋 Gereksinimler

### Zorunlu (Must Have)

**Kimlik Doğrulama**
- [ ] Kayıt ve giriş sistemi (NextAuth.js)
- [ ] Korumalı sayfalar (middleware ile route protection)
- [ ] Oturum yönetimi

**Bookmark CRUD**
- [ ] Yeni bookmark ekleme (URL, başlık, açıklama)
- [ ] Bookmark düzenleme
- [ ] Bookmark silme
- [ ] Bookmark listeleme

**Kategori & Etiketler**
- [ ] Bookmark'lara kategori atama
- [ ] Bookmark'lara etiket (tag) ekleme
- [ ] Kategoriye göre filtreleme
- [ ] Etikete göre filtreleme

**Arama**
- [ ] Başlık ve açıklamaya göre arama
- [ ] Arama sonuçlarının anlık listelenmesi

**Arayüz**
- [ ] Responsive tasarım (mobil uyumlu)
- [ ] Tailwind CSS veya Shadcn UI kullanımı
- [ ] Loading ve error state'leri

**Teknik**
- [ ] Next.js App Router kullanımı
- [ ] Server Components ile veri çekme
- [ ] Client Components ile interaktif özellikler
- [ ] Server Actions ile form işlemleri
- [ ] SQLite veritabanı
- [ ] TypeScript kullanımı
- [ ] Vercel'e deploy edilmiş olması

---

### Opsiyonel (Nice to Have)

- [ ] Dark / Light mode toggle
- [ ] Koleksiyon oluşturma (bookmark grupları)
- [ ] Bookmark'ları favori olarak işaretleme
- [ ] Sıralama seçenekleri (tarih, başlık, en son eklenen)
- [ ] URL'den otomatik başlık ve açıklama çekme (metadata fetch)
- [ ] Sayfalama (pagination) veya sonsuz scroll
- [ ] Bookmark dışa aktarma (JSON/CSV export)

---

### Bonus

- [ ] Tarayıcı eklentisi (Chrome Extension) ile tek tıkla bookmark kaydetme
- [ ] Paylaşılabilir public koleksiyonlar
- [ ] Optimistic UI güncellemeleri (useOptimistic)

---

## 🗂️ Önerilen Sayfa Yapısı

```
app/
├── page.tsx                  # Landing page (giriş yapmamış kullanıcılar için)
├── layout.tsx                # Root layout (navbar, theme provider)
├── login/
│   └── page.tsx              # Giriş sayfası
├── register/
│   └── page.tsx              # Kayıt sayfası
├── dashboard/
│   ├── page.tsx              # Ana bookmark listesi
│   ├── layout.tsx            # Dashboard layout (sidebar, search)
│   ├── bookmarks/
│   │   ├── new/
│   │   │   └── page.tsx      # Yeni bookmark ekleme
│   │   └── [id]/
│   │       └── page.tsx      # Bookmark detay / düzenleme
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx      # Kategoriye göre bookmark listesi
│   └── tags/
│       └── [tag]/
│           └── page.tsx      # Etikete göre bookmark listesi
└── api/                      # Route handlers (gerekirse)
```

---

## 💾 Önerilen Veri Modeli

**Users**
| Alan | Tip | Açıklama |
|------|-----|----------|
| id | INTEGER (PK) | Kullanıcı ID |
| email | TEXT | E-posta adresi |
| password | TEXT | Hashlenmiş şifre |
| name | TEXT | Kullanıcı adı |
| createdAt | DATETIME | Oluşturulma tarihi |

**Bookmarks**
| Alan | Tip | Açıklama |
|------|-----|----------|
| id | INTEGER (PK) | Bookmark ID |
| userId | INTEGER (FK) | Kullanıcı ID |
| url | TEXT | Kaydedilen URL |
| title | TEXT | Başlık |
| description | TEXT | Açıklama |
| categoryId | INTEGER (FK) | Kategori ID |
| isFavorite | BOOLEAN | Favori mi? |
| createdAt | DATETIME | Eklenme tarihi |

**Categories**
| Alan | Tip | Açıklama |
|------|-----|----------|
| id | INTEGER (PK) | Kategori ID |
| userId | INTEGER (FK) | Kullanıcı ID |
| name | TEXT | Kategori adı |
| slug | TEXT | URL-friendly isim |

**Tags**
| Alan | Tip | Açıklama |
|------|-----|----------|
| id | INTEGER (PK) | Etiket ID |
| name | TEXT | Etiket adı |

**BookmarkTags** (many-to-many)
| Alan | Tip | Açıklama |
|------|-----|----------|
| bookmarkId | INTEGER (FK) | Bookmark ID |
| tagId | INTEGER (FK) | Etiket ID |

---

## 📐 Değerlendirme Kriterleri

| Kriter | Ağırlık |
|--------|---------|
| Çalışan CRUD işlemleri | %25 |
| Authentication & route protection | %20 |
| Kod kalitesi ve TypeScript kullanımı | %15 |
| UI/UX ve responsive tasarım | %15 |
| Next.js özelliklerinin doğru kullanımı (Server/Client Components, Server Actions) | %15 |
| Deployment (Vercel'de canlı) | %10 |

---

## 📦 Teslim

Projenizi [submissions klasöründeki talimatları](./README.md) takip ederek teslim edin.

Teslim sırasında aşağıdakilerin hazır olduğundan emin olun:

1. **Çalışan Vercel linki** — projeniz canlı ve erişilebilir olmalı
2. **README.md** — projenizi kısaca anlatan, kurulum talimatlarını içeren bir README
3. **Temiz kod** — gereksiz dosya, console.log veya yorum bırakmayın

Başarılar! 🚀
