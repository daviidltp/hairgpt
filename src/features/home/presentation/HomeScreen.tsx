import { IconButton, ScalePressable } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                    <IconButton
                        icon="flask-outline"
                        onPress={() => handlePress('ScanFace', { mock: true })}
                        size={20}
                    />
                    <IconButton
                        icon="eye-outline"
                        onPress={() => handlePress('ScanResults', {
                            analysisResult: "## Mock Analysis Result\n\nThis is a simulated result.\n\n- **Face Shape:** Oval\n- **Hair Type:** Wavy\n- **Recommendation:** Textured Crop",
                            frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                            profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png')
                        })}
                        size={20}
                    />
                    <IconButton
                        icon="settings-outline"
                        onPress={() => handlePress('Settings')}
                    />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40, paddingTop: 20, gap: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Card 1: Haircut Analysis */}
                <ScalePressable
                    onPress={() => handlePress('ScanFace')}
                    className="w-full h-96 bg-surface rounded-[32px]"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4.3,
                        elevation: 4,
                    }}
                >
                    <View className="flex-1 rounded-[32px] overflow-hidden">
                        {/* Image Section - Takes remaining space */}
                        <View className="flex-1 items-center justify-center relative pt-4">
                            <Image
                                source={require('../../../../assets/images/haircuts/hair_analyzer.png')}
                                className="w-72 h-72"
                                resizeMode="contain"
                            />
                        </View>

                        {/* Text Section - Auto sized based on content */}
                        <View className="px-6 py-6 items-center justify-center bg-surface">
                            <Text className="text-primary font-bold text-3xl mb-2 text-center">
                                Descubre tu tipo de rostro
                            </Text>
                            <Text className="text-secondary text-center text-lg leading-5">
                                Descubre los mejores cortes de pelo para tu tipo de cara
                            </Text>
                        </View>
                    </View>
                </ScalePressable>

                {/* Card 2: Baldness Analysis */}
                <ScalePressable
                    onPress={() => handlePress('ScanFace')}
                    className="w-full h-96 bg-surface rounded-[32px]"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4.3,
                        elevation: 4,
                    }}
                >
                    <View className="flex-1 rounded-[32px] overflow-hidden">
                        {/* Image Section - Takes remaining space */}
                        <View className="flex-1 items-center justify-center relative pt-4">
                            <Image
                                source={require('../../../../assets/images/haircuts/bald_analyzer.png')}
                                className="w-72 h-72"
                                resizeMode="contain"
                            />
                        </View>

                        {/* Text Section - Auto sized based on content */}
                        <View className="px-6 py-6 items-center justify-center bg-surface">
                            <Text className="text-primary font-bold text-3xl mb-2 text-center">
                                ¿Me voy a quedar calvo?
                            </Text>
                            <Text className="text-secondary text-center text-lg leading-5">
                                Analizamos tu tipo de pelo para saber si tienes probabilidad de quedarte calvo
                            </Text>
                        </View>
                    </View>
                </ScalePressable>

            </ScrollView>
        </SafeAreaView>
    );
}
