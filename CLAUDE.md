# CLAUDE.md

Project rules for **MyAssistant**. These define how the project is built and
**must be followed in every session**.

## Stack

- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind
- expo-sqlite
- Anthropic Claude API (via `fetch`)
- expo-notifications
- expo-secure-store

## Rules

- **Never install a new library** without flagging it first and confirming
  there is no Expo built-in alternative.
- **Never hardcode API keys** — always use `expo-secure-store`.
- **All data is stored locally in SQLite** — no backend, no cloud.
- **Dark mode only** — no light mode.
- **One component per file.**
- **TypeScript strict mode** — never use `any`.
- **Functional components only.**

## File organization

- All screens in `app/`
- All reusable components in `components/`
- All database logic in `lib/db/`
- All AI logic in `lib/ai/`

## Design tokens

Always import from `constants/theme.ts` — **never hardcode these values**.

| Token | Hex |
| --- | --- |
| Background | `#0F0F10` |
| Surface | `#1A1A1C` |
| Text primary | `#F0EEE9` |
| Text muted | `#8A8A8E` |
| Accent / Work | `#6B6BF0` |
| Health | `#34C759` |
| People | `#FF9F0A` |
| Finance | `#30D158` |
| Destructive | `#E05555` |

## Product concept

The app has **four active layers** — Work, Health, People, Finance — each with
its own accent colour. A fifth backlog of layers exists but is not built yet.

**The core mechanic:** a single text input on the home screen. The user types
anything. The AI classifies it and routes it to the correct layer automatically.
