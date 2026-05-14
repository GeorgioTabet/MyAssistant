import { Text, TouchableOpacity } from 'react-native';

import { ArcRing } from '@/components/arc-ring';
import type { Layer } from '@/constants/layers';
import { Type } from '@/constants/theme';

/** One layer shown as a ring gauge: count in the centre, share of all items
 *  as the fill. Used in the Layers grid; tapping drills into the layer. */
export function LayerRingCard({
  layer,
  count,
  total,
  onPress,
}: {
  layer: Layer;
  count: number;
  total: number;
  onPress: () => void;
}) {
  const fraction = total > 0 ? count / total : 0;

  return (
    <TouchableOpacity
      className="flex-1 items-center gap-sm rounded-md border border-border bg-surface py-lg"
      onPress={onPress}
      activeOpacity={0.85}>
      <ArcRing segments={[{ color: layer.color, fraction }]} size={120} strokeWidth={12}>
        <Text className="text-text" style={Type.heading}>
          {count}
        </Text>
      </ArcRing>
      <Text className="text-text" style={Type.bodyMedium}>
        {layer.label}
      </Text>
      <Text className="text-muted" style={Type.caption}>
        {total > 0 ? `${Math.round(fraction * 100)}% of all` : 'No items yet'}
      </Text>
    </TouchableOpacity>
  );
}
