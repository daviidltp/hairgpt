import { Colors } from '@/core/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import { ScalePressable } from '../buttons/ScalePressable';

interface AnnouncementCardProps {
    title: string;
    description: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    actionLabel?: string;
    gradientColors?: readonly [string, string, ...string[]];
}

export function AnnouncementCard({
    title,
    description,
    onPress,
    icon = 'notifications',
    actionLabel,
    gradientColors = [Colors.surface, '#2a2a2a']
}: AnnouncementCardProps) {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <ScalePressable
            onPress={handlePress}
            className="overflow-hidden rounded-[28px]"
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 24 }}
            >
                {/* Header */}
                <View className="flex-row items-center gap-2 mb-3">
                    <Ionicons name={icon} size={24} color="#FFFFFF" />
                    <Text className="text-white font-bold text-xl">
                        {title}
                    </Text>
                </View>

                {/* Description */}
                <Text className="text-white/90 text-base mb-4" style={{ lineHeight: 22 }}>
                    {description}
                </Text>

                {/* CTA Button (Optional) */}
                {actionLabel && (
                    <View
                        className="bg-white rounded-full py-3 px-6 flex-row items-center justify-center gap-2 self-start"
                    >
                        <Text className="font-bold text-base text-black">
                            {actionLabel}
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="black" />
                    </View>
                )}
            </LinearGradient>
        </ScalePressable>
    );
}
