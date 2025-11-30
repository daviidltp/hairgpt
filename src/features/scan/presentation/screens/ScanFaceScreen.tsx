import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCameraPermissions } from 'expo-camera';
import React, { useEffect } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalysisVisualizer } from '../components/AnalysisVisualizer';
import { ScanControls } from '../components/ScanControls';
import { ScanHeader } from '../components/ScanHeader';
import { ScanOverlay } from '../components/ScanOverlay';
import { ScanPermissionView } from '../components/ScanPermissionView';
import { useScanViewModel } from '../hooks/useScanViewModel';

type ScanFaceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScanFace'>;

export function ScanFaceScreen() {
    const navigation = useNavigation<ScanFaceScreenNavigationProp>();
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
    } = useScanViewModel({ initialMock: route.params?.mock, mockResults: route.params?.mockResults });

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

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
            navigation.navigate('ScanResults', {
                analysisResult,
                frontPhoto,
                profilePhoto,
            });
        }
    }, [state, analysisResult, frontPhoto, profilePhoto, navigation]);

    if (state === 'analyzing') {
        const isMock = route.params?.mock;
        // If mock, use default asset, otherwise use captured front photo
        const photoUri = isMock
            ? require('../../../../../assets/images/haircuts/default.png')
            : frontPhoto;

        return <AnalysisVisualizer photoUri={photoUri} isAnalyzing={progress < 100} />;
    }

    if (!permission) return <View />;
    if (!permission.granted) {
        return <ScanPermissionView onRequestPermission={requestPermission} />;
    }

    const isPreview = state === 'preview_front' || state === 'preview_profile';
    const currentPhoto = state.includes('front') ? frontPhoto : profilePhoto;
    const headerTitle = state.includes('front') ? 'Front Photo' : 'Profile Photo';
    const instructionText = state.includes('front')
        ? 'Align your face within the frame looking straight ahead.'
        : 'Turn to the side and align your profile within the frame.';

    const safeAreaEdges: ('top' | 'bottom')[] = ['top', 'bottom'];

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1" edges={safeAreaEdges}>
                <ScanHeader
                    title={headerTitle}
                    onBack={() => navigation.goBack()}
                />

                <ScanOverlay
                    cameraRef={cameraRef}
                    isPreview={isPreview}
                    currentPhoto={currentPhoto}
                    instructionText={instructionText}
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
