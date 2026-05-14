import { useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Type } from '@/constants/theme';

const c = Colors.dark;

/**
 * The core capture box. The user types anything and submits; the parent
 * classifies and routes it. `onSubmit` resolves to `true` on success — only
 * then is the input cleared, so a failed capture keeps the user's text.
 */
export function CaptureInput({ onSubmit }: { onSubmit: (text: string) => Promise<boolean> }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const canSubmit = text.trim().length > 0 && !busy;

  const submit = async () => {
    if (text.trim().length === 0 || busy) return;
    setBusy(true);
    const ok = await onSubmit(text.trim());
    setBusy(false);
    if (ok) setText('');
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
        editable={!busy}
      />
      <TouchableOpacity
        className={`h-9 w-9 items-center justify-center rounded-pill bg-accent ${
          canSubmit ? '' : 'opacity-40'
        }`}
        onPress={submit}
        disabled={!canSubmit}
        activeOpacity={0.8}>
        {busy ? (
          <ActivityIndicator size="small" color={c.accentText} />
        ) : (
          <IconSymbol name="arrow.up" size={20} color={c.accentText} />
        )}
      </TouchableOpacity>
    </View>
  );
}
