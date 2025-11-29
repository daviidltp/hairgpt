import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface MotivationStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Lucid Dreaming", "Better Sleep", "Subconscious Reprogramming", "Curiosity"];

export function MotivationStep({ selectedOption, onSelect }: MotivationStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-2">
                What brings you to Incubate?
            </Text>
            <Text className="text-lg text-gray-400 mb-8">
                We'll tailor your experience.
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
