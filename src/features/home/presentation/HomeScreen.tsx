import { IconButton } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeCard } from './components/HomeCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const handlePress = (screen: keyof RootStackParamList, params?: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate(screen, params);
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
                        onPress={() => handlePress('ScanFace', { mock: true })}
                        className="w-11 h-11 rounded-full bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 20 }}>🧪</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handlePress('ScanResults', {
                            analysisResult: "## Mock Analysis Result\n\nThis is a simulated result.\n\n- **Face Shape:** Oval\n- **Hair Type:** Wavy\n- **Recommendation:** Textured Crop",
                            frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                            profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png')
                        })}
                        className="w-11 h-11 rounded-full bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 20 }}>💇‍♂️</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handlePress('BaldnessResults', {
                            analysisResult: JSON.stringify({
                                baldnessProbability: 45,
                                density: 6,
                                texture: 7,
                                porosity: 5,
                                volume: 8,
                                summary: "Mock summary"
                            }),
                            frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                            profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png'),
                            crownPhoto: require('../../../../assets/images/haircuts/profile_pic.png')
                        })}
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
                    onPress={() => handlePress('ScanFace')}
                />

                <HomeCard
                    title="¿Me voy a quedar calvo?"
                    description="Analizamos tu tipo de pelo para saber si tienes probabilidad de quedarte calvo"
                    imageSource={require('../../../../assets/images/haircuts/bald_analyzer.png')}
                    onPress={() => handlePress('ScanFace', { mode: 'baldness' })}
                />

            </ScrollView>
        </SafeAreaView>
    );
}
