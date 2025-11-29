import { OptionButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface HistoryStepProps {
    selectedOption?: string | string[];
    onSelect: (option: string) => void;
}

const OPTIONS = ["Yes, with a stylist", "Yes, with an app", "No, never", "I'm not sure"];

export function HistoryStep({ selectedOption, onSelect }: HistoryStepProps) {
    return (
        <View className="flex-1">
            <Text className="text-3xl font-bold text-primary mb-8">
                Have you analyzed your hair before?
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
