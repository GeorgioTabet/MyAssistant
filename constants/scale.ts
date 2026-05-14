/**
 * Numeric design scales — spacing and corner radius.
 *
 * Dependency-free (like `constants/palette.ts`) so it can be shared by both
 * `constants/theme.ts` and `tailwind.config.ts`. One source of truth.
 */

/** Spacing scale (px). Maps to Tailwind classes: p-xs, gap-md, etc. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

/** Corner radius scale (px). Maps to Tailwind classes: rounded-sm, rounded-pill. */
export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 9999,
} as const;
