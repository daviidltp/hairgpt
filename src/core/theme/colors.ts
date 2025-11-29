/**
 * Incubate Design System Colors
 * These colors match the Tailwind config in tailwind.config.js
 * Use these constants instead of hardcoding hex values
 */

export const Colors = {
    // Base colors
    background: '#0a0a0a',
    surface: '#1a1a1a',

    // Brand colors
    primary: '#809FFF', // Azul principal
    secondary: '#06b6d4', // cyan-500
    accent: '#f472b6', // pink-400

    // Orange accent colors (from premium card)
    purpleDark: '#4D78FA',
    purpleLight: '#A6BBFF',
    orangeDark: '#EA580C',
    orangeMid: '#F97316',

    // Glass effect
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBg: 'rgba(255, 255, 255, 0.05)',

    // Utility colors (for icons, etc)
    amber: '#F59E0B',
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#FCD34D',

    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
    mutedWhite: '#888888',
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
