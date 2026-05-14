# Project Structure — MyAssistant

A map of every folder and file, in plain language. This app is built with
**Expo + React Native**. The golden rule: you mostly only touch `app/`,
`components/`, `constants/`, `hooks/`, and `assets/`. Everything else is config
or machine-generated.

---

## Root config files — the project's settings

| File | What it is |
| --- | --- |
| `app.json` | Expo app config — app name, icon, splash screen, plugins, scheme. |
| `package.json` | The list of libraries the app uses, plus command shortcuts (`npm start`). |
| `package-lock.json` | Locks the exact version of every library. Auto-managed — don't edit. |
| `tsconfig.json` | TypeScript settings. Defines the `@/` alias (shorthand for the project root). |
| `eslint.config.js` | Code-quality linter rules. |
| `expo-env.d.ts` | Auto-generated Expo TypeScript types. Never edit. |
| `.gitignore` | Tells Git which files NOT to track. |
| `README.md` | Default Expo readme. |
| `DESIGN.md` | The design system in plain English (colors, fonts, spacing). |
| `BUILD_LOG.md` | Plain-language journal of every work session. |
| `STRUCTURE.md` | This file. |

## Auto-generated — never touch, not in Git

- `node_modules/` — the actual code of every installed library. Huge. Recreated by `npm install`.
- `.expo/` — Expo's local cache and temp files.
- `.git/` — Git's internal version-history database.
- `.vscode/` — editor settings (format-on-save, recommended extensions).

## `app/` — the screens (where most work happens)

Expo uses **file-based routing**: every file in `app/` automatically becomes a
screen. No manual route wiring.

- `_layout.tsx` — the root wrapper around the whole app. Sets the dark theme,
  status bar, and the top-level navigator.
- `(tabs)/` — a **route group**. The parentheses mean "group these screens
  together without adding a word to the URL." This group is the bottom tab bar.
  - `_layout.tsx` — defines the 5 tabs and their icons.
  - `index.tsx` — the **Today** screen (`index` always means "the default one").
  - `chat.tsx` — the **Chat** screen.
  - `tasks.tsx` — the **Tasks** screen.
  - `notes.tsx` — the **Notes** screen.
  - `settings.tsx` — the **Settings** screen.

## `components/` — reusable UI pieces (not full screens)

- `screen.tsx` — the standard screen wrapper (dark background, safe spacing, title).
- `placeholder-screen.tsx` — the "coming soon" content for tabs that aren't built yet.
- `haptic-tab.tsx` — a tab button that vibrates slightly when tapped (from the template).
- `ui/icon-symbol.tsx` — the icon component for Android and web (maps to Material Icons).
- `ui/icon-symbol.ios.tsx` — the iOS version (uses native SF Symbols). React
  Native automatically picks the `.ios` file on iPhone.

## `constants/` — fixed shared values

- `theme.ts` — the design system in code: colors, spacing, corner radius, type
  scale, fonts. Screens import from here instead of hardcoding values.

## `hooks/` — reusable bits of logic

- `use-color-scheme.ts` / `use-color-scheme.web.ts` — detect light/dark mode.
- `use-theme-color.ts` — pick the right color from the theme.

## `assets/` — static image files

- `images/` — the app icon, splash image, and some leftover React-logo demo
  images from the template (unused, can be cleaned up later).

## `scripts/`

- `reset-project.js` — a template helper to wipe back to a blank app. We won't use it.

---

## The 5 concepts that explain everything

1. **File-based routing** — add a file to `app/`, and it becomes a screen.
2. **`_layout.tsx`** — wraps the screens around it and defines navigation.
3. **`(parentheses)`** — a route group; organizes screens without affecting the URL.
4. **`index.tsx`** — the default screen of its folder.
5. **`.ios.tsx` / `.web.ts`** — platform-specific versions; React Native auto-picks
   the right one. `@/` in imports is shorthand for the project root.
