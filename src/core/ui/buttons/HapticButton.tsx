import * as Haptics from 'expo-haptics';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface HapticButtonProps extends TouchableOpacityProps {
    hapticStyle?: Haptics.ImpactFeedbackStyle;
}

/**
 * Botón base con haptic feedback automático
 * Úsalo como reemplazo de TouchableOpacity para tener feedback táctil consistente
 */
export function HapticButton({
    onPress,
    hapticStyle = Haptics.ImpactFeedbackStyle.Light,
    children,
    ...props
}: HapticButtonProps) {
    const handlePress = (event: any) => {
        Haptics.impactAsync(hapticStyle);
        onPress?.(event);
    };

    return (
        <TouchableOpacity onPress={handlePress} {...props}>
            {children}
        </TouchableOpacity>
    );
}

