/**
 * Design system for MyAssistant.
 * Dark-first palette — see DESIGN.md in the repo root for the full rationale,
 * typography scale, spacing, and usage notes.
 *
 * The app currently ships dark-only: `light` and `dark` hold the same values,
 * so it looks consistent regardless of the device setting. When a true light
 * theme is added later, only the `light` block needs to change.
 */

import { Platform } from 'react-native';

import { palette } from '@/constants/palette';
import { radius, spacing } from '@/constants/scale';

const theme = {
  text: palette.text,
  background: palette.bg,
  surface: palette.surface,
  textMuted: palette.textMuted,
  hint: palette.hint,
  tint: palette.accent,
  accent: palette.accent,
  accentText: palette.accentText,
  destructive: palette.destructive,
  border: palette.border,
  icon: palette.textMuted,
  tabIconDefault: palette.textMuted,
  tabIconSelected: palette.accent,
  // Layer accent colors
  work: palette.work,
  health: palette.health,
  people: palette.people,
  finance: palette.finance,
};

export const Colors = {
  light: theme,
  dark: theme,
};

/**
 * Spacing and radius scales — re-exported from `constants/scale.ts`, which is
 * also consumed by `tailwind.config.ts`. Prefer Tailwind classes (`p-lg`,
 * `rounded-md`) in components; use these objects for JS-only style props
 * (e.g. navigator options).
 */
export const Spacing = spacing;
export const Radius = radius;

/** Type scale — size paired with its intended line height and weight. */
export const Type = {
  title: { fontSize: 26, lineHeight: 32, fontWeight: '600' as const },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
  bodyMedium: { fontSize: 16, lineHeight: 22, fontWeight: '500' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' as const },
  small: { fontSize: 11, lineHeight: 14, fontWeight: '500' as const },
};

/**
 * System font — San Francisco on iOS, Roboto on Android. No setup, no load
 * time, always native. Use these family names only when you need a specific
 * variant; otherwise the platform default is already the system font.
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
