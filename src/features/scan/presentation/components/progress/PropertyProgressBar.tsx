import React from 'react';
import { Text, View } from 'react-native';

interface PropertyProgressBarProps {
    label: string;
    value: number; // 0-10
    color?: string;
}

export function PropertyProgressBar({ label, value, color }: PropertyProgressBarProps) {
    const percentage = Math.round(value * 10);
    
    // Determine color based on value if not provided
    // Higher percentage = worse (red), lower = better (green)
    const getBarColor = () => {
        if (color) return color;
        if (percentage <= 30) return '#22C55E'; // Green - good
        if (percentage <= 60) return '#F59E0B'; // Orange/Amber - medium
        return '#EF4444'; // Red - bad
    };

    const barColor = getBarColor();

    return (
        <View className="mb-5">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base font-medium text-gray-800">
                    {label}
                </Text>
                <Text className="text-base font-bold" style={{ color: barColor }}>
                    {percentage}%
                </Text>
            </View>
            <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <View 
                    className="h-full rounded-full"
                    style={{ 
                        width: `${percentage}%`,
                        backgroundColor: barColor,
                    }}
                />
            </View>
        </View>
    );
}

