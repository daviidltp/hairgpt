import { PrimaryButton } from '@/core/ui';
import { BaldnessFeatureData, getBaldnessFeatureData } from '@/features/scan/data/baldnessDescriptions';
import { useBaldnessResults } from '@/features/scan/presentation/hooks/useBaldnessResults';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image as RNImage, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalysisStatsCard } from '../components/AnalysisStatsCard';
import { ResultsHeader } from '../components/ResultsHeader';

type BaldnessResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BaldnessResults'>;
type BaldnessResultsScreenRouteProp = RouteProp<RootStackParamList, 'BaldnessResults'>;


export function BaldnessResultsScreen() {
    const navigation = useNavigation<BaldnessResultsScreenNavigationProp>();
    const route = useRoute<BaldnessResultsScreenRouteProp>();

    // Bottom Sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%'], []);
    const [selectedFeature, setSelectedFeature] = useState<BaldnessFeatureData | null>(null);

    // Get analysis result from route params
    const { analysisResult, frontPhoto, profilePhoto, crownPhoto } = route.params;

    // Parse the analysis result using ViewModel hook
    const parsedResult = useBaldnessResults(analysisResult);

    const handleClose = () => {
        navigation.navigate('Home');
    };

    const handleReset = () => {
        navigation.navigate('Home');
    };

    const handleCardPress = useCallback((feature: 'density' | 'texture' | 'porosity' | 'volume', score: number) => {
        const data = getBaldnessFeatureData(feature, score);
        setSelectedFeature(data);
        bottomSheetModalRef.current?.present();
    }, []);

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

    const renderPhoto = (photo: any, index: number) => (
        <View
            key={index}
            className="w-32 h-32 rounded-full border-4 border-black overflow-hidden shadow-sm bg-gray-200"
            style={{ marginLeft: index === 0 ? 0 : -30, zIndex: 30 - index * 10 }}
        >
            <RNImage
                source={typeof photo === 'number' ? photo : { uri: photo || undefined }}
                className="w-full h-full"
                resizeMode="cover"
            />
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                <ResultsHeader onClose={handleClose} />

                <View className="items-center mt-4">
                    <View className="flex-row justify-center items-center">
                        {renderPhoto(frontPhoto, 0)}
                        {renderPhoto(profilePhoto, 1)}
                        {renderPhoto(crownPhoto, 2)}
                    </View>
                </View>

                {/* Probability Card */}
                <View className="mx-6 mt-8 bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm">
                    <Text className="text-center text-lg font-semibold text-black mb-2">
                        Probabilidad de quedarte calvo
                    </Text>
                    <View className="items-center">
                        <Text className="text-5xl font-bold text-primary">
                            {parsedResult.baldnessProbability}%
                        </Text>
                        <Text className="text-center text-gray-500 mt-2 text-sm px-4">
                            {parsedResult.summary}
                        </Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View className="flex-row flex-wrap gap-2 px-6 mt-6 justify-between">
                    <View className="w-[48%]">
                        <AnalysisStatsCard
                            label="Densidad"
                            value={`${parsedResult.density}/10`}
                            onPress={() => handleCardPress('density', parsedResult.density)}
                        />
                    </View>
                    <View className="w-[48%]">
                        <AnalysisStatsCard
                            label="Textura"
                            value={`${parsedResult.texture}/10`}
                            onPress={() => handleCardPress('texture', parsedResult.texture)}
                        />
                    </View>
                    <View className="w-[48%]">
                        <AnalysisStatsCard
                            label="Porosidad"
                            value={`${parsedResult.porosity}/10`}
                            onPress={() => handleCardPress('porosity', parsedResult.porosity)}
                        />
                    </View>
                    <View className="w-[48%]">
                        <AnalysisStatsCard
                            label="Volumen"
                            value={`${parsedResult.volume}/10`}
                            onPress={() => handleCardPress('volume', parsedResult.volume)}
                        />
                    </View>
                </View>

                <View className="h-10" />
                <View className="px-6">
                    <PrimaryButton label="Start Analysis" onPress={handleReset} />
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
                    {selectedFeature && (
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-primary mb-2 text-center">
                                {selectedFeature.title}
                            </Text>
                            <Text className="text-lg font-semibold text-black mb-4 text-center">
                                {selectedFeature.levelDescription}
                            </Text>
                            <Text className="text-base text-gray-600 leading-6 text-center">
                                {selectedFeature.description}
                            </Text>
                        </View>
                    )}
                </BottomSheetView>
            </BottomSheetModal>
        </SafeAreaView>
    );
}
