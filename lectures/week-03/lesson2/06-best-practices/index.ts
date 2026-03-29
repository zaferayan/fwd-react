// ─── 1. any Yerine unknown ────────────────────────────────────────────────
// any: TypeScript'i tamamen kapatır — güvenli değil.
// unknown: "bir şey var ama ne olduğunu bilmiyorum" — güvenli, kontrol zorunlu.

// ❌ Kötü: hata derleme sırasında değil çalışırken ortaya çıkar
function processData(data: any) {
  return data.name.toUpperCase();
}

// ✅ İyi: kullanmadan önce ne olduğunu kontrol etmek zorunda kalırsın
function processDataSafe(data: unknown) {
  if (typeof data === "object" && data !== null && "name" in data) {
    return (data as { name: string }).name.toUpperCase();
  }
  throw new Error("Geçersiz veri");
}


// ─── 2. Tip Çıkarımına Güven ──────────────────────────────────────────────
// TypeScript, basit ifadelerin tipini kendisi çıkarabilir. Tekrar yazma.

// ❌ Gereksiz
const num: number = 42;
const text: string = "merhaba";
const arr: number[] = [1, 2, 3];

// ✅ TypeScript zaten biliyor
const num2 = 42;
const text2 = "merhaba";
const arr2 = [1, 2, 3];

// Fonksiyon parametrelerinde tip yazmak gerekir, dönüş tipinde çoğu zaman gerekmez.
function calculate(a: number, b: number) {
  return a + b; // dönüş tipi: number — TypeScript çıkarır
}


// ─── 3. strict Mode — tsconfig.json ──────────────────────────────────────
// strict: true şu seçenekleri bir arada açar:
//   noImplicitAny        → tipi bilinmeyen yerlere any verilmesini engeller
//   strictNullChecks     → null/undefined'ı ayrı tip olarak ele alır
//   strictFunctionTypes  → fonksiyon parametre tiplerini sıkı kontrol eder
//
// strict: true OLMADAN:
//   function getLength(text) { return text.length; }  // text tipi any — hata yok
//
// strict: true İLE:
function getLength(text: string | null): number {
  // text.length  // 🔴 hata — null olabilir
  return text?.length ?? 0; // ✅ null güvenli
}


// ─── 4. Discriminated Union — Boolean Flag Yerine ─────────────────────────
// Boolean flag'ler: hangi alanların dolu olduğunu bulmak zordur.
// Discriminated union: TypeScript hangi dalda ne olduğunu kesin bilir.

// ❌ Kötü: success true iken error dolu olabilir mi? Belli değil.
type Result = { success: boolean; data?: string; error?: string };

// ✅ İyi: her dal bağımsız — karışıklık yok
type SuccessResult  = { type: "success"; data: string };
type ErrorResult    = { type: "error"; error: string };
type OperationResult = SuccessResult | ErrorResult;

function handleResult(result: OperationResult): void {
  if (result.type === "success") {
    console.log(result.data);   // TypeScript bilir: data var
  } else {
    console.error(result.error); // TypeScript bilir: error var
  }
}


// ─── 5. as Yerine Type Guard ──────────────────────────────────────────────
// as: "ben biliyorum, güven bana" — yanlışsa çalışma zamanı hatası.
// Type guard: çalışma zamanında kontrol eder — güvenli.

// ❌ Kötü
function getName(obj: unknown): string {
  return (obj as any).name; // çalışır ama güvenli değil
}

// ✅ İyi: isim kontrolünü yaparak daraltıyoruz
function hasName(obj: unknown): obj is { name: string } {
  return typeof obj === "object" && obj !== null && "name" in obj;
}

function getNameSafe(obj: unknown): string {
  if (hasName(obj)) {
    return obj.name; // TypeScript bilir: name var
  }
  return "Bilinmiyor";
}


// ─── QuizBox'ta Bu Konu ────────────────────────────────────────────────────
// quizbox/engine.ts — isQuestion() type guard:
//   isQuestion(obj: unknown): obj is Question
//   → "as" kullanmak yerine runtime'da kontrol eder
//
// quizbox/index.ts — isCategory() type guard:
//   isCategory(value: string | undefined): value is Category
//   → Düğme tıklandığında dataset.category'nin Category olup olmadığını doğrular
//
// quizbox/engine.ts — QuizEngine geneli:
//   ✅ any kullanılmıyor — tüm tipler açık
//   ✅ QuizEvent discriminated union — boolean flag yerine
//   ✅ getCurrentQuestion() → Question | null — null güvenli
//   ✅ takeRandom<T>() — any[] yerine generic


// ─── Kendi Projen: Güvenli JSON Ayrıştırıcı ──────────────────────────────
// Dış API'den gelen verinin tip güvenli olup olmadığını kontrol et.

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

function isApiUser(obj: unknown): obj is ApiUser {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as ApiUser).id === "number" &&
    typeof (obj as ApiUser).name === "string" &&
    typeof (obj as ApiUser).email === "string"
  );
}

function parseApiResponse(json: string): ApiUser {
  const parsed: unknown = JSON.parse(json);
  if (isApiUser(parsed)) {
    return parsed; // TypeScript bilir: ApiUser
  }
  throw new Error("API yanıtı beklenen formatta değil");
}

// Test
const validJson   = '{"id": 1, "name": "Ayşe", "email": "ayse@test.com"}';
const invalidJson = '{"id": "abc", "name": 42}';

console.log(parseApiResponse(validJson)); // { id: 1, name: 'Ayşe', ... }
// parseApiResponse(invalidJson); // Error: API yanıtı beklenen formatta değil
