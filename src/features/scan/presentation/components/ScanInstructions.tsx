import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface ScanInstructionsProps {
    step: 'front' | 'profile';
}

export function ScanInstructions({ step }: ScanInstructionsProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(300)}
            className="absolute top-16 w-full items-center px-6"
        >
            <Text className="text-white font-bold text-2xl text-center mb-2">
                {step === 'front' ? 'Foto de Frente' : 'Foto de Perfil'}
            </Text>
            <Text className="text-white/80 text-center text-base">
                {step === 'front'
                    ? 'Alinea tu rostro dentro del marco'
                    : 'Gira tu cabeza hacia un lado'}
            </Text>
        </Animated.View>
    );
}
