import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Type } from '@/constants/theme';

const c = Colors.dark;

/**
 * The core capture box. The user types anything and submits; the parent
 * decides what happens with the text. AI classification/routing is wired up
 * in a later phase — for now `onSubmit` just receives the raw text.
 */
export function CaptureInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState('');
  const canSubmit = text.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <View className="flex-row items-end gap-sm rounded-lg border border-border bg-surface p-sm">
      <TextInput
        className="max-h-[140px] min-h-[36px] flex-1 px-sm py-sm text-text"
        style={Type.body}
        value={text}
        onChangeText={setText}
        placeholder="Type anything…"
        placeholderTextColor={c.hint}
        multiline
      />
      <TouchableOpacity
        className={`h-9 w-9 items-center justify-center rounded-pill bg-accent ${
          canSubmit ? '' : 'opacity-40'
        }`}
        onPress={submit}
        disabled={!canSubmit}
        activeOpacity={0.8}>
        <IconSymbol name="arrow.up" size={20} color={c.accentText} />
      </TouchableOpacity>
    </View>
  );
}
