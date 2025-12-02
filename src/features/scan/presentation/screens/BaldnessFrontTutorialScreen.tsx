import { IconButton, PrimaryButton } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScanControls } from '../components/ScanControls';
import { ScanOverlay } from '../components/ScanOverlay';
import { ScanPermissionView } from '../components/ScanPermissionView';
import { useScanViewModel } from '../hooks/useScanViewModel';

const { width, height } = Dimensions.get('window');
const FRAME_HEIGHT = height * 0.5;
const FRAME_WIDTH = width * 0.9;

type BaldnessFrontTutorialNavigationProp = StackNavigationProp<RootStackParamList>;

export function BaldnessFrontTutorialScreen() {
    const navigation = useNavigation<BaldnessFrontTutorialNavigationProp>();
    const route = useRoute<any>();
    const [showTutorial, setShowTutorial] = useState(true);
    const [permission, requestPermission] = useCameraPermissions();

    const {
        state,
        cameraRef,
        frontPhoto,
        frontBase64,
        capture,
        pickImage,
        confirmPhoto: vmConfirmPhoto,
        retakePhoto,
    } = useScanViewModel({
        mode: 'baldness',
        initialState: 'scanning_front'
    });

    useEffect(() => {
        if (!permission?.granted && !showTutorial) {
            requestPermission();
        }
    }, [showTutorial, permission]);

    const handleContinue = () => {
        setShowTutorial(false);
    };

    const confirmPhoto = () => {
        // Navigate to profile tutorial with the captured front photo
        navigation.navigate('BaldnessProfileTutorial', { 
            frontPhoto: frontPhoto || undefined,
            frontBase64: frontBase64 || undefined
        });
    };

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
                            Foto Frontal
                        </Text>
                        <View className="w-10" />
                    </View>

                    <ScanOverlay
                        cameraRef={cameraRef}
                        isPreview={isPreview}
                        currentPhoto={frontPhoto}
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
                        Foto Frontal
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
                            source={require('../../../../../assets/images/tutorial/tutorial_front_bald.jpg')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Instructions */}
                    <View className="w-full space-y-4 mb-8">
                        <View className="flex-row items-center mb-6">
                            <View className="mr-3">
                                <Ionicons name="hand-left-outline" size={24} color="black" />
                            </View>
                            <Text className="flex-1 text-base text-gray-700">
                                Levántate el flequillo con la mano
                            </Text>
                        </View>

                        <View className="flex-row items-center mb-6">
                            <View className="mr-3">
                                <Ionicons name="bulb-outline" size={24} color="black" />
                            </View>
                            <Text className="flex-1 text-base text-gray-700">
                                Haz la foto con buena iluminación
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <View className="mr-3">
                                <Ionicons name="eye-outline" size={24} color="black" />
                            </View>
                            <Text className="flex-1 text-base text-gray-700">
                                Asegúrate de que se vea bien tu línea capilar
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

