import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { ScalePressable } from '../buttons/ScalePressable';

interface TemplateCardProps {
    title: string;
    description: string;
    image: ImageSourcePropType;
    onPress: () => void;
}

export function TemplateCard({ title, description, image, onPress }: TemplateCardProps) {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <ScalePressable
            onPress={handlePress}
            className="w-64 h-80 rounded-[28px] overflow-hidden mr-4"
        >
            <ImageBackground
                source={image}
                className="flex-1"
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.95)']}
                    start={{ x: 0.5, y: 0.2 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}
                >
                    <View className="flex-row items-center gap-2 mb-2">
                        <Ionicons name="sparkles" size={16} color="rgba(255,255,255,0.9)" />
                        <Text className="text-white font-bold text-xl shadow-sm">
                            {title}
                        </Text>
                    </View>

                    <Text className="text-white/95 text-sm font-medium leading-5 mb-5 shadow-sm" numberOfLines={4}>
                        {description}
                    </Text>

                    {/* Visual CTA Button */}
                    <View className="w-full bg-white/20 backdrop-blur-md rounded-full py-3 items-center border border-white/30">
                        <Text className="text-white font-bold text-sm tracking-wide">
                            Empezar
                        </Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </ScalePressable>
    );
}
