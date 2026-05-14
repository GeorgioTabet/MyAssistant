# MyAssistant — Design Baseline

The visual baseline for the app. This is the source of truth — the values here
are mirrored in [`constants/theme.ts`](constants/theme.ts), which is what the
code actually imports. If you change something, change it in both places.

The app is **dark-first**. It currently ships dark-only; a light theme can be
added later without touching any screens (only the `light` block in
`theme.ts` changes).

---

## Color palette

| Role            | Hex / value             | Used for                                      |
| --------------- | ----------------------- | --------------------------------------------- |
| Background      | `#0F0F10`               | App background — dark warm gray               |
| Surface         | `#1A1A1C`               | Cards, chat bubbles, input bar                |
| Text primary    | `#F0EEE9`               | Main text — warm off-white                    |
| Text secondary  | `#8A8A8E`               | Captions, secondary labels, icons             |
| Hint            | `#5C5C60`               | Placeholder text, disabled state              |
| Accent          | `#6B6BF0`               | Buttons, links, user's chat bubble            |
| Accent text     | `#FFFFFF`               | Text/icons sitting on the accent color        |
| Destructive     | `#E05555`               | Delete actions, errors                        |
| Border          | `rgba(255,255,255,0.08)`| Hairline dividers, card outlines              |

### Chat bubbles
- **User message** — background `#6B6BF0` (accent), text `#FFFFFF`, right-aligned.
- **Assistant message** — background `#1A1A1C` (surface), text `#F0EEE9`, left-aligned.

---

## Typography

**Font: system font** — San Francisco on iOS, Roboto on Android. No package, no
load time, always looks native. Don't add a custom font unless there's a real
reason to.

Type scale (`Type` in `theme.ts`):

| Name         | Size | Line height | Weight | Used for                       |
| ------------ | ---- | ----------- | ------ | ------------------------------ |
| `title`      | 26   | 32          | 600    | Screen titles                  |
| `heading`    | 20   | 26          | 600    | Section headers                |
| `body`       | 16   | 22          | 400    | Message text, body copy        |
| `bodyMedium` | 16   | 22          | 500    | Emphasized body, buttons       |
| `caption`    | 13   | 18          | 400    | Timestamps, helper text        |
| `small`      | 11   | 14          | 500    | Tags, tiny labels              |

---

## Spacing & shape

**Spacing scale** (`Spacing` in `theme.ts`) — use these, not arbitrary numbers:
`xs 4` · `sm 8` · `md 12` · `lg 16` · `xl 24` · `xxl 32`

**Corner radius** (`Radius` in `theme.ts`):
`sm 8` (inputs, small buttons) · `md 12` (cards) · `lg 18` (chat bubbles) ·
`pill 999` (fully rounded)

---

## Usage notes

- Import tokens from `@/constants/theme` — never hardcode hex values in screens.
- Default screen background is `background`; anything that should "lift" off it
  (cards, bubbles, the input bar) uses `surface`.
- One accent color only. If something needs to stand out, it's `accent` — resist
  adding a second highlight color.
- `destructive` is the only other "loud" color, and only for delete/error.
- Keep generous whitespace — lean on the `Spacing` scale.
