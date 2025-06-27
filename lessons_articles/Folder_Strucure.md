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

## 2. 📦 Shared Layer (components, hooks, utils)

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

## 3. 🎨 Design System Layer

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

## 4. 🏗️ Domain-Layer (Entities)

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

## 5. 🧬 Microfrontend-Struktur

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

## 6. 📈 shared/components skalierbar halten

### 🧠 Theorie

`shared/components/` wird sonst schnell unwartbar:

**Empfehlung:**

- Split in `form/`, `layout/`, `feedback/`
- Naming: `UiButton`, `FormInput`, `FeedbackAlert`
- Optional: `@design-system`-Paket als Auslagerung

---

## 7. Gruppierung nach Dateitypen

### 🧠 Theorie
   Dieser grundlegende Ansatz gruppiert Dateien basierend auf ihrem Typ oder ihrer Funktion.

```plaintext
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── SignUpForm.tsx
    │   ├── Employees.tsx
    │   ├── PaymentForm.tsx
    │   └── Button.tsx
    ├── hooks/
    │   ├── usePayment.ts
    │   ├── useUpdateEmployee.ts
    │   ├── useEmployees.ts
    │   └── useAuth.tsx
    ├── lib/
    ├── services/
    ├── states/
    └── utils/
```
**Projektgröße**: Klein bis Mittel

**Vorteile:**
- Einfach und leicht verständlich.
- Gut geeignet für kleine Projekte oder Einsteiger.

**Nachteile:**
- Zusammengehörige Dateien (z.B. Komponenten und Hooks für dieselbe Funktion) sind verstreut.
- Schwieriger zu skalieren und zu warten in größeren Projekten.

---

## 8. Gruppierung nach Dateitypen und Features

Kombiniert sowohl die typbasierte als auch die featurebasierte Organisation für eine bessere Modularität.

```
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── auth/
    │   │   └── SignUpForm.tsx
    │   ├── payment/
    │   │   └── PaymentForm.tsx
    │   ├── common/
    │   │   └── Button.tsx
    │   └── employees/
    │       ├── EmployeeList.tsx
    │       └── EmployeeSummary.tsx
    ├── hooks/
    │   ├── auth/
    │   │   └── useAuth.ts
    │   ├── payment/
    │   │   └── usePayment.ts
    │   └── employees/
    │       ├── useEmployees.ts
    │       └── useUpdateEmployee.ts
    ├── lib/
    ├── services/
    ├── states/
    └── utils/

```

**Projektgröße:** Mittel bis Groß

**Vorteile:**
- Modularer Aufbau.
- Erleichtert das Auffinden zusammengehöriger Dateien für ein bestimmtes Feature.

**Nachteile:**
- Etwas komplexer.
- Trennt die verschiedenen Dateitypen dennoch voneinander.

## ✅ Fazit

Diese Architekturprinzipien bilden das Fundament für:

- 🧩 Modularisierung
- 🔁 Wiederverwendung
- 📈 Skalierung über Teams
- 🧪 Testbarkeit

Sie werden in ähnlicher Form von Firmen wie **Meta, Google, Amazon** verwendet – intern mit CI/CD, Team-Strukturen, Design-Systemen, Layern und Ownership-Modellen.

> Nutze Feature-Folder + ViewModel-Hooks + Shared Layer + Design System für maximal wartbare Codebasen in Next.js.
