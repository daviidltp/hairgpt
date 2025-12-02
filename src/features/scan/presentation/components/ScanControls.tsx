import { PrimaryButton, ScalePressable } from '@/core/ui';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, View } from 'react-native';

interface ScanControlsProps {
    isPreview: boolean;
    onCapture: () => void;
    onPickImage: () => void;
    onConfirm: () => void;
    onRetake: () => void;
}

export function ScanControls({
    isPreview,
    onCapture,
    onPickImage,
    onConfirm,
    onRetake,
}: ScanControlsProps) {
    return (
        <View className="px-6 pb-6 w-full gap-4">
            {isPreview ? (
                <>
                    <ScalePressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onRetake();
                        }}
                        className="w-full h-16 bg-white border border-black rounded-xl items-center justify-center"
                    >
                        <Text className="text-black font-bold text-lg">Retake Photo</Text>
                    </ScalePressable>
                    <PrimaryButton
                        label="Continue"
                        onPress={onConfirm}
                        className="h-20"
                    />
                </>
            ) : (
                <>
                    <ScalePressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onPickImage();
                        }}
                        className="w-full h-16 bg-white border border-black rounded-xl items-center justify-center"
                    >
                        <Text className="text-black font-bold text-lg">Pick from Gallery</Text>
                    </ScalePressable>
                    <PrimaryButton
                        label="Take Photo"
                        onPress={onCapture}
                        className="h-20"
                    />
                </>
            )}
        </View>
    );
}
