import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { LayerRingCard } from '@/components/layer-ring-card';
import { Screen } from '@/components/screen';
import { ThemedRefreshControl } from '@/components/themed-refresh-control';
import { LAYERS, LAYER_LIST, type LayerId } from '@/constants/layers';
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

  const reload = useCallback(() => {
    const next = {} as Record<LayerId, number>;
    for (const layer of LAYER_LIST) {
      next[layer.id] = countItemsByLayer(layer.id);
    }
    setCounts(next);
  }, []);

  // Refresh the per-layer counts each time the screen comes into focus.
  useFocusEffect(reload);

  const total = LAYER_LIST.reduce((sum, layer) => sum + counts[layer.id], 0);
  const open = (id: LayerId) =>
    router.push({ pathname: '/layer/[layer]', params: { layer: id } });

  return (
    <Screen title="Layers">
      <ScrollView
        contentContainerClassName="gap-sm pb-xl"
        showsVerticalScrollIndicator={false}
        refreshControl={<ThemedRefreshControl onRefresh={reload} />}>
        <Text className="mb-xs text-muted" style={Type.caption}>
          Everything you capture is sorted into one of these four layers.
        </Text>
        <View className="flex-row gap-sm">
          <LayerRingCard
            layer={LAYERS.work}
            count={counts.work}
            total={total}
            onPress={() => open('work')}
          />
          <LayerRingCard
            layer={LAYERS.health}
            count={counts.health}
            total={total}
            onPress={() => open('health')}
          />
        </View>
        <View className="flex-row gap-sm">
          <LayerRingCard
            layer={LAYERS.people}
            count={counts.people}
            total={total}
            onPress={() => open('people')}
          />
          <LayerRingCard
            layer={LAYERS.finance}
            count={counts.finance}
            total={total}
            onPress={() => open('finance')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
