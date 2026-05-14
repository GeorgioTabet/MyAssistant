import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Alert, Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { LAYER_LIST, type LayerId } from '@/constants/layers';
import { Colors, Type } from '@/constants/theme';
import { deleteItem, setItemDue, updateItemLayer, type Item } from '@/lib/db/items';
import {
  cancelReminder,
  ensureNotificationPermission,
  reminderPresets,
  scheduleReminder,
} from '@/lib/reminders';
import { formatReminder } from '@/lib/time';

const c = Colors.dark;

/** Default starting point for the custom picker: one hour from now. */
const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);

/**
 * Bottom-sheet actions for a captured item: move it to a different layer
 * (to correct an AI misclassification), set/clear a reminder, or delete it.
 * Shown when `item` is non-null; `onChanged` lets the parent screen refresh.
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
  // On iOS the custom picker renders inline in the sheet; this holds its
  // working value (null = not in custom-pick mode). Android uses native
  // dialogs instead, so this stays null there.
  const [customDate, setCustomDate] = useState<Date | null>(null);

  const close = () => {
    setCustomDate(null);
    onClose();
  };

  const move = (layer: LayerId) => {
    if (!item || layer === item.layer) return;
    updateItemLayer(item.id, layer);
    onChanged();
    close();
  };

  const setReminder = async (date: Date) => {
    if (!item) return;
    const granted = await ensureNotificationPermission();
    if (!granted) {
      Alert.alert(
        'Notifications are off',
        'Enable notifications for MyAssistant in your phone settings to use reminders.'
      );
      return;
    }
    const iso = date.toISOString();
    setItemDue(item.id, iso);
    await scheduleReminder(item.id, item.text, iso);
    onChanged();
    close();
  };

  const clearReminder = async () => {
    if (!item) return;
    setItemDue(item.id, null);
    await cancelReminder(item.id);
    onChanged();
    close();
  };

  // "Custom…": Android opens native date then time dialogs; iOS shows the
  // inline picker inside the sheet.
  const openCustom = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: oneHourFromNow(),
        mode: 'date',
        minimumDate: new Date(),
        onChange: (dateEvent, picked) => {
          if (dateEvent.type !== 'set' || !picked) return;
          DateTimePickerAndroid.open({
            value: picked,
            mode: 'time',
            onChange: (timeEvent, time) => {
              if (timeEvent.type !== 'set' || !time) return;
              const combined = new Date(picked);
              combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
              setReminder(combined);
            },
          });
        },
      });
    } else {
      setCustomDate(oneHourFromNow());
    }
  };

  const confirmDelete = () => {
    if (!item) return;
    Alert.alert('Delete item', 'This permanently removes the item.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          deleteItem(item.id);
          await cancelReminder(item.id);
          onChanged();
          close();
        },
      },
    ]);
  };

  return (
    <Modal visible={item !== null} transparent animationType="slide" onRequestClose={close}>
      <Pressable className="flex-1 justify-end bg-black/60" onPress={close}>
        {/* Empty onPress captures the touch so the backdrop above doesn't close it. */}
        <Pressable
          className="gap-md rounded-t-lg border-t border-border bg-surface p-lg"
          onPress={() => {}}>
          {item && customDate ? (
            // iOS custom date/time picker
            <>
              <Text className="text-muted tracking-[0.5px]" style={Type.small}>
                Pick a date & time
              </Text>
              <DateTimePicker
                value={customDate}
                mode="datetime"
                display="inline"
                minimumDate={new Date()}
                themeVariant="dark"
                accentColor={c.accent}
                onChange={(_event, picked) => {
                  if (picked) setCustomDate(picked);
                }}
              />
              <View className="flex-row gap-sm">
                <TouchableOpacity
                  className="h-11 flex-1 items-center justify-center rounded-sm border border-border"
                  onPress={() => setCustomDate(null)}
                  activeOpacity={0.85}>
                  <Text className="text-text" style={Type.bodyMedium}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="h-11 flex-1 items-center justify-center rounded-sm bg-accent"
                  onPress={() => setReminder(customDate)}
                  activeOpacity={0.85}>
                  <Text className="text-accent-text" style={Type.bodyMedium}>
                    Set reminder
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : item ? (
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

              <View className="flex-row items-center justify-between">
                <Text className="text-muted tracking-[0.5px]" style={Type.small}>
                  Remind me
                </Text>
                {item.dueAt ? (
                  <TouchableOpacity onPress={clearReminder} hitSlop={8}>
                    <Text style={[Type.caption, { color: c.destructive }]}>
                      Clear ({formatReminder(item.dueAt)})
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View className="flex-row flex-wrap gap-sm">
                {reminderPresets().map((preset) => (
                  <TouchableOpacity
                    key={preset.label}
                    className="rounded-pill border border-border px-md py-sm"
                    onPress={() => setReminder(preset.date)}
                    activeOpacity={0.8}>
                    <Text className="text-text" style={Type.caption}>
                      {preset.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  className="rounded-pill border border-accent px-md py-sm"
                  onPress={openCustom}
                  activeOpacity={0.8}>
                  <Text className="text-accent" style={Type.caption}>
                    Custom…
                  </Text>
                </TouchableOpacity>
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
