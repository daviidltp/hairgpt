import { IconButton } from '@/core/ui';
import { AnalysisRepository } from '@/features/scan/data/repositories/AnalysisRepository';
import { BaldnessAnalysisRepository } from '@/features/scan/data/repositories/BaldnessAnalysisRepository';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeCard } from './components/HomeCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Repository instances
const analysisRepository = new AnalysisRepository();
const baldnessRepository = new BaldnessAnalysisRepository();

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const handlePress = (screen: keyof RootStackParamList, params?: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate(screen, params);
    };

    const handleMockHaircutAnalysis = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        try {
            const analysisData = await analysisRepository.fetchAnalysisById('mock-1');
            navigation.navigate('ScanResults', {
                analysisData,
                frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png'),
            });
        } catch (e) {
            console.error('Failed to load mock analysis:', e);
        }
    };

    const handleMockBaldnessAnalysis = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        try {
            const analysisData = await baldnessRepository.fetchBaldnessAnalysisById('mock-baldness-1');
            navigation.navigate('BaldnessResults', {
                analysisData,
                frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png'),
                crownPhoto: require('../../../../assets/images/haircuts/profile_pic.png'),
            });
        } catch (e) {
            console.error('Failed to load mock baldness analysis:', e);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-6 pt-6 pb-2 flex-row justify-between items-center">
                <Text className="text-3xl font-bold text-primary">
                    HairGPT
                </Text>
                <View className="flex-row gap-2">
                    {/* Debug Buttons */}
                    <TouchableOpacity
                        onPress={() => handlePress('FrontPhotoTutorial', { mode: 'haircut' })}
                        className="w-11 h-11 rounded-full bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 20 }}>🧪</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleMockHaircutAnalysis}
                        className="w-11 h-11 rounded-full bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 20 }}>💇‍♂️</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleMockBaldnessAnalysis}
                        className="w-11 h-11 rounded-full bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 20 }}>👨‍🦲</Text>
                    </TouchableOpacity>


                    <IconButton
                        icon="settings-outline"
                        onPress={() => handlePress('Settings')}
                    />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingBottom: 60, paddingTop: 20, gap: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <HomeCard
                    title="Descubre tu tipo de rostro"
                    description="Descubre los mejores cortes de pelo para tu tipo de cara"
                    imageSource={require('../../../../assets/images/haircuts/hair_analyzer.png')}
                    onPress={() => handlePress('FrontPhotoTutorial')}
                />

                <HomeCard
                    title="¿Me voy a quedar calvo?"
                    description="Analizamos tu tipo de pelo para saber si tienes probabilidad de quedarte calvo"
                    imageSource={require('../../../../assets/images/haircuts/bald_analyzer.png')}
                    onPress={() => handlePress('BaldnessFrontTutorial')}
                />

            </ScrollView>
        </SafeAreaView >
    );
}
