import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface VibeStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Classic / Professional", "Modern / Trendy", "Low Maintenance", "Bold / Creative"];

export function VibeStep({ selectedOption, onSelect }: VibeStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-primary mb-8">
                What's your preferred vibe?
            </Text>

            <View className="gap-4">
                {OPTIONS.map((option) => (
                    <OptionButton
                        key={option}
                        label={option}
                        selected={selectedOption === option}
                        onPress={() => onSelect(option)}
                    />
                ))}
            </View>
        </View>
    );
}
