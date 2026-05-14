import { useEffect, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { Colors } from '@/constants/theme';

const c = Colors.dark;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type RingSegment = { color: string; fraction: number };

/**
 * One coloured arc of the ring. Each segment is its own rotated "draw-on"
 * circle, so it's a self-contained component (can hold its own animation
 * hook) — `ArcRing` just positions them.
 */
function Segment({
  segment,
  index,
  cumStart,
  center,
  radius,
  strokeWidth,
  circumference,
}: {
  segment: RingSegment;
  index: number;
  cumStart: number;
  center: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * 110,
      withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) })
    );
  }, [index, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - segment.fraction * progress.value),
  }));

  if (segment.fraction <= 0) return null;

  return (
    <G rotation={-90 + cumStart * 360} origin={`${center}, ${center}`}>
      <AnimatedCircle
        cx={center}
        cy={center}
        r={radius}
        stroke={segment.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        animatedProps={animatedProps}
      />
    </G>
  );
}

/**
 * An animated circular ring. Pass one segment for a single-layer gauge, or
 * several for a segmented donut. `children` is rendered centred inside.
 */
export function ArcRing({
  segments,
  size = 220,
  strokeWidth = 18,
  children,
}: {
  segments: RingSegment[];
  size?: number;
  strokeWidth?: number;
  children?: ReactNode;
}) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const positioned = segments.map((segment) => {
    const cumStart = cumulative;
    cumulative += segment.fraction;
    return { segment, cumStart };
  });

  return (
    <View
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={c.surface}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {positioned.map(({ segment, cumStart }, index) => (
          <Segment
            key={segment.color}
            segment={segment}
            index={index}
            cumStart={cumStart}
            center={center}
            radius={radius}
            strokeWidth={strokeWidth}
            circumference={circumference}
          />
        ))}
      </Svg>
      {children}
    </View>
  );
}
