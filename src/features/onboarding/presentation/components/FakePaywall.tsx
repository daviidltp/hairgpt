import { Colors } from '@/core/theme/colors';
import { PrimaryButton } from '@/core/ui';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function FakePaywall() {
    const navigation = useNavigation();
    const { completeOnboarding, setAuth } = useAuthStore();

    const handleSubscribe = () => {
        completeOnboarding();
        setAuth({ id: '1', name: 'User', email: 'user@example.com' }, 'dummy-token');
        // Navigation will automatically happen because of AuthState change in AppNavigator
        // But we can also close the modal if needed, though unmounting is cleaner
    };

    const handleClose = () => {
        navigation.goBack();
    };

    const handleRestore = () => {
        console.log("Restore clicked");
    };

    const benefits = [
        "Unlimited Dream Recording",
        "Advanced AI Interpretation",
        "Deep Reality Shifting Guides",
        "Exclusive Soundscapes",
        "Cloud Sync & Backup"
    ];

    return (
        <View className="flex-1 bg-[#121212]">
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                {/* Header with Close Button */}
                <View className="flex-row justify-end px-4 pt-4">
                    <TouchableOpacity
                        onPress={handleClose}
                        className="w-8 h-8 bg-white/10 rounded-full items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-8 pt-4 pb-8 justify-between">
                    <View className="items-center">
                        <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-6">
                            <Ionicons name="star" size={40} color={Colors.primary} />
                        </View>

                        <Text className="text-white text-3xl font-bold text-center mb-3">
                            Unlock Full Access
                        </Text>
                        <Text className="text-gray-400 text-center text-lg mb-10">
                            Get the complete experience with Incubate Premium.
                        </Text>

                        <View className="w-full space-y-6">
                            {benefits.map((benefit, index) => (
                                <View key={index} className="flex-row items-center space-x-4">
                                    <View className="bg-green-500/20 rounded-full p-1">
                                        <Ionicons name="checkmark" size={16} color="#4ade80" />
                                    </View>
                                    <Text className="text-gray-200 text-lg font-medium">{benefit}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View>
                        <PrimaryButton
                            label="Start Free Trial"
                            onPress={handleSubscribe}
                            className="mb-6"
                        />

                        <TouchableOpacity onPress={handleRestore} className="mb-4">
                            <Text className="text-gray-500 text-sm text-center">Restore Purchases</Text>
                        </TouchableOpacity>

                        <Text className="text-gray-600 text-xs text-center">
                            [EXPO GO MODE] This is a fake paywall for development.
                            No actual payment will be processed.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
