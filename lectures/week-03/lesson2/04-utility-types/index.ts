// Utility types, var olan bir tipten yeni tipler üretmeyi sağlar.
// Kod tekrarı olmadan mevcut interface'leri dönüştürürsün.

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}


// ─── Partial<T> ───────────────────────────────────────────────────────────
// Tüm alanları opsiyonel yapar. Güncelleme işlemleri için idealdir.

function updateTask(id: number, updates: Partial<Task>): void {
  console.log(`${id} güncelleniyor:`, updates);
}

updateTask(1, { completed: true });       // sadece completed
updateTask(2, { title: "Yeni başlık" }); // sadece title


// ─── Required<T> ──────────────────────────────────────────────────────────
// Tüm opsiyonel alanları zorunlu yapar. Partial'ın tersidir.

interface DraftTask {
  title?: string;
  description?: string;
}

type CompleteTask = Required<DraftTask>;
// { title: string; description: string } — artık opsiyonel değil


// ─── Readonly<T> ──────────────────────────────────────────────────────────
// Tüm alanları değiştirilemez (readonly) yapar.

const frozenTask: Readonly<Task> = {
  id: 1,
  title: "TypeScript öğren",
  description: "Dersleri tamamla",
  completed: false,
  createdAt: new Date(),
};
// frozenTask.completed = true; // 🔴 hata — readonly


// ─── Pick<T, K> ───────────────────────────────────────────────────────────
// Sadece belirtilen alanları alır. Geri kalan alanlar yok olur.

type TaskPreview = Pick<Task, "id" | "title" | "completed">;

const preview: TaskPreview = { id: 1, title: "TypeScript öğren", completed: false };


// ─── Omit<T, K> ───────────────────────────────────────────────────────────
// Belirtilen alanları çıkarır. Geri kalan alanlar kalır.

type NewTask = Omit<Task, "id" | "createdAt">;

const newTask: NewTask = {
  title: "Generics çalış",
  description: "02-generics klasörünü bitir",
  completed: false,
};


// ─── Record<K, V> ─────────────────────────────────────────────────────────
// K tipindeki anahtarlar ile V tipindeki değerleri eşleştiren bir obje tipi.

type WeekDays = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
type WeeklyPlan = Record<WeekDays, Task[]>;

const plan: WeeklyPlan = {
  monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
};


// ─── Parameters<T> ve ReturnType<T> ──────────────────────────────────────
// Parameters: bir fonksiyonun parametre tiplerini tuple olarak çıkarır.
// ReturnType: bir fonksiyonun dönüş tipini çıkarır.

function createTask(title: string, description: string, priority: number) {
  return { title, description, priority };
}

type CreateTaskParams = Parameters<typeof createTask>; // [string, string, number]
type CreatedTask      = ReturnType<typeof createTask>;  // { title, description, priority }

// Kullanım: başka bir fonksiyon aynı parametreleri kabul eder
function createAndSave(...args: CreateTaskParams) {
  const task = createTask(...args);
  console.log("Kaydedildi:", task);
}


// ─── QuizBox'ta Bu Konu ────────────────────────────────────────────────────
// quizbox/types.ts — Question'dan türetilmiş tipler:
//   QuestionForPlayer = Omit<Question, "correctAnswer">  → doğru cevap gizli
//   QuestionSummary   = Pick<Question, "id" | "category" | "text">  → özet görünüm
//   QuestionDraft     = Partial<Question>  → henüz tamamlanmamış soru
//
// quizbox/types.ts — QuizResult içinde:
//   categoryBreakdown: Record<Category, { correct: number; total: number }>
//   → Her kategorinin puanını tutar. Record<K, V>'nin gerçek kullanımı.
//
// quizbox/engine.ts — createDraftQuestion():
//   createDraftQuestion(draft: QuestionDraft): QuestionDraft


// ─── Kendi Projen: Notlar Uygulaması Tip Sistemi ─────────────────────────
// Sadece Utility Types kullanarak bir not uygulamasının tip sistemini tasarla.
// UI yok — yalnızca tipler ve birkaç örnek değer.

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Yeni not oluştururken id ve tarihler otomatik gelir
type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

// Not güncellerken her şey opsiyonel
type UpdateNote = Partial<Omit<Note, "id" | "createdAt">>;

// Liste görünümü için özet
type NotePreview = Pick<Note, "id" | "title" | "tags">;

// Etiket bazlı gruplama
type NotesByTag = Record<string, NotePreview[]>;

const newNote: CreateNote = {
  title: "TypeScript Notları",
  content: "Utility types çok kullanışlı",
  tags: ["typescript", "öğrenme"],
};

console.log(newNote.title); // "TypeScript Notları"
