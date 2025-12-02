import { GeminiService } from '@/core/services/GeminiService';
import { CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { MockDataRepository } from '../../data/repositories/MockDataRepository';

export type ScanState =
    | 'scanning_front'
    | 'preview_front'
    | 'scanning_profile'
    | 'preview_profile'
    | 'scanning_crown'
    | 'preview_crown'
    | 'analyzing'
    | 'results';

// Repository instances (in a real app, these would come from DI container)
const mockDataRepository = new MockDataRepository();

// Configuration for analysis progress animation
const PROGRESS_CONFIG = {
    FAST_START: { threshold: 20, stepTime: 350 },   // 0-20%: Normal
    NORMAL: { threshold: 50, stepTime: 450 },      // 20-50%: Fast
    SLOW_MIDDLE: { threshold: 80, stepTime: 250 }, // 50-80%: Slow (thinking)
    FAST_END: { threshold: 99, stepTime: 200 },    // 80-99%: Fast
};

export function useScanViewModel({
    initialMock = false,
    mockResults = false,
    mode = 'haircut',
    initialState = 'scanning_front',
    initialFrontPhoto = null,
    initialFrontBase64 = null,
    initialProfilePhoto = null,
    initialProfileBase64 = null
}: {
    initialMock?: boolean;
    mockResults?: boolean;
    mode?: 'haircut' | 'baldness';
    initialState?: ScanState;
    initialFrontPhoto?: string | number | null;
    initialFrontBase64?: string | null;
    initialProfilePhoto?: string | number | null;
    initialProfileBase64?: string | null;
} = {}) {
    const [state, setState] = useState<ScanState>(
        mockResults ? 'results' : (initialMock ? 'analyzing' : initialState)
    );
    const [frontPhoto, setFrontPhoto] = useState<string | number | null>(initialFrontPhoto);
    const [profilePhoto, setProfilePhoto] = useState<string | number | null>(initialProfilePhoto);
    const [crownPhoto, setCrownPhoto] = useState<string | number | null>(null);

    // Base64 storage
    const [frontBase64, setFrontBase64] = useState<string | null>(initialFrontBase64);
    const [profileBase64, setProfileBase64] = useState<string | null>(initialProfileBase64);
    const [crownBase64, setCrownBase64] = useState<string | null>(null);

    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const cameraRef = useRef<CameraView>(null);

    // Start mock analysis on mount if mockResults is true
    useEffect(() => {
        if (mockResults) {
            // Use mock data repository
            setFrontPhoto(mockDataRepository.getMockFrontPhoto() as number);
            setProfilePhoto(mockDataRepository.getMockProfilePhoto() as number);

            if (mode === 'baldness') {
                setCrownPhoto(mockDataRepository.getMockCrownPhoto() as number);
                const mockData = mockDataRepository.getMockBaldnessAnalysis();
                setAnalysisResult(JSON.stringify(mockData));
            } else {
                const mockData = mockDataRepository.getMockHaircutAnalysis();
                setAnalysisResult(JSON.stringify(mockData));
            }
        } else if (initialMock) {
            startAnalysis(true);
        }
    }, []);

    const capture = async () => {
        if (!cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.5,
                mirror: true,
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
            } else if (state === 'scanning_crown') {
                setCrownPhoto(photo?.uri || null);
                setCrownBase64(photo?.base64 || null);
                setState('preview_crown');
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
                } else if (state === 'scanning_crown') {
                    setCrownPhoto(asset.uri);
                    setCrownBase64(asset.base64 || null);
                    setState('preview_crown');
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
            if (mode === 'baldness') {
                setState('scanning_crown');
            } else {
                setState('analyzing');
                startAnalysis();
            }
        } else if (state === 'preview_crown') {
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
        } else if (state === 'preview_crown') {
            setCrownPhoto(null);
            setCrownBase64(null);
            setState('scanning_crown');
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

                // Use mock data repository
                if (mode === 'baldness') {
                    const mockData = mockDataRepository.getMockBaldnessAnalysis();
                    result = JSON.stringify(mockData);
                } else {
                    const mockData = mockDataRepository.getMockHaircutAnalysis();
                    result = JSON.stringify(mockData);
                }
            } else {
                if (mode === 'baldness') {
                    result = await GeminiService.analyzeBaldness(
                        frontBase64 || undefined,
                        profileBase64 || undefined,
                        crownBase64 || undefined
                    );
                } else {
                    result = await GeminiService.analyzeHaircut(
                        frontBase64 || undefined,
                        profileBase64 || undefined
                    );
                }
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
            setCrownPhoto(null);
        }
    };

    const reset = () => {
        setState('scanning_front');
        setFrontPhoto(null);
        setProfilePhoto(null);
        setCrownPhoto(null);
        setFrontBase64(null);
        setProfileBase64(null);
        setCrownBase64(null);
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
        crownPhoto,
        frontBase64,
        profileBase64,
        crownBase64,
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
