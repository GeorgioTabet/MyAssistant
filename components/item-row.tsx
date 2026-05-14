import { StyleSheet, Text, View } from 'react-native';

import { LAYERS } from '@/constants/layers';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { Item } from '@/lib/sample-items';
import { relativeTime } from '@/lib/time';

const c = Colors.dark;

/** A single captured item in a feed — colour-coded by its layer. */
export function ItemRow({ item }: { item: Item }) {
  const layer = LAYERS[item.layer];
  return (
    <View style={styles.row}>
      <View style={[styles.bar, { backgroundColor: layer.color }]} />
      <View style={styles.content}>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.meta}>
          <Text style={[styles.layerLabel, { color: layer.color }]}>{layer.label}</Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.time}>{relativeTime(item.createdAt)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: c.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: c.border,
    overflow: 'hidden',
  },
  bar: {
    width: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
  },
  text: {
    ...Type.body,
    color: c.text,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  layerLabel: {
    ...Type.small,
  },
  separator: {
    ...Type.small,
    color: c.textMuted,
  },
  time: {
    ...Type.small,
    color: c.textMuted,
  },
});
