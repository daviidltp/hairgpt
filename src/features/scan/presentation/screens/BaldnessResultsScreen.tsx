import { PrimaryButton } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image as RNImage, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PropertyCard, PropertyProgressBar, ResultsHeader } from '../components';
import { useBaldnessResults } from '../hooks/useBaldnessResults';

type BaldnessResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BaldnessResults'>;
type BaldnessResultsScreenRouteProp = RouteProp<RootStackParamList, 'BaldnessResults'>;


export function BaldnessResultsScreen() {
    const navigation = useNavigation<BaldnessResultsScreenNavigationProp>();
    const route = useRoute<BaldnessResultsScreenRouteProp>();

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

                {/* Probability Section */}
                <View className="mt-6 px-6">
                    <Text className="text-xl font-bold text-black mb-4">
                        Probabilidad de quedarte calvo
                    </Text>
                    <PropertyProgressBar 
                        label="Probabilidad" 
                        value={parsedResult.baldnessProbability / 10} 
                    />
                    <Text className="text-gray-600 text-base leading-6 mt-2">
                        {parsedResult.summary}
                    </Text>
                </View>

                {/* Hair Properties */}
                <View className="mt-8 px-6">
                    <Text className="text-xl font-bold text-black mb-4">
                        Estado del cabello
                    </Text>
                    <View className="flex-row flex-wrap justify-between gap-y-3">
                        <View className="w-[48%]">
                            <PropertyCard label="Densidad" value={parsedResult.density} />
                        </View>
                        <View className="w-[48%]">
                            <PropertyCard label="Textura" value={parsedResult.texture} />
                        </View>
                        <View className="w-[48%]">
                            <PropertyCard label="Porosidad" value={parsedResult.porosity} />
                        </View>
                        <View className="w-[48%]">
                            <PropertyCard label="Volumen" value={parsedResult.volume} />
                        </View>
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
