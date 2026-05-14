import Constants from 'expo-constants';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';

const c = Colors.dark;

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [revealed, setRevealed] = useState(false);
  const canSave = apiKey.trim().length > 0;

  // UI only for now. Saving to secure storage is wired up in the
  // api-connect checklist step.
  const save = () => {};

  return (
    <Screen title="Settings">
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Anthropic API Key</Text>
        <Text style={styles.sectionHint}>
          Your key is what lets the app talk to Claude. It is stored only on this
          device and never shared.
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="sk-ant-..."
            placeholderTextColor={c.hint}
            secureTextEntry={!revealed}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setRevealed((r) => !r)} hitSlop={8}>
            <Text style={styles.reveal}>{revealed ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          onPress={save}
          disabled={!canSave}
          activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save key</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>App</Text>
          <Text style={styles.aboutValue}>MyAssistant</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>
            {Constants.expoConfig?.version ?? '1.0.0'}
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: c.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: c.border,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Type.heading,
    color: c.text,
  },
  sectionHint: {
    ...Type.caption,
    color: c.textMuted,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: Spacing.md,
    backgroundColor: c.background,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: c.border,
    color: c.text,
    ...Type.body,
  },
  reveal: {
    ...Type.caption,
    color: c.accent,
  },
  saveBtn: {
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnText: {
    ...Type.bodyMedium,
    color: c.accentText,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  aboutLabel: {
    ...Type.body,
    color: c.textMuted,
  },
  aboutValue: {
    ...Type.body,
    color: c.text,
  },
});
