# Session Log

A running log of work sessions. Newest entries appended at the bottom.

---

## 2026-05-14

Pivoted to the four-layer concept (Work/Health/People/Finance); built the
foundation UI shell on `feature/foundation`. Navigation reworked to
Home/Layers/Settings — Home has the capture input + recent feed, Layers drills
into per-layer detail screens. Sample data only, no AI or database yet.
- Created: `constants/layers.ts`, `lib/sample-items.ts`, `lib/time.ts`, the
  capture-input/item-row/layer-card components, and the layers + layer-detail screens.
- Modified: `theme.ts` (layer tokens), root + tabs `_layout`, Home screen,
  `icon-symbol`. Removed the old chat/tasks/notes screens + `placeholder-screen`.
- Status: bundles, typechecks, and lints clean. NOT merged to `main` yet — awaiting device verification.
- Next: test on device (`npx expo start -c`), merge to `main`, then decide on
  NativeWind + start AI classification and `expo-sqlite`.

---

## 2026-05-14 — NativeWind setup

Set up NativeWind and migrated the whole UI to Tailwind `className` on branch
`feature/nativewind`. Foundation was verified and merged to `main` first.
- Installed `nativewind` + `tailwindcss`; added `babel.config.js`,
  `metro.config.js`, `tailwind.config.ts`, `global.css`, `nativewind-env.d.ts`.
- Created `constants/palette.ts` + `constants/scale.ts` as dependency-free
  token sources shared by `theme.ts` and the Tailwind config.
- Migrated all components + screens from `StyleSheet` to `className`; typography
  still uses `Type` style objects.
- Status: bundles, typechecks, and lints clean. NOT merged to `main` yet — awaiting device verification.
- Next: test on device (`npx expo start -c`), merge to `main`, then start
  `feature/persistence` — `expo-sqlite` in `lib/db/`.
