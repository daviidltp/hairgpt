import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface GoalStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Find my best haircut", "Analyze my face shape", "Try a new style", "Curiosity"];

export function GoalStep({ selectedOption, onSelect }: GoalStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-primary mb-2">
                What brings you to HairGPT?
            </Text>
            <Text className="text-lg text-secondary mb-8">
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
