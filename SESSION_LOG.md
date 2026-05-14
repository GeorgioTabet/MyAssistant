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
