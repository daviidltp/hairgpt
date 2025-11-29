import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface ExperienceStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Often", "Sometimes", "Once or twice", "Never"];

export function ExperienceStep({ selectedOption, onSelect }: ExperienceStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-8">
                Have you lucid dreamed before?
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
