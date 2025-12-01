import { PrimaryButton } from '@/core/ui/buttons/PrimaryButton';
import { getFaceShapeData, getHairTypeData } from '@/features/scan/data/analysisDescriptions';
import { AnalysisBottomSheet } from '@/features/scan/presentation/components/AnalysisBottomSheet';
import { AnalysisStatsCard } from '@/features/scan/presentation/components/AnalysisStatsCard';
import { HaircutSection } from '@/features/scan/presentation/components/HaircutSection';
import { PhotosDisplay } from '@/features/scan/presentation/components/PhotosDisplay';
import { ResultsHeader } from '@/features/scan/presentation/components/ResultsHeader';
import { ScanResultsScreenNavigationProp, ScanResultsScreenRouteProp } from '@/navigation/AppNavigator';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HaircutRecommendation {
    name: string;
    description: string;
}

interface AnalysisResult {
    faceShape: string;
    hairType: string;
    explanation: string;
    recommendations: HaircutRecommendation[];
}

export function ScanResultsScreen() {
    const navigation = useNavigation<ScanResultsScreenNavigationProp>();
    const route = useRoute<ScanResultsScreenRouteProp>();
    const { analysisResult, frontPhoto, profilePhoto } = route.params as {
        analysisResult: string;
        frontPhoto: any;
        profilePhoto: any;
    };

    // BottomSheet refs
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['65%'], []);
    const [modalContent, setModalContent] = React.useState<'face' | 'hair'>('face');

    // Parse the analysis result
    const parsedResult: AnalysisResult = useMemo(() => {
        try {
            // Clean the string if it contains markdown code blocks
            let jsonString = analysisResult;
            if (jsonString.includes('```json')) {
                jsonString = jsonString.replace(/```json\n/g, '').replace(/\n```/g, '');
            } else if (jsonString.includes('```')) {
                jsonString = jsonString.replace(/```\n/g, '').replace(/\n```/g, '');
            }

            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse analysis result:", e);
            return {
                faceShape: "Desconocido",
                hairType: "Desconocido",
                explanation: "No se pudo analizar el resultado.",
                recommendations: []
            };
        }
    }, [analysisResult]);

    const handleClose = () => {
        navigation.navigate('Home');
    };

    const handleReset = () => {
        navigation.navigate('ScanFace', { mode: 'haircut' });
    };

    const handlePresentModalPress = useCallback((type: 'face' | 'hair') => {
        setModalContent(type);
        bottomSheetModalRef.current?.present();
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.6}
            />
        ),
        []
    );

    const getModalData = () => {
        if (modalContent === 'face') {
            return getFaceShapeData(parsedResult.faceShape);
        } else {
            return getHairTypeData(parsedResult.hairType);
        }
    };

    const modalData = getModalData();

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-background" edges={['top']}>
                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                    <ResultsHeader onClose={handleClose} />

                    <PhotosDisplay frontPhoto={frontPhoto} profilePhoto={profilePhoto} />

                    <View className="flex-row gap-2 mt-8 px-6">
                        <AnalysisStatsCard
                            label="Forma de cara"
                            value={parsedResult.faceShape}
                            onPress={() => handlePresentModalPress('face')}
                        />
                        <AnalysisStatsCard
                            label="Tipo de pelo"
                            value={parsedResult.hairType}
                            onPress={() => handlePresentModalPress('hair')}
                        />
                    </View>

                    <View className="px-6 mt-6 mb-8">
                        <Text className="text-lg text-foreground leading-relaxed">
                            {parsedResult.explanation}
                        </Text>
                    </View>

                    <View className="mb-4 px-6">
                        <Text className="text-xl font-bold text-foreground">Mejores cortes para ti</Text>
                    </View>

                    {parsedResult.recommendations.map((rec, index) => (
                        <HaircutSection
                            key={index}
                            title={rec.name}
                            rank={index + 1}
                        />
                    ))}

                    <View className="h-10" />

                    <View className="px-6">
                        <PrimaryButton label="Escanear de nuevo" onPress={handleReset} />
                    </View>
                </ScrollView>


                <AnalysisBottomSheet
                    bottomSheetRef={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    renderBackdrop={renderBackdrop}
                    title={modalContent === 'face' ? parsedResult.faceShape : parsedResult.hairType}
                    data={modalData}
                />
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}
