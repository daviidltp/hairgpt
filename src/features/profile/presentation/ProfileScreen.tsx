import { Colors } from '@/core/theme/colors';
import { ActionCard, GlassCard, IconButton, StatCard } from '@/core/ui';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [realityChecksEnabled, setRealityChecksEnabled] = useState(false);

    const settingsItems = [
        { icon: 'person', label: 'Edit Profile' },
        { icon: 'notifications', label: 'Notifications' },
        { icon: 'moon', label: 'Sleep Schedule' },
        { icon: 'shield-checkmark', label: 'Privacy' },
        { icon: 'help-circle', label: 'Help & Support' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="px-6 pt-6 pb-8">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-4xl font-bold text-white">
                            Profile
                        </Text>
                        <IconButton
                            icon="settings-outline"
                            onPress={() => navigation.navigate('Settings')}
                        />
                    </View>
                    <Text className="text-lg text-gray-400">
                        Track your journey
                    </Text>
                </View>

                {/* Profile Card */}
                <View className="px-6 mb-6">
                    <GlassCard>
                        <View className="flex-row items-center gap-4 mb-6">
                            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center">
                                <Text className="text-white font-bold text-2xl">D</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-bold text-xl mb-1">
                                    Dreamer
                                </Text>
                                <Text className="text-gray-400">
                                    Member since Nov 2025
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row gap-2">
                            <StatCard label="Total Sessions" value="42" />
                            <StatCard label="Lucid Dreams" value="28" />
                            <StatCard label="Best Streak" value="14" />
                        </View>
                    </GlassCard>
                </View>

                {/* Reality Checks Section */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">Reality Checks</Text>
                    <GlassCard>
                        <View className="flex-row items-center justify-between mb-4">
                            <View>
                                <Text className="text-white font-semibold text-lg">Daily Reminders</Text>
                                <Text className="text-gray-400 text-sm">Get random checks during the day</Text>
                            </View>
                            <Switch
                                value={realityChecksEnabled}
                                onValueChange={setRealityChecksEnabled}
                                trackColor={{ false: '#374151', true: Colors.primary }}
                                thumbColor={'#F3F4F6'}
                            />
                        </View>

                        <View className="bg-white/5 rounded-xl p-4">
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-gray-300">Frequency</Text>
                                <Text className="text-white font-bold">5 / day</Text>
                            </View>
                            <View className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <View className="h-full w-[60%] bg-primary rounded-full" />
                            </View>
                        </View>
                    </GlassCard>
                </View>

                {/* Settings */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">Settings</Text>
                    <View className="gap-3">
                        {settingsItems.map((item, index) => (
                            <ActionCard
                                key={index}
                                icon={item.icon as any}
                                label={item.label}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
