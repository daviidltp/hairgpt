import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ============================================
// HAPTIC CONFIGURATION CONSTANTS
// ============================================
const HAPTIC_INTERVAL_MS = 50; // Interval between haptic pulses
const HAPTIC_DURATION_MS = 2500; // Duration of haptic feedback
const HAPTIC_PAUSE_MS = 1000; // Pause between haptic cycles
const HAPTIC_STYLE = Haptics.ImpactFeedbackStyle.Light; // Haptic feedback style

// ============================================
// LAYOUT CONSTANTS
// ============================================
const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.7;
const LOTTIE_SIZE = width * 1.4;

// ============================================
// ANALYSIS TEXTS
// ============================================
const ANALYSIS_TEXTS = [
    'Analizando estructura facial...',
    'Detectando forma de rostro...',
    'Evaluando proporciones...',
    'Identificando líneas de corte ideales...',
    'Procesando textura del cabello...',
    'Calculando volumen óptimo...',
    'Analizando simetría facial...',
    'Determinando estilos compatibles...',
    'Evaluando tendencias personalizadas...',
    'Finalizando recomendaciones...',
];

interface AnalysisVisualizerProps {
    photoUri: string | number | null;
    isAnalyzing?: boolean;
}

export function AnalysisVisualizer({ photoUri, isAnalyzing = true }: AnalysisVisualizerProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        let hapticInterval: number | null = null;
        let cycleTimeout: number | null = null;
        let restartTimeout: number | null = null;

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

                // After pause, restart the cycle and update text
                restartTimeout = setTimeout(() => {
                    if (isAnalyzing) {
                        // Update text to next in sequence
                        setCurrentTextIndex((prev) => (prev + 1) % ANALYSIS_TEXTS.length);
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
            <View className="items-center pt-0">
                {/* Anchor Container - sized to Lottie for proper alignment */}
                <View style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE, alignItems: 'center', justifyContent: 'center' }}>
                    {/* Lottie Background - fills container */}
                    <LottieView
                        source={require('../../../../../assets/lotties/faceid.json')}
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

                {/* Analysis Text - lowercase with technical feel */}
                <Text className="mt-4 text-base font-normal text-gray-500 tracking-wide px-8 text-center">
                    {ANALYSIS_TEXTS[currentTextIndex]}
                </Text>
            </View>
        </SafeAreaView>
    );
}
