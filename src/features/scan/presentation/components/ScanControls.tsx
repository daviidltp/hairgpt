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
                    <PrimaryButton
                        label="Continue"
                        onPress={onConfirm}
                    />
                    <ScalePressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onRetake();
                        }}
                        className="w-full h-14 bg-white border border-black rounded-xl items-center justify-center"
                    >
                        <Text className="text-black font-bold text-base">Retake Photo</Text>
                    </ScalePressable>
                </>
            ) : (
                <>
                    <PrimaryButton
                        label="Take Photo"
                        onPress={onCapture}
                    />
                    <ScalePressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onPickImage();
                        }}
                        className="w-full h-14 bg-white border border-black rounded-xl items-center justify-center"
                    >
                        <Text className="text-black font-bold text-base">Pick from Gallery</Text>
                    </ScalePressable>
                </>
            )}
        </View>
    );
}
