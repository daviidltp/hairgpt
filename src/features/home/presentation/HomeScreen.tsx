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
                    <IconButton
                        icon="settings-outline"
                        onPress={() => handlePress('Settings')}
                    />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40, paddingTop: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Card 1: Haircut Analysis */}
                <ScalePressable
                    onPress={() => handlePress('ScanFace')}
                    className="w-full h-[45%] bg-surface rounded-[32px] p-6 mb-6 items-center justify-between shadow-sm border border-gray-100 overflow-hidden relative"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 10,
                        elevation: 2,
                    }}
                >
                    <Image
                        source={require('../../../../assets/images/haircuts/hair_analyzer.png')}
                        className="absolute w-full h-full opacity-20"
                        resizeMode="cover"
                    />
                    <View className="z-10 items-center w-full h-full justify-center">
                        <Text className="text-primary font-bold text-3xl mb-2 text-center">
                            Descubre tu corte ideal
                        </Text>
                        <Text className="text-secondary text-center text-lg leading-6 px-4">
                            Analizamos tu cara para recomendarte el mejor estilo
                        </Text>
                    </View>
                </ScalePressable>

                {/* Card 2: Baldness Analysis */}
                <ScalePressable
                    onPress={() => handlePress('ScanFace')}
                    className="w-full h-[35%] bg-surface rounded-[32px] p-6 mb-8 items-center justify-between shadow-sm border border-gray-100 overflow-hidden relative"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 10,
                        elevation: 2,
                    }}
                >
                    <Image
                        source={require('../../../../assets/images/haircuts/bald_analyzer.png')}
                        className="absolute w-full h-full opacity-20"
                        resizeMode="cover"
                    />
                    <View className="z-10 items-center w-full h-full justify-center">
                        <Text className="text-primary font-bold text-2xl mb-2 text-center">
                            ¿Me voy a quedar calvo?
                        </Text>
                        <Text className="text-secondary text-center text-base leading-5 px-2">
                            Analizamos tu tipo de pelo para saber si tienes probabilidad de quedarte calvo
                        </Text>
                    </View>
                </ScalePressable>

                {/* Debug/Mock Options (Small) */}
                <View className="flex-row gap-2 w-full justify-center opacity-50">
                    <ScalePressable
                        onPress={() => handlePress('ScanFace', { mock: true })}
                        className="px-4 py-2 bg-gray-100 rounded-full"
                    >
                        <Text className="text-gray-500 text-xs">Mock Scan</Text>
                    </ScalePressable>

                    <ScalePressable
                        onPress={() => handlePress('ScanResults', {
                            analysisResult: "## Mock Analysis Result\n\nThis is a simulated result.\n\n- **Face Shape:** Oval\n- **Hair Type:** Wavy\n- **Recommendation:** Textured Crop",
                            frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                            profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png')
                        })}
                        className="px-4 py-2 bg-gray-100 rounded-full"
                    >
                        <Text className="text-gray-500 text-xs">Mock Results</Text>
                    </ScalePressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
