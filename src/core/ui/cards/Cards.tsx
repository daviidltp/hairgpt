import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ScalePressable } from '../buttons/ScalePressable';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
    return (
        <View
            className={`bg-surface p-6 ${className}`}
            style={{ borderRadius: 28 }}
        >
            {children}
        </View>
    );
}

interface StatCardProps {
    label: string;
    value: string;
    className?: string;
}

export function StatCard({ label, value, className = '' }: StatCardProps) {
    return (
        <View
            className={`flex-1 bg-surface p-3 ${className}`}
            style={{ borderRadius: 28 }}
        >
            <Text className="text-secondary text-xs mb-1">{label}</Text>
            <Text className="text-primary font-bold text-xl">{value}</Text>
        </View>
    );
}

interface ActionCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    color?: string;
    onPress?: () => void;
}

export function ActionCard({ icon, label, color, onPress }: ActionCardProps) {
    return (
        <ScalePressable
            onPress={onPress}
            className="bg-surface p-4 flex-row items-center gap-4"
            style={{ borderRadius: 28 }}
        >
            {color && (
                <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                >
                    <Ionicons name={icon} size={20} color={color} />
                </View>
            )}
            <Text className="text-primary font-medium text-base flex-1">
                {label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </ScalePressable>
    );
}
