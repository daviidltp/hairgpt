import { Colors } from '@/core/theme/colors';
import { PrimaryButton, ScalePressable } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, Image as RNImage, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PropertyCard, PropertyProgressBar, ResultsHeader } from '../components';

type BaldnessResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BaldnessResults'>;
type BaldnessResultsScreenRouteProp = RouteProp<RootStackParamList, 'BaldnessResults'>;

export function BaldnessResultsScreen() {
    const navigation = useNavigation<BaldnessResultsScreenNavigationProp>();
    const route = useRoute<BaldnessResultsScreenRouteProp>();
    const { analysisData, frontPhoto, profilePhoto, crownPhoto } = route.params;

    const handleClose = () => {
        navigation.navigate('Home');
    };

    const handleReset = () => {
        navigation.navigate('Home');
    };

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

    const { width: screenWidth } = Dimensions.get('window');
    const [activeSlide, setActiveSlide] = React.useState(0);

    const handleScroll = (event: any) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== activeSlide) {
            setActiveSlide(slide);
        }
    };

    const norwoodColors = [
        '#45B559', // Stage 1
        '#70B545', // Stage 2
        '#A6B545', // Stage 3
        '#DDC653', // Stage 4
        '#E29F57', // Stage 5
        '#E95959', // Stage 6
        '#C90000', // Stage 7
    ];

    // Helper to map string stage to index (0-6)
    const getNorwoodIndex = (stage: string | undefined): number => {
        if (!stage) return 0;
        const s = stage.toLowerCase();
        if (s.includes('1')) return 0;
        if (s.includes('2')) return 1;
        if (s.includes('3')) return 2;
        if (s.includes('4')) return 3;
        if (s.includes('5')) return 4;
        if (s.includes('6')) return 5;
        if (s.includes('7')) return 6;
        return 0;
    };

    // Helper to format display text
    const formatNorwoodStage = (stage: string | undefined): string => {
        if (!stage) return "N/A";
        const index = getNorwoodIndex(stage);
        return `Fase ${index + 1}`;
    };

    const activeNorwoodIndex = getNorwoodIndex(analysisData.norwoodStage);

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

                {/* Probability Section */}
                <View className="mt-6 px-6">
                    <Text className="text-xl font-bold text-black mb-4">
                        Probabilidad de quedarte calvo
                    </Text>
                    <PropertyProgressBar
                        label="Probabilidad"
                        value={analysisData.baldnessProbability / 10}
                    />
                    <Text className="text-gray-600 text-base leading-6 mt-2">
                        {analysisData.summary}
                    </Text>
                </View>

                {/* Carousel */}
                <View className="mt-8">
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {/* Slide 1: Diagnosis */}
                        <View style={{ width: screenWidth }} className="px-6">
                            {/* Norwood Card */}
                            <ScalePressable
                                className="bg-[#f5f5f5] rounded-[20px] p-4 mb-4 border border-gray-200"
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    // TODO: Show Norwood scale explanation
                                }}
                            >
                                <View className="flex-row justify-between items-center mb-3">
                                    <View>
                                        <Text className="text-gray-400 text-base font-medium">Escala Norwood</Text>
                                        <Text className="text-xl font-bold text-black">{formatNorwoodStage(analysisData.norwoodStage)}</Text>
                                    </View>
                                    <Ionicons name="information-circle-outline" size={18} color={Colors.textTertiary} />
                                </View>

                                <View className="flex-row h-8 w-full">
                                    {norwoodColors.map((color, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor: color,
                                                opacity: index === activeNorwoodIndex ? 1 : 0.3,
                                                transform: [{ scaleY: index === activeNorwoodIndex ? 1.2 : 1 }],
                                            }}
                                            className={`flex-1 mx-0.5 rounded-md ${index === activeNorwoodIndex ? 'border-2 border-black/10' : ''}`}
                                        />
                                    ))}
                                </View>
                            </ScalePressable>

                            <View className="flex-row flex-wrap justify-between gap-y-3">
                                <View className="w-[48%]">
                                    <PropertyCard label="Entradas" value={analysisData.recession || 0} />
                                </View>
                                <View className="w-[48%]">
                                    <PropertyCard label="Coronilla" value={analysisData.crownDensity || 0} />
                                </View>
                            </View>
                        </View>

                        {/* Slide 2: Health */}
                        <View style={{ width: screenWidth }} className="px-6">
                            <View className="flex-row flex-wrap justify-between gap-y-3">
                                <View className="w-[48%]">
                                    <PropertyCard label="Densidad" value={analysisData.density} />
                                </View>
                                <View className="w-[48%]">
                                    <PropertyCard label="Textura" value={analysisData.texture} />
                                </View>
                                <View className="w-[48%]">
                                    <PropertyCard label="Porosidad" value={analysisData.porosity} />
                                </View>
                                <View className="w-[48%]">
                                    <PropertyCard label="Volumen" value={analysisData.volume} />
                                </View>
                            </View>
                        </View>

                        {/* Slide 3: Recommendations */}
                        <View style={{ width: screenWidth }} className="px-6">
                            <View className="bg-gray-50 p-6 rounded-2xl border border-gray-100 items-center justify-center min-h-[200px]">
                                <Ionicons name="medical-outline" size={48} color="#ccc" />
                                <Text className="text-gray-500 text-center mt-4 font-medium">
                                    Recomendaciones personalizadas
                                </Text>
                                <Text className="text-gray-400 text-center text-sm mt-2">
                                    Próximamente disponible
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Pagination Dots */}
                    <View className="flex-row justify-center items-center mt-2 gap-2">
                        {[0, 1, 2].map((index) => (
                            <View
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === activeSlide ? 'bg-black w-2.5 h-2.5' : 'bg-gray-300'}`}
                            />
                        ))}
                    </View>
                </View>

                <View className="h-10" />
                <View className="px-6">
                    <PrimaryButton label="Nuevo análisis" onPress={handleReset} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
