import React from 'react';
import { Image as RNImage, View } from 'react-native';

interface PhotosDisplayProps {
    frontPhoto: string | number | null;
    profilePhoto: string | number | null;
}

export function PhotosDisplay({ frontPhoto, profilePhoto }: PhotosDisplayProps) {
    return (
        <View className="flex-row justify-center items-center mt-4">
            {/* Front Photo */}
            <View className="w-40 h-40 rounded-full border-4 border-black overflow-hidden shadow-sm z-20 bg-gray-200">
                <RNImage
                    source={typeof frontPhoto === 'number' ? frontPhoto : { uri: frontPhoto || undefined }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>

            {/* Profile Photo - Overlapping */}
            <View
                className="w-40 h-40 rounded-full border-4 border-black overflow-hidden shadow-sm z-10 bg-gray-200"
                style={{ marginLeft: -40 }}
            >
                <RNImage
                    source={typeof profilePhoto === 'number' ? profilePhoto : { uri: profilePhoto || undefined }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
        </View>
    );
}
