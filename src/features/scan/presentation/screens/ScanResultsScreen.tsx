import { PrimaryButton } from '@/core/ui';
import { AnalysisData, getFaceShapeData, getHairTypeData } from '@/features/scan/data/analysisDescriptions';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image as RNImage, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalysisStatsCard } from '../components/AnalysisStatsCard';
import { PhotosDisplay } from '../components/PhotosDisplay';
import { RecommendationsSection } from '../components/RecommendationsSection';
import { ResultsHeader } from '../components/ResultsHeader';

type ScanResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScanResults'>;
type ScanResultsScreenRouteProp = RouteProp<RootStackParamList, 'ScanResults'>;

export function ScanResultsScreen() {
    const navigation = useNavigation<ScanResultsScreenNavigationProp>();
    const route = useRoute<ScanResultsScreenRouteProp>();
    const { analysisResult, frontPhoto, profilePhoto } = route.params as {
        analysisResult: string;
        frontPhoto: any;
        profilePhoto: any;
    };

    // Bottom Sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['85%'], []);
    const [explanation, setExplanation] = useState<{ title: string; data: AnalysisData } | null>(null);

    // Extract data from analysis result or default to placeholders
    const faceShapeMatch = analysisResult.match(/\*\*Face Shape:\*\*\s*(.*)/i);
    const hairTypeMatch = analysisResult.match(/\*\*Hair Type:\*\*\s*(.*)/i);

    const faceShape = faceShapeMatch ? faceShapeMatch[1].trim() : 'Oval';
    const hairType = hairTypeMatch ? hairTypeMatch[1].trim() : 'Curly hair';

    const handlePresentModalPress = useCallback((type: 'face' | 'hair') => {
        if (type === 'face') {
            setExplanation({
                title: `Face Shape: ${faceShape}`,
                data: getFaceShapeData(faceShape)
            });
        } else {
            setExplanation({
                title: `Hair Type: ${hairType}`,
                data: getHairTypeData(hairType)
            });
        }
        bottomSheetModalRef.current?.present();
    }, [faceShape, hairType]);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );

    const handleReset = () => {
        // Navigate back to home or scan screen
        navigation.navigate('Home');
    };

    const handleClose = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                <ResultsHeader onClose={handleClose} />

                <PhotosDisplay frontPhoto={frontPhoto} profilePhoto={profilePhoto} />

                {/* Stats Cards */}
                <View className="flex-row gap-2 mt-8 px-6">
                    <AnalysisStatsCard
                        label="Forma de cara"
                        value={faceShape}
                        onPress={() => handlePresentModalPress('face')}
                    />
                    <AnalysisStatsCard
                        label="Tipo de pelo"
                        value={hairType}
                        onPress={() => handlePresentModalPress('hair')}
                    />
                </View>

                <RecommendationsSection analysisResult={analysisResult} />

                <View className="h-10" />
                <View className="px-6">
                    <PrimaryButton label="Scan Again" onPress={handleReset} />
                </View>
            </ScrollView>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: 'white', borderRadius: 24 }}
            >
                <BottomSheetView className="flex-1 px-6 pt-4 pb-8">
                    {explanation && (
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-primary mb-4 text-center">
                                {explanation.title}
                            </Text>
                            <Text className="text-base text-gray-600 leading-6 text-center mb-8">
                                {explanation.data.description}
                            </Text>

                            <Text className="text-lg font-bold text-primary mb-4 text-center">
                                Celebridades con este rasgo
                            </Text>

                            <View className="flex-row justify-center gap-4">
                                {explanation.data.celebrities.map((imgSource, index) => (
                                    <View key={index} className="w-32 h-40 rounded-xl overflow-hidden bg-gray-100">
                                        <RNImage
                                            source={imgSource}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </BottomSheetView>
            </BottomSheetModal>
        </SafeAreaView>
    );
}
