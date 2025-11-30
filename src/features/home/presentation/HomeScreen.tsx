import { IconButton, ScalePressable } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const handlePress = (route: keyof RootStackParamList, params?: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate(route, params);
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar barStyle="dark-content" />
            <View className="px-6 pt-6 pb-2 flex-row justify-between items-center">
                <Text className="text-3xl font-bold text-primary">
                    HairGPT
                </Text>
                <View className="flex-row gap-2">
                    <IconButton
                        icon="document-text-outline"
                        onPress={() => handlePress('ScanFace', { mockResults: true })}
                    />
                    <IconButton
                        icon="bug-outline"
                        onPress={() => handlePress('ScanFace', { mock: true })}
                    />
                    <IconButton
                        icon="settings-outline"
                        onPress={() => handlePress('Settings')}
                    />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Card 1: Face Analysis */}
                <ScalePressable
                    onPress={() => handlePress('ScanFace')}
                    className="w-full h-1/2 bg-surface rounded-[32px] p-6 mb-6 items-center justify-center"
                    style={{
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4.3,
                        elevation: 5,
                    }}
                >
                    <Image
                        source={require('../../../../assets/images/haircuts/hair_analyzer.png')}
                        className="w-64 h-64 mb-4"
                        resizeMode="cover"
                    />
                    <Text className="text-primary font-bold text-3xl mb-2 text-center">
                        Descubre tu tipo de rostro
                    </Text>
                    <Text className="text-secondary text-center text-lg leading-5 px-2">
                        Te recomendaremos el mejor corte de pelo para tu tipo de cara
                    </Text>
                </ScalePressable>

                {/* Card 2: Hair Loss Analysis */}
                <ScalePressable
                    onPress={() => handlePress('ScanFace')}
                    className="w-full h-1/2 bg-surface rounded-[32px] p-6 items-center justify-center"
                    style={{
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4.3,
                        elevation: 5,
                    }}
                >
                    <Image
                        source={require('../../../../assets/images/haircuts/bald_analyzer.png')}
                        className="w-56 h-56 mb-4"
                        resizeMode="cover"
                    />
                    <Text className="text-primary font-bold text-3xl mb-2 text-center">
                        ¿Me voy a quedar calvo?
                    </Text>
                    <Text className="text-secondary text-center text-lg leading-5 px-2">
                        Analizamos tu tipo de pelo para saber si tienes probabilidad de quedarte calvo
                    </Text>
                </ScalePressable>
            </ScrollView>
        </SafeAreaView>
    );
}
