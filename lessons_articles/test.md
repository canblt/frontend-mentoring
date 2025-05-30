// 📘 Architektur-Patterns in Next.js & React: HOC, MVC, MVVM, Composition

## 🎯 Ziel

In diesem Dokument lernst du, wie man **strukturierte Frontend-Architekturen** mit **Next.js** und **React** aufbaut – inklusive **Higher-Order Components (HOC)**, **MVC**, **MVVM** und **Kompositionsmuster**.

Wir orientieren uns an Best Practices, wie sie in skalierbaren Angular-/React-Systemen, Design-System-Architekturen und Clean Code Ansätzen verwendet werden.

---

## 🔄 Warum Architekturmuster im Frontend?

### 🔍 Problem:

- Code wird unübersichtlich, wenn **Daten, UI-Logik und Präsentation vermischt** werden
- Features sind schwer testbar und kaum wiederverwendbar
- Es entstehen **technische Schulden** durch inkonsistente Patterns

### ✅ Lösung:

Verwendung von **bewährten Architekturkonzepten**, u. a.:

- **HOC (Higher-Order Components)**: Wiederverwendbare UI-Logik auslagern
- **MVC / MVVM**: Verantwortlichkeiten trennen (Model, View, Controller/ViewModel)
- **Kompositionsmuster**: Erweiterbare Komponentenlogik

---

## 🧱 Architekturübersicht

```txt
📁 features/books
├── views/               // Präsentation (View)
│   └── BookListView.tsx
├── containers/          // Controller oder ViewModel
│   └── BookListContainer.tsx
├── components/          // Kleinteilige UI-Komponenten
│   └── BookItem.tsx
├── hooks/               // Geschäftslogik / State
│   └── useBooks.ts
├── hoc/                 // HOCs zur Wiederverwendung
│   └── withLoading.tsx
├── models/              // Datenmodelle
│   └── book.ts
```

---

## 🔁 Higher-Order Components (HOC)

### 🧩 Idee:

Eine HOC ist eine **Funktion, die eine Komponente nimmt und erweitert**.

```ts
function withLoading<T>(Component: React.ComponentType<T>) {
  return function WrapperComponent(props: T & { isLoading: boolean }) {
    if (props.isLoading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
}
```

### ✅ Beispielanwendung

```ts
const BookListWithLoading = withLoading(BookListView);
<BookListWithLoading isLoading={true} books={[]} />
```

- Vorteil: Wiederverwendbare Logik für mehrere Komponenten (z. B. Fehler, Ladezustände, Logging, Feature Toggles)

---

## 📐 MVC/MVVM im React-Kontext

### MVC (Model - View - Controller)

- **Model**: API-Daten & Businesslogik (z. B. `useBooks`, `book.ts`)
- **View**: Präsentation (z. B. `BookListView.tsx`)
- **Controller**: Datenbindung & Steuerung (z. B. `BookListContainer.tsx`)

### MVVM (Model - View - ViewModel)

- Sehr ähnlich zu MVC – „ViewModel“ ersetzt „Controller“
- In React meist als **Container-Komponente** mit Hooks umgesetzt

### 🧠 Vorteile:

| Pattern  | Vorteile                                |
| -------- | --------------------------------------- |
| **MVC**  | Klare Trennung, testbar, erweiterbar    |
| **MVVM** | Besser für Hooks & React-Logik geeignet |

---

## 🧱 Beispiel: BookListView (View)

```tsx
// 📁 views/BookListView.tsx
import { Book } from '../models/book';
import BookItem from '../components/BookItem';

export default function BookListView({ books }: { books: Book[] }) {
  return (
    <ul>
      {books.map((book) => (
        <BookItem
          key={book.isbn}
          book={book}
        />
      ))}
    </ul>
  );
}
```

---

## ⚙️ BookListContainer (Controller/ViewModel)

```tsx
// 📁 containers/BookListContainer.tsx
import { useBooks } from '../hooks/useBooks';
import BookListView from '../views/BookListView';
import withLoading from '../hoc/withLoading';

const BookListWithLoading = withLoading(BookListView);

export default function BookListContainer() {
  const { data: books = [], isLoading } = useBooks();
  return (
    <BookListWithLoading
      books={books}
      isLoading={isLoading}
    />
  );
}
```

---

## 🧠 Erweiterungen mit weiteren HOCs

- `withErrorBoundary(Component)` – Wrapper für Fehleranzeige
- `withAuthorization(Component)` – Feature Toggles, Rollenprüfung
- `withTheme(Component)` – Styling Wrapper mit Theme

### Kombination:

```ts
export default withAuthorization(withLoading(BookListView));
```

---

## 🧩 Komposition vs. HOC

| Vergleich        | HOC                 | Composition      |
| ---------------- | ------------------- | ---------------- |
| Wiederverwendung | Sehr hoch           | Hoch             |
| Flexibilität     | Mittel              | Sehr hoch        |
| Lesbarkeit       | Kann komplex werden | Klarer mit Hooks |

```tsx
// Komposition als Alternative
function BookListWrapper() {
  const { data, isLoading } = useBooks();
  return isLoading ? <Loading /> : <BookListView books={data} />;
}
```

---

## ✅ Fazit

**Architektur-Patterns wie HOC, MVC oder MVVM** helfen dir:

- Verantwortung zu trennen
- Wiederverwendbaren, testbaren Code zu schreiben
- Skalierbarkeit durch Struktur zu ermöglichen

Nutze HOCs für Cross-Cutting Concerns (Loading, Logging, Permissions) und kombiniere sie mit Container-Komponenten für ein sauberes MVVM/MVC-Design.
