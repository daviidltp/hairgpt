import { useSuperwall } from '@/core/services/SuperwallWrapper';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { OnboardingLayout } from './components/OnboardingLayout';
import { ChallengeStep } from './steps/ChallengeStep';
import { GoalStep } from './steps/GoalStep';
import { HistoryStep } from './steps/HistoryStep';
import { ReadyStep } from './steps/ReadyStep';
import { VibeStep } from './steps/VibeStep';

const TOTAL_STEPS = 5;

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen() {
    const navigation = useNavigation<OnboardingScreenNavigationProp>();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
    const [showFakePaywall, setShowFakePaywall] = useState(false);

    const { completeOnboarding, setAuth } = useAuthStore();
    const usePlacement = useSuperwall();

    // Use real hook in dev builds, mock in Expo Go
    const placementHook = usePlacement
        ? usePlacement({
            onError: (err: any) => console.error("Paywall Error:", err),
            onPresent: (info: any) => console.log("Paywall Presented:", info),
            onDismiss: (info: any, result: any) => {
                console.log("Paywall Dismissed:", info, "Result:", result);
                // Update store state instead of navigating manually
                completeOnboarding();
                setAuth({ id: '1', name: 'User', email: 'user@example.com' }, 'dummy-token');
            },
        })
        : {
            registerPlacement: async (params: any) => {
                console.log('[EXPO GO MOCK] Would show paywall for placement:', params.placement);
                // In Expo Go, navigate to fake paywall screen
                navigation.navigate('Paywall');
                return Promise.resolve();
            }
        };

    const { registerPlacement } = placementHook;

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const handleContinue = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (currentStepIndex < TOTAL_STEPS - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            // Finish
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            console.log("Onboarding complete", answers);

            // Trigger Paywall (navigation happens in onDismiss callback or immediately in Expo Go)
            await registerPlacement({
                placement: 'onboarding_finish',
            });
        }
    };

    const isMultipleChoice = currentStepIndex === 2; // ChallengeStep

    const handleSelectOption = (option: string) => {
        if (isMultipleChoice) {
            setAnswers((prev) => {
                const current = prev[currentStepIndex];
                const currentArray = Array.isArray(current) ? current : (current ? [current] : []);

                if (currentArray.includes(option)) {
                    return { ...prev, [currentStepIndex]: currentArray.filter(o => o !== option) };
                } else {
                    return { ...prev, [currentStepIndex]: [...currentArray, option] };
                }
            });
        } else {
            setAnswers((prev) => ({ ...prev, [currentStepIndex]: option }));
            // Auto-advance for single choice steps
            setTimeout(() => {
                handleContinue();
            }, 150);
        }
    };

    const currentAnswer = answers[currentStepIndex];

    // Configuration for each step
    const isFinalStep = currentStepIndex === TOTAL_STEPS - 1; // ReadyStep

    // Show continue button only for multiple choice or final step
    const showContinue = isMultipleChoice || isFinalStep;

    const canContinue = isFinalStep ? true : !!currentAnswer;

    const renderStep = () => {
        switch (currentStepIndex) {
            case 0:
                return <GoalStep selectedOption={currentAnswer} onSelect={handleSelectOption} />;
            case 1:
                return <HistoryStep selectedOption={currentAnswer} onSelect={handleSelectOption} />;
            case 2:
                return <ChallengeStep selectedOption={currentAnswer} onSelect={handleSelectOption} />;
            case 3:
                return <VibeStep selectedOption={currentAnswer} onSelect={handleSelectOption} />;
            case 4:
                return <ReadyStep />;
            default:
                return null;
        }
    };

    return (
        <>
            <StatusBar style="dark" />
            <OnboardingLayout
                currentStep={currentStepIndex}
                totalSteps={TOTAL_STEPS}
                onBack={handleBack}
                onContinue={handleContinue}
                canContinue={canContinue}
                showContinue={showContinue}
                continueLabel={isFinalStep ? "Enter HairGPT" : "Continue"}
            >
                <Animated.View
                    key={currentStepIndex}
                    entering={FadeInRight.duration(300)}
                    exiting={FadeOutLeft.duration(300)}
                    className="flex-1"
                >
                    {renderStep()}
                </Animated.View>
            </OnboardingLayout>
        </>
    );
}
