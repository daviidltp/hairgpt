import { GeminiService } from '@/core/services/GeminiService';
import { CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';

export type ScanState =
    | 'scanning_front'
    | 'preview_front'
    | 'scanning_profile'
    | 'preview_profile'
    | 'analyzing'
    | 'results';

export function useScanViewModel() {
    const [state, setState] = useState<ScanState>('scanning_front');
    const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    // Base64 storage
    const [frontBase64, setFrontBase64] = useState<string | null>(null);
    const [profileBase64, setProfileBase64] = useState<string | null>(null);

    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const cameraRef = useRef<CameraView>(null);

    const capture = async () => {
        if (!cameraRef.current) return;

        try {
            console.log('Capturing photo...');
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.5,
                skipProcessing: true,
            });
            console.log('Photo captured. URI:', photo?.uri);

            if (state === 'scanning_front') {
                setFrontPhoto(photo?.uri || null);
                setFrontBase64(photo?.base64 || null);
                setState('preview_front');
            } else if (state === 'scanning_profile') {
                setProfilePhoto(photo?.uri || null);
                setProfileBase64(photo?.base64 || null);
                setState('preview_profile');
            }
        } catch (error) {
            console.error('Capture Error:', error);
            Alert.alert('Error', 'Failed to capture photo');
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.5,
                base64: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                if (state === 'scanning_front') {
                    setFrontPhoto(asset.uri);
                    setFrontBase64(asset.base64 || null);
                    setState('preview_front');
                } else if (state === 'scanning_profile') {
                    setProfilePhoto(asset.uri);
                    setProfileBase64(asset.base64 || null);
                    setState('preview_profile');
                }
            }
        } catch (error) {
            console.error('Pick Image Error:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const confirmPhoto = async () => {
        if (state === 'preview_front') {
            setState('scanning_profile');
        } else if (state === 'preview_profile') {
            setState('analyzing');
            startAnalysis();
        }
    };

    const retakePhoto = () => {
        if (state === 'preview_front') {
            setFrontPhoto(null);
            setFrontBase64(null);
            setState('scanning_front');
        } else if (state === 'preview_profile') {
            setProfilePhoto(null);
            setProfileBase64(null);
            setState('scanning_profile');
        }
    };

    const startAnalysis = async () => {
        // 15 seconds target duration
        // 100 steps -> 150ms per step
        let currentProgress = 0;

        const interval = setInterval(() => {
            currentProgress += 1;

            // Trigger light haptic on every tick
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            if (currentProgress >= 99) {
                // Pause at 99% until API returns
                setProgress(99);
            } else {
                setProgress(currentProgress);
            }
        }, 150);

        try {
            console.log('Starting Analysis...');
            const result = await GeminiService.analyzeHaircut(
                frontBase64 || undefined,
                profileBase64 || undefined
            );

            clearInterval(interval);

            // Fast forward to 100% if done early
            setProgress(100);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            // Small delay to show 100% before switching
            setTimeout(() => {
                setAnalysisResult(result);
                setState('results');
            }, 500);

        } catch (error) {
            clearInterval(interval);
            console.error('Analysis Error:', error);
            Alert.alert('Error', 'Analysis failed');
            setState('scanning_front');
            setFrontPhoto(null);
            setProfilePhoto(null);
        }
    };

    const reset = () => {
        setState('scanning_front');
        setFrontPhoto(null);
        setProfilePhoto(null);
        setFrontBase64(null);
        setProfileBase64(null);
        setAnalysisResult(null);
        setProgress(0);
    };

    return {
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
    };
}
