/**
 * Incubate Design System Colors
 * These colors match the Tailwind config in tailwind.config.js
 * Use these constants instead of hardcoding hex values
 */

// @ts-ignore
import palette from './palette';

export const Colors = {
    ...palette,
} as const;

/**
 * Helper to create alpha variants of colors
 * Example: withAlpha(Colors.primary, 0.2) => 'rgba(0, 0, 0, 0.2)'
 */
export function withAlpha(hexColor: string, alpha: number): string {
    const hex = hexColor.replace('#', '').substring(0, 6); // Remove # and alpha channel if present
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
