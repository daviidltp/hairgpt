import React from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ScalePressableProps extends PressableProps {
    children: React.ReactNode;
    scaleTo?: number;
    className?: string;
    style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ScalePressable({
    children,
    scaleTo = 0.96,
    style,
    className,
    onPressIn,
    onPressOut,
    ...props
}: ScalePressableProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = (event: any) => {
        scale.value = withTiming(scaleTo, { duration: 100 });
        onPressIn?.(event);
    };

    const handlePressOut = (event: any) => {
        scale.value = withTiming(1, { duration: 150 });
        onPressOut?.(event);
    };

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[style, animatedStyle]}
            className={className}
            {...props}
        >
            {children}
        </AnimatedPressable>
    );
}
