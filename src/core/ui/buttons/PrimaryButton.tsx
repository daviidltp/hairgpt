import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { ScalePressable } from './ScalePressable';

interface PrimaryButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
    textClassName?: string;
}

export function PrimaryButton({
    label,
    onPress,
    disabled = false,
    loading = false,
    variant = 'primary',
    className = '',
    textClassName = '',
}: PrimaryButtonProps) {
    const handlePress = () => {
        if (!disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onPress();
        }
    };

    const getVariantStyles = () => {
        if (disabled || loading) {
            return 'bg-white/20';
        }

        switch (variant) {
            case 'primary':
                return 'bg-white';
            case 'secondary':
                return 'bg-white/10 border border-white/20';
            case 'ghost':
                return 'bg-transparent';
            default:
                return 'bg-white';
        }
    };

    const getTextStyles = () => {
        if (disabled || loading) {
            return 'text-white/50';
        }

        switch (variant) {
            case 'primary':
                return 'text-black';
            case 'secondary':
            case 'ghost':
                return 'text-white';
            default:
                return 'text-black';
        }
    };

    return (
        <ScalePressable
            onPress={handlePress}
            disabled={disabled || loading}
            className={twMerge(
                'w-full py-5 rounded-2xl items-center justify-center',
                getVariantStyles(),
                className
            )}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? '#000' : '#fff'} />
            ) : (
                <Text className={twMerge(
                    'text-xl font-semibold',
                    getTextStyles(),
                    textClassName
                )}>
                    {label}
                </Text>
            )}
        </ScalePressable>
    );
}
