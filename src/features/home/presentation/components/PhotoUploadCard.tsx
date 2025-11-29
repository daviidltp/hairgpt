import { Colors } from '@/core/theme/colors';
import { ScalePressable } from '@/core/ui/buttons/ScalePressable';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface PhotoUploadCardProps {
    label: string;
    description?: string;
    imageUri?: string | null;
    onPress: () => void;
    onClear: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
}

export function PhotoUploadCard({
    label,
    description,
    imageUri,
    onPress,
    onClear,
    icon = 'camera-outline'
}: PhotoUploadCardProps) {

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    const handleClear = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onClear();
    };

    if (imageUri) {
        return (
            <Animated.View entering={FadeIn} className="flex-1 aspect-[3/4] relative">
                <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full rounded-3xl"
                    contentFit="cover"
                />
                <TouchableOpacity
                    onPress={handleClear}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full items-center justify-center backdrop-blur-md"
                    activeOpacity={0.7}
                >
                    <Ionicons name="close" size={18} color="white" />
                </TouchableOpacity>
                <View className="absolute bottom-0 w-full p-3 bg-black/30 backdrop-blur-sm rounded-b-3xl">
                    <Text className="text-white text-center font-medium text-sm">
                        {label}
                    </Text>
                </View>
            </Animated.View>
        );
    }

    return (
        <ScalePressable
            onPress={handlePress}
            className="flex-1 aspect-[3/4] bg-surface rounded-3xl border border-dashed border-gray-300 items-center justify-center p-4 space-y-3"
        >
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                <Ionicons name={icon} size={24} color={Colors.primary} />
            </View>
            <View className="items-center">
                <Text className="text-primary font-semibold text-base">
                    {label}
                </Text>
                {description && (
                    <Text className="text-secondary text-xs text-center mt-1">
                        {description}
                    </Text>
                )}
            </View>
        </ScalePressable>
    );
}
