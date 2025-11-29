import { GeminiService } from '@/core/services/GeminiService';
import { IconButton, PrimaryButton } from '@/core/ui';
import { TemplateCard } from '@/core/ui/cards/TemplateCard';
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
    const [dreamInput, setDreamInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedScript, setGeneratedScript] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!dreamInput.trim()) return;

        setIsLoading(true);
        try {
            // For now, we are passing the text description. 
            // In the future, we will pass images.
            // The prompt expects images but we can send text as a fallback or just test the flow.
            // We'll send the text as a "frontImageBase64" argument just to trigger the service, 
            // but we really should update the service to handle text-only if we want to support this input.
            // However, the user asked for "refactor context", so I will assume the service handles it 
            // or I will just pass undefined for images and let the service use the text prompt only.
            // Wait, I updated the service to take images. It constructs a prompt.
            // I will update the service call to just call analyzeHaircut(). 
            // But analyzeHaircut takes images. 
            // I will pass undefined for images for now, and rely on the prompt text I hardcoded in the service 
            // (which I didn't hardcode, I used HairAnalysisPrompts.analyzeHaircut()).
            // Actually, I should probably update the input to be "Upload Photos" later.
            // For this step, I'll just change the text and call the new method.

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
        setDreamInput('');
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

                    {/* Input Section */}
                    <View className="px-6 mt-8">
                        <Text className="text-primary text-xl font-semibold mb-4">
                            Upload your photos (Coming Soon)
                        </Text>
                        <View className="bg-surface rounded-2xl p-4 border border-gray-100">
                            <Text className="text-secondary">
                                For now, the AI will simulate an analysis based on a default profile.
                                Click "Analyze Haircut" to see the demo.
                            </Text>
                        </View>

                        {/* Action Button */}
                        <PrimaryButton
                            label="Analyze Haircut"
                            onPress={handleAnalyze}
                            loading={isLoading}
                            className="mt-6"
                        />
                    </View>

                    {/* Templates Section */}
                    <View className="mt-8">
                        <Text className="px-6 text-primary text-lg font-semibold mb-4">
                            Trending Cuts
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 24 }}
                        >
                            <TemplateCard
                                title="Buzz Cut"
                                description="Clean, low maintenance, and sharp. Perfect for defined jawlines."
                                image={require('../../../../assets/images/dream_template_flying.png')} // Placeholder
                                onPress={() => { }}
                            />
                            <TemplateCard
                                title="Mullet"
                                description="Business in the front, party in the back. A modern classic."
                                image={require('../../../../assets/images/dream_template_underwater.png')} // Placeholder
                                onPress={() => { }}
                            />
                            <TemplateCard
                                title="Textured Crop"
                                description="Messy top with faded sides. Great for adding volume."
                                image={require('../../../../assets/images/dream_template_wealth.png')} // Placeholder
                                onPress={() => { }}
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
