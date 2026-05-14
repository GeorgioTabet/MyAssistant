import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Type } from '@/constants/theme';
import { getApiKey, setApiKey as saveApiKey } from '@/lib/ai/api-key';

const c = Colors.dark;

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [saved, setSaved] = useState(false);
  const canSave = apiKey.trim().length > 0 && !saved;

  // Load the saved key on open so the field reflects what's stored.
  useEffect(() => {
    getApiKey().then((stored) => {
      if (stored) {
        setApiKey(stored);
        setSaved(true);
      }
    });
  }, []);

  const handleChange = (value: string) => {
    setApiKey(value);
    setSaved(false);
  };

  const save = async () => {
    await saveApiKey(apiKey.trim());
    setSaved(true);
  };

  return (
    <Screen title="Settings">
      <View className="mt-lg gap-sm rounded-md border border-border bg-surface p-lg">
        <Text className="text-text" style={Type.heading}>
          Anthropic API Key
        </Text>
        <Text className="text-muted" style={Type.caption}>
          Your key is what lets the app talk to Claude. It is stored only on this
          device, in encrypted storage, and never shared.
        </Text>
        <View className="mt-xs flex-row items-center gap-sm">
          <TextInput
            className="h-11 flex-1 rounded-sm border border-border bg-background px-md text-text"
            style={Type.body}
            value={apiKey}
            onChangeText={handleChange}
            placeholder="sk-ant-..."
            placeholderTextColor={c.hint}
            secureTextEntry={!revealed}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setRevealed((r) => !r)} hitSlop={8}>
            <Text className="text-accent" style={Type.caption}>
              {revealed ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className={`mt-xs h-11 items-center justify-center rounded-sm bg-accent ${
            canSave ? '' : 'opacity-40'
          }`}
          onPress={save}
          disabled={!canSave}
          activeOpacity={0.85}>
          <Text className="text-accent-text" style={Type.bodyMedium}>
            {saved ? 'Saved' : 'Save key'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-lg gap-sm rounded-md border border-border bg-surface p-lg">
        <Text className="text-text" style={Type.heading}>
          About
        </Text>
        <View className="flex-row justify-between py-xs">
          <Text className="text-muted" style={Type.body}>
            App
          </Text>
          <Text className="text-text" style={Type.body}>
            MyAssistant
          </Text>
        </View>
        <View className="flex-row justify-between py-xs">
          <Text className="text-muted" style={Type.body}>
            Version
          </Text>
          <Text className="text-text" style={Type.body}>
            {Constants.expoConfig?.version ?? '1.0.0'}
          </Text>
        </View>
      </View>
    </Screen>
  );
}
