import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

const CHECKLIST_ITEMS = [
    { id: 1, label: 'Escaneando facciones...', threshold: 10 },
    { id: 2, label: 'Midiendo proporciones áureas', threshold: 30 },
    { id: 3, label: 'Analizando tipo de cabello', threshold: 50 },
    { id: 4, label: 'Calculando simetría facial', threshold: 70 },
    { id: 5, label: 'Generando recomendaciones personalizadas', threshold: 90 },
];

interface Props {
    progress: number;
}

export function AnalysisLoadingScreen({ progress }: Props) {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    useEffect(() => {
        // Check for thresholds
        CHECKLIST_ITEMS.forEach((item) => {
            if (progress >= item.threshold && !checkedItems.includes(item.id)) {
                setCheckedItems((prev) => [...prev, item.id]);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
        });
    }, [progress]);

    return (
        <View className="flex-1 bg-white items-center justify-center px-6">
            {/* Percentage Header */}
            <View className="items-center mb-8">
                <Text className="text-7xl font-bold text-black mb-2">
                    {Math.round(progress)}%
                </Text>
                <Text className="text-[24px] text-center font-semibold text-black mb-1">
                    Estamos preparando todo para ti
                </Text>
            </View>

            {/* Progress Bar */}
            <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-12">
                <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </View>

            {/* Checklist Card */}
            <View className="w-full bg-gray-50 rounded-3xl p-6 gap-3">
                <Text className="font-bold text-lg text-black mb-2">
                    Análisis en tiempo real
                </Text>
                {CHECKLIST_ITEMS.map((item) => {
                    const isChecked = checkedItems.includes(item.id);
                    return (
                        <Animated.View
                            key={item.id}
                            layout={LinearTransition}
                            className="flex-row items-center justify-between h-8"
                        >
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className={`w-2 h-2 rounded-full ${isChecked ? 'bg-black' : 'bg-gray-300'}`} />
                                <Text
                                    className={`text-base ${isChecked ? 'text-black font-medium' : 'text-gray-400'} flex-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.label}
                                </Text>
                            </View>

                            <View className="w-6 h-6 items-center justify-center">
                                {isChecked && (
                                    <Animated.View entering={FadeIn}>
                                        <View className="w-6 h-6 bg-black rounded-full items-center justify-center">
                                            <Ionicons name="checkmark" size={14} color="white" />
                                        </View>
                                    </Animated.View>
                                )}
                            </View>
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
}

