import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { LayerCard } from '@/components/layer-card';
import { Screen } from '@/components/screen';
import { LAYER_LIST, type LayerId } from '@/constants/layers';
import { Type } from '@/constants/theme';
import { countItemsByLayer } from '@/lib/db/items';

export default function LayersScreen() {
  const router = useRouter();
  const [counts, setCounts] = useState<Record<LayerId, number>>({
    work: 0,
    health: 0,
    people: 0,
    finance: 0,
  });

  // Refresh the per-layer counts each time the screen comes into focus.
  useFocusEffect(
    useCallback(() => {
      const next = {} as Record<LayerId, number>;
      for (const layer of LAYER_LIST) {
        next[layer.id] = countItemsByLayer(layer.id);
      }
      setCounts(next);
    }, [])
  );

  return (
    <Screen title="Layers">
      <ScrollView contentContainerClassName="gap-sm pb-xl" showsVerticalScrollIndicator={false}>
        <Text className="mb-xs text-muted" style={Type.caption}>
          Everything you capture is sorted into one of these four layers.
        </Text>
        {LAYER_LIST.map((layer) => (
          <LayerCard
            key={layer.id}
            layer={layer}
            count={counts[layer.id]}
            onPress={() =>
              router.push({ pathname: '/layer/[layer]', params: { layer: layer.id } })
            }
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
