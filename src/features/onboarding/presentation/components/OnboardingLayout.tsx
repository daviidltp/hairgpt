import { Colors } from '@/core/theme/colors';
import { PrimaryButton } from '@/core/ui';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    onContinue: () => void;
    canContinue?: boolean;
    showContinue?: boolean;
    continueLabel?: string;
}

export function OnboardingLayout({
    children,
    currentStep,
    totalSteps,
    onBack,
    onContinue,
    canContinue = true,
    showContinue = true,
    continueLabel = "Continue"
}: OnboardingLayoutProps) {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    const progressSV = useSharedValue(progress);

    useEffect(() => {
        progressSV.value = progress;
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(`${progressSV.value}%`, { duration: 300 }),
        };
    });

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
            {/* Header */}
            <View className="flex-row items-center px-6 py-4 gap-4">
                <TouchableOpacity
                    onPress={handleBack}
                    className="p-2 -ml-2 rounded-full active:bg-gray-100"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>

                {/* Progress Bar */}
                <View className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <Animated.View
                        className="h-full bg-primary rounded-full"
                        style={animatedStyle}
                    />
                </View>
            </View>

            {/* Content */}
            <View className="flex-1 px-6 pt-4">
                {children}
            </View>

            {/* Footer */}
            {showContinue && (
                <View className="px-6 pb-0">
                    <PrimaryButton
                        label={continueLabel}
                        onPress={onContinue}
                        disabled={!canContinue}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
