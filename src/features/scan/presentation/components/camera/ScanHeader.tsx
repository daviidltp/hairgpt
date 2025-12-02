import { IconButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface ScanHeaderProps {
    title: string;
    onBack: () => void;
}

export function ScanHeader({ title, onBack }: ScanHeaderProps) {
    return (
        <View className="px-6 pt-2 pb-4 flex-row justify-between items-center z-10">
            <IconButton
                icon="arrow-back"
                onPress={onBack}
                className="bg-transparent"
                iconColor="black"
            />
            <Text className="text-lg font-bold text-black">
                {title}
            </Text>
            <View className="w-10" />
        </View>
    );
}

