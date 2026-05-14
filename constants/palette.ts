/**
 * Raw colour values — the single source of truth for the app's palette.
 *
 * Kept dependency-free (no react-native import) on purpose, so it can be
 * consumed by BOTH the TypeScript theme (`constants/theme.ts`) and the Tailwind
 * config (`tailwind.config.ts`). Change a colour here and it updates everywhere.
 */
export const palette = {
  bg: '#0F0F10', // app background — dark warm gray
  surface: '#1A1A1C', // cards, input bar — slightly lighter
  text: '#F0EEE9', // primary text — warm off-white
  textMuted: '#8A8A8E', // secondary text, captions, icons
  hint: '#5C5C60', // placeholder text, disabled
  accent: '#6B6BF0', // muted indigo — buttons, links (also the Work layer)
  accentText: '#FFFFFF', // text/icons sitting on an accent color
  destructive: '#E05555', // soft red — delete, errors
  border: 'rgba(255,255,255,0.08)', // hairline dividers, card outlines
  // Layer accent colours — one per active layer (see constants/layers.ts)
  work: '#6B6BF0',
  health: '#34C759',
  people: '#FF9F0A',
  finance: '#30D158',
} as const;
