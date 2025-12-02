import { PrimaryButton } from '@/core/ui/buttons/PrimaryButton';
import { HaircutRepository } from '@/features/scan/data/repositories/HaircutRepository';
import { ScanResultsScreenNavigationProp, ScanResultsScreenRouteProp } from '@/navigation/AppNavigator';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    AnalysisBottomSheet,
    AnalysisStatsCard,
    HaircutSection,
    PhotosDisplay,
    ResultsHeader
} from '../components';
import { useAnalysisData } from '../hooks/useAnalysisData';
import { useScanResults } from '../hooks/useScanResults';

// Repository instance (in a real app, this would come from DI container)
const haircutRepository = new HaircutRepository();


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
    const snapPoints = useMemo(() => ['45%'], []);
    const [modalContent, setModalContent] = React.useState<'face' | 'hair'>('face');

    // Parse the analysis result using ViewModel hook
    const parsedResult = useScanResults(analysisResult);

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

    const handleImagePress = useCallback((imageIndex: number, images: any[], haircutTitle: string) => {
        navigation.navigate('ImageGallery', {
            images,
            initialIndex: imageIndex,
            haircutTitle,
        });
    }, [navigation]);

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

    const modalData = useAnalysisData(
        modalContent,
        modalContent === 'face' ? parsedResult.faceShape : parsedResult.hairType
    );

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

                    <View className="px-6 mt-6 mb-2">
                        <Text className="text-xl font-bold text-foreground">Mejores cortes para ti</Text>
                    </View>

                    <View className="px-6 mb-8">
                        <Text className="text-lg text-foreground leading-relaxed">
                            {parsedResult.explanation}
                        </Text>
                    </View>

                    {parsedResult.recommendations.map((rec, index) => {
                        const images = haircutRepository.getHaircutImages(rec.name);
                        return (
                            <HaircutSection
                                key={index}
                                title={rec.name}
                                rank={index + 1}
                                images={images}
                                onImagePress={handleImagePress}
                            />
                        );
                    })}

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
