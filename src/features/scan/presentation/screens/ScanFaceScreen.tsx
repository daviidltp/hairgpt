import { IconButton, PrimaryButton, ScalePressable } from '@/core/ui';
import { MarkdownDisplay } from '@/core/ui/typography/MarkdownDisplay';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalysisLoadingScreen } from '../components/AnalysisLoadingScreen';
import { useScanViewModel } from '../hooks/useScanViewModel';

const { width, height } = Dimensions.get('window');
const OVAL_WIDTH = width * 0.85;
const OVAL_HEIGHT = height * 0.55;

export function ScanFaceScreen() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const [permission, requestPermission] = useCameraPermissions();
    const {
        state,
        cameraRef,
        frontPhoto,
        profilePhoto,
        analysisResult,
        progress,
        capture,
        pickImage,
        confirmPhoto,
        retakePhoto,
        reset,
        startMockAnalysis
    } = useScanViewModel({ initialMock: route.params?.mock });

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    if (state === 'results' && analysisResult) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={['top']}>
                <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-3xl font-bold text-primary">Analysis</Text>
                        <IconButton icon="close" onPress={() => navigation.goBack()} />
                    </View>

                    <View className="flex-row gap-4 mb-8">
                        <Image source={{ uri: frontPhoto || undefined }} className="flex-1 aspect-[3/4] rounded-2xl bg-gray-200" />
                        <Image source={{ uri: profilePhoto || undefined }} className="flex-1 aspect-[3/4] rounded-2xl bg-gray-200" />
                    </View>

                    <MarkdownDisplay>{analysisResult}</MarkdownDisplay>

                    <View className="h-10" />
                    <PrimaryButton label="Scan Again" onPress={reset} />
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (state === 'analyzing') {
        return <AnalysisLoadingScreen progress={progress} />;
    }

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View className="flex-1 items-center justify-center bg-background p-6">
                <Text className="text-primary text-center mb-4">We need your permission to show the camera</Text>
                <PrimaryButton label="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const isPreview = state === 'preview_front' || state === 'preview_profile';
    const currentPhoto = state.includes('front') ? frontPhoto : profilePhoto;

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                {/* Header */}
                <View className="px-6 pt-2 pb-4 flex-row justify-between items-center z-10">
                    <IconButton
                        icon="close"
                        onPress={() => navigation.goBack()}
                        backgroundColor="rgba(0,0,0,0.05)"
                        iconColor="black"
                    />
                    <Text className="text-lg font-bold text-black">
                        {state.includes('front') ? 'Front Photo' : 'Profile Photo'}
                    </Text>
                    <View className="w-10" />
                </View>

                {/* Camera / Preview Area */}
                <View className="flex-1 items-center justify-center relative">
                    <View
                        style={{
                            width: OVAL_WIDTH,
                            height: OVAL_HEIGHT,
                            borderRadius: OVAL_WIDTH / 2,
                            overflow: 'hidden',
                            borderWidth: 4,
                            borderColor: 'black',
                            backgroundColor: '#f0f0f0'
                        }}
                    >
                        {isPreview && currentPhoto ? (
                            <Image source={{ uri: currentPhoto || undefined }} style={{ flex: 1 }} contentFit="cover" />
                        ) : (
                            <CameraView
                                ref={cameraRef}
                                style={{ flex: 1 }}
                                facing="front"
                            />
                        )}
                    </View>

                    <Text className="text-center text-gray-500 mt-6 px-10">
                        {state.includes('front')
                            ? 'Align your face within the frame looking straight ahead.'
                            : 'Turn to the side and align your profile within the frame.'}
                    </Text>
                </View>

                {/* Bottom Controls */}
                <View className="px-6 pb-6 w-full gap-4">
                    {isPreview ? (
                        <>
                            <PrimaryButton
                                label="Continue"
                                onPress={confirmPhoto}
                            />
                            <ScalePressable
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    retakePhoto();
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
                                onPress={capture}
                            />
                            <ScalePressable
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    pickImage();
                                }}
                                className="w-full h-14 bg-white border border-black rounded-xl items-center justify-center"
                            >
                                <Text className="text-black font-bold text-base">Pick from Gallery</Text>
                            </ScalePressable>
                        </>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}
