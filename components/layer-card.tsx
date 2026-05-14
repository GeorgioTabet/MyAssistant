import { Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Layer } from '@/constants/layers';
import { Colors, Type } from '@/constants/theme';

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
    <TouchableOpacity
      className="flex-row items-center gap-md rounded-md border border-border bg-surface p-md"
      onPress={onPress}
      activeOpacity={0.85}>
      <View
        className="h-11 w-11 items-center justify-center rounded-sm"
        style={{ backgroundColor: `${layer.color}22` }}>
        <IconSymbol name={layer.icon} size={22} color={layer.color} />
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-text" style={Type.bodyMedium}>
          {layer.label}
        </Text>
        <Text className="text-muted" style={Type.caption}>
          {layer.description}
        </Text>
      </View>
      <View className="flex-row items-center gap-xs">
        <Text className="text-muted" style={Type.body}>
          {count}
        </Text>
        <IconSymbol name="chevron.right" size={18} color={c.textMuted} />
      </View>
    </TouchableOpacity>
  );
}
