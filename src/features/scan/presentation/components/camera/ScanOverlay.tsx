import { CameraView } from 'expo-camera';
import React from 'react';
import { Dimensions, Image as RNImage, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const FRAME_HEIGHT = height * 0.5; // 60% of screen height
const FRAME_WIDTH = width * 0.9; // Slightly narrower than screen
const BORDER_RADIUS = 20;

interface ScanOverlayProps {
    cameraRef: React.RefObject<CameraView | null>;
    isPreview: boolean;
    currentPhoto: string | number | null;
    instructionText: string;
}

export function ScanOverlay({ cameraRef, isPreview, currentPhoto, instructionText }: ScanOverlayProps) {
    return (
        <View className="flex-1 items-center justify-center relative">
            <View
                style={{
                    width: FRAME_WIDTH,
                    height: FRAME_HEIGHT,
                    borderRadius: BORDER_RADIUS,
                    overflow: 'hidden',
                    borderWidth: 0,
                    backgroundColor: 'black',
                    marginTop: -100
                }}
            >
                <CameraView
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    facing="front"
                />
                {isPreview && currentPhoto && (
                    <RNImage
                        source={typeof currentPhoto === 'number' ? currentPhoto : { uri: currentPhoto || undefined }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                        resizeMode="cover"
                    />
                )}
            </View>

            <Text className="text-center text-gray-500 mt-6 px-10">
                {instructionText}
            </Text>
        </View>
    );
}

