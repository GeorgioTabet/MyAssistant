import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ItemRow } from '@/components/item-row';
import { LAYERS, type LayerId } from '@/constants/layers';
import { Colors, Spacing, Type } from '@/constants/theme';
import { sampleItemsForLayer } from '@/lib/sample-items';

const c = Colors.dark;

export default function LayerDetailScreen() {
  const params = useLocalSearchParams<{ layer: string }>();
  const layer = LAYERS[params.layer as LayerId];
  const items = layer ? sampleItemsForLayer(layer.id) : [];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: layer?.label ?? 'Layer' }} />
      {layer ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemRow item={item} />}
          ListHeaderComponent={<Text style={styles.description}>{layer.description}</Text>}
          ListEmptyComponent={<Text style={styles.empty}>Nothing here yet.</Text>}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.empty}>Unknown layer.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.background,
    paddingHorizontal: Spacing.lg,
  },
  list: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  description: {
    ...Type.caption,
    color: c.textMuted,
    marginBottom: Spacing.xs,
  },
  empty: {
    ...Type.body,
    color: c.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
