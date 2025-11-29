import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/core/hooks/useThemeColor';
import { Colors } from '../theme/colors';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest 
}: ThemedTextProps) {
    const color = useThemeColor((lightColor as keyof typeof Colors) ?? (darkColor as keyof typeof Colors) ?? 'textPrimary');
    return <Text className={`text-${color}`} style={style} {...rest} />;
}
