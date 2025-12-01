import { AnalysisData } from '@/features/scan/data/analysisDescriptions';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface AnalysisBottomSheetProps {
    bottomSheetRef: React.RefObject<BottomSheetModal | null>;
    snapPoints: string[];
    renderBackdrop: (props: any) => React.ReactElement;
    title: string;
    data: AnalysisData;
}

export function AnalysisBottomSheet({
    bottomSheetRef,
    snapPoints,
    renderBackdrop,
    title,
    data
}: AnalysisBottomSheetProps) {
    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
        >
            <BottomSheetView className="flex-1 p-6">
                <Text className="text-xl font-bold mb-4 text-foreground text-center">
                    {title}
                </Text>
                <Text className="text-center text-base text-muted-foreground leading-relaxed mb-6">
                    {data.description}
                </Text>

                <View className="flex-row gap-4 px-4">
                    {data.celebrities.map((celebrity, index) => (
                        <View key={index} className="flex-1 aspect-square rounded-2xl overflow-hidden bg-card">
                            <Image
                                source={celebrity}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
}
