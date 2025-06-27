# 🎯 React.js Design Patterns – Ein Überblick

In diesem Tutorial lernst du gängige Design Patterns in React.js kennen. Sie helfen dir dabei, skalierbare, wartbare und wiederverwendbare Komponenten zu bauen.

---

## 📚 Inhaltsverzeichnis

1. Higher-Order Components (HOC)
2. MVC & MVVM im Frontend
3. Hook-based ViewModels (Custom Hooks)
4. Container/Presenter Pattern
5. Compound Components

---

## 🧠 Einleitung

Design Patterns sind bewährte Lösungen für wiederkehrende Herausforderungen in der Softwareentwicklung. In React helfen sie, komplexe UIs sauber und modular aufzubauen.

---

## 1. 🎯 Higher-Order Components (HOC)

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
Somit kann man die Logik mehrfach verwenden, ohne Komponenten zu verändern.

---

## 2. 🧩 MVC & MVVM im Frontend

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

## 3. ⚙️ Hook-based ViewModels (Custom Hooks)

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

### ✅ Vorteile
- Trennen Logik von Darstellung für mehr Übersichtlichkeit
- Erleichtern Wiederverwendbarkeit und Testing
- Strukturieren komplexe Komponenten klar und konsistent

---

## 4. 🧱 Container/Presenter Pattern

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

## 5. 🧩 Compound Components
    Ziel: Mehrere zusammengehörige Komponenten, gesteuert über einen gemeinsamen Zustand.
```tsx
import { createContext, useContext, useState } from 'react';

const TabContext = createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div>{children}</div>;
}

function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  return (
    <button
      onClick={() => setActiveIndex(index)}
      style={{ fontWeight: activeIndex === index ? 'bold' : 'normal' }}
    >
      {children}
    </button>
  );
}

function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabContext);
  return activeIndex === index ? <div>{children}</div> : null;
}

```

### ✅ Vortiele:
Bessere API für komplexe UIs, ideal für Komponenten wie Tabs, Accordions, Dropdowns – bei denen mehrere Unterkomponenten zusammenarbeiten müssen.

### Nachteile:
Komplexere Implementierung und schwerer zu verstehen für Anfänger.
