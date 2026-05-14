import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { CaptureInput } from '@/components/capture-input';
import { ItemRow } from '@/components/item-row';
import { Screen } from '@/components/screen';
import { LAYER_LIST, type LayerId } from '@/constants/layers';
import { Colors, Spacing, Type } from '@/constants/theme';
import { SAMPLE_ITEMS, type Item } from '@/lib/sample-items';

const c = Colors.dark;

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>(SAMPLE_ITEMS);

  const handleCapture = (text: string) => {
    // Placeholder routing: cycles through the layers so the feed visibly
    // updates. The AI classifier replaces this in a later phase.
    const nextLayer: LayerId = LAYER_LIST[items.length % LAYER_LIST.length].id;
    const newItem: Item = {
      id: `${Date.now()}`,
      text,
      layer: nextLayer,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <Screen title="Home">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemRow item={item} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <CaptureInput onSubmit={handleCapture} />
            <Text style={styles.sectionLabel}>Recent</Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  header: {
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sectionLabel: {
    ...Type.small,
    color: c.textMuted,
    letterSpacing: 0.5,
  },
});
