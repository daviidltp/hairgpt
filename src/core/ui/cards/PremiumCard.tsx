import { Colors } from '@/core/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import { ScalePressable } from '../buttons/ScalePressable';

interface PremiumCardProps {
    onPress: () => void;
}

export function PremiumCard({ onPress }: PremiumCardProps) {
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
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 24 }}
            >
                {/* Sparkle Icon */}
                <View className="flex-row items-center gap-2 mb-3">
                    <Ionicons name="sparkles" size={24} color={Colors.primary} />
                    <Text className="text-white font-bold text-xl">
                        Desbloquea Premium
                    </Text>
                </View>

                {/* Description */}
                <Text className="text-white/90 text-base mb-4" style={{ lineHeight: 22 }}>
                    Accede a todas las técnicas, sesiones ilimitadas y análisis avanzado de tus sueños con IA
                </Text>

                {/* CTA Button */}
                <View
                    className="bg-white rounded-full py-3 px-6 flex-row items-center justify-center gap-2"
                >
                    <Ionicons name="sparkles-sharp" size={18} color={Colors.primary} />
                    <Text className="font-bold text-base" style={{ color: Colors.primary }}>
                        Ver Planes
                    </Text>
                </View>
            </LinearGradient>
        </ScalePressable>
    );
}
