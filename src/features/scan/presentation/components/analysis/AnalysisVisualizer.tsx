import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalysisChecklist } from './AnalysisChecklist';

// ============================================
// HAPTIC CONFIGURATION CONSTANTS
// ============================================
const HAPTIC_INTERVAL_MS = 50; // Interval between haptic pulses
const HAPTIC_DURATION_MS = 2500; // Duration of haptic feedback
const HAPTIC_PAUSE_MS = 1000; // Pause between haptic cycles
const HAPTIC_STYLE = Haptics.ImpactFeedbackStyle.Light; // Haptic feedback style
const MAX_CHECKS = 5; // Number of checklist items

// ============================================
// LAYOUT CONSTANTS
// ============================================
const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.7;
const LOTTIE_SIZE = width * 1.4;

interface AnalysisVisualizerProps {
    photoUri: string | number | null;
    isAnalyzing?: boolean;
    mode?: 'haircut' | 'baldness';
}

export function AnalysisVisualizer({ photoUri, isAnalyzing = true, mode = 'haircut' }: AnalysisVisualizerProps) {
    const [completedChecks, setCompletedChecks] = useState(0);
    const [activeCheckIndex, setActiveCheckIndex] = useState(0);

    // Complete last check when analysis is done
    useEffect(() => {
        if (!isAnalyzing && completedChecks === MAX_CHECKS - 1) {
            const timer = setTimeout(() => {
                setCompletedChecks(MAX_CHECKS);
            }, 500); // Small delay for smooth transition
            return () => clearTimeout(timer);
        }
    }, [isAnalyzing, completedChecks]);

    useEffect(() => {
        let hapticInterval: number | null = null;
        let cycleTimeout: number | null = null;
        let restartTimeout: number | null = null;
        let checkTimeout: number | null = null;

        const cleanup = () => {
            if (hapticInterval) {
                clearInterval(hapticInterval);
                hapticInterval = null;
            }
            if (cycleTimeout) {
                clearTimeout(cycleTimeout);
                cycleTimeout = null;
            }
            if (restartTimeout) {
                clearTimeout(restartTimeout);
                restartTimeout = null;
            }
            if (checkTimeout) {
                clearTimeout(checkTimeout);
                checkTimeout = null;
            }
        };

        const startHapticCycle = () => {
            // Start haptics
            hapticInterval = setInterval(() => {
                Haptics.impactAsync(HAPTIC_STYLE);
            }, HAPTIC_INTERVAL_MS);

            // Stop haptics after configured duration
            cycleTimeout = setTimeout(() => {
                if (hapticInterval) {
                    clearInterval(hapticInterval);
                    hapticInterval = null;
                }

                // Complete next check at half of pause duration
                checkTimeout = setTimeout(() => {
                    setCompletedChecks((prev) => {
                        const nextValue = prev + 1;
                        // Don't complete the last check until analysis is done
                        if (nextValue >= MAX_CHECKS && isAnalyzing) {
                            return prev;
                        }
                        return Math.min(nextValue, MAX_CHECKS);
                    });
                    
                    // Move to next active check
                    setActiveCheckIndex((prev) => Math.min(prev + 1, MAX_CHECKS - 1));
                }, HAPTIC_PAUSE_MS / 2);

                // After pause, restart the cycle
                restartTimeout = setTimeout(() => {
                    if (isAnalyzing || completedChecks < MAX_CHECKS - 1) {
                        startHapticCycle();
                    }
                }, HAPTIC_PAUSE_MS);
            }, HAPTIC_DURATION_MS);
        };

        // Only start if analyzing
        if (isAnalyzing) {
            startHapticCycle();
        }

        // Cleanup on unmount or when isAnalyzing changes
        return cleanup;
    }, [isAnalyzing]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center pt-0 px-6">
                {/* Anchor Container - sized to Lottie for proper alignment */}
                <View style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE, alignItems: 'center', justifyContent: 'center', marginTop: -50 }}>
                    {/* Lottie Background - fills container */}
                    <LottieView
                        source={require('../../../../../../assets/lotties/faceid.json')}
                        autoPlay
                        loop
                        style={{
                            width: LOTTIE_SIZE,
                            height: LOTTIE_SIZE,
                            position: 'absolute',
                        }}
                    />

                    {/* Main Image Container - centered within Lottie */}
                    <View
                        style={{
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE,
                            borderRadius: IMAGE_SIZE / 2,
                            overflow: 'hidden',
                            backgroundColor: '#f0f0f0',
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.1)',
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}
                    >
                        <Image
                            source={typeof photoUri === 'number' ? photoUri : { uri: photoUri || undefined }}
                            style={{ flex: 1 }}
                            contentFit="cover"
                        />
                    </View>
                </View>

                {/* Analysis Checklist Card */}
                <View style={{ marginTop: -80, width: '100%' }}>
                    <AnalysisChecklist 
                        completedCount={completedChecks} 
                        activeCheckIndex={activeCheckIndex}
                        isAnalyzing={isAnalyzing}
                        mode={mode}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

