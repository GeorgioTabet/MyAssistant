import { Alert, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { LAYER_LIST, type LayerId } from '@/constants/layers';
import { Colors, Type } from '@/constants/theme';
import { deleteItem, updateItemLayer, type Item } from '@/lib/db/items';

const c = Colors.dark;

/**
 * Bottom-sheet actions for a captured item: move it to a different layer
 * (to correct an AI misclassification) or delete it. Shown when `item` is
 * non-null; `onChanged` lets the parent screen refresh after a change.
 */
export function ItemActionsSheet({
  item,
  onClose,
  onChanged,
}: {
  item: Item | null;
  onClose: () => void;
  onChanged: () => void;
}) {
  const move = (layer: LayerId) => {
    if (!item || layer === item.layer) return;
    updateItemLayer(item.id, layer);
    onChanged();
    onClose();
  };

  const confirmDelete = () => {
    if (!item) return;
    Alert.alert('Delete item', 'This permanently removes the item.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteItem(item.id);
          onChanged();
          onClose();
        },
      },
    ]);
  };

  return (
    <Modal visible={item !== null} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/60" onPress={onClose}>
        {/* Empty onPress captures the touch so the backdrop above doesn't close it. */}
        <Pressable
          className="gap-md rounded-t-lg border-t border-border bg-surface p-lg"
          onPress={() => {}}>
          {item ? (
            <>
              <Text className="text-text" style={Type.body} numberOfLines={3}>
                {item.text}
              </Text>

              <Text className="text-muted tracking-[0.5px]" style={Type.small}>
                Move to
              </Text>
              <View className="flex-row flex-wrap gap-sm">
                {LAYER_LIST.map((layer) => {
                  const isCurrent = layer.id === item.layer;
                  return (
                    <TouchableOpacity
                      key={layer.id}
                      className="flex-row items-center gap-xs rounded-pill border px-md py-sm"
                      style={{
                        borderColor: layer.color,
                        backgroundColor: isCurrent ? layer.color : 'transparent',
                      }}
                      disabled={isCurrent}
                      onPress={() => move(layer.id)}
                      activeOpacity={0.8}>
                      <IconSymbol
                        name={layer.icon}
                        size={15}
                        color={isCurrent ? c.accentText : layer.color}
                      />
                      <Text style={[Type.caption, { color: isCurrent ? c.accentText : layer.color }]}>
                        {layer.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                className="mt-xs h-11 items-center justify-center rounded-sm border border-border"
                onPress={confirmDelete}
                activeOpacity={0.85}>
                <Text style={[Type.bodyMedium, { color: c.destructive }]}>Delete</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
