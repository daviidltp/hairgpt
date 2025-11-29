import { GeminiService } from '@/core/services/GeminiService';
import { CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export type ScanState =
    | 'scanning_front'
    | 'preview_front'
    | 'scanning_profile'
    | 'preview_profile'
    | 'analyzing'
    | 'results';

// Configuration for analysis progress animation
const PROGRESS_CONFIG = {
    FAST_START: { threshold: 20, stepTime: 50 },   // 0-20%: Fast
    NORMAL: { threshold: 50, stepTime: 150 },      // 20-50%: Normal
    SLOW_MIDDLE: { threshold: 80, stepTime: 300 }, // 50-80%: Slow (thinking)
    FAST_END: { threshold: 99, stepTime: 100 },    // 80-99%: Fast
};

export function useScanViewModel({ initialMock = false }: { initialMock?: boolean } = {}) {
    // ... existing state definitions ...
    const [state, setState] = useState<ScanState>(initialMock ? 'analyzing' : 'scanning_front');
    const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    // Base64 storage
    const [frontBase64, setFrontBase64] = useState<string | null>(null);
    const [profileBase64, setProfileBase64] = useState<string | null>(null);

    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const cameraRef = useRef<CameraView>(null);

    // Start mock analysis on mount if initialMock is true
    useEffect(() => {
        if (initialMock) {
            startAnalysis(true);
        }
    }, []);

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

    const startAnalysis = async (isMock = false) => {
        let currentProgress = 0;
        let interval: any;

        const runProgress = () => {
            let stepTime = PROGRESS_CONFIG.NORMAL.stepTime;

            if (currentProgress < PROGRESS_CONFIG.FAST_START.threshold) {
                stepTime = PROGRESS_CONFIG.FAST_START.stepTime;
            } else if (currentProgress < PROGRESS_CONFIG.NORMAL.threshold) {
                stepTime = PROGRESS_CONFIG.NORMAL.stepTime;
            } else if (currentProgress < PROGRESS_CONFIG.SLOW_MIDDLE.threshold) {
                stepTime = PROGRESS_CONFIG.SLOW_MIDDLE.stepTime;
            } else {
                stepTime = PROGRESS_CONFIG.FAST_END.stepTime;
            }

            interval = setTimeout(() => {
                currentProgress += 1;

                if (currentProgress >= 99) {
                    setProgress(99);
                } else {
                    setProgress(currentProgress);
                    runProgress();
                }
            }, stepTime);
        };

        runProgress();

        try {
            console.log('Starting Analysis...', isMock ? '(MOCK)' : '');

            let result;
            if (isMock) {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 8000));
                result = "## Mock Analysis Result\n\nThis is a simulated result for testing purposes.\n\n- **Face Shape:** Oval\n- **Hair Type:** Wavy\n- **Recommendation:** Textured Crop";
            } else {
                result = await GeminiService.analyzeHaircut(
                    frontBase64 || undefined,
                    profileBase64 || undefined
                );
            }

            clearTimeout(interval!);

            // Smooth fast forward to 100%
            const fastForward = async () => {
                const remaining = 100 - currentProgress;
                const steps = remaining;
                const duration = 500; // Complete in 500ms
                const stepTime = duration / steps;

                for (let i = currentProgress + 1; i <= 100; i++) {
                    setProgress(i);
                    await new Promise(resolve => setTimeout(resolve, stepTime));
                }

                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                setTimeout(() => {
                    setAnalysisResult(result);
                    setState('results');
                }, 500);
            };

            await fastForward();

        } catch (error) {
            clearTimeout(interval!);
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

    const startMockAnalysis = () => {
        setState('analyzing');
        startAnalysis(true);
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
        startMockAnalysis
    };
}
