import { IconButton, PrimaryButton } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { BackHandler, Dimensions, Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultImageRepository } from '../../data/repositories/DefaultImageRepository';
import { AnalysisVisualizer, ScanControls, ScanOverlay, ScanPermissionView } from '../components';
import { useScanViewModel } from '../hooks/useScanViewModel';

const { width, height } = Dimensions.get('window');
const FRAME_HEIGHT = height * 0.5;
const FRAME_WIDTH = width * 0.9;

const defaultImageRepository = new DefaultImageRepository();

type ProfilePhotoTutorialNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilePhotoTutorial'>;

export function ProfilePhotoTutorialScreen() {
    const navigation = useNavigation<ProfilePhotoTutorialNavigationProp>();
    const route = useRoute<any>();
    const [showTutorial, setShowTutorial] = useState(true);
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
        confirmPhoto: vmConfirmPhoto,
        retakePhoto,
    } = useScanViewModel({
        mode: route.params?.mode,
        initialState: 'scanning_profile',
        initialFrontPhoto: route.params?.frontPhoto,
        initialFrontBase64: route.params?.frontBase64
    });

    useEffect(() => {
        if (!permission?.granted && !showTutorial) {
            requestPermission();
        }
    }, [showTutorial, permission]);

    useEffect(() => {
        if (state === 'analyzing') {
            navigation.setOptions({ gestureEnabled: false });
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
            return () => {
                navigation.setOptions({ gestureEnabled: true });
                backHandler.remove();
            };
        }
    }, [state, navigation]);

    // Navigate to results screen when analysis is complete
    useEffect(() => {
        if (state === 'results' && analysisResult) {
            if (route.params?.mode === 'baldness') {
                navigation.navigate('BaldnessResults', {
                    analysisResult,
                    frontPhoto: frontPhoto,
                    profilePhoto,
                    crownPhoto: null,
                });
            } else {
                navigation.navigate('ScanResults', {
                    analysisResult,
                    frontPhoto: frontPhoto,
                    profilePhoto,
                });
            }
        }
    }, [state, analysisResult, frontPhoto, profilePhoto, navigation, route.params]);

    const handleContinue = () => {
        setShowTutorial(false);
    };

    const confirmPhoto = () => {
        // Start analysis with both front and profile photos
        vmConfirmPhoto();
    };

    if (state === 'analyzing' || state === 'results') {
        const photoUri = frontPhoto || (defaultImageRepository.getDefaultFrontImage() as number);
        return <AnalysisVisualizer photoUri={photoUri} isAnalyzing={progress < 100} mode={route.params?.mode} />;
    }

    if (!showTutorial) {
        // Camera mode
        if (!permission) return <View />;
        if (!permission.granted) {
            return <ScanPermissionView onRequestPermission={requestPermission} />;
        }

        const isPreview = state.includes('preview');

        return (
            <View className="flex-1 bg-white">
                <StatusBar barStyle="dark-content" />
                <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                    {/* Header */}
                    <View className="px-6 pt-2 pb-4 flex-row justify-between items-center">
                        <IconButton
                            icon="arrow-back"
                            onPress={() => navigation.goBack()}
                            className="bg-transparent"
                            iconColor="black"
                        />
                        <Text className="text-lg font-bold text-black">
                            Foto de Perfil
                        </Text>
                        <View className="w-10" />
                    </View>

                    <ScanOverlay
                        cameraRef={cameraRef}
                        isPreview={isPreview}
                        currentPhoto={profilePhoto}
                        instructionText=""
                    />

                    <ScanControls
                        isPreview={isPreview}
                        onCapture={capture}
                        onPickImage={pickImage}
                        onConfirm={confirmPhoto}
                        onRetake={retakePhoto}
                    />
                </SafeAreaView>
            </View>
        );
    }

    // Tutorial mode
    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                {/* Header */}
                <View className="px-6 pt-2 pb-4 flex-row justify-between items-center">
                    <IconButton
                        icon="arrow-back"
                        onPress={() => navigation.goBack()}
                        className="bg-transparent"
                        iconColor="black"
                    />
                    <Text className="text-lg font-bold text-black">
                        Foto de Perfil
                    </Text>
                    <View className="w-10" />
                </View>

                {/* Content */}
                <View className="flex-1 px-6 justify-start items-center">
                    {/* Mockup Image */}
                    <View
                        style={{
                            width: FRAME_WIDTH,
                            height: FRAME_HEIGHT,
                            borderRadius: 20,
                            overflow: 'hidden',
                            marginBottom: 32,
                        }}
                    >
                        <Image
                            source={require('../../../../../assets/images/tutorial/tutorial_profile.jpg')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Instructions */}
                    <View className="w-full space-y-4 mb-8">
                        <View className="flex-row items-center mb-6">
                            <View className="mr-3">
                                <Ionicons name="sync-outline" size={24} color="black" />
                            </View>
                            <Text className="flex-1 text-base text-gray-700">
                                Gira tu cabeza 90 grados hacia la derecha
                            </Text>
                        </View>

                        <View className="flex-row items-center mb-6">
                            <View className="mr-3">
                                <Ionicons name="ear-outline" size={24} color="black" />
                            </View>
                            <Text className="flex-1 text-base text-gray-700">
                                Asegúrate de que se vea tu oreja
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <View className="mr-3">
                                <Ionicons name="bulb-outline" size={24} color="black" />
                            </View>
                            <Text className="flex-1 text-base text-gray-700">
                                Mantén la misma iluminación que la foto anterior
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Button */}
                <View className="px-6 pb-6">
                    <PrimaryButton
                        label="Continuar"
                        onPress={handleContinue}
                        className="h-16"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
