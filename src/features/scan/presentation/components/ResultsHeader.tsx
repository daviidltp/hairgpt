import { IconButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface ResultsHeaderProps {
    onClose: () => void;
}

export function ResultsHeader({ onClose }: ResultsHeaderProps) {
    return (
        <View className="px-6 pt-6 pb-4 flex-row justify-between items-center">
            <View className="w-10" />
            <Text className="text-xl font-bold text-primary text-center">
                Resultados del análisis
            </Text>
            <IconButton icon="close" onPress={onClose} />
        </View>
    );
}
