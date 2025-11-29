import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface InductionStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Direct (WILD)", "Indirect (MILD/DILD)", "Reality Checks", "All of them"];

export function InductionStep({ selectedOption, onSelect }: InductionStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-8">
                Choose your induction style
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
