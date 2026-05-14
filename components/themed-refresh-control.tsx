import { RefreshControl } from 'react-native';

import { Colors } from '@/constants/theme';

const c = Colors.dark;

/**
 * A RefreshControl themed for the dark UI. Reloading from SQLite is
 * synchronous and instant, so `refreshing` stays false — the pull gesture is
 * the affordance, and `onRefresh` updates the data immediately on release.
 */
export function ThemedRefreshControl({ onRefresh }: { onRefresh: () => void }) {
  return (
    <RefreshControl
      refreshing={false}
      onRefresh={onRefresh}
      tintColor={c.textMuted}
      colors={[c.accent]}
      progressBackgroundColor={c.surface}
    />
  );
}
