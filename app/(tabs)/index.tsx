import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

import { CaptureInput } from '@/components/capture-input';
import { ItemActionsSheet } from '@/components/item-actions-sheet';
import { ItemRow } from '@/components/item-row';
import { Screen } from '@/components/screen';
import { Type } from '@/constants/theme';
import { getApiKey } from '@/lib/ai/api-key';
import { ClassificationError, classifyText } from '@/lib/ai/classify';
import { addItem, getAllItems, type Item } from '@/lib/db/items';

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const router = useRouter();

  const reload = useCallback(() => setItems(getAllItems()), []);

  // Reload from the database whenever the screen comes into focus, so the feed
  // reflects items added or changed elsewhere (e.g. on a layer screen).
  useFocusEffect(reload);

  // Returns true only when the item was classified and saved — CaptureInput
  // keeps the user's text on screen when this returns false.
  const handleCapture = async (text: string): Promise<boolean> => {
    const apiKey = await getApiKey();
    if (!apiKey) {
      Alert.alert(
        'API key needed',
        'Add your Anthropic API key in Settings before capturing anything.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => router.push('/settings') },
        ]
      );
      return false;
    }

    try {
      const layer = await classifyText(text, apiKey);
      addItem(text, layer);
      reload();
      return true;
    } catch (error) {
      const message =
        error instanceof ClassificationError
          ? error.message
          : 'Something went wrong. Try again.';
      Alert.alert("Couldn't sort that", message);
      return false;
    }
  };

  return (
    <Screen title="Home">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemRow item={item} onPress={() => setSelected(item)} />}
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
      <ItemActionsSheet item={selected} onClose={() => setSelected(null)} onChanged={reload} />
    </Screen>
  );
}
