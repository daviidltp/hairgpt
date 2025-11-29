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
            className={`p-5 rounded-2xl flex-row items-center justify-between ${selected ? 'bg-primary' : 'bg-surface'} ${className}`}
        >
            <View className="flex-row items-center gap-3 flex-1">
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={selected ? Colors.white : Colors.textPrimary}
                    />
                )}
                <Text className={`text-lg font-medium flex-1 ${selected ? 'text-white' : 'text-primary'}`}>
                    {label}
                </Text>
            </View>

            {multiSelect && (
                <View
                    style={selected ? { backgroundColor: Colors.white, borderColor: Colors.white } : { borderColor: Colors.textSecondary }}
                    className="w-6 h-6 rounded-full border-2 items-center justify-center"
                >
                    {selected && <Ionicons name="checkmark" size={16} color={Colors.primary} />}
                </View>
            )}
        </ScalePressable>
    );
}
