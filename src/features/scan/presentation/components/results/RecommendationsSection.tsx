import { MarkdownDisplay } from '@/core/ui/typography/MarkdownDisplay';
import React from 'react';
import { Text, View } from 'react-native';

interface RecommendationsSectionProps {
    analysisResult: string;
}

export function RecommendationsSection({ analysisResult }: RecommendationsSectionProps) {
    return (
        <View className="px-6 mt-8">
            <Text className="text-lg font-bold text-primary mb-2">
                Cortes de pelo aconsejados
            </Text>
            <MarkdownDisplay>{analysisResult}</MarkdownDisplay>
        </View>
    );
}

