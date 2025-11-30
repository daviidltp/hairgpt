import { IconButton, PrimaryButton, ScalePressable } from '@/core/ui';
import { MarkdownDisplay } from '@/core/ui/typography/MarkdownDisplay';
import React from 'react';
import { Image as RNImage, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScanResultsViewProps {
    analysisResult: string;
    frontPhoto: string | number | null;
    profilePhoto: string | number | null;
    onReset: () => void;
    onBack: () => void;
}

export function ScanResultsView({
    analysisResult,
    frontPhoto,
    profilePhoto,
    onReset,
    onBack,
}: ScanResultsViewProps) {
    // Extract data from analysis result or default to placeholders
    const faceShapeMatch = analysisResult.match(/\*\*Face Shape:\*\*\s*(.*)/i);
    const hairTypeMatch = analysisResult.match(/\*\*Hair Type:\*\*\s*(.*)/i);

    const faceShape = faceShapeMatch ? faceShapeMatch[1].trim() : 'Oval';
    const hairType = hairTypeMatch ? hairTypeMatch[1].trim() : 'Curly hair';

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="px-6 pt-6 pb-4 flex-row justify-between items-center">
                    <View className="w-10" />
                    <Text className="text-xl font-bold text-primary text-center">Resultados del análisis</Text>
                    <IconButton icon="close" onPress={onBack} />
                </View>

                {/* Photos - Overlapping */}
                <View className="flex-row justify-center items-center mt-4">
                    <View className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-sm z-20 bg-gray-200">
                        <RNImage
                            source={typeof frontPhoto === 'number' ? frontPhoto : { uri: frontPhoto || undefined }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                    <View
                        className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-sm z-10 bg-gray-200"
                        style={{ marginLeft: -40 }}
                    >
                        <RNImage
                            source={typeof profilePhoto === 'number' ? profilePhoto : { uri: profilePhoto || undefined }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Stats Cards */}
                <View className="flex-row gap-4 mt-8 px-6">
                    {/* Face Shape Card */}
                    <ScalePressable
                        className="flex-1 bg-[#f5f5f5] rounded-[24px] p-5 items-center justify-center border border-[#E6E6E6]"
                    >
                        <Text className="text-gray-400 text-sm font-medium mb-1">Forma de cara</Text>
                        <Text className="text-primary text-xl font-bold text-center">{faceShape}</Text>
                    </ScalePressable>

                    {/* Hair Type Card */}
                    <ScalePressable
                        className="flex-1 bg-[#f5f5f5] rounded-[24px] p-5 items-center justify-center border border-[#E6E6E6]"
                    >
                        <Text className="text-gray-400 text-sm font-medium mb-1">Tipo de pelo</Text>
                        <Text className="text-primary text-xl font-bold text-center">{hairType}</Text>
                    </ScalePressable>
                </View>

                {/* Recommendations Section */}
                <View className="px-6 mt-8">
                    <Text className="text-lg font-bold text-primary mb-2">Cortes de pelo aconsejados</Text>
                    <MarkdownDisplay>{analysisResult}</MarkdownDisplay>
                </View>

                <View className="h-10" />
                <View className="px-6">
                    <PrimaryButton label="Scan Again" onPress={onReset} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
