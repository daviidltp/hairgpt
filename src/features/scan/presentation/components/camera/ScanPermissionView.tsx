import { PrimaryButton } from '@/core/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface ScanPermissionViewProps {
    onRequestPermission: () => void;
}

export function ScanPermissionView({ onRequestPermission }: ScanPermissionViewProps) {
    return (
        <View className="flex-1 items-center justify-center bg-background p-6">
            <Text className="text-primary text-center mb-4">We need your permission to show the camera</Text>
            <PrimaryButton label="Grant Permission" onPress={onRequestPermission} />
        </View>
    );
}

