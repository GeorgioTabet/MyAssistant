import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';

const c = Colors.dark;

/**
 * Temporary content for tabs that aren't built yet. Each one names the
 * roadmap phase it's waiting on so the app is self-documenting while in
 * progress.
 */
export function PlaceholderScreen({
  title,
  icon,
  phase,
  description,
}: {
  title: string;
  icon: Parameters<typeof IconSymbol>[0]['name'];
  phase: string;
  description: string;
}) {
  return (
    <Screen title={title}>
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <IconSymbol name={icon} size={32} color={c.textMuted} />
        </View>
        <Text style={styles.phase}>{phase}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.lg,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  phase: {
    ...Type.small,
    color: c.accent,
    letterSpacing: 0.5,
  },
  description: {
    ...Type.body,
    color: c.textMuted,
    textAlign: 'center',
    maxWidth: 260,
  },
});
