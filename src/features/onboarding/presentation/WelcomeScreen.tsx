import { PrimaryButton } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export function WelcomeScreen() {
    const navigation = useNavigation<NavigationProp>();

    const handleStart = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        navigation.navigate('Onboarding');
    };

    return (
        <View className="flex-1 bg-background justify-center items-center px-6">
            <StatusBar style="dark" />

            {/* Background Ambience - Subtle gradient or clean white */}
            <View className="absolute inset-0 bg-surface opacity-50" />

            <Animated.View
                entering={FadeInDown.delay(200).springify()}
                className="items-center"
            >
                <Text className="text-5xl font-bold text-primary mb-2 tracking-tighter">
                    HairGPT
                </Text>
                <Text className="text-xl text-secondary mb-12 tracking-widest uppercase">
                    Your Personal AI Stylist
                </Text>
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(400).springify()}
                className="w-full absolute bottom-12"
            >
                <PrimaryButton
                    label="Get Started"
                    onPress={handleStart}
                />
            </Animated.View>
        </View>
    );
}
