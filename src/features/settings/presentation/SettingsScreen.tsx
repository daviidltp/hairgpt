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
                <View className="w-9 h-9 bg-white/10 rounded-full items-center justify-center">
                    <Ionicons name={icon} size={20} color={Colors.textPrimary} />
                </View>
                <Text className="text-white text-base font-medium flex-1">{label}</Text>
            </View>
            <View className="flex-row items-center gap-2">
                {value && <Text className="text-gray-400 text-sm">{value}</Text>}
                {showChevron && (
                    <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
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
                <View className="w-9 h-9 bg-white/10 rounded-full items-center justify-center">
                    <Ionicons name={icon} size={20} color={Colors.textPrimary} />
                </View>
                <Text className="text-white text-base font-medium">{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={handleToggle}
                trackColor={{ false: '#374151', true: Colors.primary }}
                thumbColor="#FFFFFF"
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
                    <Text className="text-4xl font-bold text-white mb-2 mt-4">
                        Ajustes
                    </Text>
                    <Text className="text-lg text-gray-400">
                        Personaliza tu experiencia
                    </Text>
                </View>

                {/* Account Section */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">Cuenta</Text>
                    <GlassCard>
                        <SettingItem
                            icon="person-outline"
                            label="Perfil"
                            onPress={() => console.log('Perfil')}
                        />
                        <View className="h-px bg-white/10 my-1" />
                        <SettingItem
                            icon="card-outline"
                            label="Suscripción"
                            value="Free"
                            onPress={() => console.log('Suscripción')}
                        />
                    </GlassCard>
                </View>

                {/* Preferences Section */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">Preferencias</Text>
                    <GlassCard>
                        <SettingToggle
                            icon="notifications-outline"
                            label="Notificaciones"
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                        />
                        <View className="h-px bg-white/10 my-1" />
                        <SettingToggle
                            icon="phone-portrait-outline"
                            label="Vibración"
                            value={hapticEnabled}
                            onValueChange={setHapticEnabled}
                        />
                        <View className="h-px bg-white/10 my-1" />
                        <SettingToggle
                            icon="play-outline"
                            label="Reproducción automática"
                            value={autoPlayEnabled}
                            onValueChange={setAutoPlayEnabled}
                        />
                    </GlassCard>
                </View>

                {/* App Section */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">App</Text>
                    <GlassCard>
                        <SettingItem
                            icon="help-circle-outline"
                            label="Ayuda y soporte"
                            onPress={() => console.log('Ayuda')}
                        />
                        <View className="h-px bg-white/10 my-1" />
                        <SettingItem
                            icon="document-text-outline"
                            label="Términos y condiciones"
                            onPress={() => console.log('Términos')}
                        />
                        <View className="h-px bg-white/10 my-1" />
                        <SettingItem
                            icon="shield-checkmark-outline"
                            label="Privacidad"
                            onPress={() => console.log('Privacidad')}
                        />
                        <View className="h-px bg-white/10 my-1" />
                        <SettingItem
                            icon="information-circle-outline"
                            label="Acerca de"
                            value="v1.0.0"
                            showChevron={false}
                            onPress={() => console.log('Acerca de')}
                        />
                    </GlassCard>
                </View>

                {/* Danger Zone */}
                <View className="px-6 mb-12">
                    <PrimaryButton
                        label="Cerrar sesión"
                        onPress={logout}
                        variant="ghost"
                        className="bg-[#1a1a1a]"
                        textClassName="text-red-500"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
