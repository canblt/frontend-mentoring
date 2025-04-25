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

## ⚛️ Beispielstruktur (Next.js mit TanStack Query)

### 📁 Projektstruktur

```bazaar
├── api 
│ └── books.ts 
├── models 
│ └── book.ts 
├── factories 
│ └── book.factory.ts 
├── hooks 
│ └── useBooks.ts 
├── pages 
│ └── index.tsx
```

### 1. Raw + Domain Models (`models/book.ts`)
```ts
export interface BookRaw {
  isbn: string;
  title: string;
  published: string;
}

export interface Book {
  isbn: string;
  title: string;
  published: Date;
}
```

### 2. Factory (`factories/book.factory.ts`)
```ts
import { BookRaw, Book } from '../models/book';

export const bookFromRaw = (raw: BookRaw): Book => ({
  ...raw,
  published: new Date(raw.published),
});

```
### 3. API Call(`api/books.ts`)
```ts
import { BookRaw } from '../models/book';

export async function fetchBooks(): Promise<BookRaw[]> {
  const res = await fetch('/api/books');
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}
```

### 4. Ausgelagerte useQuery-Logik (`hooks/useBooks.ts`)
```ts
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/books';
import { bookFromRaw } from '../factories/book.factory';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    select: (raw) => raw.map(bookFromRaw),
  });
}
```

### 5. Verwendung der ausgelagerten Query in der Page (`pages/index.tsx`)

```ts
import { useBooks } from '../hooks/useBooks';

export default function BookList() {
  const { data, isLoading } = useBooks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map(book => (
        <li key={book.isbn}>{book.title} ({book.published.getFullYear()})</li>
      ))}
    </ul>
  );
}
```
## 🛠 Vorteile dieser Trennung

| Vorteil        | Beschreibung                                        |
|----------------|-----------------------------------------------------|
| **Klarheit**   | Trennung von API und UI                            |
| **Typsicherheit** | Nutzung von Date, enum etc.                      |
| **Flexibilität** | API-Änderungen lassen sich leicht abfangen       |
| **Testbarkeit** | Factories sind leicht testbar                     |
| **Erweiterbarkeit** | Einfache Validierung, Transformation, Mapping |

## 🔧 Automatische Generierung mit OpenAPI

### Tool: [openapi-generator](https://openapi-generator.tech/)
Mit OpenAPI-Generator kannst du automatisch TypeScript-API-Client-Klassen aus einer OpenAPI-Spezifikation generieren. Diese Klassen sind vollständig typisiert und ermöglichen dir eine sichere und schnelle Kommunikation mit deinem Backend.

```bash
openapi-generator-cli generate -i api.yaml -g typescript-fetch -o src/api
```

## 🚀 Erweiterte Patterns & Best Practices

### 1. Zentrale Mapping-Library (Mapper Registry)

In großen Projekten kann es sinnvoll sein, alle Mappings in einer zentralen Registry zu verwalten. So kannst du sicherstellen, dass alle Entitäten auf die gleiche Weise umgewandelt werden.

```ts
export const MapperRegistry = {
  book: bookFromRaw,
  // andere Entitäten...
};
```

### 2. Validation mit Zod

Zod ist eine Bibliothek zur Schema-Validierung, die direkt mit TypeScript arbeitet. Mit Zod kann das Backend-Modell  validieren, bevor es weiterverarbeitet wird.

```ts
import { z } from 'zod';

const BookRawSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  published: z.string().datetime(),
});

function parseBook(raw: unknown): BookRaw {
  return BookRawSchema.parse(raw);
}
```

### 3. Reverse-Mapping (Domain → Raw)

Beim zurücksenden von Daten an das Backend kann das das Domain-Modell zurück zum Raw-Modell konvertiert werden durch die Reverse function in dem fall die toBookRaw

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

Fehler im Mapping-Prozess können auftreten, wenn die Daten nicht dem erwarteten Format entsprechen. In diesem Fall ist es hilfreich, Fehler zu behandeln und sinnvoll zu protokollieren. Oft der Fall wenn das Backend eine andere Version hat und nicht mit dem Frotend zusammen entwickelt wird.

```ts
try {
  const book = bookFromRaw(data);
} catch (e) {
  console.error("Invalid book data", e);
}
```

## 📚 Fazit

Die **Data-Transformation** zwischen Raw-Modellen (Backend) und Domain-Modellen (Frontend) ist ein entscheidendes Architektur-Muster für:

### 1. **Saubere Codebasis**
- Durch die klare Trennung von Backend-Daten (Raw) und Frontend-Daten (Domain) bleibt der Code übersichtlich und wartbar.
- beliebig viele Mappings und Transformationen können vorgenommen werden, ohne das gesamte System zu gefährden.

### 2. **Einfache Tests**
- **Factories** und **Mapping-Funktionen** sind sehr gut testbar. 
- Unit-Tests für Transformationen sind sehr einfach zu schreiben, da sie isoliert von der UI und vom Rest der Anwendung arbeiten.

### 3. **Gute Wartbarkeit in großen Codebases**
- Ein gut strukturiertes Mapping-System sorgt dafür, dass deine Anwendung auch in großen Projekten skalierbar bleibt.
- Änderungen am Backend-Datenmodell können ohne größere Auswirkungen auf das Frontend durchgeführt werden.

---

### 🔄 **Best Practices für React/Next.js in Kombination mit TanStack Query**

- **select:** Der `select`-Hook von TanStack Query bietet einen guten Einstiegspunkt, um Rohdaten bei Bedarf zu transformieren, bevor sie an die UI weitergegeben werden. Dies vereinfacht das Mapping und macht den Code flexibler.

### 🛠 **Tools & Bibliotheken für die Transformation**

1. **OpenAPI**:
   - Automatische Synchronisation mit dem Backend-Modell durch den Einsatz von OpenAPI-Generatoren, wodurch die Gefahr von Tippfehlern und Inkonsistenzen reduziert wird.
   
2. **Zod**:
   - Zod ist eine Validierungsbibliothek, die direkt mit TypeScript arbeitet. Sie ermöglicht dir, Daten zu validieren und sicherzustellen, dass sie dem gewünschten Format entsprechen, bevor sie im Frontend verwendet werden.

3. **Mapping-Registries**:
   - Eine zentrale Registry für das Mapping von Raw-Modellen zu Domain-Modellen sorgt für eine einfache Erweiterung und Wartbarkeit des Codes.

---

### 💡 **Zusammenfassung**
In TypeScript-Frontends ist die Trennung von **Raw** und **Domain Models** nicht nur eine saubere Praxis, sondern auch ein wesentlicher Bestandteil einer skalierbaren Architektur. In Kombination mit OpenAPI, Zod, TanStack Query und Mapping-Registries baust du eine robuste und wartbare Datenverarbeitungslogik auf, die selbst bei komplexen und dynamischen Datenquellen stabil bleibt.

