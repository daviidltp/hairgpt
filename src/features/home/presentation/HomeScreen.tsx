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
}
