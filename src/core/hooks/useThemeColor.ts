/**
 * Incubate uses a single dark theme
 * This hook provides access to theme colors
 */

import { Colors } from '@/core/theme/colors';

export function useThemeColor(
    colorName: keyof typeof Colors
): string {
    return Colors[colorName];
}
