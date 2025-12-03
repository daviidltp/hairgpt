import { ScalePressable } from '@/core/ui';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface HomeCardProps {
    title: string;
    description: string;
    imageSource: ImageSourcePropType;
    onPress: () => void;
}

export function HomeCard({ title, description, imageSource, onPress }: HomeCardProps) {
    return (
        <ScalePressable
            onPress={onPress}
            className="w-full h-[320px] bg-surface rounded-[32px] border border-gray-200"
        >
            <View className="flex-1 rounded-[32px] overflow-hidden">
                {/* Image Section - Takes remaining space */}
                <View className="flex-1 items-center justify-center relative pt-2">
                    <Image
                        source={imageSource}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Text Section - Auto sized based on content */}
                <View className="px-10 py-3 pb-10 items-center justify-center bg-surface">
                    <Text className="text-primary font-bold text-3xl mb-2 text-center">
                        {title}
                    </Text>
                    <Text className="text-secondary text-center text-lg leading-5">
                        {description}
                    </Text>
                </View>
            </View>
        </ScalePressable>
    );
}
