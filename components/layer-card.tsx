import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Layer } from '@/constants/layers';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';

const c = Colors.dark;

/** A tappable card for one layer, shown on the Layers screen. */
export function LayerCard({
  layer,
  count,
  onPress,
}: {
  layer: Layer;
  count: number;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.iconWrap, { backgroundColor: `${layer.color}22` }]}>
        <IconSymbol name={layer.icon} size={22} color={layer.color} />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>{layer.label}</Text>
        <Text style={styles.description}>{layer.description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.count}>{count}</Text>
        <IconSymbol name="chevron.right" size={18} color={c.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: c.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: c.border,
    padding: Spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...Type.bodyMedium,
    color: c.text,
  },
  description: {
    ...Type.caption,
    color: c.textMuted,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  count: {
    ...Type.body,
    color: c.textMuted,
  },
});
