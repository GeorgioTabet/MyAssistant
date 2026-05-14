import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { LayerCard } from '@/components/layer-card';
import { Screen } from '@/components/screen';
import { LAYER_LIST } from '@/constants/layers';
import { Colors, Spacing, Type } from '@/constants/theme';
import { sampleItemsForLayer } from '@/lib/sample-items';

const c = Colors.dark;

export default function LayersScreen() {
  const router = useRouter();

  return (
    <Screen title="Layers">
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
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

const styles = StyleSheet.create({
  list: {
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  intro: {
    ...Type.caption,
    color: c.textMuted,
    marginBottom: Spacing.xs,
  },
});
