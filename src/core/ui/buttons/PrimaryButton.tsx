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
            return 'bg-gray-200';
        }

        switch (variant) {
            case 'primary':
                return 'bg-primary'; // Black
            case 'secondary':
                return 'bg-surface border border-gray-200';
            case 'ghost':
                return 'bg-transparent';
            default:
                return 'bg-primary';
        }
    };

    const getTextStyles = () => {
        if (disabled || loading) {
            return 'text-gray-400';
        }

        switch (variant) {
            case 'primary':
                return 'text-white'; // White text on Black button
            case 'secondary':
            case 'ghost':
                return 'text-primary'; // Black text
            default:
                return 'text-white';
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
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#000'} />
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
