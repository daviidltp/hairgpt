import { Colors } from '@/core/theme/colors';
import { ScalePressable } from '@/core/ui';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, View } from 'react-native';

interface PropertyCardProps {
    label: string;
    value: number; // 0-10
    onPress?: () => void;
}

export function PropertyCard({ label, value, onPress }: PropertyCardProps) {
    const percentage = Math.round(value * 10);
    
    // Higher percentage = better (green), lower = worse (red)
    const getBarColor = () => {
        if (percentage >= 70) return Colors.green;
        if (percentage >= 40) return Colors.amber;
        return '#EF4444'; // red-500
    };

    const barColor = getBarColor();

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
    };

    return (
        <ScalePressable 
            className="flex-1 bg-surface rounded-[20px] p-4 border border-gray-200 relative min-h-[100px]"
            onPress={handlePress}
        >
            <View className="absolute top-3 right-3">
                <Ionicons name="information-circle-outline" size={18} color={Colors.textTertiary} />
            </View>
            
            <Text className="text-gray-400 text-base font-medium mb-1">
                {label}
            </Text>
            <Text className="text-3xl font-bold text-primary mb-2">
                {percentage}%
            </Text>
            <View className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <View 
                    className="h-full rounded-full"
                    style={{ 
                        width: `${percentage}%`,
                        backgroundColor: barColor,
                    }}
                />
            </View>
        </ScalePressable>
    );
}

