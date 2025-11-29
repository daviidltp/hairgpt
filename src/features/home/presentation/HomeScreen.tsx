import { GeminiService } from '@/core/services/GeminiService';
import { PrimaryButton } from '@/core/ui/buttons/PrimaryButton';
import { TemplateCard } from '@/core/ui/cards/TemplateCard';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen() {
    const [dreamInput, setDreamInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedScript, setGeneratedScript] = useState<string | null>(null);

    const handleIncubate = async () => {
        if (!dreamInput.trim()) return;

        setIsLoading(true);
        try {
            const script = await GeminiService.generateDreamScript(dreamInput);
            setGeneratedScript(script);
        } catch (error) {
            // Handle error appropriately (e.g., show toast)
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
            <SafeAreaView className="flex-1 bg-black" edges={['top']}>
                <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    <TouchableOpacity
                        onPress={handleReset}
                        className="mb-6 w-10 h-10 items-center justify-center rounded-full bg-white/10"
                    >
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>

                    <Text className="text-gray-400 text-lg mb-8 italic">
                        "{dreamInput}"
                    </Text>

                    <Text className="text-white text-2xl leading-10 font-medium tracking-wide">
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
                    <View className="px-6 pt-6 pb-4">
                        <Text className="text-4xl font-bold text-white mb-2">
                            Incubate
                        </Text>
                        <Text className="text-lg text-gray-400">
                            Design your dream
                        </Text>
                    </View>

                    {/* Dream Input Section */}
                    <View className="px-6 mt-8">
                        <Text className="text-white text-xl font-semibold mb-4">
                            What do you want to dream today?
                        </Text>
                        <View className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <TextInput
                                className="text-white text-lg min-h-[150px]"
                                placeholder="Describe your dream scenario..."
                                placeholderTextColor="#6B7280"
                                multiline
                                textAlignVertical="top"
                                value={dreamInput}
                                onChangeText={setDreamInput}
                                style={{ lineHeight: 24 }}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Action Button */}
                        <PrimaryButton
                            label="Incubate Dream"
                            onPress={handleIncubate}
                            loading={isLoading}
                            disabled={isLoading || !dreamInput.trim()}
                            className="mt-6"
                        />
                    </View>

                    {/* Templates Section */}
                    <View className="mt-8">
                        <Text className="px-6 text-white text-lg font-semibold mb-4">
                            Popular Themes
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 24 }}
                        >
                            <TemplateCard
                                title="Fly High"
                                description="Soar above snow-capped mountains and feel the absolute freedom of weightlessness."
                                image={require('../../../../assets/images/dream_template_flying.png')}
                                onPress={() => setDreamInput("Quiero volar sobre montañas nevadas, sintiendo el viento frío en la cara y la libertad absoluta de no tener peso.")}
                            />
                            <TemplateCard
                                title="Underwater"
                                description="Breathe underwater in a bioluminescent coral reef, swimming with colorful fish in total peace."
                                image={require('../../../../assets/images/dream_template_underwater.png')}
                                onPress={() => setDreamInput("Quiero respirar bajo el agua en un arrecife de coral lleno de luz, nadando con peces de colores en total paz.")}
                            />
                            <TemplateCard
                                title="Sexual Fantasies"
                                description="Explore your deepest desires and fantasies in a safe, lucid dream environment."
                                image={require('../../../../assets/images/dream_template_sexual_fantasies.png')}
                                onPress={() => setDreamInput("Quiero explorar mis fantasías sexuales más profundas con total lucidez y control, sintiendo cada sensación de forma vívida y placentera.")}
                            />
                            <TemplateCard
                                title="Wealth"
                                description="Attract abundance and success. Visualize a life of limitless prosperity."
                                image={require('../../../../assets/images/dream_template_wealth.png')}
                                onPress={() => setDreamInput("Quiero soñar que tengo una abundancia ilimitada, rodeado de lujo y éxito, sintiendo la libertad financiera absoluta.")}
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
