import React from 'react';
import { Text, View } from 'react-native';

export function ReadyStep() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-4xl font-bold text-primary mb-4 text-center">
                Ready to transform?
            </Text>
            <Text className="text-xl text-secondary text-center">
                Your personal stylist is ready.
            </Text>
        </View>
    );
}
