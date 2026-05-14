import { useRouter } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { LayerCard } from '@/components/layer-card';
import { Screen } from '@/components/screen';
import { LAYER_LIST } from '@/constants/layers';
import { Type } from '@/constants/theme';
import { sampleItemsForLayer } from '@/lib/sample-items';

export default function LayersScreen() {
  const router = useRouter();

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
            count={sampleItemsForLayer(layer.id).length}
            onPress={() =>
              router.push({ pathname: '/layer/[layer]', params: { layer: layer.id } })
            }
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
