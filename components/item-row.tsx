import { Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { LAYERS } from '@/constants/layers';
import { Colors, Type } from '@/constants/theme';
import type { Item } from '@/lib/db/items';
import { formatReminder, relativeTime } from '@/lib/time';

const c = Colors.dark;

/** A single captured item in a feed — colour-coded by its layer. Tapping it
 *  opens its actions (move / remind / delete) via the parent's `onPress`. */
export function ItemRow({ item, onPress }: { item: Item; onPress: () => void }) {
  const layer = LAYERS[item.layer];
  return (
    <TouchableOpacity
      className="flex-row overflow-hidden rounded-md border border-border bg-surface"
      onPress={onPress}
      activeOpacity={0.8}>
      <View className="w-[3px]" style={{ backgroundColor: layer.color }} />
      <View className="flex-1 gap-xs px-md py-md">
        <Text className="text-text" style={Type.body}>
          {item.text}
        </Text>
        <View className="flex-row items-center gap-xs">
          <Text style={[Type.small, { color: layer.color }]}>{layer.label}</Text>
          <Text className="text-muted" style={Type.small}>
            ·
          </Text>
          <Text className="text-muted" style={Type.small}>
            {relativeTime(item.createdAt)}
          </Text>
        </View>
        {item.dueAt ? (
          <View className="flex-row items-center gap-xs">
            <IconSymbol name="bell.fill" size={11} color={c.textMuted} />
            <Text className="text-muted" style={Type.small}>
              {formatReminder(item.dueAt)}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
