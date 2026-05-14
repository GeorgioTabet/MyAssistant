import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { ItemRow } from '@/components/item-row';
import { LAYERS, type LayerId } from '@/constants/layers';
import { Type } from '@/constants/theme';
import { getItemsByLayer, type Item } from '@/lib/db/items';

export default function LayerDetailScreen() {
  const params = useLocalSearchParams<{ layer: string }>();
  const layer = LAYERS[params.layer as LayerId];
  const [items, setItems] = useState<Item[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (layer) setItems(getItemsByLayer(layer.id));
    }, [layer])
  );

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
