import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

import { ItemRow } from '@/components/item-row';
import { LAYERS, type LayerId } from '@/constants/layers';
import { Type } from '@/constants/theme';
import { sampleItemsForLayer } from '@/lib/sample-items';

export default function LayerDetailScreen() {
  const params = useLocalSearchParams<{ layer: string }>();
  const layer = LAYERS[params.layer as LayerId];
  const items = layer ? sampleItemsForLayer(layer.id) : [];

  return (
    <View className="flex-1 bg-background px-lg">
      <Stack.Screen options={{ title: layer?.label ?? 'Layer' }} />
      {layer ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemRow item={item} />}
          ListHeaderComponent={
            <Text className="mb-xs text-muted" style={Type.caption}>
              {layer.description}
            </Text>
          }
          ListEmptyComponent={
            <Text className="mt-xxl text-center text-muted" style={Type.body}>
              Nothing here yet.
            </Text>
          }
          contentContainerClassName="gap-sm pt-md pb-xl"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="mt-xxl text-center text-muted" style={Type.body}>
          Unknown layer.
        </Text>
      )}
    </View>
  );
}
