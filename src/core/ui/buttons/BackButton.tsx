import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface BackButtonProps {
    onPress: () => void;
}

/**
 * Botón de volver atrás estándar para subpantallas
 * Siempre arriba a la izquierda con haptic feedback
 */
export function BackButton({ onPress }: BackButtonProps) {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center"
        >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
    );
}

