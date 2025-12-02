import * as Haptics from 'expo-haptics';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CaptureButtonProps {
    onPress: () => void;
    disabled?: boolean;
}

export function CaptureButton({ onPress, disabled }: CaptureButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.9);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        if (disabled) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            activeOpacity={1}
        >
            <Animated.View style={animatedStyle}>
                <View className="w-20 h-20 rounded-full border-4 border-white items-center justify-center">
                    <View className="w-16 h-16 rounded-full bg-white" />
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

