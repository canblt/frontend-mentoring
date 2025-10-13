# Design System Overview

This document describes the design tokens, theming approach, and component conventions introduced to create a cohesive and scalable UI.

## 1. Design Tokens

Tokens live in `config/styles.ts` and are surfaced in the theme under `theme.custom`.

### Color Palette

- Base (pre-existing): semantic greens + neutrals.
- Extended neutrals: `midnight`, `charcoal`, `slate`, `steel`, `smoke`, `cloud`, `offWhite` provide a vertical neutral scale for both light & dark surfaces.
- Accents: `accentBlue`, `accentIndigo`, `accentPurple`, `accentPink`, `accentOrange` for controlled highlight usage.
- Feedback: `success`, `successBg`, `warning`, `warningBg`, `info`, `infoBg`, `red` (error).

### Typography

Defined in `config/theme.ts` with a structured hierarchy: h1–h3, body1/body2, button, caption, plus custom `errorText` variant.

### Spacing Scale (4px base)

`Spacing` enum: none, xxs(2), xs(4), sm(8), md(12), lg(16), xl(24), xxl(32), xxxl(48), fourxl(64).
Use `theme.spacing(n)` for linear 4px multiples or reference enum for semantic mapping.

### Radii

`Radii`: none, xs(2), sm(4), md(8), lg(12), xl(16), pill(9999), full(99999).

- Default shape radius: `md`.
- Elevated / interactive surfaces: usually `lg`.

### Shadows (Elevation)

Simplified set mapped into MUI's 25 shadow slots: `xs`, `sm`, `md`, `lg`, `xl`.
Use `theme.custom.shadows` for semantic reuse instead of raw box-shadow strings.

## 2. Theming Architecture

We use MUI v6 CSS variables system:

- `extendTheme({ colorSchemes: { light, dark } })` defines palettes.
- `CssVarsProvider` wraps the app in `app/layout.tsx` enabling runtime mode switching.
- Custom tokens are added under `theme.custom` for radii, spacing scale, shadows, and color groupings (`accents`, `feedback`).

### Color Schemes

Light mode: clean neutral background (`offWhite`, `white`) with dark text (`russianBlack`).
Dark mode: deep neutrals (`midnight`, `charcoal`) with soft contrast text (`offWhite`, `cloud`).
Accent colors are balanced for AA contrast on primary surfaces.

### Mode Switching

`ThemeModeToggle` uses `useColorScheme()` to switch between `light` and `dark`. Because of SSR, the component returns `null` until the initial color scheme is hydrated.

## 3. Components

### Buttons

Added custom variant: `variant="soft"` for a low-emphasis surface-filled style using palette `light`/`main` colors. Standard focus ring is enforced for accessibility.

### Cards / Surfaces

`MuiCard` & `MuiPaper` share consistent radii and remove default gradients. Elevation steps use the tokenized `shadows` set. Hover states (e.g., `TrendCard`) lift with motion (`translateY(-2px)`) and shadow escalation.

### TrendCard Refactor

- Adopted tokens for radius, spacing, shadows.
- Added interactive hover + focus-visible states.
- Dark mode aware via `theme.palette.mode`.

## 4. Accessibility & Interaction

- Focus outlines use the primary color for clear affordance.
- Reduced motion not yet implemented; could be added with `@media (prefers-reduced-motion)` wrappers.
- Minimum touch target maintained via spacing tokens and 32–40px hit areas (e.g., toggle, buttons).

## 5. Usage Guidelines

| Need                        | Use                                                                             |
| --------------------------- | ------------------------------------------------------------------------------- | ------- | ---- | ------- |
| Consistent spacing          | `theme.spacing(n)` or `Spacing.md` for semantic clarity                         |
| Rounded interactive element | `theme.custom.radii.md` or `lg` for higher prominence                           |
| Elevated container          | `theme.custom.shadows.sm` (default) escalating to `md` on hover                 |
| Accent highlight            | Pick from `theme.custom.colors.accents.*` sparingly (1 primary accent per view) |
| Status feedback             | `theme.custom.colors.feedback.{success                                          | warning | info | error}` |

## 6. Extending

To add a new token category (e.g., animation durations):

1. Add enum/object to `config/styles.ts`.
2. Augment `Theme` interface if exposing through `theme.custom`.
3. Reference through components; avoid hardcoded literals.

## 7. Roadmap Suggestions

- Add semantic typography scale (e.g., `display`, `subtitle` tokens).
- Introduce motion tokens for easing & duration.
- Build a reusable `Surface` component for consistent padding + elevation tiers.
- Add a visual regression Storybook / Chromatic setup for design QA.
- Implement reduced motion + high contrast modes.

## 8. Quick Example

```tsx
<Button
  variant="soft"
  color="primary"
  sx={{ borderRadius: (t) => t.custom.radii.lg }}
>
  Soft Action
</Button>
```

```tsx
<Box
  sx={{
    p: (t) => t.spacing(4),
    boxShadow: (t) => t.custom.shadows.sm,
    borderRadius: (t) => t.custom.radii.lg,
  }}
/>
```

---

This design system foundation supports scalable, accessible UI development with strong theming flexibility.
