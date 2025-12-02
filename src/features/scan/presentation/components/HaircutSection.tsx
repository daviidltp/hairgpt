import { ScalePressable } from '@/core/ui/buttons/ScalePressable';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, ImageSourcePropType, ScrollView, Text, View } from 'react-native';

interface HaircutSectionProps {
    title: string;
    rank: number;
    images: ImageSourcePropType[];
    onImagePress?: (imageIndex: number, images: ImageSourcePropType[], title: string) => void;
}

export function HaircutSection({ title, rank, images, onImagePress }: HaircutSectionProps) {
    const handleImagePress = (index: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onImagePress?.(index, images, title);
    };

    return (
        <View className="mb-6">
            <View className="flex-row items-center px-6 mb-3">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-2">
                    <Text className="text-white font-bold text-xs">{rank}</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-bold text-foreground">{title}</Text>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            >
                {images.map((img, index) => (
                    <ScalePressable
                        key={index}
                        onPress={() => handleImagePress(index)}
                        className="w-52 h-52 rounded-2xl overflow-hidden bg-card"
                    >
                        <Image
                            source={img}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </ScalePressable>
                ))}
            </ScrollView>
        </View>
    );
}
