import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

interface HaircutSectionProps {
    title: string;
    rank: number;
}

// Placeholder images for now - in a real app these would come from a database or API based on the haircut name
const MOCK_HAIRCUT_IMAGES = [
    require('../../../../../assets/images/haircuts/front_image.png'),
    require('../../../../../assets/images/haircuts/profile_pic.png'),
    require('../../../../../assets/images/haircuts/front_image.png'),
    require('../../../../../assets/images/haircuts/profile_pic.png'),
];

export function HaircutSection({ title, rank }: HaircutSectionProps) {
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
                {MOCK_HAIRCUT_IMAGES.map((img, index) => (
                    <View key={index} className="w-52 h-52 rounded-2xl overflow-hidden bg-card">
                        <Image
                            source={img}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
