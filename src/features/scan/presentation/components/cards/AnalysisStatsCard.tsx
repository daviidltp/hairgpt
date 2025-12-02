import { Colors } from '@/core/theme/colors';
import { ScalePressable } from '@/core/ui';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, View } from 'react-native';

interface AnalysisStatsCardProps {
    label: string;
    value: string;
    onPress?: () => void;
}

export function AnalysisStatsCard({ label, value, onPress }: AnalysisStatsCardProps) {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
    };

    // Calculate font size based on text length to prevent clipping
    const getFontSize = (text: string) => {
        if (text.length <= 8) return 'text-4xl';
        if (text.length <= 12) return 'text-3xl';
        if (text.length <= 16) return 'text-2xl';
        return 'text-base';
    };

    const fontSizeClass = getFontSize(value);

    return (
        <ScalePressable
            className="flex-1 bg-surface rounded-[20px] p-4 items-center justify-center border border-gray-200 relative min-h-[100px]"
            onPress={handlePress}
        >
            <View className="absolute top-3 right-3">
                <Ionicons name="information-circle-outline" size={18} color={Colors.textTertiary} />
            </View>

            <Text className="text-gray-400 text-lg font-medium mb-2">
                {label}
            </Text>
            <View className="w-full items-center justify-center" style={{ height: 40 }}>
                <Text
                    className={`text-primary ${fontSizeClass} font-bold text-center w-full`}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    style={{
                        includeFontPadding: false,
                        textAlignVertical: 'center',
                    }}
                >
                    {value}
                </Text>
            </View>
        </ScalePressable>
    );
}

