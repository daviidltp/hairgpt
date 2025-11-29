import { Colors } from '@/core/theme/colors';
import { BackButton, GlassCard, HapticButton, PrimaryButton } from '@/core/ui';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    showChevron?: boolean;
    onPress?: () => void;
}

function SettingItem({ icon, label, value, showChevron = true, onPress }: SettingItemProps) {
    return (
        <HapticButton
            onPress={onPress}
            className="flex-row items-center justify-between py-4"
            activeOpacity={0.7}
        >
            <View className="flex-row items-center gap-3 flex-1">
                <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center">
                    <Ionicons name={icon} size={20} color={Colors.primary} />
                </View>
                <Text className="text-primary text-base font-medium flex-1">{label}</Text>
            </View>
            <View className="flex-row items-center gap-2">
                {value && <Text className="text-secondary text-sm">{value}</Text>}
                {showChevron && (
                    <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
                )}
            </View>
        </HapticButton>
    );
}

interface SettingToggleProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

function SettingToggle({ icon, label, value, onValueChange }: SettingToggleProps) {
    const handleToggle = (newValue: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onValueChange(newValue);
    };

    return (
        <View className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center gap-3 flex-1">
                <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center">
                    <Ionicons name={icon} size={20} color={Colors.primary} />
                </View>
                <Text className="text-primary text-base font-medium">{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={handleToggle}
                trackColor={{ false: '#E5E7EB', true: Colors.primary }}
                thumbColor={Colors.primary}
            />
        </View>
    );
}

export function SettingsScreen() {
    const navigation = useNavigation();
    const { logout } = useAuthStore();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [hapticEnabled, setHapticEnabled] = React.useState(true);
    const [autoPlayEnabled, setAutoPlayEnabled] = React.useState(false);

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-8">
                    <BackButton onPress={() => navigation.goBack()} />
                    <Text className="text-4xl font-bold text-primary mb-2 mt-4">
                        Settings
                    </Text>
                    <Text className="text-lg text-secondary">
                        Customize your experience
                    </Text>
                </View>

                {/* Account Section */}
                <View className="px-6 mb-6">
                    <Text className="text-primary font-bold text-lg mb-4">Account</Text>
                    <GlassCard>
                        <SettingItem
                            icon="person-outline"
                            label="Profile"
                            onPress={() => console.log('Profile')}
                        />
                        <View className="h-px bg-gray-200 my-1" />
                        <SettingItem
                            icon="card-outline"
                            label="Subscription"
                            value="Free"
                            onPress={() => console.log('Subscription')}
                        />
                    </GlassCard>
                </View>

                {/* Preferences Section */}
                <View className="px-6 mb-6">
                    <Text className="text-primary font-bold text-lg mb-4">Preferences</Text>
                    <GlassCard>
                        <SettingToggle
                            icon="notifications-outline"
                            label="Notifications"
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                        />
                        <View className="h-px bg-gray-200 my-1" />
                        <SettingToggle
                            icon="phone-portrait-outline"
                            label="Haptic Feedback"
                            value={hapticEnabled}
                            onValueChange={setHapticEnabled}
                        />
                        <View className="h-px bg-gray-200 my-1" />
                        <SettingToggle
                            icon="play-outline"
                            label="Auto-play"
                            value={autoPlayEnabled}
                            onValueChange={setAutoPlayEnabled}
                        />
                    </GlassCard>
                </View>

                {/* App Section */}
                <View className="px-6 mb-6">
                    <Text className="text-primary font-bold text-lg mb-4">App</Text>
                    <GlassCard>
                        <SettingItem
                            icon="help-circle-outline"
                            label="Help & Support"
                            onPress={() => console.log('Help')}
                        />
                        <View className="h-px bg-gray-200 my-1" />
                        <SettingItem
                            icon="document-text-outline"
                            label="Terms & Conditions"
                            onPress={() => console.log('Terms')}
                        />
                        <View className="h-px bg-gray-200 my-1" />
                        <SettingItem
                            icon="shield-checkmark-outline"
                            label="Privacy Policy"
                            onPress={() => console.log('Privacy')}
                        />
                        <View className="h-px bg-gray-200 my-1" />
                        <SettingItem
                            icon="information-circle-outline"
                            label="About"
                            value="v1.0.0"
                            showChevron={false}
                            onPress={() => console.log('About')}
                        />
                    </GlassCard>
                </View>

                {/* Danger Zone */}
                <View className="px-6 mb-12">
                    <PrimaryButton
                        label="Log Out"
                        onPress={logout}
                        variant="ghost"
                        className="bg-surface"
                        textClassName="text-red-500"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
