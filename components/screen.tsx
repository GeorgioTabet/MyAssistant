import { cssInterop } from 'nativewind';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Type } from '@/constants/theme';

// SafeAreaView is a third-party component, so NativeWind needs to be told it
// accepts a className (mapped onto its `style` prop).
cssInterop(SafeAreaView, { className: 'style' });

/**
 * Standard screen wrapper: dark background, safe-area aware, with an optional
 * title header. Set `padded={false}` when the screen manages its own padding
 * (e.g. an edge-to-edge list).
 */
export function Screen({
  title,
  children,
  padded = true,
}: {
  title?: string;
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {title ? (
        <View className="px-lg pt-sm pb-md">
          <Text className="text-text" style={Type.title}>
            {title}
          </Text>
        </View>
      ) : null}
      <View className={padded ? 'flex-1 px-lg' : 'flex-1'}>{children}</View>
    </SafeAreaView>
  );
}
