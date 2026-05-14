import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';

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
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type anything…"
        placeholderTextColor={c.hint}
        multiline
      />
      <TouchableOpacity
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={submit}
        disabled={!canSubmit}
        activeOpacity={0.8}>
        <IconSymbol name="arrow.up" size={20} color={c.accentText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    backgroundColor: c.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: c.border,
    padding: Spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 140,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    color: c.text,
    ...Type.body,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});
