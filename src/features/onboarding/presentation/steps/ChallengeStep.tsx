import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface ChallengeStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Finding a style", "Barber communication", "Maintenance", "Unsure what suits me"];

export function ChallengeStep({ selectedOption, onSelect }: ChallengeStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-primary mb-8">
                What is your main challenge?
            </Text>

            <View className="gap-4">
                {OPTIONS.map((option) => {
                    const isSelected = Array.isArray(selectedOption)
                        ? selectedOption.includes(option)
                        : selectedOption === option;
                    return (
                        <OptionButton
                            key={option}
                            label={option}
                            selected={isSelected}
                            multiSelect
                            onPress={() => onSelect(option)}
                        />
                    );
                })}
            </View>
        </View>
    );
}
