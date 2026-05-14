import type { Config } from 'tailwindcss';

import { palette } from './constants/palette';
import { radius, spacing } from './constants/scale';

const px = (n: number) => `${n}px`;

/**
 * Tailwind / NativeWind config. Colours come from `constants/palette.ts` and
 * the spacing/radius scales from `constants/scale.ts`, so there is one source
 * of truth shared with `constants/theme.ts`.
 */
const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: palette.bg,
        surface: palette.surface,
        text: palette.text,
        muted: palette.textMuted,
        hint: palette.hint,
        accent: palette.accent,
        'accent-text': palette.accentText,
        destructive: palette.destructive,
        border: palette.border,
        work: palette.work,
        health: palette.health,
        people: palette.people,
        finance: palette.finance,
      },
      spacing: {
        xs: px(spacing.xs),
        sm: px(spacing.sm),
        md: px(spacing.md),
        lg: px(spacing.lg),
        xl: px(spacing.xl),
        xxl: px(spacing.xxl),
      },
      borderRadius: {
        sm: px(radius.sm),
        md: px(radius.md),
        lg: px(radius.lg),
        pill: px(radius.pill),
      },
    },
  },
  plugins: [],
};

export default config;
