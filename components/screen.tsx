import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Type } from '@/constants/theme';

const c = Colors.dark;

/**
 * Standard screen wrapper: dark background, safe-area aware, with an optional
 * title header. Set `padded={false}` when the screen manages its own padding
 * (e.g. the Chat screen, which needs an edge-to-edge message list).
 */
export function Screen({
  title,
  children,
  padded = true,
}: {
  title?: string;
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {title ? (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}
      <View style={[styles.body, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Type.title,
    color: c.text,
  },
  body: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: Spacing.lg,
  },
});
