import { Colors } from '@/core/theme/colors';
import { IconButton, PrimaryButton, ScalePressable } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar barStyle="dark-content" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-6 pt-6 pb-4 flex-row justify-between items-start">
                    <View>
                        <Text className="text-4xl font-bold text-primary mb-2">
                            HairGPT
                        </Text>
                        <Text className="text-lg text-secondary">
                            Analyze your look
                        </Text>
                    </View>
                    <View className="flex-row gap-2">
                        <IconButton
                            icon="settings-outline"
                            onPress={() => navigation.navigate('Settings')}
                        />
                    </View>
                </View>

                {/* Main Action Section */}
                <View className="flex-1 px-6 justify-center items-center mt-8">
                    <ScalePressable
                        onPress={() => navigation.navigate('ScanFace')}
                        className="w-full aspect-square bg-surface rounded-[32px] items-center justify-center mb-8 p-8 shadow-sm border border-gray-100"
                    >
                        <View className="w-24 h-24 bg-primary/5 rounded-full items-center justify-center mb-6">
                            <Ionicons name="scan-outline" size={48} color={Colors.primary} />
                        </View>
                        <Text className="text-primary font-bold text-2xl mb-3 text-center">
                            Face Analysis
                        </Text>
                        <Text className="text-secondary text-center text-base leading-6">
                            Let AI analyze your face shape and suggest the perfect haircut for you.
                        </Text>
                    </ScalePressable>

                    <PrimaryButton
                        label="Start Analysis"
                        onPress={() => navigation.navigate('ScanFace')}
                    />

                    <View className="h-4" />

                    {/* Debug/Mock Options */}
                    <View className="flex-row gap-2 w-full">
                        <ScalePressable
                            onPress={() => navigation.navigate('ScanFace', { mock: true } as any)}
                            className="flex-1 h-12 bg-gray-100 rounded-xl items-center justify-center"
                        >
                            <Text className="text-gray-500 font-medium text-sm">Mock Scan</Text>
                        </ScalePressable>

                        <ScalePressable
                            onPress={() => navigation.navigate('ScanResults', {
                                analysisResult: "## Mock Analysis Result\n\nThis is a simulated result.\n\n- **Face Shape:** Oval\n- **Hair Type:** Wavy\n- **Recommendation:** Textured Crop",
                                frontPhoto: require('../../../../assets/images/haircuts/front_image.png'),
                                profilePhoto: require('../../../../assets/images/haircuts/profile_pic.png')
                            } as any)}
                            className="flex-1 h-12 bg-gray-100 rounded-xl items-center justify-center"
                        >
                            <Text className="text-gray-500 font-medium text-sm">Mock Results</Text>
                        </ScalePressable>
                    </View>

                    <Text className="text-secondary text-center mt-8 text-sm px-8">
                        We'll scan your face from the front and side to create a 3D understanding of your profile.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
