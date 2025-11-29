import { Colors } from '@/core/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, View } from 'react-native';
import { ScalePressable } from './ScalePressable';

interface OptionButtonProps {
    label: string;
    onPress: () => void;
    selected?: boolean;
    multiSelect?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    className?: string;
}

export function OptionButton({
    label,
    onPress,
    selected = false,
    multiSelect = false,
    icon,
    className = '',
}: OptionButtonProps) {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <ScalePressable
            onPress={handlePress}
            className={`p-5 rounded-2xl border flex-row items-center justify-between ${selected ? 'bg-white border-white' : 'bg-white/5 border-white/10'} ${className}`}
        >
            <View className="flex-row items-center gap-3 flex-1">
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={selected ? '#000000' : Colors.textSecondary}
                    />
                )}
                <Text className={`text-lg font-medium flex-1 ${selected ? 'text-black' : 'text-gray-300'}`}>
                    {label}
                </Text>
            </View>

            {multiSelect && (
                <View
                    style={selected ? { backgroundColor: '#000000', borderColor: '#000000' } : { borderColor: Colors.mutedWhite }}
                    className="w-6 h-6 rounded-full border-2 items-center justify-center"
                >
                    {selected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
            )}
        </ScalePressable>
    );
}
