import { GeminiService } from '@/core/services/GeminiService';
import { Colors } from '@/core/theme/colors';
import { IconButton, PrimaryButton } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedScript, setGeneratedScript] = useState<string | null>(null);

    const handleAnalyze = async () => {
        setIsLoading(true);
        try {
            const script = await GeminiService.analyzeHaircut();
            setGeneratedScript(script);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setGeneratedScript(null);
    };

    if (generatedScript) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={['top']}>
                <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    <TouchableOpacity
                        onPress={handleReset}
                        className="mb-6 w-10 h-10 items-center justify-center rounded-full bg-gray-100"
                    >
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>

                    <Text className="text-primary text-2xl leading-10 font-medium tracking-wide">
                        {generatedScript}
                    </Text>

                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        );
    }

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

                    {/* Upload Section */}
                    <View className="flex-1 px-6 justify-center mt-8">
                        <TouchableOpacity
                            className="w-full aspect-square bg-surface rounded-[32px] border-2 border-dashed border-gray-200 items-center justify-center mb-8"
                            onPress={() => { }} // Placeholder for upload
                            activeOpacity={0.7}
                        >
                            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                                <Ionicons name="camera" size={40} color={Colors.primary} />
                            </View>
                            <Text className="text-primary font-bold text-xl mb-2">
                                Upload Photos
                            </Text>
                            <Text className="text-secondary text-center px-8">
                                Take a selfie or upload from gallery to analyze your face shape
                            </Text>
                        </TouchableOpacity>

                        <PrimaryButton
                            label="Analyze Haircut"
                            onPress={handleAnalyze}
                            loading={isLoading}
                        />
                        <Text className="text-secondary text-center mt-4 text-sm">
                            AI will simulate analysis for now
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
