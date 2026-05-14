# Build Log — MyAssistant

A plain-language journal of everything done on this app, in order. If you've
been away from the project for a while, read this top to bottom and you'll know
where things stand and why.

**What the app is:** a personal assistant app for iPhone and Android, built with
React Native + Expo. Solo build, developed on Windows. The roadmap lives in
`checklist.html` (in the parent `Side Project` folder) — phases P0 through P6.

**How to read this file:** each section is a work session, newest at the bottom.
"Why" matters as much as "what" — that's the part that's hard to reconstruct later.

---

## Session 1 — Project setup & GitHub (2026-05-14)

**Roadmap: P0 and P1 — done before this log started.**

- **P0 (Get ready to build):** installed all the tools and created all the
  accounts — Node.js, Git, VS Code, Claude Code, Expo CLI, Expo Go on the phone,
  plus Apple Developer, Google Play, Anthropic, and GitHub accounts.
- **P1 (Create the project):** ran `npx create-expo-app MyAssistant`, opened it
  in VS Code, started the dev server, and confirmed the app loads on the phone
  through Expo Go.

**GitHub connection (P1 final step):**

- The project was committed locally but not yet on GitHub.
- Connected the local repo to `https://github.com/GeorgioTabet/MyAssistant.git`
  and pushed.
- **Snag:** the code first landed on a branch called `master`, but GitHub had
  already auto-created a `main` branch with an empty starter commit. Two
  branches, two unrelated histories.
- **Fix:** renamed the local branch to `main`, force-pushed the real code over
  the empty `main`, and deleted `master`. The repo now has a single `main`
  branch — that's the one to always work on.
- **Note:** `API_Key.txt` (in the parent `Side Project` folder) is deliberately
  NOT in the repo. It holds a secret and must never be committed to GitHub.

---

## Session 2 — Design baseline (2026-05-14)

**Goal:** lock in colors and fonts before building any screens, so the look is
consistent and decisions aren't remade on every screen.

**Decisions made:**

- **Palette:** dark-first (dark background, light text). The app currently ships
  dark-only.
  - Background `#0F0F10`, Surface/cards `#1A1A1C`
  - Text `#F0EEE9`, Secondary text `#8A8A8E`
  - Accent (the one highlight color) `#6B6BF0` — a muted indigo
  - Destructive (delete/errors) `#E05555`
- **Font:** the system font (San Francisco on iPhone, Roboto on Android). No
  setup, no load time, always looks native — the right choice for a solo build.

**Files created / changed:**

- `constants/theme.ts` — the design system **in code**. Screens import colors,
  spacing, corner radius, and text sizes from here instead of hardcoding values.
  Replaced the generic starter theme that came with Expo.
- `DESIGN.md` — the same design system **in plain English**: a reference table
  of every color, the type scale, spacing rules. If `theme.ts` and `DESIGN.md`
  ever disagree, update both.

---

## Session 3 — App UI: tabs and screens (2026-05-14)

**Roadmap: start of P2 (Build the AI chat).** Goal of this session was to build
the visual shell of the whole app — the navigation and all the screens — so
there's something real to look at and click through. No AI connection yet; that
is the next step.

**Navigation — a 5-tab bar** (`app/(tabs)/_layout.tsx`). The five tabs map
directly onto the roadmap so navigation never has to be restructured later:

| Tab      | What it's for                          | Built this session?        |
| -------- | --------------------------------------- | -------------------------- |
| Today    | Daily dashboard (roadmap P5)            | Placeholder screen         |
| Chat     | The AI chat (roadmap P2)                | **Full UI built**          |
| Tasks    | Tasks & reminders (roadmap P3)          | Placeholder screen         |
| Notes    | Notes & voice (roadmap P4)              | Placeholder screen         |
| Settings | Where the Anthropic API key is entered  | Built (UI only)            |

**Why build all five tabs now** instead of just Chat: the navigation shell is
cheap to set up once, and the Settings screen is actually needed for P2 — the
API key has to live somewhere. The four not-yet-built tabs show a simple
"coming in Phase X" placeholder so the app explains itself while in progress.

**Screens built:**

- **Chat** (`app/(tabs)/chat.tsx`) — the real focus. A scrolling message list
  with chat bubbles (your messages right-aligned in indigo, the assistant's
  left-aligned in gray) and a text input bar pinned to the bottom with a send
  button. It's seeded with a few example messages so it looks real. Sending a
  message currently just adds it to the list and shows a canned "placeholder
  reply" — there's no real AI yet. That's the next checklist step.
- **Settings** (`app/(tabs)/settings.tsx`) — a field to paste the Anthropic API
  key (with a Show/Hide toggle), a Save button, and an About section. The Save
  button doesn't store anything yet — securely saving the key is part of the
  upcoming "connect to the API" step.
- **Today / Tasks / Notes** — placeholder screens, each naming the phase it's
  waiting on.

**Shared building blocks created:**

- `components/screen.tsx` — a standard screen wrapper (dark background, safe
  spacing around notches/edges, optional title). Every screen uses this so they
  all look consistent.
- `components/placeholder-screen.tsx` — the "coming soon" content used by the
  three not-yet-built tabs.

**Cleanup:** Expo's starter template came with demo files (an "Explore" tab, a
modal, and several demo components). All of them were deleted since the app now
has its own real screens. Icon mappings for the new tab icons were added to
`components/ui/icon-symbol.tsx`.

**Checks:** TypeScript type-check and the linter both pass clean.

**Next step (P2 continues):** connect the Chat screen to the Anthropic API so
messages get real replies — the API key coming from the Settings screen.
