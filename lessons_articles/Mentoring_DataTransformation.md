# 📘 Data Transformation in Next.js & TypeScript

## 🎯 Ziel

Dieses Dokument zeigt Best Practices zur **Trennung von Backend-Modellen (Raw)** und **Frontend-Modellen (Domain Models)** in **Next.js**- und **TypeScript**-Projekten. Es erklärt Data-Transformation mit Factory-Funktionen, automatische Modell-Generierung via OpenAPI und tiefergehende Anwendungsszenarien für skalierbare Frontend-Architekturen.

---

## 🔄 Warum Data Transformation?

### 🔍 Problem:

APIs liefern Rohdaten (Strings, optionale Felder, Formate etc.), die im Frontend nicht ideal nutzbar sind.

### ✅ Lösung:

Trennung von:

- **Raw Models**: Entsprechen exakt der API-Spezifikation
- **Domain Models**: Angepasst für das Frontend (z. B. Date statt string, enums, Validierungen)
- **Factories**: Überführen `Raw → Domain` sauber und isoliert

---

## ⚙️ Beispielstruktur (Next.js mit TanStack Query – aktuelle Feature-Folder Variante)

```text
app/
  books/
    page.tsx
features/
  books/
    api/
      books.ts
      books.mock.ts
    hooks/
      useBooks.ts
      useBooksPagination.ts
      useBookFilters.ts
    components/
      Books/Books.tsx
      BookTable/BookTable.tsx
      BookItem/BookItem.tsx
      BookFilters/BookFilters.tsx
      BookLoading/BookLoading.tsx
      EmptyState/EmptyState.tsx
models/
  book/
    book.raw.ts
    book.ts
    book.factory.ts
config/
  mapper-registry.ts
```

Vorherige Struktur mit `services/` wurde entfernt; Logik ist jetzt pro Feature gekapselt (`features/books`).

### 1. Raw Models (`models/book/book.raw.ts`)
```ts
export interface BookRaw {
  isbn: string;
  title: string;
  published: string; // ISO String von der API
}
```

### 2. Domain Models (`models/book/book.ts`)
```ts
export interface Book {
  isbn: string;
  title: string;
  published: Date; // Bereits als Date transformiert
}
```

### 3. Factory (`models/book/book.factory.ts`)
```ts
import { Book } from './book';
import { BookRaw } from './book.raw';

export const bookFromRaw = (raw: BookRaw): Book => ({
  ...raw,
  published: new Date(raw.published),
});
```

### 4. API Call (`features/books/api/books.ts`)
```ts
import { BookRaw } from '@/models/book/book.raw';
import { getMockBooks } from './books.mock';

export async function fetchBooks({ page = 1, perPage = 6, title = '' }: { page?: number; perPage?: number; title?: string; }): Promise<BookRaw[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getMockBooks({ page, perPage, title })), 300);
  });
}
```

### 5. useQuery Hook (`features/books/hooks/useBooks.ts`)
```ts
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/books';
import { MapperRegistry } from '@/config/mapper-registry';
import { defaultErrorBook } from '@/models/book/book';

export function useBooks(params: { page: number; perPage: number; title?: string }) {
  return useQuery({
    queryKey: ['books', params],
    queryFn: async () => {
      const rawArray = await fetchBooks(params);
      if (!rawArray || rawArray.length === 0) return [];
      return rawArray.map((raw) => {
        try {
          return MapperRegistry.book(raw);
        } catch (e) {
          console.error('Invalid book data', e, raw);
          return defaultErrorBook;
        }
      });
    },
  });
}
```

### 6. Verwendung in einem Feature-Component (`features/books/components/Books/Books.tsx`)
```tsx
import { useBooks } from '../../hooks/useBooks';
import { useBooksPagination } from '../../hooks/useBooksPagination';
import { useBooksFilters } from '../../hooks/useBookFilters';

export default function Books() {
  const { page, nextPage, prevPage } = useBooksPagination();
  const elementsPerPage = 6;
  const { title, setTitle } = useBooksFilters();
  const { data: books, isLoading } = useBooks({ page, perPage: elementsPerPage, title });
  // ... Rendering
}
```

---

## 🛠️ Vorteile dieser Trennung

| Vorteil             | Beschreibung                                  |
| ------------------- | --------------------------------------------- |
| **Klarheit**        | Trennung von API und UI                       |
| **Typsicherheit**   | Nutzung von Date, enum etc.                   |
| **Flexibilität**    | API-Änderungen lassen sich leicht abfangen    |
| **Testbarkeit**     | Factories sind leicht testbar                 |
| **Erweiterbarkeit** | Einfache Validierung, Transformation, Mapping |

---

## 🔧 Automatische Generierung mit OpenAPI
```bash
openapi-generator-cli generate -i api.yaml -g typescript-fetch -o src/api
```

## 🚀 Erweiterte Patterns & Best Practices

### 1. Zentrale Mapping-Library (Mapper Registry)
```ts
export const MapperRegistry = {
  book: bookFromRaw,
};
```

### 2. Validation mit Zod
```ts
import { z } from 'zod';
const BookRawSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  published: z.string().datetime(),
});
export function parseBook(raw: unknown) {
  return BookRawSchema.parse(raw);
}
```

### 3. Reverse-Mapping (Domain → Raw)
```ts
export function toBookRaw(book: Book): BookRaw {
  return {
    isbn: book.isbn,
    title: book.title,
    published: book.published.toISOString(),
  };
}
```

### 4. Error Handling beim Mapping
```ts
try {
  const book = bookFromRaw(data);
} catch (e) {
  console.error('Invalid book data', e);
}
```

---

## 📚 Fazit
Die **Data-Transformation** zwischen Raw- und Domain-Modellen ist zentral für wartbare Frontends. Die Kapselung im Feature-Ordner (`features/books`) reduziert Kopplung und verbessert Testbarkeit.

### Best Practices (Kurzfassung)
- Transformation früh durchführen (Factory + Registry)
- Domain-Model nie direkt aus API-Response ableiten
- Feature-Folder kapselt UI + Data Hooks + API
- Zod für Validierung einsetzen, optional OpenAPI für Generierung

---

## 💡 Zusammenfassung
Mit einer klaren Trennung von **Raw** und **Domain Models**, Feature-Kapselung und Mapping-Strategien baust du eine robuste, skalierbare Codebasis.
