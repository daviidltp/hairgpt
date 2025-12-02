import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition, SharedValue, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const HAIRCUT_CHECKLIST_ITEMS = [
    { id: 1, label: 'Escaneando facciones...' },
    { id: 2, label: 'Midiendo proporciones áureas' },
    { id: 3, label: 'Analizando tipo de cabello' },
    { id: 4, label: 'Calculando simetría facial' },
    { id: 5, label: 'Generando recomendaciones personalizadas' },
];

const BALDNESS_CHECKLIST_ITEMS = [
    { id: 1, label: 'Analizando densidad capilar...' },
    { id: 2, label: 'Midiendo línea del cabello' },
    { id: 3, label: 'Detectando patrones de pérdida' },
    { id: 4, label: 'Evaluando zona de la coronilla' },
    { id: 5, label: 'Calculando nivel de calvicie' },
];

interface ChecklistItemProps {
    item: typeof HAIRCUT_CHECKLIST_ITEMS[0];
    isChecked: boolean;
    isActive: boolean;
    blinkOpacity: SharedValue<number>;
}

function ChecklistItem({ item, isChecked, isActive, blinkOpacity }: ChecklistItemProps) {
    const animatedStyle = useAnimatedStyle(() => {
        if (!isActive) return { opacity: 1 };
        return {
            opacity: blinkOpacity.value,
        };
    });

    return (
        <Animated.View
            layout={LinearTransition}
            className="flex-row items-center justify-between h-8"
        >
            <View className="flex-row items-center gap-3 flex-1">
                <View className={`w-2 h-2 rounded-full ${isChecked ? 'bg-black' : 'bg-gray-300'}`} />
                <Animated.Text
                    className={`text-base flex-1 ${
                        isChecked 
                            ? 'text-black font-medium' 
                            : 'text-gray-400'
                    }`}
                    style={animatedStyle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.label}
                </Animated.Text>
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
}

interface AnalysisChecklistProps {
    completedCount: number;
    activeCheckIndex: number;
    isAnalyzing: boolean;
    mode?: 'haircut' | 'baldness';
}

export function AnalysisChecklist({ completedCount, activeCheckIndex, isAnalyzing, mode = 'haircut' }: AnalysisChecklistProps) {
    const previousCountRef = useRef(0);
    const blinkOpacity = useSharedValue(1);
    
    const CHECKLIST_ITEMS = mode === 'baldness' ? BALDNESS_CHECKLIST_ITEMS : HAIRCUT_CHECKLIST_ITEMS;

    useEffect(() => {
        // Trigger haptic when a new check is completed
        if (completedCount > previousCountRef.current && completedCount > 0) {
            // Use success haptic for the last check, normal for others
            if (completedCount === CHECKLIST_ITEMS.length) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
        }
        previousCountRef.current = completedCount;
    }, [completedCount, CHECKLIST_ITEMS.length]);

    // Blink animation for active check
    useEffect(() => {
        if (!isAnalyzing && completedCount >= CHECKLIST_ITEMS.length) {
            blinkOpacity.value = 1; // Reset to full opacity
            return;
        }

        // Start smooth blinking animation
        blinkOpacity.value = withRepeat(
            withTiming(0.4, { duration: 600 }),
            -1,
            true
        );

        return () => {
            blinkOpacity.value = 1;
        };
    }, [isAnalyzing, completedCount, CHECKLIST_ITEMS.length]);
    return (
        <View className="w-full bg-gray-50 rounded-3xl p-6 gap-3">
            <Text className="font-bold text-lg text-black mb-2">
                Análisis en tiempo real
            </Text>
            {CHECKLIST_ITEMS.map((item, index) => {
                const isChecked = index < completedCount;
                const isActive = index === activeCheckIndex && !isChecked;
                
                return (
                    <ChecklistItem
                        key={item.id}
                        item={item}
                        isChecked={isChecked}
                        isActive={isActive}
                        blinkOpacity={blinkOpacity}
                    />
                );
            })}
        </View>
    );
}

