import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { CaptureInput } from '@/components/capture-input';
import { ItemRow } from '@/components/item-row';
import { Screen } from '@/components/screen';
import { LAYER_LIST, type LayerId } from '@/constants/layers';
import { Type } from '@/constants/theme';
import { addItem, getAllItems, type Item } from '@/lib/db/items';

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);

  // Reload from the database whenever the screen comes into focus, so the feed
  // reflects items added elsewhere (e.g. on a layer screen later).
  useFocusEffect(
    useCallback(() => {
      setItems(getAllItems());
    }, [])
  );

  const handleCapture = (text: string) => {
    // Placeholder routing: cycles through the layers so the feed visibly
    // updates. The AI classifier replaces this in a later phase.
    const nextLayer: LayerId = LAYER_LIST[items.length % LAYER_LIST.length].id;
    addItem(text, nextLayer);
    setItems(getAllItems());
  };

  return (
    <Screen title="Home">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemRow item={item} />}
        ListHeaderComponent={
          <View className="mb-xs gap-md">
            <CaptureInput onSubmit={handleCapture} />
            <Text className="text-muted tracking-[0.5px]" style={Type.small}>
              Recent
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-muted" style={Type.body}>
            Nothing yet — type something above to start.
          </Text>
        }
        contentContainerClassName="gap-sm pb-xl"
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
