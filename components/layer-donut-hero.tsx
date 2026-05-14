import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { ArcRing } from '@/components/arc-ring';
import { LAYER_LIST } from '@/constants/layers';
import { palette } from '@/constants/palette';
import { Type } from '@/constants/theme';
import type { Item } from '@/lib/db/items';

/**
 * The Home hero: a segmented donut showing how all captured items are split
 * across the four layers, with the total in the centre and a colour legend.
 */
export function LayerDonutHero({ items }: { items: Item[] }) {
  const total = items.length;
  const counts = LAYER_LIST.map((layer) => ({
    layer,
    count: items.filter((item) => item.layer === layer.id).length,
  }));
  const segments = counts.map(({ layer, count }) => ({
    color: layer.color,
    fraction: total > 0 ? count / total : 0,
  }));

  return (
    <View className="items-center overflow-hidden rounded-md border border-border bg-surface py-xl">
      <LinearGradient
        colors={[`${palette.accent}24`, 'transparent']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 150 }}
      />
      <ArcRing segments={segments} size={210} strokeWidth={20}>
        <View className="items-center">
          <Text className="text-text" style={Type.display}>
            {total}
          </Text>
          <Text className="text-muted tracking-[1px]" style={Type.small}>
            CAPTURED
          </Text>
        </View>
      </ArcRing>
      <View className="mt-lg w-full flex-row flex-wrap justify-center gap-md px-lg">
        {counts.map(({ layer, count }) => (
          <View key={layer.id} className="flex-row items-center gap-xs">
            <View
              className="h-2 w-2 rounded-pill"
              style={{ backgroundColor: layer.color }}
            />
            <Text className="text-muted" style={Type.caption}>
              {layer.label} {count}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
