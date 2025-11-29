import React from 'react';
import { View, Text } from 'react-native';

export function WelcomeStep() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-4xl font-bold text-white mb-4 text-center">
                Ready to shift?
            </Text>
            <Text className="text-xl text-gray-400 text-center">
                Your journey begins now.
            </Text>
        </View>
    );
}
