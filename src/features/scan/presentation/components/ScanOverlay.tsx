import { CameraView } from 'expo-camera';
import React from 'react';
import { Dimensions, Image as RNImage, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const OVAL_WIDTH = width * 0.85;
const OVAL_HEIGHT = height * 0.55;

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
                    width: OVAL_WIDTH,
                    height: OVAL_HEIGHT,
                    borderRadius: OVAL_WIDTH / 2,
                    overflow: 'hidden',
                    borderWidth: 4,
                    borderColor: 'black',
                    backgroundColor: 'black'
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
