import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';

const c = Colors.dark;

export const unstable_settings = {
  anchor: '(tabs)',
};

// The app is dark-only for now — force the dark navigation theme regardless
// of the device setting.
export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: c.background },
          headerTintColor: c.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: c.background },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="layer/[layer]" options={{ headerShown: true }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
