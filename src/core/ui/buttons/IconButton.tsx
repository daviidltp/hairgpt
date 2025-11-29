import { Colors } from '@/core/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
    icon: keyof typeof Ionicons.glyphMap;
    size?: number;
    iconColor?: string;
    backgroundColor?: string;
}

/**
 * Botón redondo con icono centrado y haptic feedback
 */
export function IconButton({
    icon,
    size = 24,
    iconColor = Colors.primary,
    backgroundColor = Colors.surface,
    onPress,
    style,
    ...props
}: IconButtonProps) {
    const handlePress = (event: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(event);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={[
                {
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
            {...props}
        >
            <Ionicons name={icon} size={size} color={iconColor} />
        </TouchableOpacity>
    );
}

