import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/core/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor('background');

    return <View className={`bg-${backgroundColor}`} style={style} {...otherProps} />;
}
