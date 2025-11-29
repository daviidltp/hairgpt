import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface ObstacleStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Recall", "Stabilization", "Induction", "Consistency"];

export function ObstacleStep({ selectedOption, onSelect }: ObstacleStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-8">
                What is your main obstacle?
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
