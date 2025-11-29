import { Colors } from '@/core/theme/colors';
import { IconButton, PrimaryButton, ScalePressable } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
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
                        <IconButton
                            icon="settings-outline"
                            onPress={() => navigation.navigate('Settings')}
                        />
                    </View>

                    {/* Main Action Section */}
                    <View className="flex-1 px-6 justify-center items-center mt-8">
                        <ScalePressable
                            onPress={() => navigation.navigate('ScanFace')}
                            className="w-full aspect-square bg-surface rounded-[32px] items-center justify-center mb-8 p-8"
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

                        <Text className="text-secondary text-center mt-6 text-sm px-8">
                            We'll scan your face from the front and side to create a 3D understanding of your profile.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
