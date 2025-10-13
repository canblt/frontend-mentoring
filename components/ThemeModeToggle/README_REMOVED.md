The ThemeModeToggle component was removed as the application now operates exclusively in dark mode.

If you need to restore light mode support:

1. Re-introduce a toggle component calling useColorScheme().
2. Re-add a `light` colorScheme in `config/theme.ts`.
3. Place the toggle back into `components/Navigation/Navigation.tsx`.
