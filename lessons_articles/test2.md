// 📘 Übersicht: Skalierbare Frontend-Architektur-Patterns in React/Next.js

## 🧭 Ziel

Dieses Dokument fasst zentrale Architekturkonzepte zusammen, wie sie in großen React/Next.js-Projekten und Enterprise-Umgebungen genutzt werden. Es liefert theoretische Grundlagen und praktische Beispiele zur Umsetzung skalierbarer, wartbarer und testbarer Frontend-Architekturen.

---

## 1. 📁 Feature-Folder Architecture

### 🧠 Theorie

Die Feature-Folder-Architektur verfolgt das Prinzip der **funktionalen Kapselung**. Dabei wird der gesamte Code, der zu einem bestimmten Feature gehört (UI, Logic, Daten), in einem eigenen Ordner strukturiert.

Statt `components/`, `hooks/` etc. global zu organisieren, lebt alles in:

```txt
features/
 └── books/
     ├── views/
     ├── components/
     ├── containers/
     ├── hooks/
     ├── models/
     ├── services/
     └── factories/
```

### ✅ Vorteile

- Hohe **Modularität** und **Isolierung**
- Teams können **parallel an Features arbeiten**
- Einfacheres **Refactoring und Testing**

### 📦 Beispiel

```tsx
features / books / hooks / useBooks.ts;
features / books / components / BookItem.tsx;
```

---

## 2. 🎯 Higher-Order Components (HOC)

### 🧠 Theorie

Ein HOC ist eine **Funktion, die eine Komponente entgegennimmt und eine neue Komponente zurückgibt** – mit zusätzlicher Funktionalität.

```tsx
const withLoading = (Component) => (props) =>
  props.isLoading ? <Spinner /> : <Component {...props} />;
```

### Anwendungsfälle

- Ladeindikatoren (`withLoading`)
- Berechtigungen (`withAuth`)
- Logging / Metriken
- Feature Flags

### 📘 Tipp

HOCs eignen sich besonders für **Cross-Cutting Concerns**, die man **unabhängig vom Feature** implementieren möchte.

---

## 3. 🧩 MVC & MVVM im Frontend

### 🧠 Theorie

- **MVC (Model-View-Controller)**: Entkoppelt Datenlogik (Model), Steuerung (Controller) und Darstellung (View).
- **MVVM (Model-View-ViewModel)**: In React besser geeignet – „ViewModel“ = Container-Komponente mit Hooks.

### Beispielstruktur

```txt
features/books/
├── models/book.ts     // Model
├── views/BookList.tsx // View
├── containers/BookListContainer.tsx // ViewModel
```

### ✅ Vorteile

- Clean Code durch klare Trennung
- Bessere Testbarkeit (Mock ViewModel)
- Vermeidung von „Fat Components“

---

## 4. ⚙️ Hook-based ViewModels

### 🧠 Theorie

ViewModels können auch als Hooks umgesetzt werden. Das ViewModel aggregiert Zustand, API-Calls und View-spezifische Logik in einem Hook:

```tsx
function useBookListViewModel() {
  const { data, isLoading } = useBooks();
  const handleSelect = (id: string) => ...
  return { books: data ?? [], isLoading, handleSelect };
}
```

Verwendung:

```tsx
const { books, isLoading } = useBookListViewModel();
```

---

## 5. 🧱 Container/Presenter Pattern

### 🧠 Theorie

- **Container**: verwaltet Zustand & Geschäftslogik
- **Presenter**: rein visuelle Komponente mit Props

### Motivation

- Presenter kann **einfach getestet** werden
- Container kapselt **Komplexität**

```tsx
// Container
const UserContainer = () => {
  const user = useUser();
  return <UserProfile name={user.name} />;
};
```

---

## 6. 📦 Shared Layer (components, hooks, utils)

### 🧠 Theorie

Alles, was **mehrfach** in verschiedenen Features benötigt wird, kommt in `shared/`. Wichtig: Nur generisch halten!

```txt
shared/
├── components/UiButton.tsx
├── hooks/useDebounce.ts
├── utils/formatDate.ts
```

### ⚠️ Anti-Pattern

- Kein Wildwuchs! → Unterordner wie `form/`, `layout/`, `feedback/`
- Ab 50+ Komponenten: Design-System auslagern (`@company/ui`)

---

## 7. 🎨 Design System Layer

### 🧠 Theorie

Ein Design System definiert UI-Regeln, Komponenten und Style Tokens **zentral**. In großen Firmen oft als eigenes Paket (`@org/ui`):

```txt
packages/
 └── ui/
     ├── Button.tsx
     ├── Theme.ts
     └── Tokens.ts
```

Vorteil: Versionierbar, unabhängig testbar, wiederverwendbar in Web & Mobile

---

## 8. 🏗️ Domain-Layer (Entities)

### 🧠 Theorie

Statt businesslogische Modelle in `features/` zu verstreuen, kommt Domain-Logik in `entities/`.

```txt
entities/book/
├── book.model.ts
├── book.schema.ts
├── book.mapper.ts
```

### Vorteil

- Guter Ort für Validierung (Zod), Transformation (Factories)
- Entspricht dem „Domain Driven Design“-Gedanken

---

## 9. 🧬 Microfrontend-Struktur

### 🧠 Theorie

Große Firmen (Amazon, Meta) betreiben Frontends als **isolierte Features pro Team**, häufig in Monorepos oder getrennt deploybar.

```txt
features/
 ├── auth/      ← Team Auth
 ├── search/    ← Team Search
 └── account/   ← Team Account
```

- Skalierbar
- Code-Ownership
- Independently testable & deployable

---

## 10. 📈 shared/components skalierbar halten

### 🧠 Theorie

`shared/components/` wird sonst schnell unwartbar:

**Empfehlung:**

- Split in `form/`, `layout/`, `feedback/`
- Naming: `UiButton`, `FormInput`, `FeedbackAlert`
- Optional: `@design-system`-Paket als Auslagerung

---

## ✅ Fazit

Diese Architekturprinzipien bilden das Fundament für:

- 🧩 Modularisierung
- 🔁 Wiederverwendung
- 📈 Skalierung über Teams
- 🧪 Testbarkeit

Sie werden in ähnlicher Form von Firmen wie **Meta, Google, Amazon** verwendet – intern mit CI/CD, Team-Strukturen, Design-Systemen, Layern und Ownership-Modellen.

> Nutze Feature-Folder + ViewModel-Hooks + Shared Layer + Design System für maximal wartbare Codebasen in Next.js.
